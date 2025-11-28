import { ReactNode } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../components/header/Header';
import Footer from '../components/header/Footer';
import Fab from '../components/fab/Fab';

interface LayoutProps {
  children?: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const fabHiddenPaths = ['/login', '/register', '/forgot-password'];

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {children || <Outlet />}
      </main>
      {!fabHiddenPaths.includes(location.pathname) && <Fab />}
      <Footer />
    </div>
  );
};

export default Layout;
