import { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/header/Header';
import Footer from '../components/Footer';

interface LayoutProps {
  children?: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {children || <Outlet />}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
