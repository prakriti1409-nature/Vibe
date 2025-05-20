// firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDm6aX7duSSQnF3pLyfDNaYsf04bUsbDIo",
  authDomain: "vibe-check-ba55e.firebaseapp.com",
  projectId: "vibe-check-ba55e",
  storageBucket: "vibe-check-ba55e.firebasestorage.app",
  messagingSenderId: "652321153003",
  appId: "1:652321153003:web:31ff9d5e2c8128ea2b43ae",
  measurementId: "G-5FKTDDF4ST"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
