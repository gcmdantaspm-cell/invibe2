import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MOCK_EVENTS } from '../data';
import { BottomNav } from '../components/BottomNav';
import { clsx } from 'clsx';

export default function Home() {
  const navigate = useNavigate();
  const [isListPopupOpen, setIsListPopupOpen] = useState(false);

  // Sort events by proximity (parse distance string like '0.8 km' to 0.8)
  const sortedEvents = [...MOCK_EVENTS].sort((a, b) => {
    const distA = parseFloat(a.distance);
    const distB = parseFloat(b.distance);
    return distA - distB;
  });

  return (
    <div className="h-[100dvh] w-full overflow-hidden relative md:max-w-[1200px] md:mx-auto">
      {/* TopAppBar */}
      <header className="fixed top-0 w-full z-50 bg-surface/60 backdrop-blur-xl border-b border-white/10 md:max-w-[1200px]">
        <div className="flex justify-between items-center px-container-margin py-stack-sm w-full">
          <button aria-label="Menu" className="text-primary hover:opacity-80 transition-opacity active:scale-95 flex items-center justify-center w-10 h-10 rounded-full">
            <span className="material-symbols-outlined">menu</span>
          </button>
          <h1 className="font-display-lg-mobile font-extrabold tracking-tighter text-primary drop-shadow-[0_0_15px_rgba(235,178,255,0.8)]">INVIBE</h1>
          <button aria-label="Search" className="text-primary hover:opacity-80 transition-opacity active:scale-95 flex items-center justify-center w-10 h-10 rounded-full">
            <span className="material-symbols-outlined">search</span>
          </button>
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
      <main className="w-full h-full relative z-0 mt-32 pb-24">
        {/* Interactive Map Background */}
        <div 
          className="absolute inset-0 w-full h-full bg-surface-dim bg-cover bg-center" 
          style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBX6ynf2kqA1IS3S9OfNKZhEJS89eJPMuws6kNM64drbJ9Nta02EoBDsSobum4oCWtEJH9DvngHzn2d1_Nh4krvqd4Ag9LWKLNRNBANJET4eb_j3grxlTd69nb67T37E_x_hdd2azBoPQJkpvoRTjh2F7Is7rq8_JC2juy1NDzIRjxr2AiqEDliCfEF4s9kN_8psIHmcFbZGsFbcOLebHhKqjaxGfSI_1O5BKvdJUMbIOf0PhcX_S_2')" }}
        />

        {/* Map Pins */}
        <div onClick={() => navigate('/events/e1')} className="absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="bg-surface-container/80 backdrop-blur-md rounded-full w-10 h-10 flex items-center justify-center border border-primary/30 shadow-[0_0_10px_rgba(235,178,255,0.5)] cursor-pointer hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-primary text-[20px]">local_bar</span>
          </div>
        </div>
        
        <div onClick={() => navigate('/events/e2')} className="absolute top-1/3 right-1/4 transform -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="bg-surface-container/80 backdrop-blur-md rounded-full w-10 h-10 flex items-center justify-center border border-secondary/30 shadow-[0_0_10px_rgba(0,241,253,0.5)] cursor-pointer hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-secondary-container text-[20px]">shopping_cart</span>
          </div>
        </div>
        
        <div onClick={() => navigate('/events/e3')} className="absolute bottom-1/2 left-1/3 transform -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="bg-surface-container/80 backdrop-blur-md rounded-full w-10 h-10 flex items-center justify-center border border-tertiary-container/30 shadow-[0_0_10px_rgba(229,38,44,0.5)] cursor-pointer hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-tertiary-container text-[20px]">school</span>
          </div>
        </div>

        {/* User Location Indicator */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center z-10">
          <div className="w-4 h-4 bg-secondary-container rounded-full pulse-cyan shadow-[0_0_15px_rgba(0,241,253,0.8)] border-2 border-background"></div>
          <div className="absolute w-24 h-24 bg-secondary-container/10 rounded-full animate-ping pointer-events-none"></div>
        </div>

        {/* Floating Action Button (FAB) */}
        <button aria-label="Criar Evento" className="absolute bottom-48 md:bottom-40 right-container-margin w-14 h-14 bg-primary-container rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(188,19,254,0.8)] hover:scale-105 active:scale-95 transition-all z-40">
          <span className="material-symbols-outlined text-on-primary-container text-[28px]">add</span>
        </button>

        {/* Horizontal Scrollable List: Eventos Próximos */}
        <div className="absolute bottom-[5.5rem] md:bottom-28 w-full z-30 pb-4">
          <div className="flex justify-between items-center px-container-margin mb-unit">
            <h2 className="font-label-bold text-on-surface uppercase tracking-widest opacity-80">Eventos Próximos</h2>
            <button 
              onClick={() => setIsListPopupOpen(true)}
              className="font-label-bold text-secondary-container hover:underline text-sm"
            >
              Ver Lista
            </button>
          </div>
          <div className="flex overflow-x-auto gap-stack-md px-container-margin pb-stack-sm pt-unit hide-scrollbar snap-x">
            {MOCK_EVENTS.map((event) => (
              <div 
                key={event.id}
                onClick={() => navigate(`/events/${event.id}`)}
                className="min-w-[240px] bg-surface-container/80 backdrop-blur-md border border-white/10 rounded-[1.5rem] p-4 flex flex-col gap-unit snap-center shadow-lg relative overflow-hidden group hover:bg-surface-bright/80 transition-colors cursor-pointer"
              >
                <div className={clsx("absolute -top-10 -right-10 w-24 h-24 blur-xl rounded-full transition-colors", 
                  event.themeColor === 'primary' && "bg-primary/20 group-hover:bg-primary/30",
                  event.themeColor === 'secondary' && "bg-secondary/20 group-hover:bg-secondary/30",
                  event.themeColor === 'tertiary' && "bg-tertiary-container/20 group-hover:bg-tertiary-container/30",
                )}></div>
                <div className="flex justify-between items-start">
                  <h3 className="font-headline-md text-[18px] leading-tight text-on-surface font-bold">{event.title}</h3>
                  <span className={clsx("material-symbols-outlined text-[20px]", 
                    event.themeColor === 'primary' && "text-primary",
                    event.themeColor === 'secondary' && "text-secondary-container",
                    event.themeColor === 'tertiary' && "text-tertiary-container",
                  )} style={{ fontVariationSettings: "'FILL' 1" }}>
                    {event.type}
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-auto pt-2">
                  <span className="material-symbols-outlined text-secondary-container text-[16px]">location_on</span>
                  <span className="text-[14px] text-on-surface-variant">{event.distance}</span>
                  <span className="w-1 h-1 bg-on-surface-variant rounded-full mx-1"></span>
                  <span className="material-symbols-outlined text-secondary-container text-[16px]">schedule</span>
                  <span className="text-[14px] text-on-surface-variant">{event.time}</span>
                </div>
              </div>
            ))}
          </div>
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
