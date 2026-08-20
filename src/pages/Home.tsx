import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppData } from '../context/AppDataContext';
import { BottomNav } from '../components/BottomNav';
import LiveMap from '../components/LiveMap';
import { clsx } from 'clsx';

export default function Home() {
  const navigate = useNavigate();
  const [isListPopupOpen, setIsListPopupOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [recenterSignal, setRecenterSignal] = useState(0);
  const { events, currentUser } = useAppData();

  // Sort events by proximity (parse distance string like '0.8 km' to 0.8)
  const sortedEvents = [...events].sort((a, b) => {
    const distA = parseFloat(a.distance);
    const distB = parseFloat(b.distance);
    return distA - distB;
  });

  const trendingEvents = sortedEvents.slice(0, 2);
  const nearbyEvents = sortedEvents.slice(2);

  return (
    <div className="h-[100dvh] w-full overflow-hidden relative md:max-w-[1200px] md:mx-auto">
      {/* Drawer Overlay */}
      {isDrawerOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-[60] backdrop-blur-sm transition-opacity" 
          onClick={() => setIsDrawerOpen(false)}
        />
      )}
      
      {/* Drawer Menu */}
      <div className={clsx(
        "fixed inset-y-0 left-0 w-[280px] bg-surface z-[70] transform transition-transform duration-300 ease-in-out border-r border-white/10 flex flex-col shadow-2xl",
        isDrawerOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="p-6 border-b border-white/10 mt-[env(safe-area-inset-top)]">
          <div className="flex items-center gap-4 mb-6 cursor-pointer" onClick={() => { setIsDrawerOpen(false); navigate('/profile'); }}>
            <img src={currentUser.avatarUrl} alt="User Profile" className="w-14 h-14 rounded-full border-2 border-primary/50 object-cover" />
            <div>
              <h2 className="font-headline-md text-on-surface">{currentUser.name}</h2>
              <p className="text-sm text-primary">@{currentUser.username}</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="text-center">
              <p className="font-label-bold text-on-surface text-lg">1.2k</p>
              <p className="text-xs text-on-surface-variant">Seguidores</p>
            </div>
            <div className="text-center">
              <p className="font-label-bold text-on-surface text-lg">840</p>
              <p className="text-xs text-on-surface-variant">Seguindo</p>
            </div>
          </div>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-2 px-4">
            <li>
              <button onClick={() => { setIsDrawerOpen(false); navigate('/profile'); }} className="w-full flex items-center gap-4 p-3 rounded-xl hover:bg-surface-container-high transition-colors text-on-surface active:scale-95">
                <span className="material-symbols-outlined text-on-surface-variant">person</span>
                <span className="font-label-bold text-base">Meu Perfil</span>
              </button>
            </li>
            <li>
              <button onClick={() => { setIsDrawerOpen(false); navigate('/create'); }} className="w-full flex items-center gap-4 p-3 rounded-xl hover:bg-surface-container-high transition-colors text-on-surface active:scale-95">
                <span className="material-symbols-outlined text-primary">add_circle</span>
                <span className="font-label-bold text-base">Criar Evento</span>
              </button>
            </li>
            <li>
              <button onClick={() => { setIsDrawerOpen(false); navigate('/notifications'); }} className="w-full flex items-center gap-4 p-3 rounded-xl hover:bg-surface-container-high transition-colors text-on-surface active:scale-95">
                <span className="material-symbols-outlined text-on-surface-variant">notifications</span>
                <span className="font-label-bold text-base">Notificações</span>
                <span className="ml-auto bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-full">3</span>
              </button>
            </li>
            <li>
              <button onClick={() => { setIsDrawerOpen(false); alert('Configurações'); }} className="w-full flex items-center gap-4 p-3 rounded-xl hover:bg-surface-container-high transition-colors text-on-surface active:scale-95">
                <span className="material-symbols-outlined text-on-surface-variant">settings</span>
                <span className="font-label-bold text-base">Configurações</span>
              </button>
            </li>
          </ul>
        </nav>
        
        <div className="p-6 border-t border-white/10">
          <button onClick={() => { setIsDrawerOpen(false); alert('Sair'); }} className="w-full flex items-center gap-4 p-3 rounded-xl hover:bg-error/20 transition-colors text-error active:scale-95">
            <span className="material-symbols-outlined">logout</span>
            <span className="font-label-bold text-base">Sair</span>
          </button>
        </div>
      </div>

      {/* TopAppBar */}
      <header className="fixed top-0 w-full z-50 bg-surface/60 backdrop-blur-xl border-b border-white/10 md:max-w-[1200px]">
        <div className="flex justify-between items-center px-container-margin py-stack-sm w-full">
          <button onClick={() => setIsDrawerOpen(true)} aria-label="Menu" className="text-primary hover:opacity-80 transition-opacity active:scale-95 flex items-center justify-center w-10 h-10 rounded-full">
            <span className="material-symbols-outlined">menu</span>
          </button>
          <h1 className="font-display-lg-mobile font-extrabold tracking-tighter text-primary drop-shadow-[0_0_15px_rgba(235,178,255,0.8)]">INVIBE</h1>
          <div className="flex items-center">
            <button onClick={() => alert('Busca aberta')} aria-label="Search" className="text-primary hover:opacity-80 transition-opacity active:scale-95 flex items-center justify-center w-10 h-10 rounded-full">
              <span className="material-symbols-outlined">search</span>
            </button>
            <button onClick={() => navigate('/profile')} aria-label="Profile" className="w-8 h-8 rounded-full border border-primary/30 overflow-hidden active:scale-95 transition-transform ml-2">
              <img src={currentUser.avatarUrl} alt="User Profile" className="w-full h-full object-cover" />
            </button>
          </div>
        </div>
        
        {/* Search Bar */}
        <div className="px-container-margin pb-stack-sm">
          <div className="relative w-full">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none text-[20px]">search</span>
            <input 
              className="w-full bg-[#1A1A1A] border-none rounded-full py-2.5 pl-10 pr-4 text-on-surface focus:ring-1 focus:ring-secondary-container focus:outline-none placeholder:text-on-surface-variant" 
              placeholder="Buscar locais, eventos, pessoas..." 
              type="text" 
            />
          </div>
        </div>
      </header>

      {/* Map Canvas Area */}
      <main className="absolute inset-0 w-full h-full z-0">
        <LiveMap 
          events={events} 
          onEventClick={(id) => navigate(`/events/${id}`)} 
          recenterSignal={recenterSignal} 
        />

        {/* Center Location Button */}
        <button 
          aria-label="Centralizar no meu local"
          onClick={() => setRecenterSignal(s => s + 1)} 
          className="absolute bottom-60 md:bottom-44 right-container-margin w-12 h-12 bg-surface-container-high rounded-full flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all z-40 border border-white/10"
        >
          <span className="material-symbols-outlined text-secondary-container">my_location</span>
        </button>

        {/* Floating Action Button (FAB) */}
        <button 
          onClick={() => navigate('/create-event')}
          aria-label="Criar Evento" 
          className="absolute bottom-40 md:bottom-24 right-container-margin w-14 h-14 bg-primary-container rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(188,19,254,0.8)] hover:scale-105 active:scale-95 transition-all z-40"
        >
          <span className="material-symbols-outlined text-on-primary-container text-[28px]">add</span>
        </button>

        {/* Horizontal Scrollable Lists */}
        <div className="absolute bottom-20 md:bottom-4 w-full z-30 pb-4">
          <div className="flex items-center justify-between px-container-margin mb-unit">
            <h2 className="font-label-bold text-label-bold text-primary uppercase tracking-widest opacity-90 flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>local_fire_department</span>
              Trending / Hype
            </h2>
            <span className="text-[12px] text-on-surface-variant uppercase tracking-tighter cursor-pointer hover:text-white" onClick={() => setIsListPopupOpen(true)}>Ver todos</span>
          </div>
          
          <div className="flex overflow-x-auto gap-stack-md px-container-margin pb-stack-sm pt-unit hide-scrollbar snap-x">
            {trendingEvents.map((event) => (
              <div key={event.id} onClick={() => navigate(`/events/${event.id}`)} className="min-w-[260px] bg-surface-container/80 backdrop-blur-md border border-primary/30 rounded-[1.5rem] p-4 flex flex-col gap-unit snap-center shadow-[0_0_10px_rgba(235,178,255,0.2)] relative overflow-hidden group hover:bg-surface-bright/80 transition-colors cursor-pointer">
                <div className={clsx("absolute -top-10 -right-10 w-24 h-24 blur-xl rounded-full group-hover:opacity-80 transition-opacity", 
                  event.themeColor === 'primary' && "bg-primary/20",
                  event.themeColor === 'secondary' && "bg-secondary/20",
                  event.themeColor === 'tertiary' && "bg-tertiary-container/20"
                )}></div>
                <div className="flex justify-between items-start relative z-10">
                  <h3 className="font-headline-md text-[18px] leading-tight text-on-surface font-bold">{event.title}</h3>
                  <div className="flex flex-col items-end">
                    <span className={clsx("material-symbols-outlined text-[20px]", 
                      event.themeColor === 'primary' && "text-primary",
                      event.themeColor === 'secondary' && "text-secondary-container",
                      event.themeColor === 'tertiary' && "text-tertiary-container"
                    )} style={{ fontVariationSettings: "'FILL' 1" }}>{event.type}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-auto pt-2 relative z-10">
                  <span className="material-symbols-outlined text-secondary-container text-[16px]">location_on</span>
                  <span className="font-body-md text-[14px] text-on-surface-variant">{event.distance}</span>
                  <span className="w-1 h-1 bg-on-surface-variant rounded-full mx-1"></span>
                  <span className="material-symbols-outlined text-secondary-container text-[16px]">schedule</span>
                  <span className="font-body-md text-[14px] text-on-surface-variant">{event.time}</span>
                </div>
              </div>
            ))}
          </div>

          {nearbyEvents.length > 0 && (
            <>
              <h2 className="px-container-margin font-label-bold text-label-bold text-on-surface mt-4 mb-unit uppercase tracking-widest opacity-80">Próximos de Você</h2>
              <div className="flex overflow-x-auto gap-stack-md px-container-margin pb-stack-sm pt-unit hide-scrollbar snap-x">
                {nearbyEvents.map((event) => (
                  <div key={event.id} onClick={() => navigate(`/events/${event.id}`)} className="min-w-[240px] bg-surface-container/80 backdrop-blur-md border border-white/10 rounded-[1.5rem] p-4 flex flex-col gap-unit snap-center shadow-lg relative overflow-hidden group hover:bg-surface-bright/80 transition-colors cursor-pointer">
                    <div className={clsx("absolute -top-10 -right-10 w-24 h-24 blur-xl rounded-full group-hover:opacity-80 transition-opacity", 
                      event.themeColor === 'primary' && "bg-primary/20",
                      event.themeColor === 'secondary' && "bg-secondary/20",
                      event.themeColor === 'tertiary' && "bg-tertiary-container/20"
                    )}></div>
                    <div className="flex justify-between items-start relative z-10">
                      <h3 className="font-headline-md text-[18px] leading-tight text-on-surface font-bold">{event.title}</h3>
                      <span className={clsx("material-symbols-outlined text-[20px]", 
                        event.themeColor === 'primary' && "text-primary",
                        event.themeColor === 'secondary' && "text-secondary-container",
                        event.themeColor === 'tertiary' && "text-tertiary-container"
                      )}>{event.type}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-auto pt-2 relative z-10">
                      <span className="material-symbols-outlined text-secondary-container text-[16px]">location_on</span>
                      <span className="font-body-md text-[14px] text-on-surface-variant font-bold text-secondary-container">{event.distance}</span>
                      <span className="w-1 h-1 bg-on-surface-variant rounded-full mx-1"></span>
                      <span className="material-symbols-outlined text-secondary-container text-[16px]">schedule</span>
                      <span className="font-body-md text-[14px] text-on-surface-variant">{event.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </main>

      {/* Nearby Events List Popup */}
      {isListPopupOpen && (
        <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-surface-container w-full md:max-w-md h-[75vh] md:h-[60vh] rounded-t-3xl md:rounded-3xl border border-white/10 shadow-2xl flex flex-col animate-in slide-in-from-bottom-full md:slide-in-from-bottom-8">
            <div className="p-4 border-b border-white/10 flex justify-between items-center">
              <h2 className="font-headline-md text-[20px] text-on-surface">Mais Próximos</h2>
              <button onClick={() => setIsListPopupOpen(false)} className="text-on-surface-variant hover:text-white transition-colors">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {sortedEvents.map(event => (
                <div 
                  key={event.id}
                  onClick={() => navigate(`/events/${event.id}`)}
                  className="bg-surface-container-high border border-white/5 rounded-2xl p-4 flex gap-4 shadow-lg relative overflow-hidden group hover:bg-surface-bright/80 transition-colors cursor-pointer"
                >
                  <div className={clsx("w-16 h-16 rounded-xl flex items-center justify-center border",
                    event.themeColor === 'primary' && "bg-primary/10 border-primary/30 text-primary",
                    event.themeColor === 'secondary' && "bg-secondary/10 border-secondary-container/30 text-secondary-container",
                    event.themeColor === 'tertiary' && "bg-tertiary/10 border-tertiary-container/30 text-tertiary-container",
                  )}>
                    <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                      {event.type}
                    </span>
                  </div>
                  
                  <div className="flex-1 flex flex-col justify-center">
                    <h3 className="font-headline-md text-[18px] text-on-surface font-bold mb-1">{event.title}</h3>
                    <div className="flex items-center gap-2 text-on-surface-variant text-[14px]">
                      <span className="material-symbols-outlined text-secondary-container text-[16px]">location_on</span>
                      <span>{event.distance}</span>
                      <span className="w-1 h-1 bg-on-surface-variant rounded-full mx-1"></span>
                      <span className="material-symbols-outlined text-secondary-container text-[16px]">schedule</span>
                      <span>{event.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
}
