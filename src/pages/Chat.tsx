import { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppData } from '../context/AppDataContext';
import { BottomNav } from '../components/BottomNav';

export default function Chat() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { users, currentUser, getChatByUserId, createChat, sendMessage } = useAppData();
  
  const [message, setMessage] = useState('');
  const [showAttachMenu, setShowAttachMenu] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const otherUser = users.find(u => u.id === userId);

  useEffect(() => {
    if (!otherUser && userId !== currentUser.id) {
      navigate('/chat'); // go to list if not found
    }
  }, [otherUser, userId, currentUser, navigate]);

  if (!otherUser) return null;

  // Initialize or get existing chat
  const chat = getChatByUserId(otherUser.id) || createChat(otherUser.id);
  const messages = chat.messages;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (overrideText?: string) => {
    const textToSend = overrideText || message;
    if (!textToSend.trim()) return;
    sendMessage(chat.id, textToSend);
    setMessage('');
    setShowAttachMenu(false);
  };

  return (
    <div className="bg-background text-on-surface h-[100dvh] flex flex-col overflow-hidden bg-grid-pattern md:max-w-[1200px] md:mx-auto relative">
      {/* TopAppBar */}
      <header className="bg-surface/60 backdrop-blur-xl fixed top-0 w-full md:max-w-[1200px] z-50 border-b border-white/10 flex justify-between items-center px-container-margin py-stack-sm">
        <button 
          onClick={() => navigate('/chat')}
          className="text-on-surface-variant hover:opacity-80 transition-opacity active:scale-95"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate(`/profile/${otherUser.id}`)}>
          <div className="relative">
            <img 
              className="w-10 h-10 rounded-full object-cover border border-white/10" 
              src={otherUser.avatarUrl} 
              alt={otherUser.name} 
            />
            <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-surface ${otherUser.status.toLowerCase() === 'online' ? 'bg-[#00FF00]' : 'bg-gray-500'}`}></div>
          </div>
          <div className="flex flex-col">
            <span className="font-label-bold text-on-surface">{otherUser.name}</span>
            <span className="text-xs text-secondary-container">{otherUser.status}</span>
          </div>
        </div>
        
        <div className="flex">
          <button onClick={() => navigate(`/profile/${otherUser.id}`)} className="text-on-surface-variant hover:opacity-80 transition-opacity active:scale-95 mr-2">
            <span className="material-symbols-outlined">account_circle</span>
          </button>
          <button onClick={() => alert('Ver perfil da pessoa\nApagar conversa')} className="text-on-surface-variant hover:opacity-80 transition-opacity active:scale-95">
            <span className="material-symbols-outlined">more_vert</span>
          </button>
        </div>
      </header>

      {/* Chat Canvas */}
      <main className="flex-1 overflow-y-auto pt-[80px] pb-[160px] md:pb-[180px] px-container-margin flex flex-col gap-stack-md">
        {messages.length === 0 ? (
          <div className="text-center text-xs text-outline mt-stack-md">Nenhuma mensagem ainda. Envie um oi!</div>
        ) : (
          <div className="text-center text-xs text-outline mt-stack-md">Hoje</div>
        )}
        
        {messages.map(msg => {
          const isMe = msg.senderId === currentUser.id;
          return (
            <div key={msg.id} className={`flex gap-2 max-w-[85%] ${isMe ? 'self-end flex-row-reverse' : 'self-start'}`}>
              {!isMe && (
                <img 
                  className="w-8 h-8 rounded-full object-cover mt-auto hidden md:block" 
                  src={otherUser.avatarUrl}
                  alt="Avatar" 
                />
              )}
              <div className={`px-4 py-3 rounded-2xl ${isMe ? 'bg-primary-container rounded-br-sm shadow-[0_0_15px_rgba(188,19,254,0.3)]' : 'bg-surface-container-high rounded-bl-sm border border-white/5 backdrop-blur-md'}`}>
                <p className={`text-sm ${isMe ? 'text-on-primary-container' : 'text-on-surface'}`}>{msg.text}</p>
                <span className={`text-[10px] block mt-1 ${isMe ? 'text-primary-fixed text-right' : 'text-outline'}`}>{msg.time}</span>
              </div>
            </div>
          )
        })}
        <div ref={messagesEndRef} />
      </main>

      {/* Floating Input */}
      <div className="fixed bottom-[70px] md:bottom-[90px] w-full md:max-w-[1200px] px-container-margin pb-stack-md pt-4 bg-gradient-to-t from-background via-background/90 to-transparent z-40">
        
        {showAttachMenu && (
          <div className="absolute bottom-full mb-2 left-container-margin bg-surface-container-high border border-white/10 p-2 rounded-xl flex flex-col gap-2 shadow-2xl animate-in slide-in-from-bottom-2">
            <button 
              onClick={() => handleSend('📷 [Foto enviada]')} 
              className="flex items-center gap-2 text-on-surface hover:text-primary p-2 text-sm text-left"
            >
              <span className="material-symbols-outlined">image</span>
              Enviar Foto
            </button>
            <button 
              onClick={() => handleSend('📍 [Localização compartilhada]')} 
              className="flex items-center gap-2 text-on-surface hover:text-secondary p-2 text-sm text-left"
            >
              <span className="material-symbols-outlined">location_on</span>
              Compartilhar Localização
            </button>
          </div>
        )}

        <div className="relative max-w-3xl mx-auto flex items-center gap-2 bg-[#1A1A1A] rounded-full p-1 pl-4 border border-outline-variant focus-within:border-secondary-container focus-within:shadow-[0_0_10px_rgba(0,241,253,0.3)] transition-all duration-300">
          <button onClick={() => setShowAttachMenu(!showAttachMenu)} className="text-on-surface-variant hover:text-secondary-container transition-colors">
            <span className="material-symbols-outlined">add_circle</span>
          </button>
          <input 
            className="flex-1 bg-transparent border-none text-on-surface text-sm focus:ring-0 placeholder:text-outline py-3 outline-none" 
            placeholder="Type a message..." 
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button 
            onClick={() => handleSend()}
            className="bg-primary-container text-on-primary-container w-10 h-10 rounded-full flex items-center justify-center hover:shadow-[0_0_15px_rgba(188,19,254,0.6)] transition-all duration-200 active:scale-90"
          >
            <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>send</span>
          </button>
        </div>
      </div>
      
      <BottomNav />
    </div>
  );
}
