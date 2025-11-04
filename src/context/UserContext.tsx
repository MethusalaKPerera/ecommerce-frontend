import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'customer';
}

interface UserContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  isAdmin: () => boolean;
  isAuthenticated: () => boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error loading user:', error);
      }
    }
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const login = (email: string, password: string): boolean => {
    if (email === 'admin@ecommerce.com' && password === 'admin123') {
      const adminUser: User = {
        id: 1,
        name: 'Admin User',
        email: 'admin@ecommerce.com',
        role: 'admin',
      };
      setUser(adminUser);
      return true;
    } else if (email === 'customer@ecommerce.com' && password === 'customer123') {
      const customerUser: User = {
        id: 2,
        name: 'Customer User',
        email: 'customer@ecommerce.com',
        role: 'customer',
      };
      setUser(customerUser);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const isAdmin = (): boolean => {
    return user?.role === 'admin';
  };

  const isAuthenticated = (): boolean => {
    return user !== null;
  };

  const value = {
    user,
    login,
    logout,
    isAdmin,
    isAuthenticated,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};