import { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useAuth } from '../contexts/AuthContext';
import { X, MapPin } from 'lucide-react';

interface CreateEventProps {
  onClose: () => void;
  onSuccess: () => void;
}

const EVENT_TYPES = ['Festa', 'Supermercado', 'Centro Educacional', 'Evento Bairro', 'Evento Rua', 'Bar/Lounge'];

export function CreateEvent({ onClose, onSuccess }: CreateEventProps) {
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [type, setType] = useState(EVENT_TYPES[0]);
  const [locationName, setLocationName] = useState('');
  const [loading, setLoading] = useState(false);
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          // Fallback to São Paulo
          setUserLocation({lat: -23.5505, lng: -46.6333});
        },
        { enableHighAccuracy: true }
      );
    } else {
      setUserLocation({lat: -23.5505, lng: -46.6333});
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    // We require location for hyperlocal networking
    if (!userLocation) {
      alert("Precisamos da sua localização para criar um evento aqui!");
      return;
    }

    setLoading(true);

    try {
      await addDoc(collection(db, 'events'), {
        title,
        type,
        locationName,
        location: userLocation,
        creatorId: user.uid,
        createdAt: serverTimestamp(),
        // Expires in 12 hours for prototype purposes
        expiresAt: new Date(Date.now() + 12 * 60 * 60 * 1000) 
      });
      onSuccess();
    } catch (error) {
      console.error("Error creating event:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#0f0f13] border border-white/10 rounded-3xl w-full max-w-md overflow-hidden shadow-[0_0_40px_rgba(232,121,249,0.15)] animate-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center p-4 border-b border-white/10">
          <h2 className="text-xl font-bold text-white">Criar Novo Evento</h2>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-white rounded-full bg-white/5">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {!userLocation && (
            <div className="bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 p-3 rounded-xl text-sm mb-4">
              Obtendo sua localização atual... Para criar um evento você precisa estar fisicamente no local.
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">Nome do Evento</label>
            <input 
              type="text" 
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Ex: Resenha na Laje"
              required
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-fuchsia-500/50 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">Categoria</label>
            <select 
              value={type}
              onChange={e => setType(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-fuchsia-500/50 focus:outline-none appearance-none"
            >
              {EVENT_TYPES.map(t => <option key={t} value={t} className="bg-[#0f0f13]">{t}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">Nome do Local</label>
            <div className="relative">
              <MapPin size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-cyan-400" />
              <input 
                type="text" 
                value={locationName}
                onChange={e => setLocationName(e.target.value)}
                placeholder="Ex: Bar do Zé, Rua X"
                required
                className="w-full bg-black/40 border border-white/10 rounded-xl px-10 py-3 text-white focus:border-cyan-500/50 focus:outline-none"
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading || !userLocation}
            className="w-full py-4 mt-4 rounded-xl bg-gradient-to-r from-fuchsia-600 to-cyan-600 text-white font-bold hover:opacity-90 disabled:opacity-50"
          >
            {loading ? 'Criando...' : 'Iniciar Evento Aqui Agora'}
          </button>
        </form>
      </div>
    </div>
  );
}
