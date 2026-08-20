import { useNavigate } from 'react-router-dom';
import { BottomNav } from '../components/BottomNav';
import { useAppData } from '../context/AppDataContext';
import { clsx } from 'clsx';

export default function Notifications() {
  const navigate = useNavigate();
  // Using some mock notifications for now. 
  // In a real app this would come from useAppData or Firebase
  const notifications = [
    {
      id: '1',
      type: 'like',
      userId: 'user-2',
      title: 'Marina silva hypou sua foto.',
      timeAgo: '2m',
      read: false,
    },
    {
      id: '2',
      type: 'event',
      userId: 'user-3',
      title: 'Pedro convidou você para "Festa de Verão".',
      timeAgo: '1h',
      read: false,
    },
    {
      id: '3',
      type: 'follow',
      userId: 'user-4',
      title: 'Ana interagiu com você.',
      timeAgo: '3h',
      read: true,
    }
  ];

  return (
    <div className="bg-background text-on-background min-h-[100dvh] pb-24 md:pb-32">
      <header className="bg-surface/60 backdrop-blur-xl sticky top-0 w-full z-50 border-b border-white/10 flex justify-between items-center px-container-margin py-stack-sm md:max-w-[1200px] md:mx-auto">
        <h1 className="font-headline-md text-on-surface">Notificações</h1>
        <button className="text-primary text-sm font-label-bold hover:opacity-80 active:scale-95 transition-all">
          Marcar como lidas
        </button>
      </header>

      <main className="px-container-margin py-stack-md md:max-w-[800px] md:mx-auto space-y-3">
        {notifications.map(notif => (
          <div 
            key={notif.id} 
            className={clsx(
              "flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all active:scale-95",
              notif.read ? "bg-surface-container-low opacity-80" : "bg-surface-container-high border border-primary/20 shadow-[0_0_15px_rgba(188,19,254,0.1)]"
            )}
            onClick={() => {
              if (notif.type === 'like' || notif.type === 'follow') navigate(`/profile/${notif.userId}`);
              else if (notif.type === 'event') navigate(`/home`);
            }}
          >
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-surface-container overflow-hidden">
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${notif.userId}`} alt="Avatar" className="w-full h-full object-cover" />
              </div>
              {!notif.read && (
                <div className="absolute top-0 right-0 w-3 h-3 bg-secondary rounded-full border-2 border-background"></div>
              )}
            </div>
            <div className="flex-1">
              <p className="text-on-surface text-sm">{notif.title}</p>
              <p className="text-on-surface-variant text-xs mt-1">{notif.timeAgo}</p>
            </div>
            <span className="material-symbols-outlined text-on-surface-variant">
              {notif.type === 'like' ? 'favorite' : notif.type === 'event' ? 'event' : 'person_add'}
            </span>
          </div>
        ))}
      </main>

      <BottomNav />
    </div>
  );
}
