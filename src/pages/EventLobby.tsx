import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MOCK_POSTS, MOCK_USERS } from '../data';
import { BottomNav } from '../components/BottomNav';

export default function EventLobby() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'feed' | 'pessoas'>('feed');
  const [hypedPosts, setHypedPosts] = useState<Set<string>>(new Set());

  const handleHype = (postId: string) => {
    setHypedPosts(prev => {
      const next = new Set(prev);
      if (next.has(postId)) {
        next.delete(postId);
      } else {
        next.add(postId);
      }
      return next;
    });
  };

  return (
    <div className="min-h-[100dvh] flex flex-col pb-[100px] md:pb-[120px]">
      {/* TopAppBar */}
      <header className="fixed top-0 w-full z-50 bg-surface/60 backdrop-blur-xl border-b border-white/10">
        <div className="flex justify-between items-center px-container-margin py-stack-sm w-full max-w-[1200px] mx-auto">
          <button 
            onClick={() => navigate('/home')}
            className="text-on-surface-variant hover:opacity-80 transition-opacity active:scale-95 transition-transform flex items-center justify-center p-2 rounded-full"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <h1 className="font-display-lg-mobile font-extrabold tracking-tighter text-primary drop-shadow-[0_0_15px_rgba(235,178,255,0.8)]">INVIBE</h1>
          <button className="text-on-surface-variant hover:opacity-80 transition-opacity active:scale-95 transition-transform flex items-center justify-center p-2 rounded-full">
            <span className="material-symbols-outlined">search</span>
          </button>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="flex-1 mt-[80px] w-full max-w-[1200px] mx-auto px-container-margin md:px-stack-lg">
        {/* Event Header */}
        <section className="mb-stack-lg pt-stack-md text-center">
          <h2 className="font-headline-md text-on-surface mb-unit">Festa do Bairro</h2>
          <div className="inline-flex items-center space-x-2 bg-surface-container-high px-4 py-2 rounded-full border border-secondary/20 shadow-[0_0_10px_rgba(0,241,253,0.2)]">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
            <span className="font-label-bold text-secondary">LIVE NOW • Ends in 2h 45m</span>
          </div>
        </section>

        {/* Tabs */}
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
            Pessoas
          </button>
        </div>

        {/* Feed Section */}
        {activeTab === 'feed' && (
          <section className="space-y-stack-md pb-stack-lg">
            {/* Create Post Trigger */}
            <div className="glass-card rounded-xl p-4 flex items-center space-x-4 cursor-pointer hover:bg-surface-container-highest transition-colors">
              <img 
                className="w-10 h-10 rounded-full object-cover border border-white/20" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAM47-OIsj1fs0nkH8zOd4MFOBHUDnpQimHiEHoa51aM3-mY0xq-S_qGQw88sFylNNyEoLDkk1oCgappC1Y2rzP0_3TckLrGRz6V_jIY25FjT9w0sgVOf3C0IHQXd98awDb2weEKbOqlYpHB0FVw6WemUVfIAhJ-dRSOKQSpwInZzyiHCIT-3TXCoG2j-6_szPIOqmnDusv2qutfm0Wri-7C5ObMdO6pGLeWZYm1o8LA0avOxBGRNSR"
                alt="Your avatar"
              />
              <div className="flex-1">
                <p className="text-on-surface-variant">Share your vibe...</p>
              </div>
              <div className="bg-primary/20 p-2 rounded-full text-primary">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>add_a_photo</span>
              </div>
            </div>

            {/* Feed Posts */}
            {MOCK_POSTS.map(post => {
              const isHyped = hypedPosts.has(post.id);
              const currentHypes = post.hypes + (isHyped ? 1 : 0);
              
              return (
              <article key={post.id} className="glass-card rounded-xl overflow-hidden">
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img 
                      className="w-10 h-10 rounded-full object-cover border border-primary/50" 
                      src={post.user.avatarUrl} 
                      alt={post.user.name} 
                    />
                    <div>
                      <p className="font-label-bold text-on-surface">{post.user.username}</p>
                      <p className="text-xs text-on-surface-variant">{post.timeAgo}</p>
                    </div>
                  </div>
                  <button className="text-on-surface-variant hover:text-on-surface">
                    <span className="material-symbols-outlined">more_horiz</span>
                  </button>
                </div>
                
                {post.imageUrl && (
                  <div className="w-full aspect-[4/5] relative">
                    <img className="w-full h-full object-cover" src={post.imageUrl} alt="Post content" />
                  </div>
                )}
                
                <div className="p-4">
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex space-x-4">
                      {/* HYPE Button */}
                      <button 
                        onClick={() => handleHype(post.id)}
                        className={`flex items-center space-x-1 group ${isHyped ? 'text-secondary' : 'text-on-surface-variant'}`}
                      >
                        <div className={`w-10 h-10 rounded-full bg-surface-container flex items-center justify-center border transition-colors ${isHyped ? 'border-secondary shadow-[0_0_15px_rgba(0,241,253,0.4)]' : 'border-secondary/30 group-hover:border-secondary hype-pulse'}`}>
                          <span className="material-symbols-outlined text-secondary drop-shadow-[0_0_5px_rgba(0,241,253,0.8)]" style={{ fontVariationSettings: isHyped ? "'FILL' 1" : "'FILL' 0" }}>bolt</span>
                        </div>
                        <span className={`font-label-bold ${isHyped ? 'text-secondary' : ''}`}>
                          {currentHypes > 1000 ? `${(currentHypes/1000).toFixed(1)}k` : currentHypes}
                        </span>
                      </button>
                      <button className="flex items-center space-x-1 text-on-surface-variant hover:text-on-surface transition-colors">
                        <span className="material-symbols-outlined">chat_bubble</span>
                        <span className="font-label-bold">{post.comments}</span>
                      </button>
                    </div>
                    <button className="text-on-surface-variant hover:text-on-surface transition-colors">
                      <span className="material-symbols-outlined">send</span>
                    </button>
                  </div>
                  <p className="text-on-surface"><span className="font-label-bold mr-2">{post.user.username}</span>{post.content}</p>
                </div>
              </article>
            )})}
          </section>
        )}

        {/* Pessoas Section */}
        {activeTab === 'pessoas' && (
          <section className="space-y-stack-md pb-stack-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-headline-md text-on-surface">Nearby ({MOCK_USERS.length})</h3>
              <button className="text-primary font-label-bold hover:underline">Filter</button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-gutter">
              {MOCK_USERS.map(user => (
                <div key={user.id} onClick={() => navigate('/profile')} className="relative w-full aspect-[3/4] rounded-xl overflow-hidden group cursor-pointer">
                  <img 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                    src={user.avatarUrl} 
                    alt={user.name} 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-3 w-full">
                    <div className="flex justify-between items-end">
                      <div>
                        <h4 className="font-label-bold text-white text-lg">{user.name}, {user.age}</h4>
                        <p className="text-xs text-white/80 flex items-center">
                          <span className="material-symbols-outlined text-[14px] mr-1">location_on</span>
                          {user.distance}
                        </p>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-primary/20 backdrop-blur-sm flex items-center justify-center border border-primary/50 text-primary">
                        <span className="material-symbols-outlined text-[18px]">favorite</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      <BottomNav />
    </div>
  );
}
