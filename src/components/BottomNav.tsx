import { Link, useLocation } from 'react-router-dom';
import { clsx } from 'clsx';

export function BottomNav() {
  const location = useLocation();
  const path = location.pathname;

  return (
    <nav className="fixed bottom-0 md:bottom-4 left-0 md:left-1/2 md:-translate-x-1/2 w-full md:w-[calc(100%-2rem)] md:max-w-[1200px] z-50 rounded-t-xl md:rounded-xl bg-surface-container/80 backdrop-blur-md border-t md:border border-white/10 shadow-[0_-5px_20px_rgba(0,0,0,0.5)] pb-safe md:pb-0">
      <div className="flex justify-around items-center h-16 px-container-margin w-full max-w-[1200px] mx-auto">
        
        <Link to="/home" className={clsx(
          "flex flex-col items-center justify-center active:scale-90 transition-all duration-200",
          path === '/home' ? 'text-secondary-container drop-shadow-[0_0_8px_rgba(0,241,253,0.9)] scale-110' : 'text-on-surface-variant hover:text-secondary'
        )}>
          <span className="material-symbols-outlined text-[28px]" style={path === '/home' ? { fontVariationSettings: "'FILL' 1" } : {}}>map</span>
        </Link>
        
        <button aria-label="nearby" className="flex flex-col items-center justify-center text-on-surface-variant hover:text-secondary transition-colors active:scale-90 duration-200">
          <span className="material-symbols-outlined text-[24px]">explore</span>
        </button>

        <button aria-label="hypes" className="flex flex-col items-center justify-center text-on-surface-variant hover:text-secondary transition-colors active:scale-90 duration-200">
          <span className="material-symbols-outlined text-[24px] text-tertiary-container">local_fire_department</span>
        </button>
        
        <Link to="/events" className={clsx(
          "flex flex-col items-center justify-center active:scale-90 transition-all duration-200",
          path.startsWith('/events') || path.startsWith('/event') ? 'text-secondary-container drop-shadow-[0_0_8px_rgba(0,241,253,0.9)] scale-110' : 'text-on-surface-variant hover:text-secondary'
        )}>
          <span className="material-symbols-outlined text-[24px]" style={path.startsWith('/events') || path.startsWith('/event') ? { fontVariationSettings: "'FILL' 1" } : {}}>notifications</span>
        </Link>

        <Link to="/chat" className={clsx(
          "flex flex-col items-center justify-center active:scale-90 transition-all duration-200",
          path === '/chat' ? 'text-secondary-container drop-shadow-[0_0_8px_rgba(0,241,253,0.9)] scale-110' : 'text-on-surface-variant hover:text-secondary'
        )}>
          <span className="material-symbols-outlined text-[24px]" style={path === '/chat' ? { fontVariationSettings: "'FILL' 1" } : {}}>chat</span>
        </Link>

      </div>
    </nav>
  );
}
