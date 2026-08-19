export function NeonLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center font-black tracking-widest text-3xl ${className}`}>
      <span className="text-fuchsia-400 drop-shadow-[0_0_12px_rgba(232,121,249,0.8)]">IN</span>
      
      <div className="relative flex items-center justify-center mx-1">
        <svg width="40" height="40" viewBox="0 0 40 40" className="drop-shadow-[0_0_10px_rgba(34,211,238,0.6)]">
           <path d="M20 5 C12 5 8 13 8 19 C8 27 20 37 20 37 C20 37 32 27 32 19 C32 13 28 5 20 5 Z" fill="none" stroke="url(#neonGradient)" strokeWidth="2.5" />
           <circle cx="20" cy="16" r="4" fill="none" stroke="#22d3ee" strokeWidth="2.5" className="drop-shadow-[0_0_8px_rgba(34,211,238,1)]" />
           <path d="M2 24 L12 24 L16 16 L24 30 L28 24 L38 24" fill="none" stroke="url(#neonGradient)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
           <defs>
             <linearGradient id="neonGradient" x1="0%" y1="0%" x2="100%" y2="0%">
               <stop offset="0%" stopColor="#d946ef" />
               <stop offset="100%" stopColor="#22d3ee" />
             </linearGradient>
           </defs>
        </svg>
      </div>

      <span className="text-cyan-400 drop-shadow-[0_0_12px_rgba(34,211,238,0.8)]">BE</span>
    </div>
  );
}
