import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import welcomeHomeImg from '../assets/welcomehome.png';

const WelcomeHomeScreen = () => {
  const navigate = useNavigate();
  const [isEntering, setIsEntering] = useState(false);

  const handleEnter = () => {
    setIsEntering(true);
    setTimeout(() => {
      navigate('/inner-portal');
    }, 1500);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${welcomeHomeImg})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
        <div className="text-center">
         

        </div>
      </div>

      {/* Entering Effect */}
      {isEntering && (
        <div className="absolute inset-0 z-20 bg-white animate-fade-in" 
             style={{ animation: 'fadeIn 1.5s ease-in-out' }} />
      )}
    </div>
  );
};

export default WelcomeHomeScreen;
