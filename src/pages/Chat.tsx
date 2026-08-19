import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CURRENT_USER } from '../data';
import { BottomNav } from '../components/BottomNav';

export default function Chat() {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hey! Are you heading to the Neon District later? The new art installation just opened.', time: '9:42 PM', isMe: false },
    { id: 2, text: 'Definitely. I heard they have some crazy holographic displays setup this time.', time: '9:45 PM', isMe: true },
    { id: 3, text: 'Awesome. Meet at the usual spot by the cyan terminal in 20?', time: '9:46 PM', isMe: false },
    { id: 4, text: 'See you there ⚡', time: '9:47 PM', isMe: true }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!message.trim()) return;
    
    setMessages([...messages, {
      id: Date.now(),
      text: message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true
    }]);
    setMessage('');
  };

  return (
    <div className="bg-background text-on-surface h-[100dvh] flex flex-col overflow-hidden bg-grid-pattern md:max-w-[1200px] md:mx-auto relative">
      {/* TopAppBar */}
      <header className="bg-surface/60 backdrop-blur-xl fixed top-0 w-full md:max-w-[1200px] z-50 border-b border-white/10 flex justify-between items-center px-container-margin py-stack-sm">
        <button 
          onClick={() => navigate(-1)}
          className="text-on-surface-variant hover:opacity-80 transition-opacity active:scale-95"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/profile')}>
          <div className="relative">
            <img 
              className="w-10 h-10 rounded-full object-cover border border-white/10" 
              src={CURRENT_USER.avatarUrl} 
              alt={CURRENT_USER.name} 
            />
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-secondary-container rounded-full border-2 border-surface"></div>
          </div>
          <div className="flex flex-col">
            <span className="font-label-bold text-on-surface">{CURRENT_USER.name}</span>
            <span className="text-xs text-secondary-container">Online</span>
          </div>
        </div>
        
        <button className="text-on-surface-variant hover:opacity-80 transition-opacity active:scale-95">
          <span className="material-symbols-outlined">more_vert</span>
        </button>
      </header>

      {/* Chat Canvas */}
      <main className="flex-1 overflow-y-auto pt-[80px] pb-[160px] md:pb-[180px] px-container-margin flex flex-col gap-stack-md">
        <div className="text-center text-xs text-outline mt-stack-md">Today, 9:41 PM</div>
        
        {messages.map(msg => (
          <div key={msg.id} className={`flex gap-2 max-w-[85%] ${msg.isMe ? 'self-end flex-row-reverse' : 'self-start'}`}>
            {!msg.isMe && (
              <img 
                className="w-8 h-8 rounded-full object-cover mt-auto hidden md:block" 
                src={CURRENT_USER.avatarUrl}
                alt="Avatar" 
              />
            )}
            <div className={`px-4 py-3 rounded-2xl ${msg.isMe ? 'bg-primary-container rounded-br-sm shadow-[0_0_15px_rgba(188,19,254,0.3)]' : 'bg-surface-container-high rounded-bl-sm border border-white/5 backdrop-blur-md'}`}>
              <p className={`text-sm ${msg.isMe ? 'text-on-primary-container' : 'text-on-surface'}`}>{msg.text}</p>
              <span className={`text-[10px] block mt-1 ${msg.isMe ? 'text-primary-fixed text-right' : 'text-outline'}`}>{msg.time}</span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </main>

      {/* Floating Input */}
      <div className="fixed bottom-[70px] md:bottom-[90px] w-full md:max-w-[1200px] px-container-margin pb-stack-md pt-4 bg-gradient-to-t from-background via-background/90 to-transparent z-40">
        <div className="relative max-w-3xl mx-auto flex items-center gap-2 bg-[#1A1A1A] rounded-full p-1 pl-4 border border-outline-variant focus-within:border-secondary-container focus-within:shadow-[0_0_10px_rgba(0,241,253,0.3)] transition-all duration-300">
          <button className="text-on-surface-variant hover:text-secondary-container transition-colors">
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
            onClick={handleSend}
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
