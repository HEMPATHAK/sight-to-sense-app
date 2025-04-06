
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, enableIndexedDbPersistence } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAiSnsvA3tO2ohqIEdxa5EnX0Pj7Fh60tw",
  authDomain: "smart-blind-stick-app.firebaseapp.com",
  projectId: "smart-blind-stick-app",
  storageBucket: "smart-blind-stick-app.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abc123def456ghi789jkl"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Enable persistence to allow offline capabilities
// This is important for a mobile-focused application
try {
  enableIndexedDbPersistence(db)
    .catch((err) => {
      if (err.code === 'failed-precondition') {
        // Multiple tabs open, persistence can only be enabled in one tab at a time
        console.log('Persistence failed: Multiple tabs open');
      } else if (err.code === 'unimplemented') {
        // The current browser does not support all of the features required for persistence
        console.log('Persistence is not available in this browser');
      }
    });
} catch (err) {
  console.log('Firebase persistence error:', err);
}
