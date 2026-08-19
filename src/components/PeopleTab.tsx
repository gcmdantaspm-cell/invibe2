import { useState, useEffect } from 'react';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { collection, query, where, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
import { useAuth } from '../contexts/AuthContext';
import { Heart, MessageCircle } from 'lucide-react';
import { UserProfile } from '../types';

interface PeopleTabProps {
  eventId: string;
}

export function PeopleTab({ eventId }: PeopleTabProps) {
  const { user, profile } = useAuth();
  const [checkedInUsers, setCheckedInUsers] = useState<UserProfile[]>([]);

  useEffect(() => {
    if (!user) return;

    // Listen to checkins for this event
    const qCheckins = query(collection(db, 'checkins'), where('eventId', '==', eventId));
    const unsubCheckins = onSnapshot(qCheckins, async (snap) => {
      const uids = snap.docs.map(doc => doc.data().userId);
      // For a real app, you'd fetch the user profiles based on uids.
      // Since 'in' queries are limited to 10, we simulate a simple fetch or use denormalized data.
      // We will listen to the users collection directly for simplicity in prototype
      
      const qUsers = query(collection(db, 'users'));
      onSnapshot(qUsers, (usersSnap) => {
        const users = usersSnap.docs
            .map(d => ({ uid: d.id, ...d.data() } as UserProfile))
            .filter(u => uids.includes(u.uid) && u.uid !== user.uid); // exclude self
        setCheckedInUsers(users);
      });

    }, err => handleFirestoreError(err, OperationType.LIST, 'checkins'));

    return () => unsubCheckins();
  }, [eventId, user]);

  const handleInteract = async (targetUser: UserProfile) => {
    if (!user || !profile) return;
    try {
      await addDoc(collection(db, 'interactions'), {
        fromUserId: user.uid,
        fromUserName: profile.displayName || 'Alguém',
        toUserId: targetUser.uid,
        status: 'pending',
        createdAt: serverTimestamp()
      });
      alert(`Pedido de interação enviado para ${targetUser.displayName}!`);
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, 'interactions');
    }
  };

  return (
    <div className="pb-24">
      {checkedInUsers.length === 0 ? (
        <div className="text-center py-10 text-slate-500">
          Você é o único aqui por enquanto. Que tal postar no feed?
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {checkedInUsers.map(u => (
            <div key={u.uid} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden relative group">
              <div className="aspect-[4/5] bg-black/40 relative">
                {u.photoUrl ? (
                  <img src={u.photoUrl} alt={u.displayName} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-slate-700 bg-slate-900">
                    {u.displayName?.charAt(0).toUpperCase()}
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                
                <div className="absolute bottom-0 left-0 w-full p-3">
                  <h3 className="text-white font-bold text-lg leading-tight">{u.displayName}</h3>
                  {u.status && <p className="text-cyan-400 text-xs mt-1 truncate">{u.status}</p>}
                </div>
              </div>
              
              <button 
                onClick={() => handleInteract(u)}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-gradient-to-tr from-fuchsia-600 to-cyan-500 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 transition-all shadow-[0_0_20px_rgba(232,121,249,0.5)]"
              >
                <Heart size={24} className="fill-white" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
