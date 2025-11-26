import { useNavigate } from 'react-router-dom';
import homeHubGif from '../assets/homehub.gif';

const OutsideHomeHubScreen = ()  => {
  const navigate = useNavigate();

  const handleDreamHomeClick = () => {
    navigate('/welcome-home');
  };

  const handleDreamCarClick = () => {
    navigate('/dream-car');
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${homeHubGif})`,
        }}
      >
        <div className="absolute inset-0 backdrop-blur-sm bg-purple-900/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
        <p className="text-2xl md:text-4xl font-bold text-white mb-8 text-center">
          Outside <span className="bg-gradient-to-r from-[#8B5CF6] to-[#60A5FA] bg-clip-text text-transparent">Home Hub</span>
        </p>

        {/* Secret clickable areas overlay on the GIF */}
        <div className="relative w-full max-w-6xl aspect-video">
          {/* Left side - Dream Home secret clickable area */}
          <button
            onClick={handleDreamHomeClick}
            className="absolute left-0 top-0 w-1/2 h-full cursor-pointer"
            aria-label="Dream Home"
          />

          {/* Right side - Dream Car secret clickable area */}
          <button
            onClick={handleDreamCarClick}
            className="absolute right-0 top-0 w-1/2 h-full cursor-pointer"
            aria-label="Dream Car"
          />
        </div>
      </div>
    </div>
  );
};

export default OutsideHomeHubScreen;
