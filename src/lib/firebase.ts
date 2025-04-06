
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAiSnsva3tO2ohqIEdxa5EnX0Pj7Fh60tw",
  authDomain: "sight-to-sense-app.firebaseapp.com",
  projectId: "sight-to-sense-app",
  storageBucket: "sight-to-sense-app.appspot.com",
  messagingSenderId: "849617149413",
  appId: "1:849617149413:web:b74b39c7fc43e5612730c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Enable persistence to allow offline capabilities
// This is important for a mobile-focused application
getFirestore(app)
  .enablePersistence({ synchronizeTabs: true })
  .catch((err) => {
    if (err.code === 'failed-precondition') {
      // Multiple tabs open, persistence can only be enabled in one tab at a time
      console.log('Persistence failed: Multiple tabs open');
    } else if (err.code === 'unimplemented') {
      // The current browser does not support all of the features required for persistence
      console.log('Persistence is not available in this browser');
    }
  });
