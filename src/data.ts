export interface User {
  id: string;
  name: string;
  username: string;
  avatarUrl: string;
  status: string;
  distance?: string;
  age?: number;
}

export interface Post {
  id: string;
  user: User;
  timeAgo: string;
  content: string;
  imageUrl?: string;
  hypes: number;
  comments: number;
}

export interface Event {
  id: string;
  title: string;
  type: string;
  distance: string;
  time: string;
  themeColor: 'primary' | 'secondary' | 'tertiary';
}

export const CURRENT_USER: User = {
  id: 'u1',
  name: 'Alex Nova',
  username: '@alexnova',
  avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBh6QMtPDORjRpegJlcXTSUChYLRfObl5pQnAm94PF7beQCBNxVfRDoPRwM1nsSrHBKVr5JmqAgRR-dM3Ii_NGnIbJTjspODpYFQa8HGZK4qnGVTsFJrdp-cEvXmU0be1OK8JDbuCSnd_MuXbFZ_03JBFwiBwJG0rC7105AWvjEruwFMLnD1_5MVoVQ1TM3lL_-Ef5Z-Fny8bQ7tgflePE0T-paYkiHjT6ijIq0iP7s5ZVGbc_gtgSG',
  status: 'Curtindo o rolê!'
};

export const MOCK_USERS: User[] = [
  {
    id: 'u2',
    name: 'Alex',
    age: 24,
    username: '@alex',
    status: 'Online',
    distance: '10m away',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBJpxF0xYrd4ginQhQKm_yUosystTN8O6M2rkb1IwMJt66XTyMcyTD1OWapKN-gMzh-5Wwad3ZCxPKbIXPRXawjG_fKtXp9wbCf_EY5L7TaGfk7qv30Tzu7e1SFfLJiDe9PlDKjBzLE2Mi8CdFNjpIXKS1M-iDqQfV1h_VzinIIXJQ79CVj6u_gb0I3e33QeuE20UK89jMoQfC77YsGDLNR1ZglRqmyYPi1JBC8jRZIAGQuRTJiM9h3'
  },
  {
    id: 'u3',
    name: 'Leo',
    age: 26,
    username: '@leo',
    status: 'Offline',
    distance: '15m away',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCyI68gJ1-_JYHUo4PJ3_-c_KHC1BG3uXzAx-fFEE04X_ZSWlLypyQ4VBt2XKV5mDdpmLipKG-EV9eyKrFiQz0MLqY2uXU2skLnkGsJGs0HiwZwxYTQvsq5x-cLsAtd1g4sGAkIxu25Q8fcWS_rTRqIS_OYuoEKd3bYKFjVfcNoag2dITaz2Z5d2f8GJLMxBwqNwK5Mn3YUxR5ydJKBor3K1ex3WYnrGS1MWFxX4BJQjxh6bU5Vtw2E'
  },
  {
    id: 'u4',
    name: 'Sam',
    age: 22,
    username: '@sam',
    status: 'Online',
    distance: '20m away',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA9ueWfr-ldsLmHy-qNOvjwUJBltrMTxrDm6Wx4eqGP8cSVMtBcBvkE2JKTr8niiN0PgT8BFrV19DyPkgw0PqDiq1rRQw_5y0zq-kHhAY3D16QjgE6IaiDyTUk5pR_ooK-NERDEdOG_bYOsygyuohVkpdQoBP0Qsz68Wi4VzzM5NhTOCm15m36JvidZYvywG_zOoyTq-of59ywW-CNl1PD4Phk3baPE-8IczEI2Pvml8aSpvWphz_q0'
  },
  {
    id: 'u5',
    name: 'Zeta',
    age: 28,
    username: '@zeta',
    status: 'Busy',
    distance: '50m away',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCkS8_2yf_vvhuf92aIcaPh5oHU4lVYEsM-i3xFWdv-wYpQQDGA1Aty9oYBTWcXPE3cPMYk0W0DYjvWvUKxFkPkZPkHrFbjo-mBSekR7pnnQVNnaooM9O7FKkvpV9wxN_cFJVmfVhQuHN07Vz_dE9KsIwMtql5qy1cVlR4mF_8BsqxhWpaCiplhHsnjqR0l9khkx4wSHBChvpVTZCzNTJ2_FUUV17Z9RrJK4P_qmEevq6pUqmJ1tZCM'
  }
];

export const MOCK_POSTS: Post[] = [
  {
    id: 'p1',
    user: {
      id: 'u_dj',
      name: 'Neon DJ',
      username: '@neon_dj',
      avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA_bPv_HZ1LBYJwd14xMBQO5rUaYxM8an9jV8zDDzjXpuucaiGaTc22aQQqSAM9we_HAUB2hCMfm1Mv2DOdcI7wsbu-Pw1A29cx9KXGJBNnCoPT43Vil0KRWwPvVYdhA5E8w7ili5eN3XZFE8gHZlhyIergaqL2rTS4a-YRpDabbGWp167Iw3aeenjj0WBXlp6jKm5svD8HvWpgfcShA63n_D_H6wlC-Kb1uP2Eh9LXH2eRO9jcG567',
      status: 'Online'
    },
    timeAgo: 'Just now',
    content: 'This vibe is absolutely unmatched! ⚡️🌃 #FestaDoBairro',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAEtNwTkCZvFKxAg6zkhzsvRvx_ZYG-203soTS-DIfVrHgwDQJHeNH3aeE9ygdGopuHSqCIoD05NWs9JdmVCm92Oyi10rRQW3RJQNwIeiij8aHhmOxT3b9DU5xMcfRjJWLBnxZY-gaKsW4M1sGQms_6dPeGLvGunB2UhzwtKZTGBC7NUEL0Jysdp-rx_JFXxXZgIDYfnWUYPCfK-3v0bE5SNUuIiO7iZYEwTUKw4W2FsBfyr_ze9V5I',
    hypes: 2400,
    comments: 128
  },
  {
    id: 'p2',
    user: {
      id: 'u_art',
      name: 'Urban Art',
      username: '@urban_art',
      avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAIhyPqynhcf8vMisQF77SDyB3hE48kSaaIGNFHhybJOJfgD7vijhViKdO5hfGJNOxG_OhjvdxMnXuJ_2bdXdvKGoEOwDYD_DlhGAYKcm4RKyS1vzCuzQOeIIY-bdq5CYSU9hNkMmP8yzg5R1v52YTYTFZTu81MxfM4y1jd9SX9yAKQUSK3up6wl90LX2r1480ANWny2YF7lTDDae9nmbzUoKB3082KhyBrJ714tWgvBA7Mo3bqdpWI',
      status: 'Online'
    },
    timeAgo: '15m ago',
    content: 'Refueling before heading back to the main stage. 🍹',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBhtvSYAMcTk7RElNtEWVRZJnEouRMfc_tPVzUqHnguQaQ1Hy5uAkAF3LsEytvnCtW5zlAcrWyP7tEPtsOVeXnHwCi5-hYCCsDTn87DbbK29PgH2G2fF-wn3l0BHU-2Sl_SHXUnr6l8CKFJ1QXvO738OdjAu6CKWm2CMeZJIOhD0SV2MkUIhWlyqA8cBWfiw7QRnyI3EOk_fxveGZpkEty4kDsCJicCAx7zBXr3NBO5IrVaJeOMsZkx',
    hypes: 856,
    comments: 42
  }
];

export const MOCK_EVENTS: Event[] = [
  { id: 'e1', title: 'Neon Nights Rave', type: 'local_fire_department', distance: '0.8 km', time: 'Em 2h', themeColor: 'primary' },
  { id: 'e2', title: 'Rooftop Chill', type: 'music_note', distance: '1.2 km', time: 'Agora', themeColor: 'secondary' },
  { id: 'e3', title: 'Feira Urbana', type: 'storefront', distance: '2.5 km', time: 'Amanhã', themeColor: 'tertiary' }
];

export const PROFILE_GALLERY = [
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCuMbuCJBZJjMwgXrb66ci7UCgETxEFQS22Qh6Da22ldH8a4WIu1Ly_S57g8eZY3w06IeGfgu3TTSm60vGQhFpAPxDuj3g4vZ6O3YWych812RzpMAZzLIAvqdss-fibCSRKzmdgFYlqxrvLN-do1HuaHDtlxfzpKYH0TUufZAncg9yZHLGE33mjzFIlagiJALCQKqf2Yw1RqWdBPeHFpFsjxsu9mNYA_pveh_2_KjtY0LDcXPuL-4Xa',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCdZWnDlggbbYhAK5YZtbXNBGdyd_vo3G2l6WYQwUweBkbpWtgJGaAockK7tiDfwfwms5roxGzqSqwfYjpOHAhwXB50n-iKtNAeAdqGtz3TO1gOz7OiiIDSc2EqL6zZS9FDzv-Iznd7RpTABR6bBfNMEj61fChdiWF9VAnDE47gdq6I9Rm8iWZOsoNgjJS36Kqg3InmCJKq9QTjf-_wHef90yqwalr5jMuGttbO9me8N8VxXEtvX7WR',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBgbalRrKKdXl6E8IIwZbBVHiETvn7-dK0Ib6GT-wFzLk4RQOj_GRcmQSuQ0NTpx2N-DaruMOnlAIHVtviJELQlYVvI5KWoPWRNrSMhze_yO6qEDeAixGr62RFSf1WV81tpZoT1atsfqGrprKGaditf7HjnGNuIxtCliASZGntozsB9Oyf7WAd8Sp0C9oqGlHMraT2_pD5KqLCmelD7V_nqqOQ5xEUoUQHq3YJ4PhDpI42q6lr8s5x9',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAaDcWr4WGHZLXRNDTrAEC3fkZOVy5Xq0f8CLrZTvghgKrsnZbAFJ-gMsN7Lqn_c_pd4WKMgkLFXIEwdmtXsumBlnM-vraE72g8CN7fDXdQmp7URGJDjPI0xqVTxrgOecGQVvFzvLfERBAKg_4MeRsw0ofGslorO7q3O0bAAJe1Pgc9RjPXd38eHTuBmlw4e916BiGMwKA1-OuYMd0GWzfjuzw30ScwJtBjz86CwFB7m9o9htVHxZw5',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAuUtfuXX7WKm0qDllY4M5mSZR94Xu5UOKv7YvUPG9InctcA-OoHRfpPydarM6d-7PQrYZP2iZpogH1c_rr2GqhTI8w7STl4K-lDbYHddwE_qn14DjBSZGtz_ukrmM-GgyjW-NrJ1ZNyhJ7dKT9T-0fqaojevgn_MGRIAnb76jbeP87V3V21dfVyBhorTlpnDQSnrZYcIRjOJrwh5m3aqMq7mmKFpWUJzpJ_SK8gn2ilxWVpK1nadg2'
];
