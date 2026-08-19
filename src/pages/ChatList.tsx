import { useNavigate } from 'react-router-dom';
import { useAppData } from '../context/AppDataContext';
import { BottomNav } from '../components/BottomNav';

export default function ChatList() {
  const navigate = useNavigate();
  const { chats, users } = useAppData();

  return (
    <div className="min-h-screen bg-background text-on-surface pb-24 md:max-w-[1200px] md:mx-auto relative">
      <header className="px-container-margin py-4 flex items-center justify-between sticky top-0 z-50 bg-background/80 backdrop-blur-md">
        <h1 className="font-display-sm text-[28px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Mensagens</h1>
        <button onClick={() => alert('Nova conversa')} className="w-10 h-10 bg-surface-container rounded-full flex items-center justify-center border border-white/10 hover:bg-surface-container-high transition-colors">
          <span className="material-symbols-outlined text-on-surface">add</span>
        </button>
      </header>

      <main className="px-container-margin mt-4">
        {chats.length === 0 ? (
          <div className="text-center text-on-surface-variant mt-20">Nenhuma conversa ainda.</div>
        ) : (
          <div className="flex flex-col gap-4">
            {chats.map(chat => {
              const otherUser = users.find(u => u.id === chat.participantId);
              if (!otherUser) return null;
              
              const lastMessage = chat.messages[chat.messages.length - 1];

              return (
                <div 
                  key={chat.id} 
                  onClick={() => navigate(`/chat/${otherUser.id}`)}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-surface-container/50 border border-white/5 hover:bg-surface-container cursor-pointer transition-colors"
                >
                  <img src={otherUser.avatarUrl} alt={otherUser.name} className="w-14 h-14 rounded-full object-cover border-2 border-primary/30" />
                  <div className="flex-1 overflow-hidden">
                    <div className="flex justify-between items-center mb-1">
                      <h3 className="font-bold text-on-surface text-lg">{otherUser.name}</h3>
                      <span className="text-xs text-on-surface-variant">{lastMessage?.time || ''}</span>
                    </div>
                    <p className="text-sm text-on-surface-variant truncate">
                      {lastMessage ? lastMessage.text : 'Comece a conversar!'}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
}
