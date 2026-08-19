import { useState, useEffect } from 'react';

export type GeoStatus = 'idle' | 'locating' | 'success' | 'denied' | 'unsupported' | 'error';

export interface GeoLocationState {
  position: { lat: number; lng: number } | null;
  accuracy: number | null;
  status: GeoStatus;
  errorMessage: string;
}

export function useGeolocation(): GeoLocationState {
  const [state, setState] = useState<GeoLocationState>({
    position: null,
    accuracy: null,
    status: 'idle',
    errorMessage: '',
  });

  useEffect(() => {
    if (!('geolocation' in navigator)) {
      setState(s => ({ ...s, status: 'unsupported', errorMessage: 'Geolocalização não suportada.' }));
      return;
    }

    setState(s => ({ ...s, status: 'locating' }));

    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        setState({
          position: { lat: pos.coords.latitude, lng: pos.coords.longitude },
          accuracy: pos.coords.accuracy,
          status: 'success',
          errorMessage: '',
        });
      },
      (err) => {
        let msg = 'Erro ao obter localização.';
        let status: GeoStatus = 'error';
        if (err.code === err.PERMISSION_DENIED) {
          msg = 'Permissão de localização negada.';
          status = 'denied';
        }
        setState(s => ({ ...s, status, errorMessage: msg }));
      },
      { enableHighAccuracy: true, maximumAge: 10000, timeout: 5000 }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  return state;
}
