
import React, { createContext, useContext, useState, useEffect } from 'react';

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

  // Mock authentication for prototype
  useEffect(() => {
    // Check if there's a user in localStorage (simulating persistence)
    const storedUser = localStorage.getItem('blindapp_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setAuthStatus('authenticated');
    } else {
      setAuthStatus('unauthenticated');
    }
  }, []);

  // Mock login function
  const login = async (email: string, password: string) => {
    // Simulate API call
    setAuthStatus('loading');
    
    try {
      // This would be a real API call in production
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For prototype, we'll just set a fake user based on the selected mode
      const mockUser: UserData = {
        id: '123',
        email,
        name: selectedMode === 'personal' ? 'John Doe' : 'Vision NGO',
        mode: selectedMode || 'personal',
        ...(selectedMode === 'personal' 
          ? {
              age: 42,
              gender: 'Male',
              stickSIM: 'SIM123456789',
              caretakerNumber: '+1234567890'
            } 
          : {
              ngoName: 'Vision NGO',
              ngoEmail: email,
              ngoMobile: '+9876543210'
            }
        )
      };
      
      setUser(mockUser);
      localStorage.setItem('blindapp_user', JSON.stringify(mockUser));
      setAuthStatus('authenticated');
    } catch (error) {
      console.error('Login failed:', error);
      setAuthStatus('unauthenticated');
      throw new Error('Login failed. Please check your credentials.');
    }
  };

  // Mock register function
  const register = async (userData: Partial<UserData>, password: string) => {
    setAuthStatus('loading');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newUser: UserData = {
        id: Math.random().toString(36).substring(2, 9),
        email: userData.email || '',
        name: userData.name || '',
        mode: selectedMode || 'personal',
        ...userData
      };
      
      setUser(newUser);
      localStorage.setItem('blindapp_user', JSON.stringify(newUser));
      setAuthStatus('authenticated');
    } catch (error) {
      console.error('Registration failed:', error);
      setAuthStatus('unauthenticated');
      throw new Error('Registration failed. Please try again.');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('blindapp_user');
    setAuthStatus('unauthenticated');
    setSelectedMode(null);
  };

  const updateProfile = async (data: Partial<UserData>) => {
    if (!user) throw new Error('No user logged in');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const updatedUser = { ...user, ...data };
      setUser(updatedUser);
      localStorage.setItem('blindapp_user', JSON.stringify(updatedUser));
      
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
