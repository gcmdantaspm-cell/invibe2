export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoUrl?: string;
  status?: string;
  interactionsCount: number;
}

export interface EventModel {
  id: string;
  title: string;
  type: string; // Festa, Supermercado, Educacional, Bairro, Rua
  locationName: string;
  creatorId: string;
  createdAt: any;
  expiresAt: any;
}

export interface PostModel {
  id: string;
  eventId: string;
  userId: string;
  userName: string;
  userPhotoUrl?: string;
  content: string;
  hypeCount: number;
  createdAt: any;
}

export interface InteractionRequest {
  id: string;
  fromUserId: string;
  fromUserName: string;
  toUserId: string;
  status: 'pending' | 'accepted' | 'rejected';
}
