import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, User, LogOut } from 'lucide-react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Logo } from '../../utls/imagepath';
import DropdownThreeBG from './DropdownThreeBG';
import { useGetUserQuery } from '../../store/hooks';

const navLinks = [
  { label: 'Home', href: '#' },
  { label: 'About Us', href: '#' },
  { label: 'Pricing', href: '#' },
  { label: 'Contact Us', href: '#' },
];

const Header = () => {
  const [selected, setSelected] = useState('Home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Check if user has a token
  const token = localStorage.getItem('token');
  
  // RTK Query hooks for authentication - only call if token exists
  const { data: userData } = useGetUserQuery(undefined, {
    skip: !token, // Skip query if no token is available
  });
  const user = userData?.data?.user;
  const isAuthenticated = !!user && !!token;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 1);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300${scrolled ? ' shadow-lg' : ''}`}
      style={scrolled
        ? { background: 'linear-gradient(90deg, #05051F 16.76%, #9F5EB0 140.63%), linear-gradient(122.01deg, #0A0B10 0%, #1A1339 50%, #402659 100%)' }
        : undefined}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <nav className="flex items-center justify-between">
          <LazyLoadImage
            effect="blur"
            src={Logo}
            alt="Logo"
            className="md:h-8 h-10 lg:h-[70px] cursor-pointer"
            onClick={() => {
              setSelected('Home');
              navigate('/');
            }}
          />

          <div className="hidden md:flex items-center space-x-4">
            {navLinks.map((link) => {
              let isActive = false;
              if (link.label === 'Home' && location.pathname === '/') isActive = true;
              if (link.label === 'About Us' && location.pathname === '/aboutus') isActive = true;
              if (link.label === 'Pricing' && location.pathname === '/pricing') isActive = true;
              if (link.label === 'Contact Us' && location.pathname === '/contact') isActive = true;
              return (
                <button
                  key={link.label}
                  onClick={() => {
                    setSelected(link.label);
                    if (link.label === 'Home') navigate('/');
                    if (link.label === 'About Us') navigate('/aboutus');
                    if (link.label === 'Pricing') navigate('/pricing');
                    if (link.label === 'Contact Us') navigate('/contact');
                  }}
                  className={`relative px-1 focus:outline-none ${
                    isActive ? 'text-white' : 'text-gray-300 hover:text-white transition-colors duration-200'
                  }`}
                >
                  <span className="inline-block pb-1">{link.label}</span>
                  {isActive && (
                    <span className="absolute left-0 right-0 bottom-0 h-1 bg-[#CC66FF] rounded-full w-full"></span>
                  )}
                </button>
              );
            })}

            {/* Authentication Section */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                  className="flex items-center space-x-2 bg-gradient-to-r from-[#7F66FF] to-[#CC66FF] text-white px-4 py-2 rounded-full transition-all duration-200 transform hover:scale-105"
                >
                  <User size={20} />
                  <span>{user?.firstName || 'Profile'}</span>
                </button>

                {showProfileDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-10">
                    <button
                      onClick={() => {
                        navigate('/dashboard');
                        setShowProfileDropdown(false);
                      }}
                      className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      Dashboard
                    </button>
                    <button
                      onClick={() => {
                        localStorage.clear();
                        setShowProfileDropdown(false);
                        window.location.reload();
                      }}
                      className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors flex items-center"
                    >
                      <LogOut size={16} className="mr-2" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => navigate('/register')}
                className="bg-gradient-to-r from-[#7F66FF] to-[#CC66FF] text-white px-6 py-2 rounded-full transition-all duration-200 transform hover:scale-105"
              >
                Get Started
              </button>
            )}
          </div>

          <button
            className="md:hidden text-white"
            onClick={() => setMenuOpen(!menuOpen)}
            onMouseEnter={() => setMenuOpen(true)}
            onMouseLeave={() => setMenuOpen(false)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
        {menuOpen && (
          <div
            className="md:hidden mt-4 bg-[#1A1339] rounded-xl shadow-lg p-6 flex flex-col space-y-4 relative overflow-hidden animate-waterfall"
            style={{ minHeight: 220 }}
          >
            <DropdownThreeBG />
            <div className="relative z-10 flex flex-col space-y-2">
              {navLinks.map((link) => {
                let isActive = false;
                if (link.label === 'Home' && location.pathname === '/') isActive = true;
                if (link.label === 'About Us' && location.pathname === '/aboutus') isActive = true;
                if (link.label === 'Pricing' && location.pathname === '/pricing') isActive = true;
                if (link.label === 'Contact Us' && location.pathname === '/contact') isActive = true;
                return (
                  <button
                    key={link.label}
                    onClick={() => {
                      setSelected(link.label);
                      setMenuOpen(false);
                      if (link.label === 'Home') navigate('/');
                      if (link.label === 'About Us') navigate('/aboutus');
                      if (link.label === 'Pricing') navigate('/pricing');
                      if (link.label === 'Contact Us') navigate('/contact');
                    }}
                    className={`text-left px-2 py-2 rounded ${
                      isActive ? 'text-white bg-[#CC66FF]' : 'text-gray-300 hover:text-white hover:bg-[#CC66FF]/30'
                    }`}
                  >
                    {link.label}
                  </button>
                );
              })}

              {/* Mobile Authentication */}
              {isAuthenticated ? (
                <>
                  <button
                    onClick={() => {
                      navigate('/dashboard');
                      setMenuOpen(false);
                    }}
                    className="text-left px-2 py-2 rounded text-gray-300 hover:text-white hover:bg-[#CC66FF]/30"
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={() => {
                      localStorage.clear();
                      setMenuOpen(false);
                      window.location.reload();
                    }}
                    className="text-left px-2 py-2 rounded text-gray-300 hover:text-white hover:bg-[#CC66FF]/30 flex items-center"
                  >
                    <LogOut size={16} className="mr-2" />
                    Logout
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    navigate('/register');
                    setMenuOpen(false);
                  }}
                  className="bg-gradient-to-r from-[#7F66FF] to-[#CC66FF] text-white px-2 py-2 rounded"
                >
                  Get Started
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;