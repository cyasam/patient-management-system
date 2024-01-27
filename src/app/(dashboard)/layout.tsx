import { Metadata } from 'next';
import AppLayout from '@/layouts/dashboard/Layout';
import SplashScreen from '@/components/SplashScreen';
import { mainPageTitle } from '@/utils';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

export const metadata: Metadata = {
  title: mainPageTitle,
  description: mainPageTitle,
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute>
      <AppLayout>
        <SplashScreen />
        {children}
      </AppLayout>
    </ProtectedRoute>
  );
}
