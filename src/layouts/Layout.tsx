import { ReactNode } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../components/header/Footer';

interface LayoutProps {
  children?: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();

  // Auth landing (login/register) par footer hide karna hai
  const isAuthPage =
    typeof window !== 'undefined' &&
    ((window as any).__isAuthPage ||
      location.pathname === '/login' ||
      location.pathname === '/register');

  // Register page (signup) ke liye footer hide karna hai
  const isRegisterPage =
    typeof window !== 'undefined' &&
    location.pathname === '/' &&
    (window as any).__isRegisterPage;

  return (
    <div className="min-h-screen">
      <main>
        {children || <Outlet />}
      </main>
      {!isAuthPage && !isRegisterPage && <Footer />}
    </div>
  );
};

export default Layout;
