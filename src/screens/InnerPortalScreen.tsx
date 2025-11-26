import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowLeft } from 'lucide-react';
import homeInteriorImg from '../assets/homeinterior.png';

const InnerPortalScreen = () => {
  const navigate = useNavigate();
  const [isActivating, setIsActivating] = useState(false);

  const handlePortalActivation = () => {
    setIsActivating(true);
    setTimeout(() => {
      navigate('/dream-worlds');
    }, 2000);
  };

  const handleReturnHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${homeInteriorImg})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50" />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col px-4">
        <div className="flex-1 flex items-center justify-center">
          <p className="text-l md:text-3xl font-bold text-white text-center">
            Inner Portal
          </p>
        </div>

        <div className="flex flex-col gap-6 items-center pb-16">
          {/* Portal Activation Button */}
          <button
            onClick={handlePortalActivation}
            disabled={isActivating}
            className="group relative px-10 py-5 bg-gradient-to-r from-[#A855F7] via-[#8B5CF6] to-[#7C3AED] text-white text-lg font-semibold rounded-full shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-3"
          >
            <Sparkles className={`w-6 h-6 ${isActivating ? 'animate-spin' : 'group-hover:rotate-12'} transition-transform`} />
            {isActivating ? 'Activating Portal...' : 'Portal Activation'}   
          </button>

          {/* Return Home Button */}
          <button
            onClick={handleReturnHome}
            className="group px-10 py-5 bg-gradient-to-r from-[#3B82F6] to-[#60A5FA] text-white text-lg font-semibold rounded-full shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105 flex items-center gap-3"
          >
            <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
            Return home
          </button>
        </div>
      </div>

      {/* Activation Effect */}
      {isActivating && (
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="w-96 h-96 rounded-full bg-purple-500/30 animate-ping" />
          <div className="absolute w-64 h-64 rounded-full bg-purple-600/50 animate-pulse" />
        </div>
      )}
    </div>
  );
};

export default InnerPortalScreen;
