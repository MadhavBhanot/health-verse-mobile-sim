
import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'patient' | 'doctor' | 'pharmacy' | null;

interface UserData {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface UserContextType {
  user: UserData | null;
  setUser: React.Dispatch<React.SetStateAction<UserData | null>>;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  setRole: (role: UserRole) => void;
}

// Predefined user credentials for simulation
const DEMO_USER = {
  email: 'demo@example.com',
  password: 'password123',
  name: 'Demo User'
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const isAuthenticated = !!user;

  useEffect(() => {
    // Load user from localStorage on initial render
    const storedUser = localStorage.getItem('healthverse_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem('healthverse_user');
      }
    }
  }, []);

  useEffect(() => {
    // Save user to localStorage when it changes
    if (user) {
      localStorage.setItem('healthverse_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('healthverse_user');
    }
  }, [user]);

  const login = async (email: string, password: string): Promise<boolean> => {
    // For demo, accept the fixed credentials or auto-login with any credentials
    return new Promise((resolve) => {
      setTimeout(() => {
        // Accept either the demo credentials or any non-empty input
        if ((email === DEMO_USER.email && password === DEMO_USER.password) || 
            (email && password.length > 0)) {
          setUser({
            id: Math.random().toString(36).substring(2, 9),
            name: email === DEMO_USER.email ? DEMO_USER.name : email.split('@')[0],
            email,
            role: null,
          });
          resolve(true);
        } else {
          resolve(false);
        }
      }, 500);
    });
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    // For demo, auto-register with any input
    return new Promise((resolve) => {
      setTimeout(() => {
        if (name && email && password.length > 0) {
          setUser({
            id: Math.random().toString(36).substring(2, 9),
            name,
            email,
            role: null,
          });
          resolve(true);
        } else {
          resolve(false);
        }
      }, 500);
    });
  };

  const logout = () => {
    setUser(null);
  };

  const setRole = (role: UserRole) => {
    if (user) {
      setUser({ ...user, role });
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        isAuthenticated,
        login,
        register,
        logout,
        setRole,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
