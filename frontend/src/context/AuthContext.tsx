'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import Cookies from 'js-cookie';
import api from '@/lib/api';
import { useRouter } from 'next/navigation';

interface User {
  id: number;
  email: string;
  name: string;
  role: 'borrower' | 'lender';
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (token: string, redirectUrl?: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const token = Cookies.get('token');
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const { data } = await api.get('/me');
        setUser(data);
      } catch (err) {
        console.error('Failed to fetch user', err);
        Cookies.remove('token');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const login = async (token: string, redirectUrl?: string) => {
    Cookies.set('token', token, { expires: 7 }); // 7 days
    try {
      const { data } = await api.get('/me');
      setUser(data);
      if (redirectUrl) {
        router.push(redirectUrl);
      } else {
        router.push(data.role === 'borrower' ? '/borrower/dashboard' : '/lender/dashboard');
      }
    } catch (err) {
      console.error('Failed to fetch user after login', err);
      Cookies.remove('token');
    }
  };

  const logout = () => {
    Cookies.remove('token');
    setUser(null);
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
