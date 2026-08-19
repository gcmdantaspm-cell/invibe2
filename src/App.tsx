import { useState, useEffect } from 'react';
import { MapPin, MessageCircle, User, Plus, Compass } from 'lucide-react';
import { NeonLogo } from './components/NeonLogo';
import { useAuth } from './contexts/AuthContext';
import { Auth } from './components/Auth';
import { db, handleFirestoreError, OperationType } from './lib/firebase';
import { collection, query, onSnapshot, getDocs } from 'firebase/firestore';
import { EventModel, InteractionRequest } from './types';
import { CreateEvent } from './components/CreateEvent';
import { EventLobby } from './components/EventLobby';

export default function App() {
  const { user, profile, loading, logout } = useAuth();
  
  const [activeTab, setActiveTab] = useState('home');
  const [events, setEvents] = useState<EventModel[]>([]);
  const [isCreatingEvent, setIsCreatingEvent] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventModel | null>(null);
  const [interactions, setInteractions] = useState<InteractionRequest[]>([]);

  useEffect(() => {
    if (!user) return;

    // Fetch Events (In a real app, query by geolocation radius)
    const qEvents = query(collection(db, 'events'));
    const unsubEvents = onSnapshot(qEvents, (snap) => {
      setEvents(snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as EventModel)));
    }, err => handleFirestoreError(err, OperationType.LIST, 'events'));

    return () => unsubEvents();
  }, [user]);

  if (loading) {
    return <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
    </div>;
  }

  if (!user) return <Auth />;

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-slate-200 font-sans pb-24 selection:bg-cyan-500/30 overflow-x-hidden">
      {!selectedEvent && (
        <>
          <header className="sticky top-0 z-40 bg-[#0a0a0f]/80 backdrop-blur-md border-b border-white/5 px-4 py-4 flex items-center justify-between">
            <NeonLogo />
            <div className="w-10 h-10 rounded-full bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center overflow-hidden">
              {profile?.photoUrl ? (
                <img src={profile.photoUrl} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <span className="text-cyan-400 font-bold text-sm">{profile?.displayName?.charAt(0).toUpperCase()}</span>
              )}
            </div>
          </header>

          <main className="p-4 space-y-8 animate-in fade-in duration-500">
            {activeTab === 'home' && (
              <>
                <div className="flex justify-between items-end mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-white">Vibes Próximas</h2>
                    <p className="text-slate-400 text-sm mt-1">Eventos acontecendo ao seu redor agora</p>
                  </div>
                  <button 
                    onClick={() => setIsCreatingEvent(true)}
                    className="w-12 h-12 rounded-full bg-gradient-to-r from-fuchsia-600 to-cyan-600 text-white flex items-center justify-center shadow-[0_0_20px_rgba(34,211,238,0.3)] shrink-0 hover:scale-105 transition-transform"
                  >
                    <Plus size={24} />
                  </button>
                </div>

                <div className="space-y-4">
                  {events.length === 0 ? (
                    <div className="text-center py-20 bg-white/5 border border-white/10 rounded-3xl">
                      <Compass size={48} className="mx-auto text-slate-500 mb-4" />
                      <p className="text-slate-400 font-medium">Nenhum evento próximo.</p>
                      <button onClick={() => setIsCreatingEvent(true)} className="text-cyan-400 mt-2 text-sm hover:underline">Seja o primeiro a criar um!</button>
                    </div>
                  ) : (
                    events.map(event => (
                      <div 
                        key={event.id}
                        onClick={() => setSelectedEvent(event)}
                        className="bg-white/5 border border-white/10 rounded-3xl p-5 hover:bg-white/10 transition-colors cursor-pointer relative overflow-hidden group"
                      >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-fuchsia-500/10 blur-3xl -mr-10 -mt-10 group-hover:bg-cyan-500/20 transition-colors"></div>
                        <div className="flex justify-between items-start mb-4 relative z-10">
                          <div>
                            <span className="inline-block px-3 py-1 bg-fuchsia-500/20 text-fuchsia-300 text-xs font-bold rounded-full uppercase tracking-wider mb-2">
                              {event.type}
                            </span>
                            <h3 className="text-xl font-bold text-white">{event.title}</h3>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-slate-400 text-sm relative z-10">
                          <MapPin size={16} className="text-cyan-400" />
                          <span>{event.locationName}</span>
                        </div>
                        <button className="w-full mt-5 py-3 rounded-xl bg-white/10 text-white font-bold group-hover:bg-gradient-to-r group-hover:from-fuchsia-600 group-hover:to-cyan-600 transition-all">
                          Fazer Check-in Virtual
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </>
            )}

            {activeTab === 'chats' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-6">Mensagens</h2>
                <div className="text-center py-20 bg-white/5 border border-white/10 rounded-3xl">
                  <MessageCircle size={48} className="mx-auto text-slate-500 mb-4" />
                  <p className="text-slate-400 font-medium">Nenhuma conversa ainda.</p>
                  <p className="text-slate-500 text-sm mt-2">Faça check-in em eventos e interaja com pessoas para iniciar chats.</p>
                </div>
              </div>
            )}
            
            {activeTab === 'profile' && (
              <div className="flex flex-col items-center justify-center py-10 space-y-6 animate-in slide-in-from-bottom-4 duration-500">
                <div className="w-32 h-32 rounded-full border-4 border-fuchsia-500/30 overflow-hidden shadow-[0_0_30px_rgba(232,121,249,0.2)] relative bg-black/40 flex items-center justify-center">
                  {profile?.photoUrl ? (
                    <img src={profile.photoUrl} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-fuchsia-400 text-5xl font-bold">{profile?.displayName?.charAt(0).toUpperCase()}</span>
                  )}
                </div>
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-white flex items-center justify-center gap-2">
                    {profile?.displayName}
                  </h2>
                  <p className="text-cyan-400 font-medium text-sm mt-1">{profile?.status || "Pronto para curtir"}</p>
                </div>
                
                <div className="w-full grid grid-cols-1 gap-4 border-y border-white/10 py-6">
                  <div className="text-center">
                    <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-cyan-400">
                      {profile?.interactionsCount || 0}
                    </div>
                    <div className="text-xs text-slate-400 uppercase tracking-wider mt-1 font-bold">Interações Recebidas</div>
                  </div>
                </div>

                <div className="w-full space-y-3">
                  <button className="w-full py-4 bg-white/5 border border-white/10 rounded-2xl text-left px-6 text-sm font-medium hover:bg-white/10 transition-colors">
                    Editar Fotos e Status
                  </button>
                  <button onClick={logout} className="w-full py-4 bg-fuchsia-500/10 border border-fuchsia-500/20 text-fuchsia-400 rounded-2xl text-left px-6 text-sm font-medium hover:bg-fuchsia-500/20 transition-colors">
                    Sair da Conta
                  </button>
                </div>
              </div>
            )}
          </main>

          <nav className="fixed bottom-0 w-full bg-[#0a0a0f]/90 backdrop-blur-lg border-t border-white/5 pb-safe pt-2 px-4 z-40">
            <div className="flex justify-between items-center max-w-sm mx-auto px-6">
              <NavItem icon={<Compass size={24} />} label="Mapa" isActive={activeTab === 'home'} onClick={() => setActiveTab('home')} />
              <NavItem icon={<MessageCircle size={24} />} label="Chats" isActive={activeTab === 'chats'} onClick={() => setActiveTab('chats')} />
              <NavItem icon={<User size={24} />} label="Perfil" isActive={activeTab === 'profile'} onClick={() => setActiveTab('profile')} />
            </div>
          </nav>
        </>
      )}

      {isCreatingEvent && (
        <CreateEvent onClose={() => setIsCreatingEvent(false)} onSuccess={() => setIsCreatingEvent(false)} />
      )}

      {selectedEvent && (
        <EventLobby event={selectedEvent} onClose={() => setSelectedEvent(null)} />
      )}
    </div>
  );
}

function NavItem({ icon, label, isActive, onClick }: { icon: React.ReactNode; label: string; isActive: boolean; onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center space-y-1 p-2 transition-colors ${isActive ? 'text-cyan-400' : 'text-slate-500 hover:text-slate-300'}`}
    >
      <div className={`${isActive ? 'scale-110 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]' : ''} transition-all`}>
        {icon}
      </div>
      <span className="text-[10px] font-medium">{label}</span>
    </button>
  );
}
