import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Logo } from '../../utls/imagepath';
import DropdownThreeBG from './DropdownThreeBG';

const navLinks = [
  { label: 'Home', href: '#' },
  { label: 'About Us', href: '#' },
  { label: 'Pricing', href: '#' },
  { label: 'Contact Us', href: '#' },
  { label: 'Get Started', href: '#', special: 'getstarted' },
];

const Header = () => {
  const [selected, setSelected] = useState('Home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

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
          <img
            src={Logo}
            alt="Logo"
            className="h-20 cursor-pointer"
            onClick={() => {
              setSelected('Home');
              navigate('/');
            }}
          />

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-4 ">
            {navLinks.map((link) => {
              // Route-based highlighting
              let isActive = false;
              if (link.label === 'Home' && location.pathname === '/') isActive = true;
              if (link.label === 'About Us' && location.pathname === '/aboutus') isActive = true;
              if (link.label === 'Pricing' && location.pathname === '/pricing') isActive = true;
              return (
                <button
                  key={link.label}
                  onClick={() => {
                    setSelected(link.label);
                    if (link.label === 'Home') navigate('/');
                    if (link.label === 'About Us') navigate('/aboutus');
                    if (link.label === 'Pricing') navigate('/pricing');
                  }}
                  className={`relative px-1 focus:outline-none 
                    ${link.special === 'getstarted' ? 'bg-gradient-to-r from-[#7F66FF] to-[#CC66FF] text-white px-6 py-2 rounded-full transition-all duration-200 transform hover:scale-105 ml-2' : ''}
                    ${(isActive && !link.special) ? 'text-white' : (!link.special ? 'text-gray-300 hover:text-white transition-colors duration-200' : '')}
                  `}
                  style={{ background: !link.special ? 'none' : undefined, border: 'none' }}
                >
                  <span className="inline-block pb-1">{link.label}</span>
                  {!link.special && isActive && (
                    <span className="absolute left-0 right-0 bottom-0 h-1 bg-[#CC66FF] rounded-full w-full"></span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Hamburger Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setMenuOpen(!menuOpen)}
            onMouseEnter={() => setMenuOpen(true)}
            onMouseLeave={() => setMenuOpen(false)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
        {/* Mobile Menu */}
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
                return (
                  <button
                    key={link.label}
                    onClick={() => {
                      setSelected(link.label);
                      setMenuOpen(false);
                      if (link.label === 'Home') navigate('/');
                      if (link.label === 'About Us') navigate('/aboutus');
                      if (link.label === 'Pricing') navigate('/pricing');
                    }}
                    className={`text-left px-2 py-2 rounded 
                      ${link.special === 'getstarted' ? 'bg-gradient-to-r from-[#7F66FF] to-[#CC66FF] text-white' : ''}
                      ${(isActive && !link.special) ? 'text-white bg-[#CC66FF]' : (!link.special ? 'text-gray-300 hover:text-white hover:bg-[#CC66FF]/30' : '')}
                    `}
                  >
                    {link.label}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;