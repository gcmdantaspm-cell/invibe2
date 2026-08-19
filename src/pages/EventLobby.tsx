import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppData } from '../context/AppDataContext';
import { BottomNav } from '../components/BottomNav';
import { clsx } from 'clsx';

export default function EventLobby() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { events, users, posts, currentUser, joinEvent, toggleHypePost } = useAppData();
  
  const [activeTab, setActiveTab] = useState<'feed' | 'pessoas'>('feed');
  const [onlineOnly, setOnlineOnly] = useState(false);

  const event = events.find(e => e.id === id);

  useEffect(() => {
    if (!event) {
      navigate('/home');
    }
  }, [event, navigate]);

  if (!event) return null;

  const isParticipating = event.participantIds.includes(currentUser.id);
  const requiresJoin = event.isPrivate && !isParticipating;

  const eventPosts = posts.filter(p => p.eventId === event.id || !p.eventId); // fallback for mock posts
  
  const participantUsers = users.filter(u => event.participantIds.includes(u.id));
  const displayedUsers = onlineOnly ? participantUsers.filter(u => u.status.toLowerCase() === 'online') : participantUsers;

  return (
    <div className="min-h-[100dvh] flex flex-col pb-[100px] md:pb-[120px]">
      <header className="fixed top-0 w-full z-50 bg-surface/60 backdrop-blur-xl border-b border-white/10">
        <div className="flex justify-between items-center px-container-margin py-stack-sm w-full max-w-[1200px] mx-auto">
          <button 
            onClick={() => navigate('/home')}
            className="text-on-surface-variant hover:opacity-80 transition-opacity active:scale-95 transition-transform flex items-center justify-center p-2 rounded-full"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <h1 className="font-display-lg-mobile font-extrabold tracking-tighter text-primary drop-shadow-[0_0_15px_rgba(235,178,255,0.8)]">INVIBE</h1>
          <div className="flex">
            <button onClick={() => alert('Buscar no evento')} className="text-on-surface-variant hover:opacity-80 transition-opacity active:scale-95 flex items-center justify-center p-2 rounded-full">
              <span className="material-symbols-outlined">search</span>
            </button>
            <button onClick={() => navigate('/profile')} className="text-on-surface-variant hover:opacity-80 transition-opacity active:scale-95 flex items-center justify-center p-2 rounded-full ml-2">
              <img src={currentUser.avatarUrl} alt="Me" className="w-8 h-8 rounded-full border border-primary/30 object-cover" />
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 mt-[80px] w-full max-w-[1200px] mx-auto px-container-margin md:px-stack-lg">
        <section className="mb-stack-lg pt-stack-md text-center">
          <h2 className="font-headline-md text-on-surface mb-2">{event.title}</h2>
          <p className="text-sm text-on-surface-variant mb-4">{event.description}</p>
          <div className="inline-flex items-center space-x-2 bg-surface-container-high px-4 py-2 rounded-full border border-secondary/20 shadow-[0_0_10px_rgba(0,241,253,0.2)]">
            {event.isPrivate ? (
              <span className="material-symbols-outlined text-[16px] text-tertiary">lock</span>
            ) : (
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
            )}
            <span className={clsx("font-label-bold", event.isPrivate ? "text-tertiary" : "text-secondary")}>
              {event.isPrivate ? 'EVENTO PRIVADO' : 'LIVE NOW'} • {event.time}
            </span>
          </div>
        </section>

        {requiresJoin ? (
          <div className="flex flex-col items-center justify-center mt-20 p-8 glass-card rounded-3xl text-center">
            <span className="material-symbols-outlined text-6xl text-tertiary mb-4">lock</span>
            <h3 className="text-xl font-bold mb-2">Evento Privado</h3>
            <p className="text-on-surface-variant mb-8">Você precisa solicitar participação para ver o feed e as pessoas deste evento.</p>
            <button 
              onClick={() => joinEvent(event.id)}
              className="bg-primary text-white font-bold py-3 px-8 rounded-full shadow-[0_0_15px_rgba(188,19,254,0.5)] hover:scale-105 active:scale-95 transition-all"
            >
              Solicitar Participação
            </button>
          </div>
        ) : (
          <>
            <div className="flex space-x-1 bg-surface-container-high p-1 rounded-lg mb-stack-md mx-auto max-w-sm">
              <button 
                className={`flex-1 py-2 font-label-bold rounded-md transition-all ${activeTab === 'feed' ? 'bg-surface-bright text-on-surface shadow-sm' : 'text-on-surface-variant hover:text-on-surface'}`}
                onClick={() => setActiveTab('feed')}
              >
                Feed
              </button>
              <button 
                className={`flex-1 py-2 font-label-bold rounded-md transition-all ${activeTab === 'pessoas' ? 'bg-surface-bright text-on-surface shadow-sm' : 'text-on-surface-variant hover:text-on-surface'}`}
                onClick={() => setActiveTab('pessoas')}
              >
                Pessoas ({participantUsers.length})
              </button>
            </div>

            {activeTab === 'feed' && (
              <section className="space-y-stack-md pb-stack-lg">
                <div className="glass-card rounded-xl p-4 flex items-center space-x-4 cursor-pointer hover:bg-surface-container-highest transition-colors">
                  <img 
                    className="w-10 h-10 rounded-full object-cover border border-white/20" 
                    src={currentUser.avatarUrl}
                    alt="Your avatar"
                  />
                  <div className="flex-1">
                    <p className="text-on-surface-variant">Share your vibe...</p>
                  </div>
                  <div className="bg-primary/20 p-2 rounded-full text-primary">
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>add_a_photo</span>
                  </div>
                </div>

                {eventPosts.map(post => {
                  const postAuthor = users.find(u => u.id === post.userId) || currentUser;
                  // For now mock hype logic local to component if we don't have user specific arrays in context
                  const isHyped = false; // Add real check if desired
                  
                  return (
                    <article key={post.id} className="glass-card rounded-xl overflow-hidden">
                      <div className="p-4 flex items-center justify-between">
                        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigate(`/profile/${postAuthor.id}`)}>
                          <img 
                            className="w-10 h-10 rounded-full object-cover border border-primary/50" 
                            src={postAuthor.avatarUrl} 
                            alt={postAuthor.name} 
                          />
                          <div>
                            <p className="font-label-bold text-on-surface hover:underline">{postAuthor.username}</p>
                            <p className="text-xs text-on-surface-variant">{post.timeAgo}</p>
                          </div>
                        </div>
                        <button onClick={() => alert('Denunciar / Copiar link')} className="text-on-surface-variant hover:text-on-surface">
                          <span className="material-symbols-outlined">more_horiz</span>
                        </button>
                      </div>
                      
                      {post.imageUrl && (
                        <div className="w-full aspect-[4/5] relative bg-black/50">
                          <img className="w-full h-full object-cover" src={post.imageUrl} alt="Post content" />
                        </div>
                      )}
                      
                      <div className="p-4">
                        <div className="flex justify-between items-center mb-3">
                          <div className="flex space-x-4">
                            <button 
                              onClick={() => toggleHypePost(post.id)}
                              className={`flex items-center space-x-1 group ${isHyped ? 'text-secondary' : 'text-on-surface-variant'}`}
                            >
                              <div className={`w-10 h-10 rounded-full bg-surface-container flex items-center justify-center border transition-colors ${isHyped ? 'border-secondary shadow-[0_0_15px_rgba(0,241,253,0.4)]' : 'border-secondary/30 group-hover:border-secondary hype-pulse'}`}>
                                <span className="material-symbols-outlined text-secondary drop-shadow-[0_0_5px_rgba(0,241,253,0.8)]" style={{ fontVariationSettings: isHyped ? "'FILL' 1" : "'FILL' 0" }}>bolt</span>
                              </div>
                              <span className={`font-label-bold ${isHyped ? 'text-secondary' : ''}`}>
                                {post.hypes > 1000 ? `${(post.hypes/1000).toFixed(1)}k` : post.hypes}
                              </span>
                            </button>
                            <button onClick={() => alert('Abrindo comentários')} className="flex items-center space-x-1 text-on-surface-variant hover:text-on-surface transition-colors">
                              <span className="material-symbols-outlined">chat_bubble</span>
                              <span className="font-label-bold">{post.comments}</span>
                            </button>
                          </div>
                          <button onClick={() => { navigator.clipboard.writeText(window.location.href); alert('Link copiado!'); }} className="text-on-surface-variant hover:text-on-surface transition-colors">
                            <span className="material-symbols-outlined">send</span>
                          </button>
                        </div>
                        <p className="text-on-surface"><span className="font-label-bold mr-2">{postAuthor.username}</span>{post.content}</p>
                      </div>
                    </article>
                  )
                })}
              </section>
            )}

            {activeTab === 'pessoas' && (
              <section className="space-y-stack-md pb-stack-lg">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-headline-md text-on-surface">Participantes ({displayedUsers.length})</h3>
                  <button 
                    onClick={() => setOnlineOnly(!onlineOnly)}
                    className={clsx("font-label-bold hover:underline transition-colors", onlineOnly ? "text-primary" : "text-on-surface-variant")}
                  >
                    Filtrar Online
                  </button>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-gutter">
                  {displayedUsers.map(user => (
                    <div key={user.id} className="relative w-full aspect-[3/4] rounded-xl overflow-hidden group">
                      <img 
                        onClick={() => navigate(`/profile/${user.id}`)}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 cursor-pointer" 
                        src={user.avatarUrl} 
                        alt={user.name} 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none"></div>
                      
                      <button 
                        onClick={() => alert(`Like enviado para ${user.name}!`)} 
                        className="absolute top-2 right-2 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/20 text-white hover:text-primary transition-colors"
                      >
                        <span className="material-symbols-outlined">favorite</span>
                      </button>

                      <div className="absolute bottom-0 left-0 p-3 w-full">
                        <div className="mb-2" onClick={() => navigate(`/profile/${user.id}`)}>
                          <h4 className="font-label-bold text-white text-lg cursor-pointer hover:underline">{user.name}, {user.age}</h4>
                          <p className="text-xs text-white/80 flex items-center">
                            <span className="w-2 h-2 rounded-full mr-1" style={{ backgroundColor: user.status.toLowerCase() === 'online' ? '#00FF00' : 'gray' }}></span>
                            {user.status}
                          </p>
                        </div>
                        
                        {user.id !== currentUser.id && (
                          <button 
                            onClick={(e) => { e.stopPropagation(); navigate(`/chat/${user.id}`); }}
                            className="w-full py-2 bg-primary/80 hover:bg-primary backdrop-blur-sm text-white font-bold rounded-lg text-sm flex items-center justify-center gap-1 transition-colors"
                          >
                            <span className="material-symbols-outlined text-[16px]">chat</span>
                            Chamar no chat
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </main>

      <BottomNav />
    </div>
  );
}
