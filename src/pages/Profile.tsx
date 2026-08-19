import { useNavigate } from 'react-router-dom';
import { CURRENT_USER, PROFILE_GALLERY } from '../data';
import { BottomNav } from '../components/BottomNav';

export default function Profile() {
  const navigate = useNavigate();

  return (
    <div className="bg-background text-on-background min-h-[100dvh] selection:bg-primary-container selection:text-white pb-24 md:pb-32">
      <nav className="fixed top-0 w-full z-50 flex justify-between items-center px-container-margin py-stack-sm bg-surface/60 backdrop-blur-xl border-b border-white/10 transition-all md:max-w-[1200px] md:mx-auto md:left-1/2 md:-translate-x-1/2">
        <button 
          onClick={() => navigate(-1)}
          className="text-primary hover:opacity-80 active:scale-95 transition-transform flex items-center justify-center p-2 rounded-full hover:bg-white/5"
        >
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'wght' 300" }}>arrow_back</span>
        </button>
        <span className="font-display-lg-mobile font-extrabold tracking-tighter text-primary drop-shadow-[0_0_15px_rgba(235,178,255,0.8)]">INVIBE</span>
        <div className="w-10"></div>
      </nav>

      <div className="relative w-full h-[397px] md:h-[486px] overflow-hidden md:max-w-[1200px] md:mx-auto md:mt-16 md:rounded-b-[2rem]">
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAVyAk8oipZMo5WW6znm1XnN8hL7veH3A6ylyAkv1bWa_yPBSmqfxK7N62MRG8S3cR_iNOnfvXmsAhUdltSdjvSoDIwuoTqliN8pWI9aNDHsaXCyrRHSIx8Y0urrfLemAxYGpvnqzSIcMGSsCRxrr7fo9WevDvqI4A2livcAziL_jfUz6iUi_dWYtm-ew29HlPMoqvitttJN2eqlBOKrChhPBqlYv6toE8YXkAUws_deEJryhmu9MuM')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"></div>
      </div>

      <main className="relative z-10 px-container-margin -mt-32 max-w-[800px] mx-auto pb-stack-lg">
        <div className="glass-card rounded-[1.5rem] p-6 md:p-8 flex flex-col items-center relative shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-[3px] border-primary-container overflow-hidden relative -mt-24 z-20 shadow-[0_0_20px_rgba(188,19,254,0.4)] bg-surface-container">
            <img className="w-full h-full object-cover" src={CURRENT_USER.avatarUrl} alt={CURRENT_USER.name} />
          </div>
          
          <div className="text-center mt-4 w-full">
            <h1 className="font-headline-md text-on-surface tracking-tight">{CURRENT_USER.name}</h1>
            <p className="text-secondary-container mt-1 opacity-90">"{CURRENT_USER.status}"</p>
          </div>
          
          <div className="mt-8 mb-6 flex flex-col items-center justify-center w-full relative">
            <div className="absolute inset-0 bg-secondary-container/5 blur-2xl rounded-full"></div>
            <span className="font-display-lg text-secondary-container neon-text-cyan leading-none relative z-10">142</span>
            <span className="font-label-bold text-on-surface-variant uppercase tracking-[0.2em] mt-2 relative z-10">Interações</span>
          </div>
          
          <button 
            onClick={() => navigate('/chat')}
            className="w-full md:w-2/3 bg-primary-container text-on-primary-container font-headline-md py-4 rounded-xl transition-all neon-glow-primary active:scale-95 flex items-center justify-center gap-3 overflow-hidden relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
            <span>Interagir</span>
          </button>
        </div>

        <section className="mt-stack-lg">
          <div className="flex items-center justify-between mb-stack-md px-2">
            <h2 className="font-headline-md text-on-surface">Galeria</h2>
            <button className="font-label-bold text-primary hover:text-primary-container transition-colors">Ver Tudo</button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-unit">
            {PROFILE_GALLERY.map((imgUrl, index) => (
              <div key={index} className={`glass-card rounded-lg overflow-hidden relative group aspect-square ${index === 0 ? 'col-span-2 row-span-2' : ''}`}>
                <img 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100" 
                  src={imgUrl} 
                  alt={`Gallery ${index}`} 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <span className="material-symbols-outlined text-white">favorite</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <BottomNav />
    </div>
  );
}
