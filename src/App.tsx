import { useState, useEffect } from 'react';
import { Home, Search, Map as MapIcon, User, Compass, MapPin, Activity, ChevronLeft, Heart, Share2, Ticket, X, Calendar, LogOut } from 'lucide-react';
import { MOCK_EVENTS, Event } from './data/events';
import { EventCard } from './components/EventCard';
import { NeonLogo } from './components/NeonLogo';
import { useAuth } from './contexts/AuthContext';
import { Auth } from './components/Auth';
import { VerifyEmail } from './components/VerifyEmail';
import { db, handleFirestoreError, OperationType } from './lib/firebase';
import { collection, query, where, getDocs, setDoc, deleteDoc, doc, serverTimestamp, onSnapshot } from 'firebase/firestore';

const CATEGORIES = ['Todos', 'Eletrônica', 'Rock', 'Jazz', 'Lounge', 'Festival'];

export default function App() {
  const { user, profile, loading, logout } = useAuth();
  
  const [activeTab, setActiveTab] = useState('home');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  // Firestore state
  const [userLikes, setUserLikes] = useState<string[]>([]);
  const [userTickets, setUserTickets] = useState<string[]>([]);

  useEffect(() => {
    if (!user || !user.emailVerified) return;

    const likesRef = collection(db, 'likes');
    const qLikes = query(likesRef, where('userId', '==', user.uid));
    const unsubLikes = onSnapshot(qLikes, (snap) => {
      setUserLikes(snap.docs.map(d => d.data().eventId));
    }, (err) => handleFirestoreError(err, OperationType.LIST, 'likes'));

    const ticketsRef = collection(db, 'tickets');
    const qTickets = query(ticketsRef, where('userId', '==', user.uid));
    const unsubTickets = onSnapshot(qTickets, (snap) => {
      setUserTickets(snap.docs.map(d => d.data().eventId));
    }, (err) => handleFirestoreError(err, OperationType.LIST, 'tickets'));

    return () => {
      unsubLikes();
      unsubTickets();
    };
  }, [user]);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const toggleLike = async (eventId: string) => {
    if (!user) return;
    const isLiked = userLikes.includes(eventId);
    const likeId = `${user.uid}_${eventId}`;
    try {
      if (isLiked) {
        await deleteDoc(doc(db, 'likes', likeId));
        showToast('Removido dos favoritos');
      } else {
        await setDoc(doc(db, 'likes', likeId), {
          eventId,
          userId: user.uid,
          likedAt: serverTimestamp()
        });
        showToast('Adicionado aos favoritos!');
      }
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, `likes/${likeId}`);
    }
  };

  const buyTicket = async (eventId: string) => {
    if (!user) return;
    if (userTickets.includes(eventId)) {
      showToast('Você já possui ingresso para este evento!');
      return;
    }
    const ticketId = `${user.uid}_${eventId}`;
    try {
      showToast('Processando pagamento...');
      // Simulando tempo de pagamento
      setTimeout(async () => {
        await setDoc(doc(db, 'tickets', ticketId), {
          eventId,
          userId: user.uid,
          purchasedAt: serverTimestamp()
        });
        showToast('Ingresso comprado com sucesso!');
      }, 1500);
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, `tickets/${ticketId}`);
    }
  };

  if (loading) {
    return <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
    </div>;
  }

  if (!user) return <Auth />;

  const filteredSearchEvents = MOCK_EVENTS.filter(e => 
    e.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    e.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const exploreEvents = selectedCategory === 'Todos' 
    ? MOCK_EVENTS 
    : MOCK_EVENTS.filter(e => e.tags.includes(selectedCategory));

  const ticketedEvents = MOCK_EVENTS.filter(e => userTickets.includes(e.id));
  const likedEvents = MOCK_EVENTS.filter(e => userLikes.includes(e.id));

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-slate-200 font-sans pb-24 selection:bg-cyan-500/30 overflow-x-hidden">
      
      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[100] bg-cyan-900/90 border border-cyan-500 text-white px-4 py-2 rounded-full backdrop-blur-md animate-in slide-in-from-top-4 text-sm font-medium whitespace-nowrap shadow-[0_0_15px_rgba(34,211,238,0.3)]">
          {toastMessage}
        </div>
      )}

      {!selectedEvent && !isSearchOpen && (
        <>
          <header className="sticky top-0 z-40 bg-[#0a0a0f]/80 backdrop-blur-md border-b border-white/5 px-4 py-4 flex items-center justify-between">
            <NeonLogo />
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 text-cyan-400 hover:bg-white/10 transition-colors"
            >
              <Search size={20} />
            </button>
          </header>

          <main className="p-4 space-y-8 animate-in fade-in duration-500">
            {activeTab === 'home' && (
              <>
                <section>
                  <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Activity className="text-fuchsia-400" size={20} />
                    Alta Frequência
                  </h2>
                  <div className="flex gap-4 overflow-x-auto pb-4 snap-x hide-scrollbar">
                    {MOCK_EVENTS.map(event => (
                      <div key={event.id} className="min-w-[280px] max-w-[300px] snap-center">
                        <EventCard event={event} onClick={() => setSelectedEvent(event)} />
                      </div>
                    ))}
                  </div>
                </section>

                <section>
                  <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <MapPin className="text-cyan-400" size={20} />
                    Perto de Você
                  </h2>
                  <div className="space-y-4">
                    {MOCK_EVENTS.map(event => (
                      <EventCard key={`near-${event.id}`} event={event} layout="horizontal" onClick={() => setSelectedEvent(event)} />
                    ))}
                  </div>
                </section>
              </>
            )}

            {activeTab === 'explore' && (
              <div className="animate-in slide-in-from-right-4 duration-300">
                <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-cyan-400">
                  Descubra Novas Vibes
                </h2>
                
                <div className="flex gap-2 overflow-x-auto pb-4 hide-scrollbar">
                  {CATEGORIES.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                        selectedCategory === cat 
                          ? 'bg-gradient-to-r from-fuchsia-600 to-cyan-600 text-white shadow-[0_0_10px_rgba(232,121,249,0.3)]' 
                          : 'bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-1 gap-4 mt-4">
                  {exploreEvents.map(event => (
                    <EventCard key={`explore-${event.id}`} event={event} onClick={() => setSelectedEvent(event)} />
                  ))}
                  {exploreEvents.length === 0 && (
                    <p className="text-slate-500 text-center py-10">Nenhum evento encontrado nesta categoria.</p>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'map' && (
              <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-4 animate-in zoom-in-95 duration-300">
                <div className="w-24 h-24 rounded-full border-2 border-cyan-500/30 flex items-center justify-center bg-cyan-500/10 shadow-[0_0_30px_rgba(34,211,238,0.2)]">
                  <MapIcon size={40} className="text-cyan-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">Mapa de Vibes</h2>
                  <p className="text-slate-400 max-w-xs mx-auto">Encontre os melhores eventos rolando agora ao seu redor.</p>
                </div>
                <button 
                  onClick={() => showToast('Buscando eventos próximos...')}
                  className="mt-4 px-8 py-3 rounded-full bg-gradient-to-r from-fuchsia-600 to-cyan-600 text-white font-medium hover:opacity-90 transition-opacity shadow-[0_0_20px_rgba(181,52,255,0.3)]"
                >
                  Explorar Mapa
                </button>
              </div>
            )}

            {activeTab === 'activity' && (
              <div className="animate-in slide-in-from-left-4 duration-300 space-y-6">
                 <h2 className="text-2xl font-bold text-white mb-6">Meus Ingressos</h2>
                 <div className="space-y-4">
                   {ticketedEvents.length === 0 ? (
                     <div className="text-center py-10 text-slate-500">
                       <Ticket size={48} className="mx-auto mb-3 opacity-20" />
                       <p>Você ainda não tem ingressos.</p>
                     </div>
                   ) : (
                     ticketedEvents.map(event => (
                       <EventCard key={`ticket-${event.id}`} event={event} layout="horizontal" onClick={() => setSelectedEvent(event)} />
                     ))
                   )}
                 </div>
              </div>
            )}
            
            {activeTab === 'profile' && (
              <div className="flex flex-col items-center justify-center py-10 space-y-6 animate-in slide-in-from-bottom-4 duration-500">
                <div className="w-32 h-32 rounded-full border-4 border-fuchsia-500/30 flex items-center justify-center bg-black/40 overflow-hidden shadow-[0_0_30px_rgba(232,121,249,0.2)] relative">
                  <User size={48} className="text-fuchsia-400" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-white flex items-center justify-center gap-2">
                    {profile?.displayName || 'Usuário'}
                  </h2>
                  <p className="text-cyan-400 font-medium text-sm">{user.email}</p>
                </div>
                
                <div className="w-full grid grid-cols-2 gap-4 border-y border-white/10 py-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">{userTickets.length}</div>
                    <div className="text-xs text-slate-400 uppercase tracking-wider mt-1">Ingressos</div>
                  </div>
                  <div className="text-center border-l border-white/10">
                    <div className="text-2xl font-bold text-white">{userLikes.length}</div>
                    <div className="text-xs text-slate-400 uppercase tracking-wider mt-1">Favoritos</div>
                  </div>
                </div>

                <div className="w-full space-y-3">
                  <button onClick={() => setActiveTab('activity')} className="w-full py-4 bg-white/5 border border-white/10 rounded-2xl text-left px-6 text-sm font-medium hover:bg-white/10 transition-colors flex items-center justify-between">
                    <span>Meus Ingressos</span>
                    <Ticket size={18} className="text-slate-400" />
                  </button>
                  <button onClick={logout} className="w-full py-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-2xl text-left px-6 text-sm font-medium hover:bg-red-500/20 transition-colors flex items-center justify-between">
                    <span>Sair da Conta</span>
                    <LogOut size={18} />
                  </button>
                </div>
              </div>
            )}
          </main>

          <nav className="fixed bottom-0 w-full bg-[#0a0a0f]/90 backdrop-blur-lg border-t border-white/5 pb-safe pt-2 px-4 z-40">
            <div className="flex justify-between items-center max-w-md mx-auto">
              <NavItem icon={<Home size={24} />} label="Início" isActive={activeTab === 'home'} onClick={() => setActiveTab('home')} />
              <NavItem icon={<Compass size={24} />} label="Explorar" isActive={activeTab === 'explore'} onClick={() => setActiveTab('explore')} />
              <div className="relative -top-6">
                <button 
                  onClick={() => setActiveTab('map')}
                  className={`w-14 h-14 rounded-full flex items-center justify-center text-white shadow-[0_0_20px_rgba(34,211,238,0.4)] hover:scale-105 transition-transform ${activeTab === 'map' ? 'bg-gradient-to-tr from-cyan-400 to-fuchsia-500' : 'bg-gradient-to-tr from-fuchsia-600 to-cyan-500'}`}
                >
                  <MapPin size={28} />
                </button>
              </div>
              <NavItem icon={<Ticket size={24} />} label="Ingressos" isActive={activeTab === 'activity'} onClick={() => setActiveTab('activity')} />
              <NavItem icon={<User size={24} />} label="Perfil" isActive={activeTab === 'profile'} onClick={() => setActiveTab('profile')} />
            </div>
          </nav>
        </>
      )}

      {isSearchOpen && (
        <div className="fixed inset-0 bg-[#0a0a0f] z-50 animate-in fade-in duration-200 flex flex-col">
          <div className="flex items-center gap-3 p-4 border-b border-white/10 bg-[#0a0a0f]/80 backdrop-blur-md">
            <button onClick={() => setIsSearchOpen(false)} className="p-2 text-slate-400 hover:text-white">
              <ChevronLeft size={24} />
            </button>
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input 
                autoFocus
                type="text" 
                placeholder="Buscar eventos, locais..." 
                className="w-full bg-white/5 border border-white/10 rounded-full py-2.5 pl-10 pr-4 text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500/50"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {searchQuery && filteredSearchEvents.length === 0 ? (
              <p className="text-center text-slate-500 mt-10">Nenhum resultado encontrado.</p>
            ) : (
              filteredSearchEvents.map(event => (
                <EventCard 
                  key={`search-${event.id}`} 
                  event={event} 
                  layout="horizontal" 
                  onClick={() => {
                    setSelectedEvent(event);
                    setIsSearchOpen(false);
                    setSearchQuery('');
                  }} 
                />
              ))
            )}
          </div>
        </div>
      )}

      {selectedEvent && (
        <div className="fixed inset-0 bg-[#0a0a0f] z-[60] overflow-y-auto animate-in slide-in-from-bottom-full duration-300">
          <div className="relative h-[45vh] w-full">
            <img src={selectedEvent.imageUrl} alt={selectedEvent.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/40 to-black/30" />
            
            <button 
              onClick={() => setSelectedEvent(null)} 
              className="absolute top-6 left-4 w-10 h-10 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20"
            >
              <ChevronLeft size={24} />
            </button>
            
            <button 
              onClick={() => toggleLike(selectedEvent.id)} 
              className={`absolute top-6 right-4 w-10 h-10 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 transition-colors ${userLikes.includes(selectedEvent.id) ? 'text-fuchsia-500' : 'text-white'}`}
            >
              <Heart size={20} fill={userLikes.includes(selectedEvent.id) ? 'currentColor' : 'none'} />
            </button>
          </div>
          
          <div className="px-5 pb-24 -mt-10 relative z-10">
            <div className="flex flex-wrap gap-2 mb-4">
              {selectedEvent.tags.map(tag => (
                <span key={tag} className="bg-fuchsia-500/20 border border-fuchsia-500/30 text-fuchsia-300 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  {tag}
                </span>
              ))}
            </div>
            
            <h1 className="text-3xl font-bold text-white leading-tight mb-2">{selectedEvent.title}</h1>
            
            <div className="flex items-center gap-4 text-slate-300 mb-6 border-b border-white/10 pb-6">
               <div className="flex items-center gap-2">
                 <Calendar className="text-cyan-400" size={18} />
                 <span className="text-sm font-medium">{selectedEvent.date}</span>
               </div>
               <div className="w-1 h-1 rounded-full bg-white/20" />
               <div className="flex items-center gap-2">
                 <MapPin className="text-fuchsia-400" size={18} />
                 <span className="text-sm font-medium">{selectedEvent.distance}</span>
               </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white">Local</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {selectedEvent.location}. Um dos melhores espaços da cidade, preparado para proporcionar uma experiência visual e sonora inesquecível.
              </p>
            </div>
            
            <div className="mt-8 space-y-4">
              <h3 className="text-lg font-bold text-white">Sobre</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Prepare-se para uma noite incrível com muita música boa, gente bonita e uma energia surreal. Garanta seu ingresso antecipado e evite filas na porta.
              </p>
            </div>
          </div>

          <div className="fixed bottom-0 w-full bg-[#0a0a0f]/90 backdrop-blur-xl border-t border-white/10 p-4 pb-safe z-20 flex gap-3">
            <button 
              onClick={() => showToast('Link copiado!')} 
              className="w-14 h-14 shrink-0 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
            >
              <Share2 size={24} />
            </button>
            <button 
              onClick={() => buyTicket(selectedEvent.id)} 
              disabled={userTickets.includes(selectedEvent.id)}
              className="flex-1 rounded-2xl bg-gradient-to-r from-fuchsia-600 to-cyan-600 text-white font-bold flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(232,121,249,0.3)] hover:opacity-90 transition-opacity disabled:opacity-50 disabled:shadow-none"
            >
              <Ticket size={20} />
              {userTickets.includes(selectedEvent.id) ? 'Ingresso Garantido' : `Comprar • ${selectedEvent.price}`}
            </button>
          </div>
        </div>
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
