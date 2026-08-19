import { useState, useEffect } from 'react';
import { X, Users, Image as ImageIcon } from 'lucide-react';
import { EventModel } from '../types';
import { FeedTab } from './FeedTab';
import { PeopleTab } from './PeopleTab';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { collection, query, where, getDocs, setDoc, doc, serverTimestamp } from 'firebase/firestore';
import { useAuth } from '../contexts/AuthContext';

interface EventLobbyProps {
  event: EventModel;
  onClose: () => void;
}

export function EventLobby({ event, onClose }: EventLobbyProps) {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'feed' | 'people'>('feed');
  const [hasCheckedIn, setHasCheckedIn] = useState(false);

  useEffect(() => {
    const performCheckin = async () => {
      if (!user) return;
      const checkinId = `${user.uid}_${event.id}`;
      try {
        await setDoc(doc(db, 'checkins', checkinId), {
          userId: user.uid,
          eventId: event.id,
          checkedInAt: serverTimestamp()
        }, { merge: true });
        setHasCheckedIn(true);
      } catch (err) {
        handleFirestoreError(err, OperationType.WRITE, `checkins/${checkinId}`);
      }
    };
    performCheckin();
  }, [event.id, user]);

  return (
    <div className="fixed inset-0 bg-[#0a0a0f] z-50 overflow-y-auto animate-in slide-in-from-bottom-full duration-300">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-[#0a0a0f]/90 backdrop-blur-md border-b border-white/10 px-4 pt-safe">
        <div className="flex items-center justify-between py-4">
          <div className="flex-1">
            <h2 className="text-xl font-bold text-white leading-tight">{event.title}</h2>
            <p className="text-cyan-400 text-sm font-medium">{event.locationName}</p>
          </div>
          <button 
            onClick={onClose} 
            className="w-10 h-10 bg-white/5 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/10 shrink-0 ml-4"
          >
            <X size={24} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-6 mt-2">
          <button 
            onClick={() => setActiveTab('feed')}
            className={`pb-3 text-sm font-bold flex items-center gap-2 transition-colors relative ${activeTab === 'feed' ? 'text-white' : 'text-slate-500 hover:text-slate-300'}`}
          >
            <ImageIcon size={18} />
            Feed do Evento
            {activeTab === 'feed' && (
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)]"></div>
            )}
          </button>
          <button 
            onClick={() => setActiveTab('people')}
            className={`pb-3 text-sm font-bold flex items-center gap-2 transition-colors relative ${activeTab === 'people' ? 'text-white' : 'text-slate-500 hover:text-slate-300'}`}
          >
            <Users size={18} />
            Pessoas
            {activeTab === 'people' && (
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-fuchsia-400 shadow-[0_0_10px_rgba(232,121,249,0.5)]"></div>
            )}
          </button>
        </div>
      </div>

      <div className="p-4">
        {activeTab === 'feed' ? (
          <FeedTab eventId={event.id} />
        ) : (
          <PeopleTab eventId={event.id} />
        )}
      </div>
    </div>
  );
}
