export interface User {
  id: string;
  name: string;
  username: string;
  avatarUrl: string;
  status: string;
  bio?: string;
  distance?: string;
  age?: number;
  gallery: string[];
}

export interface Event {
  id: string;
  title: string;
  description: string;
  type: string;
  distance: string;
  time: string;
  themeColor: 'primary' | 'secondary' | 'tertiary';
  isPrivate: boolean;
  hostId: string;
  participantIds: string[];
}

export interface Post {
  id: string;
  userId: string;
  timeAgo: string;
  content: string;
  imageUrl?: string;
  hypes: number;
  comments: number;
  eventId?: string; // Optional linkage to an event
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  time: string;
}

export interface Chat {
  id: string;
  participantId: string;
  messages: Message[];
}

export const PROFILE_GALLERY = [
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCuMbuCJBZJjMwgXrb66ci7UCgETxEFQS22Qh6Da22ldH8a4WIu1Ly_S57g8eZY3w06IeGfgu3TTSm60vGQhFpAPxDuj3g4vZ6O3YWych812RzpMAZzLIAvqdss-fibCSRKzmdgFYlqxrvLN-do1HuaHDtlxfzpKYH0TUufZAncg9yZHLGE33mjzFIlagiJALCQKqf2Yw1RqWdBPeHFpFsjxsu9mNYA_pveh_2_KjtY0LDcXPuL-4Xa',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCdZWnDlggbbYhAK5YZtbXNBGdyd_vo3G2l6WYQwUweBkbpWtgJGaAockK7tiDfwfwms5roxGzqSqwfYjpOHAhwXB50n-iKtNAeAdqGtz3TO1gOz7OiiIDSc2EqL6zZS9FDzv-Iznd7RpTABR6bBfNMEj61fChdiWF9VAnDE47gdq6I9Rm8iWZOsoNgjJS36Kqg3InmCJKq9QTjf-_wHef90yqwalr5jMuGttbO9me8N8VxXEtvX7WR',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBgbalRrKKdXl6E8IIwZbBVHiETvn7-dK0Ib6GT-wFzLk4RQOj_GRcmQSuQ0NTpx2N-DaruMOnlAIHVtviJELQlYVvI5KWoPWRNrSMhze_yO6qEDeAixGr62RFSf1WV81tpZoT1atsfqGrprKGaditf7HjnGNuIxtCliASZGntozsB9Oyf7WAd8Sp0C9oqGlHMraT2_pD5KqLCmelD7V_nqqOQ5xEUoUQHq3YJ4PhDpI42q6lr8s5x9',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAaDcWr4WGHZLXRNDTrAEC3fkZOVy5Xq0f8CLrZTvghgKrsnZbAFJ-gMsN7Lqn_c_pd4WKMgkLFXIEwdmtXsumBlnM-vraE72g8CN7fDXdQmp7URGJDjPI0xqVTxrgOecGQVvFzvLfERBAKg_4MeRsw0ofGslorO7q3O0bAAJe1Pgc9RjPXd38eHTuBmlw4e916BiGMwKA1-OuYMd0GWzfjuzw30ScwJtBjz86CwFB7m9o9htVHxZw5',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAuUtfuXX7WKm0qDllY4M5mSZR94Xu5UOKv7YvUPG9InctcA-OoHRfpPydarM6d-7PQrYZP2iZpogH1c_rr2GqhTI8w7STl4K-lDbYHddwE_qn14DjBSZGtz_ukrmM-GgyjW-NrJ1ZNyhJ7dKT9T-0fqaojevgn_MGRIAnb76jbeP87V3V21dfVyBhorTlpnDQSnrZYcIRjOJrwh5m3aqMq7mmKFpWUJzpJ_SK8gn2ilxWVpK1nadg2'
];

export const CURRENT_USER: User = {
  id: 'u1',
  name: 'Alex Nova',
  username: '@alexnova',
  avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBh6QMtPDORjRpegJlcXTSUChYLRfObl5pQnAm94PF7beQCBNxVfRDoPRwM1nsSrHBKVr5JmqAgRR-dM3Ii_NGnIbJTjspODpYFQa8HGZK4qnGVTsFJrdp-cEvXmU0be1OK8JDbuCSnd_MuXbFZ_03JBFwiBwJG0rC7105AWvjEruwFMLnD1_5MVoVQ1TM3lL_-Ef5Z-Fny8bQ7tgflePE0T-paYkiHjT6ijIq0iP7s5ZVGbc_gtgSG',
  status: 'Hypando o rolê!',
  bio: 'Apenas aproveitando a vibe. 🌆',
  gallery: [...PROFILE_GALLERY]
};

export const MOCK_USERS: User[] = [
  {
    id: 'u2',
    name: 'Alex',
    age: 24,
    username: '@alex',
    status: 'Online',
    distance: '10m away',
    bio: 'Music is my escape.',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBJpxF0xYrd4ginQhQKm_yUosystTN8O6M2rkb1IwMJt66XTyMcyTD1OWapKN-gMzh-5Wwad3ZCxPKbIXPRXawjG_fKtXp9wbCf_EY5L7TaGfk7qv30Tzu7e1SFfLJiDe9PlDKjBzLE2Mi8CdFNjpIXKS1M-iDqQfV1h_VzinIIXJQ79CVj6u_gb0I3e33QeuE20UK89jMoQfC77YsGDLNR1ZglRqmyYPi1JBC8jRZIAGQuRTJiM9h3',
    gallery: [PROFILE_GALLERY[1], PROFILE_GALLERY[2]]
  },
  {
    id: 'u3',
    name: 'Leo',
    age: 26,
    username: '@leo',
    status: 'Offline',
    distance: '15m away',
    bio: 'Photographer / Nocturnal.',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCyI68gJ1-_JYHUo4PJ3_-c_KHC1BG3uXzAx-fFEE04X_ZSWlLypyQ4VBt2XKV5mDdpmLipKG-EV9eyKrFiQz0MLqY2uXU2skLnkGsJGs0HiwZwxYTQvsq5x-cLsAtd1g4sGAkIxu25Q8fcWS_rTRqIS_OYuoEKd3bYKFjVfcNoag2dITaz2Z5d2f8GJLMxBwqNwK5Mn3YUxR5ydJKBor3K1ex3WYnrGS1MWFxX4BJQjxh6bU5Vtw2E',
    gallery: [PROFILE_GALLERY[3], PROFILE_GALLERY[4]]
  },
  {
    id: 'u4',
    name: 'Sam',
    age: 22,
    username: '@sam',
    status: 'Online',
    distance: '20m away',
    bio: 'Always looking for the next party.',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA9ueWfr-ldsLmHy-qNOvjwUJBltrMTxrDm6Wx4eqGP8cSVMtBcBvkE2JKTr8niiN0PgT8BFrV19DyPkgw0PqDiq1rRQw_5y0zq-kHhAY3D16QjgE6IaiDyTUk5pR_ooK-NERDEdOG_bYOsygyuohVkpdQoBP0Qsz68Wi4VzzM5NhTOCm15m36JvidZYvywG_zOoyTq-of59ywW-CNl1PD4Phk3baPE-8IczEI2Pvml8aSpvWphz_q0',
    gallery: [PROFILE_GALLERY[0], PROFILE_GALLERY[1]]
  },
  {
    id: 'u5',
    name: 'Zeta',
    age: 28,
    username: '@zeta',
    status: 'Busy',
    distance: '50m away',
    bio: 'Chilling at the rooftop.',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCkS8_2yf_vvhuf92aIcaPh5oHU4lVYEsM-i3xFWdv-wYpQQDGA1Aty9oYBTWcXPE3cPMYk0W0DYjvWvUKxFkPkZPkHrFbjo-mBSekR7pnnQVNnaooM9O7FKkvpV9wxN_cFJVmfVhQuHN07Vz_dE9KsIwMtql5qy1cVlR4mF_8BsqxhWpaCiplhHsnjqR0l9khkx4wSHBChvpVTZCzNTJ2_FUUV17Z9RrJK4P_qmEevq6pUqmJ1tZCM',
    gallery: [PROFILE_GALLERY[2], PROFILE_GALLERY[3]]
  }
];

export const MOCK_EVENTS: Event[] = [
  { 
    id: 'e1', 
    title: 'Neon Nights Rave', 
    description: 'A maior festa neon da cidade!', 
    type: 'local_fire_department', 
    distance: '0.8 km', 
    time: 'Em 2h', 
    themeColor: 'primary', 
    isPrivate: false, 
    hostId: 'u2', 
    participantIds: ['u1', 'u2', 'u3', 'u4'] 
  },
  { 
    id: 'e2', 
    title: 'Rooftop Chill', 
    description: 'Encontro exclusivo no terraço.', 
    type: 'music_note', 
    distance: '1.2 km', 
    time: 'Agora', 
    themeColor: 'secondary', 
    isPrivate: true, 
    hostId: 'u5', 
    participantIds: ['u5'] 
  },
  { 
    id: 'e3', 
    title: 'Feira Urbana', 
    description: 'Arte e cultura nas ruas.', 
    type: 'storefront', 
    distance: '2.5 km', 
    time: 'Amanhã', 
    themeColor: 'tertiary', 
    isPrivate: false, 
    hostId: 'u4', 
    participantIds: ['u4', 'u3'] 
  }
];

export const MOCK_POSTS: Post[] = [
  {
    id: 'p1',
    userId: 'u2',
    eventId: 'e1',
    timeAgo: 'Just now',
    content: 'This vibe is absolutely unmatched! ⚡️🌃',
    imageUrl: PROFILE_GALLERY[0],
    hypes: 2400,
    comments: 128
  },
  {
    id: 'p2',
    userId: 'u4',
    eventId: 'e1',
    timeAgo: '15m ago',
    content: 'Refueling before heading back to the main stage. 🍹',
    imageUrl: PROFILE_GALLERY[1],
    hypes: 856,
    comments: 42
  }
];

export const MOCK_CHATS: Chat[] = [
  {
    id: 'c1',
    participantId: 'u2',
    messages: [
      { id: 'm1', senderId: 'u2', text: 'E aí, vai pro Neon Nights hoje?', time: '20:00' },
      { id: 'm2', senderId: 'u1', text: 'Com certeza! Já tô indo pra lá.', time: '20:05' }
    ]
  }
];
