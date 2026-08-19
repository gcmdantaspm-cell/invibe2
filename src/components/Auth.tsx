import { useState, useEffect } from 'react';
import { auth, db, handleFirestoreError, OperationType } from '../lib/firebase';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { NeonLogo } from './NeonLogo';

export function Auth() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isInIframe, setIsInIframe] = useState(false);

  useEffect(() => {
    setIsInIframe(window !== window.top);
  }, []);

  const handleGoogleLogin = async () => {
    setError('');
    setLoading(true);

    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;
      
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      
      if (!userDoc.exists()) {
        try {
          await setDoc(doc(db, 'users', user.uid), {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName || user.email?.split('@')[0],
            photoUrl: user.photoURL || '',
            interactionsCount: 0,
            createdAt: serverTimestamp(),
          });
        } catch (dbErr) {
          handleFirestoreError(dbErr, OperationType.CREATE, `users/${user.uid}`);
        }
      }
    } catch (err: any) {
      console.error('Login Error:', err);
      // Better error formatting
      setError(err.message || 'Ocorreu um erro na autenticação.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white flex flex-col items-center justify-center p-4 selection:bg-cyan-500/30">
      <div className="w-full max-w-md space-y-8 bg-white/5 p-8 rounded-3xl border border-white/10 backdrop-blur-md relative overflow-hidden text-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-fuchsia-600 to-cyan-600"></div>
        
        <div>
          <NeonLogo className="justify-center mb-6" />
          <h2 className="text-2xl font-bold text-slate-100">
            Bem-vindo ao InVibe
          </h2>
          <p className="text-slate-400 text-sm mt-2">
            Faça login para descobrir as melhores festas e garantir seus ingressos.
          </p>
        </div>

        {isInIframe && (
          <div className="bg-fuchsia-500/10 border border-fuchsia-500/30 rounded-xl p-3 text-sm text-fuchsia-200">
            <strong>Aviso:</strong> Para fazer login com o Google, você precisa <strong>abrir o app em uma nova aba</strong> (clique no ícone de seta no canto superior direito da tela).
          </div>
        )}

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3">
            <p className="text-red-400 text-xs font-medium break-words text-left">{error}</p>
          </div>
        )}

        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full py-4 rounded-xl bg-white text-black font-bold hover:bg-slate-200 transition-colors flex items-center justify-center gap-3 disabled:opacity-50"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          {loading ? 'Aguarde...' : 'Continuar com Google'}
        </button>
      </div>
    </div>
  );
}
