'use client';

import { ReactNode, useEffect } from 'react';
import { useAuth } from './AuthProvider';
import { useRouter } from 'next/navigation';

interface Props {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: Props) {
  const { user, getUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const isAuth = getUser();
    !isAuth && router.push('/auth/login');
  }, [router, getUser]);

  if (!user) {
    return null;
  }

  return <>{children}</>;
}
