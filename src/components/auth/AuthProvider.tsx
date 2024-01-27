'use client';

import { login, logout } from '@/utils/auth/fetch';
import { useRouter } from 'next/navigation';
import { createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'universal-cookie';

interface ContextData {
  user: any;
  signin: (email: string, password: string) => Promise<any>;
  signout: () => Promise<any>;
  getUser: () => any;
}

const AuthContext = createContext<ContextData>({
  user: null,
  signin: (email, password) => Promise.resolve(),
  signout: () => Promise.resolve(),
  getUser: () => null,
});

const cookies = new Cookies(null, { path: '/' });

export default function AuthProvider(props: React.PropsWithChildren) {
  const [user, setUser] = useState(null);
  const router = useRouter();

  const signin = async (email: string, password: string) => {
    const userCredentials = await login(email, password);
    const currentUser = userCredentials.user;

    setUser(currentUser);
    cookies.set('user', currentUser);

    router.push('/');
  };

  const signout = async () => {
    await logout();

    setUser(null);
    cookies.remove('user');

    router.push('/auth/login');
  };

  const getUser = () => {
    return cookies.get('user');
  };

  useEffect(() => {
    const user = getUser();

    if (user) {
      setUser(user);
    } else {
      setUser(null);
      router.push('/auth/login');
    }
  }, [router]);

  return (
    <AuthContext.Provider
      value={{ user, signin, signout, getUser }}
      {...props}
    />
  );
}

export const useAuth = () => useContext(AuthContext);
