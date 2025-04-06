
import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  User as FirebaseUser
} from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';

// Define types for our context
type UserMode = 'personal' | 'ngo';
type AuthStatus = 'unauthenticated' | 'authenticated' | 'loading';

export interface UserData {
  id: string;
  name: string;
  email: string;
  mode: UserMode;
  age?: number;
  gender?: string;
  stickSIM?: string;
  caretakerNumber?: string;
  ngoName?: string;
  ngoEmail?: string;
  ngoMobile?: string;
}

interface AuthContextType {
  user: UserData | null;
  authStatus: AuthStatus;
  selectedMode: UserMode | null;
  setSelectedMode: (mode: UserMode | null) => void;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: Partial<UserData>, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<UserData>) => Promise<void>;
}

// Create context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  authStatus: 'loading',
  selectedMode: null,
  setSelectedMode: () => {},
  login: async () => {},
  register: async () => {},
  logout: () => {},
  updateProfile: async () => {},
});

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);

// Provider component to wrap our app with
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [authStatus, setAuthStatus] = useState<AuthStatus>('loading');
  const [selectedMode, setSelectedMode] = useState<UserMode | null>(null);
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);

  // Listen for Firebase auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setFirebaseUser(user);
      
      if (user) {
        try {
          // Get user data from Firestore
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          
          if (userDoc.exists()) {
            const userData = userDoc.data() as UserData;
            setUser({
              ...userData,
              id: user.uid,
              email: user.email || userData.email
            });
            // Set mode from user data
            if (userData.mode) {
              setSelectedMode(userData.mode);
            }
            setAuthStatus('authenticated');
          } else {
            // User exists in Auth but not in Firestore
            setAuthStatus('unauthenticated');
            await signOut(auth);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          setAuthStatus('unauthenticated');
        }
      } else {
        setUser(null);
        setAuthStatus('unauthenticated');
      }
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, []);

  // Firebase login function
  const login = async (email: string, password: string) => {
    setAuthStatus('loading');
    
    try {
      // Sign in with Firebase
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;
      
      // Get user data from Firestore
      const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
      
      if (userDoc.exists()) {
        const userData = userDoc.data() as UserData;
        
        // Ensure the user is logging into the correct mode
        if (userData.mode !== selectedMode) {
          await signOut(auth);
          throw new Error(`This account is registered as ${userData.mode} mode. Please select the correct mode.`);
        }
        
        setUser({
          ...userData,
          id: firebaseUser.uid,
          email: firebaseUser.email || userData.email
        });
        setAuthStatus('authenticated');
      } else {
        // User exists in Auth but not in Firestore
        await signOut(auth);
        throw new Error("User data not found. Please register again.");
      }
    } catch (error: any) {
      console.error('Login failed:', error);
      setAuthStatus('unauthenticated');
      
      // Handle Firebase specific errors with user-friendly messages
      if (error.code === 'auth/invalid-credential') {
        throw new Error('Invalid email or password. Please try again.');
      } else if (error.code === 'auth/too-many-requests') {
        throw new Error('Too many failed login attempts. Please try again later.');
      } else if (error.message) {
        throw new Error(error.message);
      } else {
        throw new Error('Login failed. Please check your credentials.');
      }
    }
  };

  // Firebase register function
  const register = async (userData: Partial<UserData>, password: string) => {
    setAuthStatus('loading');
    
    try {
      if (!userData.email) throw new Error("Email is required");
      
      // Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth, 
        userData.email, 
        password
      );
      const firebaseUser = userCredential.user;
      
      // Create user document in Firestore
      const newUser: UserData = {
        id: firebaseUser.uid,
        email: userData.email,
        name: userData.name || '',
        mode: selectedMode || 'personal',
        ...userData
      };
      
      // Save user data to Firestore
      await setDoc(doc(db, 'users', firebaseUser.uid), newUser);
      
      setUser(newUser);
      setAuthStatus('authenticated');
    } catch (error: any) {
      console.error('Registration failed:', error);
      setAuthStatus('unauthenticated');
      
      // Handle Firebase specific errors
      if (error.code === 'auth/email-already-in-use') {
        throw new Error('Email is already in use. Please use a different email or login.');
      } else if (error.code === 'auth/weak-password') {
        throw new Error('Password is too weak. Please use a stronger password.');
      } else if (error.message) {
        throw new Error(error.message);
      } else {
        throw new Error('Registration failed. Please try again.');
      }
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setAuthStatus('unauthenticated');
      setSelectedMode(null);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const updateProfile = async (data: Partial<UserData>) => {
    if (!user || !firebaseUser) throw new Error('No user logged in');
    
    try {
      // Update user document in Firestore
      const userRef = doc(db, 'users', firebaseUser.uid);
      await updateDoc(userRef, data);
      
      // Update local state
      const updatedUser = { ...user, ...data };
      setUser(updatedUser);
      
      return Promise.resolve();
    } catch (error) {
      console.error('Update failed:', error);
      throw new Error('Profile update failed');
    }
  };

  const contextValue = {
    user,
    authStatus,
    selectedMode,
    setSelectedMode,
    login,
    register,
    logout,
    updateProfile
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};
