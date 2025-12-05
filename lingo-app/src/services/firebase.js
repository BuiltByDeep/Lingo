import { initializeApp } from 'firebase/app';
import { getDatabase, ref, push, onValue, set, serverTimestamp } from 'firebase/database';

// Firebase configuration - replace with your actual config
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "demo-key",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "demo.firebaseapp.com",
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL || "https://demo.firebaseio.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "demo-project",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "demo.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "123456789",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "demo-app-id"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Chat room functions
export const sendMessage = (roomId, message) => {
  const messagesRef = ref(database, `rooms/${roomId}/messages`);
  return push(messagesRef, {
    ...message,
    timestamp: serverTimestamp()
  });
};

export const subscribeToMessages = (roomId, callback) => {
  const messagesRef = ref(database, `rooms/${roomId}/messages`);
  return onValue(messagesRef, (snapshot) => {
    const messages = [];
    snapshot.forEach((childSnapshot) => {
      messages.push({
        id: childSnapshot.key,
        ...childSnapshot.val()
      });
    });
    callback(messages);
  });
};

export const updateUserPresence = (roomId, userId, userData) => {
  const userRef = ref(database, `rooms/${roomId}/users/${userId}`);
  return set(userRef, {
    ...userData,
    lastSeen: serverTimestamp()
  });
};

export const subscribeToUsers = (roomId, callback) => {
  const usersRef = ref(database, `rooms/${roomId}/users`);
  return onValue(usersRef, (snapshot) => {
    const users = [];
    snapshot.forEach((childSnapshot) => {
      users.push({
        userId: childSnapshot.key,
        ...childSnapshot.val()
      });
    });
    callback(users);
  });
};

export { database };
