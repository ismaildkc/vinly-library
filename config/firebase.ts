import { initializeApp } from 'firebase/app';
import { initializeAuth, browserLocalPersistence, inMemoryPersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

// Initialize web Firebase
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);

// Initialize auth with platform-specific persistence
// For React Native, we'll use in-memory persistence for now
// Note: This will show a warning, but it's the simplest approach without native modules
const auth = initializeAuth(app, { 
  persistence: Platform.OS === 'web' ? browserLocalPersistence : inMemoryPersistence
});

// Initialize Firestore
const db = getFirestore(app);

export { auth, db };