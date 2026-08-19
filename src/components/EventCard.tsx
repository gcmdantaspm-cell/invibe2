import { Calendar, MapPin } from 'lucide-react';
import { Event } from '../data/events';

interface EventCardProps {
  event: Event;
  layout?: 'vertical' | 'horizontal';
  onClick?: () => void;
}

export function EventCard({ event, layout = 'vertical', onClick }: EventCardProps) {
  if (layout === 'horizontal') {
    return (
      <div onClick={onClick} className="flex bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-colors cursor-pointer group">
        <div className="w-24 h-24 shrink-0 relative overflow-hidden">
          <img src={event.imageUrl} alt={event.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
        </div>
        <div className="p-3 flex-1 flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-sm text-slate-100 line-clamp-1">{event.title}</h3>
            <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
              <MapPin size={12} className="text-cyan-500 shrink-0" />
              <span className="truncate">{event.location}</span>
            </p>
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs font-medium text-fuchsia-400">{event.date}</span>
            <span className="text-xs font-bold bg-white/10 px-2 py-1 rounded-md text-white">{event.price}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div onClick={onClick} className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:bg-white/10 transition-colors cursor-pointer group w-full">
      <div className="h-40 w-full relative overflow-hidden">
        <img src={event.imageUrl} alt={event.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
        <div className="absolute top-3 left-3 flex gap-2">
          {event.tags.map(tag => (
            <span key={tag} className="bg-black/50 backdrop-blur-md border border-white/10 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg text-slate-100 mb-1 leading-tight line-clamp-1">{event.title}</h3>
        <div className="space-y-2 mt-3">
          <p className="text-sm text-slate-400 flex items-center gap-2">
            <MapPin size={16} className="text-cyan-500 shrink-0" />
            <span className="truncate">{event.location}</span>
            <span className="text-xs bg-white/10 px-2 py-0.5 rounded-full ml-auto shrink-0 text-white">{event.distance}</span>
          </p>
          <p className="text-sm text-slate-400 flex items-center gap-2">
            <Calendar size={16} className="text-fuchsia-500 shrink-0" />
            {event.date}
          </p>
        </div>
      </div>
    </div>
  );
}
