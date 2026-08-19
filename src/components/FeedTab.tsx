import { useState, useEffect } from 'react';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { collection, query, where, onSnapshot, addDoc, serverTimestamp, doc, setDoc, deleteDoc } from 'firebase/firestore';
import { useAuth } from '../contexts/AuthContext';
import { Zap, Send, MessageCircle } from 'lucide-react';
import { PostModel } from '../types';

interface FeedTabProps {
  eventId: string;
}

export function FeedTab({ eventId }: FeedTabProps) {
  const { user, profile } = useAuth();
  const [posts, setPosts] = useState<PostModel[]>([]);
  const [newPost, setNewPost] = useState('');
  const [userHypes, setUserHypes] = useState<string[]>([]); // Array of post IDs

  useEffect(() => {
    if (!user) return;

    // Listen to posts
    const qPosts = query(collection(db, 'posts'), where('eventId', '==', eventId));
    const unsubPosts = onSnapshot(qPosts, (snap) => {
      const p = snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as PostModel));
      // Sort by creation desc (simple client-side sort for prototype to avoid complex indexes)
      p.sort((a, b) => (b.createdAt?.toMillis() || 0) - (a.createdAt?.toMillis() || 0));
      setPosts(p);
    }, err => handleFirestoreError(err, OperationType.LIST, 'posts'));

    // Listen to user hypes
    const qHypes = query(collection(db, 'hypes'), where('userId', '==', user.uid));
    const unsubHypes = onSnapshot(qHypes, (snap) => {
      setUserHypes(snap.docs.map(doc => doc.data().postId));
    }, err => handleFirestoreError(err, OperationType.LIST, 'hypes'));

    return () => {
      unsubPosts();
      unsubHypes();
    };
  }, [eventId, user]);

  const handlePost = async () => {
    if (!newPost.trim() || !user || !profile) return;
    try {
      await addDoc(collection(db, 'posts'), {
        eventId,
        userId: user.uid,
        userName: profile.displayName || user.email?.split('@')[0],
        userPhotoUrl: profile.photoUrl || '',
        content: newPost,
        hypeCount: 0,
        createdAt: serverTimestamp()
      });
      setNewPost('');
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, 'posts');
    }
  };

  const handleHype = async (postId: string) => {
    if (!user) return;
    const isHyped = userHypes.includes(postId);
    const hypeId = `${user.uid}_${postId}`;
    
    try {
      if (isHyped) {
        await deleteDoc(doc(db, 'hypes', hypeId));
      } else {
        await setDoc(doc(db, 'hypes', hypeId), {
          userId: user.uid,
          postId
        });
      }
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, `hypes/${hypeId}`);
    }
  };

  return (
    <div className="space-y-6 pb-24">
      {/* Create Post */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
        <div className="flex gap-3">
          <div className="w-10 h-10 rounded-full bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center shrink-0 overflow-hidden">
            {profile?.photoUrl ? (
              <img src={profile.photoUrl} alt="Me" className="w-full h-full object-cover" />
            ) : (
              <span className="text-cyan-400 font-bold text-sm">{profile?.displayName?.charAt(0).toUpperCase()}</span>
            )}
          </div>
          <div className="flex-1">
            <textarea 
              value={newPost}
              onChange={e => setNewPost(e.target.value)}
              placeholder="O que está rolando?"
              className="w-full bg-transparent text-white placeholder:text-slate-500 resize-none outline-none min-h-[60px]"
            />
            <div className="flex justify-end mt-2">
              <button 
                onClick={handlePost}
                disabled={!newPost.trim()}
                className="bg-cyan-500 text-black px-4 py-1.5 rounded-full font-bold text-sm disabled:opacity-50 flex items-center gap-2"
              >
                Postar <Send size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Feed List */}
      <div className="space-y-4">
        {posts.length === 0 ? (
          <div className="text-center py-10 text-slate-500">
            Ninguém postou nada ainda. Seja o primeiro a dar o hype!
          </div>
        ) : (
          posts.map(post => {
            const isHyped = userHypes.includes(post.id);
            return (
              <div key={post.id} className="bg-white/5 border border-white/10 rounded-2xl p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-fuchsia-500/20 border border-fuchsia-500/30 flex items-center justify-center overflow-hidden">
                    {post.userPhotoUrl ? (
                      <img src={post.userPhotoUrl} alt={post.userName} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-fuchsia-400 font-bold text-sm">{post.userName.charAt(0).toUpperCase()}</span>
                    )}
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm">{post.userName}</h4>
                    <span className="text-slate-500 text-xs">Agora mesmo</span>
                  </div>
                </div>
                
                <p className="text-slate-300 text-sm mb-4 leading-relaxed">{post.content}</p>
                
                <div className="flex items-center gap-6 pt-3 border-t border-white/10">
                  <button 
                    onClick={() => handleHype(post.id)}
                    className={`flex items-center gap-2 text-sm font-medium transition-colors ${isHyped ? 'text-fuchsia-400' : 'text-slate-400 hover:text-fuchsia-300'}`}
                  >
                    <Zap size={18} fill={isHyped ? 'currentColor' : 'none'} />
                    <span>Hype</span>
                  </button>
                  <button className="flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white transition-colors">
                    <MessageCircle size={18} />
                    <span>Comentar</span>
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
