import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[100dvh] flex flex-col relative overflow-hidden font-body-md text-body-md w-full">
      <div className="absolute bottom-[-20%] left-1/2 transform -translate-x-1/2 w-[150%] aspect-square bg-primary-container opacity-20 blur-[120px] rounded-full pointer-events-none mix-blend-screen"></div>
      
      <main className="flex-1 flex flex-col items-center justify-center w-full max-w-[1200px] mx-auto px-container-margin relative z-10">
        <div className="flex flex-col items-center text-center w-full max-w-sm">
          
          <div className="relative mb-stack-lg animate-[pulse_4s_ease-in-out_infinite]">
            <img 
              alt="INVIBE Logo" 
              className="w-48 h-48 object-contain drop-shadow-[0_0_20px_rgba(188,19,254,0.4)]" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAKKysOA4a_QOXd8WS8BkCjYSWpA6_qav1zbno3vbxQc1Xu32zDPKrIhkgxPYGboqkEOsCcoTKeBGQAd-JexjrG5LecTD2eYDo7Uzjf1tkEG6QMCGUgi9tvqTvip_ahE5KJTSqNBIbwLDywtsJGW1wcoDF4s50bUdVVhjv0sNakxqnOA42pYTvUUMSY7VCXMWnF_zExG1w2tTnoB1ek4bg3jRfn_pC1EgpQ6pGSo8v1pZeByQeQKz6o" 
            />
          </div>
          
          <h1 className="font-display-lg-mobile text-on-surface mb-stack-sm tracking-tighter">INVIBE</h1>
          
          <p className="font-body-lg text-on-surface-variant mb-stack-lg">
            Conecte-se com quem está por perto.
          </p>
          
          <button 
            onClick={() => navigate('/home')}
            className="w-full flex items-center justify-center gap-gutter py-4 px-6 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 text-on-surface hover:bg-white/20 transition-all duration-300 active:scale-95 shadow-[0_4px_30px_rgba(0,0,0,0.1)] group"
          >
            <svg className="w-6 h-6" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" fill="#EA4335"></path>
              <path d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" fill="#4285F4"></path>
              <path d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" fill="#FBBC05"></path>
              <path d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" fill="#34A853"></path>
            </svg>
            <span className="font-label-bold">Entrar com Google</span>
          </button>
        </div>
      </main>

      <footer className="w-full px-container-margin py-stack-md relative z-10 flex justify-center pb-8">
        <p className="font-body-md text-on-surface-variant text-center opacity-70 max-w-xs">
          Ao continuar, você concorda com nossos Termos de Serviço e Política de Privacidade.
        </p>
      </footer>
    </div>
  );
}
