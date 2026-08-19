import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppData } from '../context/AppDataContext';

export default function CreateEvent() {
  const navigate = useNavigate();
  const { createEvent } = useAppData();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('local_fire_department');
  const [isPrivate, setIsPrivate] = useState(false);
  const [time, setTime] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !time) return;
    
    // Quick mock for creating a new event ID
    const newId = `e_${Date.now()}`;
    createEvent({
      title,
      description,
      type,
      time,
      isPrivate,
      distance: '0.0 km', // Current location mock
      themeColor: 'primary'
    });
    
    navigate(`/events/${newId}`);
  };

  return (
    <div className="min-h-screen bg-background text-on-surface p-4">
      <header className="flex items-center justify-between mb-8">
        <button onClick={() => navigate('/home')} className="p-2 rounded-full hover:bg-surface-container">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className="font-headline-md text-xl">Criar Evento</h1>
        <div className="w-10"></div>
      </header>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto">
        <div>
          <label className="block text-sm text-on-surface-variant mb-2">Título</label>
          <input 
            type="text" 
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="w-full bg-surface-container border border-outline rounded-xl p-3 text-on-surface outline-none focus:border-primary"
            placeholder="Ex: Resenha no terraço"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm text-on-surface-variant mb-2">Descrição</label>
          <textarea 
            value={description}
            onChange={e => setDescription(e.target.value)}
            className="w-full bg-surface-container border border-outline rounded-xl p-3 text-on-surface outline-none focus:border-primary min-h-[100px]"
            placeholder="Detalhes do evento..."
            required
          />
        </div>

        <div>
          <label className="block text-sm text-on-surface-variant mb-2">Categoria</label>
          <select 
            value={type}
            onChange={e => setType(e.target.value)}
            className="w-full bg-surface-container border border-outline rounded-xl p-3 text-on-surface outline-none focus:border-primary appearance-none"
          >
            <option value="local_fire_department">Festa / Balada</option>
            <option value="music_note">Música Ao Vivo</option>
            <option value="storefront">Feira / Encontro</option>
            <option value="sports_esports">Games</option>
          </select>
        </div>

        <div>
          <label className="block text-sm text-on-surface-variant mb-2">Horário / Data</label>
          <input 
            type="text" 
            value={time}
            onChange={e => setTime(e.target.value)}
            className="w-full bg-surface-container border border-outline rounded-xl p-3 text-on-surface outline-none focus:border-primary"
            placeholder="Ex: Hoje às 22h"
            required
          />
        </div>

        <div className="flex items-center justify-between p-4 bg-surface-container rounded-xl">
          <div>
            <div className="font-bold">Evento Privado</div>
            <div className="text-xs text-on-surface-variant">Apenas pessoas aprovadas.</div>
          </div>
          <button 
            type="button" 
            onClick={() => setIsPrivate(!isPrivate)}
            className={`w-12 h-6 rounded-full relative transition-colors ${isPrivate ? 'bg-primary' : 'bg-surface-variant'}`}
          >
            <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${isPrivate ? 'right-1' : 'left-1'}`}></div>
          </button>
        </div>

        <div className="flex gap-4 pt-4">
          <button 
            type="button"
            onClick={() => navigate('/home')}
            className="flex-1 py-3 rounded-xl border border-outline font-bold text-on-surface-variant hover:bg-surface-container"
          >
            Cancelar
          </button>
          <button 
            type="submit"
            className="flex-1 py-3 rounded-xl bg-primary text-on-primary font-bold shadow-[0_0_15px_rgba(188,19,254,0.5)] hover:scale-105 active:scale-95 transition-all"
          >
            Criar
          </button>
        </div>
      </form>
    </div>
  );
}
