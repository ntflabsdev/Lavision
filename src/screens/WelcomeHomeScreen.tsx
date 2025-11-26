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
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-4 drop-shadow-2xl">
            Welcome Home
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-12 drop-shadow-lg">
            Is Where Your Journey Begins
          </p>

          <button
            onClick={handleEnter}
            disabled={isEntering}
            className="group relative px-16 py-6 bg-gradient-to-r from-[#3B82F6] via-[#8B5CF6] to-[#A855F7] text-white text-xl font-semibold rounded-full shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-3 mx-auto"
          >
            {isEntering ? 'Entering...' : 'Enter'}
            <ArrowRight className={`w-6 h-6 ${isEntering ? 'animate-pulse' : 'group-hover:translate-x-1'} transition-transform`} />
          </button>
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
