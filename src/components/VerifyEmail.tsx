import { useAuth } from '../contexts/AuthContext';
import { NeonLogo } from './NeonLogo';
import { Mail, RefreshCw } from 'lucide-react';

export function VerifyEmail() {
  const { user, resendVerification, refreshUser, logout } = useAuth();

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md text-center space-y-6">
        <NeonLogo className="justify-center mb-8" />
        
        <div className="w-20 h-20 bg-cyan-500/10 rounded-full flex items-center justify-center mx-auto border border-cyan-500/30 shadow-[0_0_30px_rgba(34,211,238,0.2)]">
          <Mail size={32} className="text-cyan-400" />
        </div>
        
        <h2 className="text-2xl font-bold text-slate-100">Verifique seu Email</h2>
        <p className="text-slate-400 text-sm leading-relaxed">
          Enviamos um link de confirmação para <span className="text-fuchsia-400 font-medium">{user?.email}</span>. 
          Por favor, verifique sua caixa de entrada e clique no link para ativar sua conta.
        </p>

        <div className="pt-6 space-y-4">
          <button 
            onClick={refreshUser}
            className="w-full py-3 rounded-xl bg-white/10 text-white font-medium hover:bg-white/20 transition-colors flex items-center justify-center gap-2"
          >
            <RefreshCw size={18} />
            Já cliquei no link
          </button>
          
          <button 
            onClick={resendVerification}
            className="w-full py-3 rounded-xl border border-white/10 text-slate-300 font-medium hover:bg-white/5 transition-colors"
          >
            Reenviar Email
          </button>
          
          <button 
            onClick={logout}
            className="text-sm text-slate-500 hover:text-white pt-4"
          >
            Sair e usar outra conta
          </button>
        </div>
      </div>
    </div>
  );
}
