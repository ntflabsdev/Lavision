import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import carMovingGif from '../assets/carmoving.gif';

const DreamCarScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${carMovingGif})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
      </div>
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 text-center drop-shadow-2xl">
          Your Dream Car
        </h1>
        <p className="text-xl md:text-2xl text-white/90 mb-12 text-center drop-shadow-lg">
          Journey To Success
        </p>

        <button
          onClick={() => navigate('/outside-home-hub')}
          className="group px-12 py-5 bg-gradient-to-r from-[#3B82F6] to-[#60A5FA] text-white text-lg font-semibold rounded-full shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105 flex items-center gap-3"
        >
          <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
          Back to Home Hub
        </button>
      </div>
    </div>
  );
};

export default DreamCarScreen;
