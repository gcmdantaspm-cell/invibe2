export interface Event {
  id: string;
  title: string;
  location: string;
  distance: string;
  imageUrl: string;
  date: string;
  price: string;
  tags: string[];
}

export const MOCK_EVENTS: Event[] = [
  {
    id: '1',
    title: 'Neon Nights DJ Set',
    location: 'Club Vértice, Centro',
    distance: '1.2 km',
    imageUrl: 'https://images.unsplash.com/photo-1574391884720-bbc3740c59d1?auto=format&fit=crop&q=80&w=800',
    date: 'Hoje, 23:00',
    price: 'R$ 50',
    tags: ['Eletrônica', 'Festa']
  },
  {
    id: '2',
    title: 'Sunset Lounge',
    location: 'Rooftop do Hotel Marina',
    distance: '3.5 km',
    imageUrl: 'https://images.unsplash.com/photo-1544785316-6e58aed68a50?auto=format&fit=crop&q=80&w=800',
    date: 'Amanhã, 17:00',
    price: 'R$ 80',
    tags: ['Deep House', 'Lounge']
  },
  {
    id: '3',
    title: 'Festival de Indie Rock',
    location: 'Arena Open Air',
    distance: '5.0 km',
    imageUrl: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&q=80&w=800',
    date: 'Sáb, 14:00',
    price: 'R$ 120',
    tags: ['Rock', 'Festival']
  },
  {
    id: '4',
    title: 'Jazz & Wine',
    location: 'Bistrô Boêmio',
    distance: '800 m',
    imageUrl: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&q=80&w=800',
    date: 'Hoje, 20:00',
    price: 'R$ 35',
    tags: ['Jazz', 'Bar']
  }
];
