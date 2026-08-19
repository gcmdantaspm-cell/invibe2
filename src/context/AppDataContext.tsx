import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Event, User, Post, Chat, Message, MOCK_EVENTS, MOCK_USERS, MOCK_POSTS, MOCK_CHATS, CURRENT_USER } from '../data';

interface AppDataContextType {
  events: Event[];
  users: User[];
  posts: Post[];
  chats: Chat[];
  currentUser: User;
  hypedPhotos: Set<string>;
  createEvent: (event: Omit<Event, 'id' | 'hostId' | 'participantIds'>) => void;
  joinEvent: (eventId: string) => void;
  sendMessage: (chatId: string, text: string) => void;
  toggleHypePhoto: (userId: string, photoUrl: string) => void;
  toggleHypePost: (postId: string) => void;
  getChatByUserId: (userId: string) => Chat | undefined;
  createChat: (userId: string) => Chat;
}

const AppDataContext = createContext<AppDataContextType | undefined>(undefined);

export function AppDataProvider({ children }: { children: ReactNode }) {
  const [events, setEvents] = useState<Event[]>(MOCK_EVENTS);
  const [users, setUsers] = useState<User[]>(MOCK_USERS);
  const [posts, setPosts] = useState<Post[]>(MOCK_POSTS);
  const [chats, setChats] = useState<Chat[]>(MOCK_CHATS);
  const [hypedPhotos, setHypedPhotos] = useState<Set<string>>(new Set());

  const createEvent = (eventData: Omit<Event, 'id' | 'hostId' | 'participantIds'>) => {
    const newEvent: Event = {
      ...eventData,
      id: `e_${Date.now()}`,
      hostId: CURRENT_USER.id,
      participantIds: [CURRENT_USER.id],
    };
    setEvents(prev => [...prev, newEvent]);
  };

  const joinEvent = (eventId: string) => {
    setEvents(prev => prev.map(ev => {
      if (ev.id === eventId && !ev.participantIds.includes(CURRENT_USER.id)) {
        return { ...ev, participantIds: [...ev.participantIds, CURRENT_USER.id] };
      }
      return ev;
    }));
  };

  const getChatByUserId = (userId: string) => {
    return chats.find(c => c.participantId === userId);
  };

  const createChat = (userId: string) => {
    const existing = getChatByUserId(userId);
    if (existing) return existing;

    const newChat: Chat = {
      id: `c_${Date.now()}`,
      participantId: userId,
      messages: []
    };
    setChats(prev => [...prev, newChat]);
    return newChat;
  };

  const sendMessage = (chatId: string, text: string) => {
    setChats(prev => prev.map(chat => {
      if (chat.id === chatId) {
        return {
          ...chat,
          messages: [...chat.messages, {
            id: `m_${Date.now()}`,
            senderId: CURRENT_USER.id,
            text,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }]
        };
      }
      return chat;
    }));
  };

  const toggleHypePhoto = (userId: string, photoUrl: string) => {
    const id = `${userId}_${photoUrl}`;
    setHypedPhotos(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleHypePost = (postId: string) => {
    // We could store it similarly to hypedPhotos if needed.
    // For now, let's just do a simple dummy state to pass to the component.
    setPosts(prev => prev.map(post => {
       if (post.id === postId) {
           // Basic toggle representation, since we are doing full mock.
           // You would usually store "hasHyped" array in context.
           return { ...post }; 
       }
       return post;
    }));
  };

  return (
    <AppDataContext.Provider value={{
      events, users, posts, chats, currentUser: CURRENT_USER, hypedPhotos,
      createEvent, joinEvent, sendMessage, toggleHypePhoto, toggleHypePost, getChatByUserId, createChat
    }}>
      {children}
    </AppDataContext.Provider>
  );
}

export function useAppData() {
  const context = useContext(AppDataContext);
  if (context === undefined) {
    throw new Error('useAppData must be used within an AppDataProvider');
  }
  return context;
}
