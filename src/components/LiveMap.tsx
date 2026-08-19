import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Circle, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useGeolocation } from '../hooks/useGeolocation';
import { offsetLatLng, parseDistanceKm, bearingFromId } from '../lib/geo';
import { Event } from '../data';

const FALLBACK_CENTER = { lat: -23.5505, lng: -46.6333 }; // São Paulo

const userIcon = L.divIcon({
  className: '',
  html: `
    <div class="relative flex items-center justify-center w-6 h-6 -ml-3 -mt-3">
      <div class="absolute w-4 h-4 bg-secondary-container rounded-full z-10 border-2 border-surface"></div>
      <div class="absolute w-12 h-12 bg-secondary-container/30 rounded-full animate-[userPulse_2s_infinite]"></div>
    </div>
  `,
  iconSize: [0, 0],
  iconAnchor: [0, 0],
});

const createEventIcon = (event: Event) => {
  const colorMap = {
    primary: 'text-primary border-primary/30 shadow-[0_0_10px_rgba(235,178,255,0.5)]',
    secondary: 'text-secondary-container border-secondary/30 shadow-[0_0_10px_rgba(0,241,253,0.5)]',
    tertiary: 'text-tertiary-container border-tertiary-container/30 shadow-[0_0_10px_rgba(229,38,44,0.5)]'
  };
  const bgMap = {
    primary: 'bg-surface-container/80',
    secondary: 'bg-surface-container/80',
    tertiary: 'bg-surface-container/80'
  };
  
  return L.divIcon({
    className: '',
    html: `
      <div class="${bgMap[event.themeColor]} backdrop-blur-md rounded-full w-8 h-8 flex items-center justify-center border ${colorMap[event.themeColor]} cursor-pointer hover:scale-110 transition-transform -ml-4 -mt-4">
        <span class="material-symbols-outlined text-[16px]" style="font-variation-settings: 'FILL' 1">${event.type}</span>
      </div>
    `,
    iconSize: [0, 0],
    iconAnchor: [0, 0],
  });
};

function FollowUser({ position, recenterSignal }: { position: {lat: number, lng: number} | null, recenterSignal: number }) {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.flyTo(position, map.getZoom(), { animate: true });
    }
  }, [position?.lat, position?.lng, recenterSignal, map]);
  return null;
}

export default function LiveMap({ events, onEventClick, recenterSignal }: { events: Event[], onEventClick: (id: string) => void, recenterSignal: number }) {
  const geo = useGeolocation();

  const center = geo.position || FALLBACK_CENTER;

  return (
    <div className="w-full h-full relative z-0">
      {geo.status !== 'success' && geo.status !== 'locating' && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[400] bg-surface-container-high/90 text-on-surface px-4 py-2 rounded-full text-sm backdrop-blur border border-white/10 shadow-lg flex items-center gap-2 whitespace-nowrap">
          <span className="material-symbols-outlined text-[18px] text-error">location_off</span>
          {geo.errorMessage || 'Localização indisponível'}
        </div>
      )}
      {geo.status === 'locating' && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[400] bg-surface-container-high/90 text-on-surface px-4 py-2 rounded-full text-sm backdrop-blur border border-white/10 shadow-lg flex items-center gap-2 whitespace-nowrap">
          <span className="material-symbols-outlined text-[18px] animate-spin">refresh</span>
          Localizando você...
        </div>
      )}

      <MapContainer 
        center={center} 
        zoom={14} 
        className="w-full h-full"
        zoomControl={false}
      >
        <TileLayer
          attribution='&amp;copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &amp;copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        
        <FollowUser position={geo.position} recenterSignal={recenterSignal} />

        {geo.position && (
          <>
            {geo.accuracy && geo.accuracy < 500 && (
              <Circle 
                center={geo.position} 
                radius={geo.accuracy} 
                pathOptions={{ color: '#00f1fd', fillColor: '#00f1fd', fillOpacity: 0.1, weight: 1 }} 
              />
            )}
            <Marker position={geo.position} icon={userIcon} />
          </>
        )}

        {events.map((event) => {
          const basePos = geo.position || FALLBACK_CENTER;
          const distKm = parseDistanceKm(event.distance);
          const bearing = bearingFromId(event.id);
          const pos = offsetLatLng(basePos, distKm, bearing);
          
          return (
            <Marker 
              key={event.id}
              position={pos} 
              icon={createEventIcon(event)}
              eventHandlers={{ click: () => onEventClick(event.id) }}
            />
          );
        })}
      </MapContainer>
    </div>
  );
}
