import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, doc, getDoc, getDocs, setDoc, writeBatch } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Event, Post, User, MOCK_EVENTS, MOCK_USERS, MOCK_POSTS, CURRENT_USER } from '../data';

// Helper hook to sync events
export function useEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'events'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Event));
      setEvents(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return { events, loading };
}

// Helper hook to sync posts
export function usePosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'posts'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Post));
      setPosts(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return { posts, loading };
}

// Helper hook to sync nearby users
export function useNearbyUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'users'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as User));
      setUsers(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return { users, loading };
}

// One-time seed function to populate the database with our mocks if empty
export async function seedDatabase() {
  const eventsSnap = await getDocs(collection(db, 'events'));
  if (!eventsSnap.empty) return; // Already seeded

  console.log("Seeding database...");
  const batch = writeBatch(db);

  MOCK_EVENTS.forEach(ev => {
    const docRef = doc(db, 'events', ev.id);
    batch.set(docRef, ev);
  });

  MOCK_USERS.forEach(u => {
    const docRef = doc(db, 'users', u.id);
    batch.set(docRef, u);
  });
  
  // also add current user to users
  batch.set(doc(db, 'users', CURRENT_USER.id), CURRENT_USER);

  MOCK_POSTS.forEach(p => {
    const docRef = doc(db, 'posts', p.id);
    batch.set(docRef, p);
  });

  await batch.commit();
  console.log("Database seeded successfully!");
}
