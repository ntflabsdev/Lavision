

import { useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import GradientButton from '../../components/GradientButton';
import welcomeVideo1 from '../../assets/videos/welcome_video_1.mp4';
import welcomeVideo2 from '../../assets/videos/welcome_video_2.mp4';
import welcomeVideo3 from '../../assets/videos/welcome_video_3.mp4';
import welcomeVideo4 from '../../assets/videos/welcome_video_4.mp4';
import welcomeVideo5 from '../../assets/videos/welcome_video_5.mp4';
import welcomeVideo6 from '../../assets/videos/welcome_video_6.mp4';

const Hero = () => {
  const navigate = useNavigate();
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  
  const videos = [welcomeVideo1, welcomeVideo2, welcomeVideo3, welcomeVideo4, welcomeVideo5, welcomeVideo6];

  const handleStartCreating = () => {
    navigate('/questionnaire');
  };

  const handleVideoEnd = () => {
    const nextIndex = (currentVideoIndex + 1) % videos.length;
    setCurrentVideoIndex(nextIndex);
  };

  useEffect(() => {
    // Play current video and pause others
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === currentVideoIndex) {
          video.currentTime = 0;
          video.play().catch(err => console.log('Video play error:', err));
        } else {
          video.pause();
        }
      }
    });
  }, [currentVideoIndex]);

  return (
    <main className="relative min-h-screen overflow-hidden flex items-center justify-center">
      
      {/* Video Background with Sequence */}
      {videos.map((video, index) => (
        <video 
          key={index}
          ref={(el) => (videoRefs.current[index] = el)}
          muted 
          playsInline
          preload="auto"
          onEnded={handleVideoEnd}
          className={`absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-1000 ${
            index === currentVideoIndex ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ pointerEvents: 'none' }}
        >
          <source src={video} type="video/mp4" />
        </video>
      ))}

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-purple-900/30 to-black/70 z-[1]" />
      
      {/* Centered Content */}
      <div className="relative z-10 text-center px-8 max-w-4xl backdrop-blur-xl bg-white/5 rounded-3xl py-12 border border-white/10">
        {/* Main Heading */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
          See The Life Waiting <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">Inside You</span>
        </h1>
        
        {/* Subheading */}
        <p className="text-base md:text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
          This Isn't An App It's Your Awakening Enter A World Where Your Vision Becomes Reality
        </p>
        
        {/* CTA Button */}
        <GradientButton onClick={handleStartCreating}>
          Get Started
        </GradientButton>
      </div>

    </main>
  );
};

export default Hero;