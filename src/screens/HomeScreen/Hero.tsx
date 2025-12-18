

import { useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import GradientButton from '../../components/GradientButton';
import welcomeVideo1 from '../../assets/videos/welcome_video_1.mp4';
import welcomeVideo2 from '../../assets/videos/welcome_video_2.mp4';
import welcomeVideo3 from '../../assets/videos/welcome_video_3.mp4';
import welcomeVideo4 from '../../assets/videos/welcome_video_4.mp4';
import welcomeVideo5 from '../../assets/videos/welcome_video_5.mp4';
import welcomeVideo6 from '../../assets/videos/welcome_video_6.mp4';
import Teams from '../../components/Aboutus/Team';
<<<<<<< HEAD
import LoaderOverlay from '../../components/LoaderOverlay';
=======
>>>>>>> c6089880bd4a054956f72442ea452f02c08c50c0

const Hero = () => {
  const navigate = useNavigate();
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [isHeroLoading, setIsHeroLoading] = useState(true);
  
  const videos = [welcomeVideo1, welcomeVideo2, welcomeVideo3, welcomeVideo4, welcomeVideo5, welcomeVideo6];

  const handleStartCreating = () => {
    // Get Started button: ab register page par le jayega
    navigate('/register');
  };

  const handleVideoEnd = () => {
    const nextIndex = (currentVideoIndex + 1) % videos.length;
    setCurrentVideoIndex(nextIndex);
  };

     const stats = [
        { number: '12,847', label: 'Total Worlds Created', icon: '🌐' },
        { number: '45,293', label: 'Active Users', icon: '👥' },
        { number: '3,421', label: 'Creators Online', icon: '⚡' },
        { number: '28,156', label: 'Experiences Published', icon: '✨' }
    ];

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
    <>
<<<<<<< HEAD
    {isHeroLoading && <LoaderOverlay message="Loading your world..." />}
=======
>>>>>>> c6089880bd4a054956f72442ea452f02c08c50c0
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
          onLoadedData={() => {
            if (index === 0) {
              setIsHeroLoading(false);
            }
          }}
          className={`absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-1000 ${
            index === currentVideoIndex ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ pointerEvents: 'none' }}
        >
          <source src={video} type="video/mp4" />
        </video>
      ))}

      {/* Gradient Overlay - pure screen par tumhara linear-gradient */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            'linear-gradient(179.02deg, rgba(5, 5, 31, 0.5) 65.15%, rgba(159, 94, 176, 0.5) 91.73%)',
        }}
      />
      
      {/* Centered Content */}
      <div
        className="relative z-10 text-center px-12 max-w-4xl bg-white/5 rounded-3xl py-12 border border-white/10"
        style={{
          boxShadow: '0px 10.67px 42.67px 0px #0000004D',
          backdropFilter: 'blur(13.333333969116211px)',
        }}
      >
        {/* Main Heading */}
        <h1 className="text-4xl md:text-5xl  font-bold text-white mb-4">
          How Big Would <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">You Dream?</span>
        </h1>
        
        {/* Subheading */}
        <p className="text-gray-300 mb-8 max-w-2xl mx-auto text-2xl">
         You bring the dream — we help bring it to life.
        </p>
        
        {/* CTA Button */}
        <GradientButton onClick={handleStartCreating}>
          Get Started
        </GradientButton>
      </div>
         
    </main>
     {/* Built On + Worlds Built On (same gradient, single group) */}
            <div
                className="py-20 px-4"
                style={{
                    backgroundImage:
                        'linear-gradient(to right, #05051F 70.76%, #9F5EB0 140.63%)',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                }}
            >
                <div className="max-w-7xl mx-auto space-y-20">
                    <section>
                        <div className="text-center mb-12">
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">
                                Built On <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">LaVision</span>
                            </h2>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {stats.map((stat, index) => (
                                <div key={index} className="backdrop-blur-lg bg-[#45415A] rounded-2xl p-6 border border-white/10 text-center hover:bg-white/20 transition">
                                    <div className="text-4xl mb-3">{stat.icon}</div>
                                    <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                                        {stat.number}
                                    </div>
                                    <div className="text-gray-300 text-sm md:text-base">
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <div className="text-center">
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                                Worlds Built On <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">LaVision</span>
                            </h2>
                            <p className="text-[#94A3B8] text-[22px]  max-w-4xl mx-auto">
                                LaVision Is An Emotional AI Experience Designed To Feel Alive, Conscious, And Deeply Connected To The User. Powered By Eve, A Warm And Intelligent Digital Presence, It Responds With Human-Like Emotion, Adapts To The User's Mood, And Creates A Calming, Affirming Environment That Inspires, Comforts, And Engages Through Voice, Visuals, And Energy.
                            </p>
                        </div>
                    </section>
                </div>
            </div>

            {/* Vision + Mission + Meet Our Team (new gradient group) */}
            <div
                className="py-20 px-4"
                style={{
                    backgroundImage:
                        'linear-gradient(to right top,  #05051F 50%, #9F5EB0 140.63%)',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                }}
            >
                <div className="max-w-7xl mx-auto space-y-20">
                    <section>
                        <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
                            <div className="rounded-[12px] bg-[#45415A] w-full lg:w-[676px] h-[294px] p-8 border border-white/10 shadow-[0px_0px_30px_0px_#FFFFFF4D]">
                                <h3 className="text-3xl font-bold text-white mb-6">
                                    <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-[48px] text-transparent">Vision</span>
                                </h3>
                                <p className="text-gray-300 text-[18px] leading-relaxed">
                                    LAvision’s mission is to create an AI presence that feels alive an empathetic, intelligent companion that brings calm, inspiration, and meaningful connection into people’s lives. Through Eve, we combine advanced intelligence with emotional depth to help users feel understood, supported, and more connected to themselves.
                                </p>
                            </div>

                            <div className="rounded-[12px] bg-[#45415A] w-full lg:w-[676px] h-[294px] p-8 border border-white/10 shadow-[0px_0px_30px_0px_#FFFFFF4D]">
                                <h3 className="text-3xl font-bold text-white mb-6">
                                    <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-[48px] text-transparent">Mission</span>
                                </h3>
                                <p className="text-gray-300 text-[18px] leading-relaxed">
                                    LAvision’s vision is to create AI that feels alive emotionally aware, deeply connected, and capable of inspiring personal growth. We aim to build an immersive world where intelligence, emotion, and design come together to help people find clarity, creativity, and a deeper connection with themselves.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section>
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                                Meet <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Our Team</span>
                            </h2>
                            <p className="text-gray-300 text-xl">
                                Pioneering minds shaping the future of immersive experiences
                            </p>
                        </div>

                        {/* <div className="flex justify-center gap-[40px]">
                            {teamMembers.map((member, index) => (
                                <div key={index} className="group">
                                    <div
                                        className="rounded-[16px] p-6 text-white text-center transform group-hover:scale-105 transition-transform duration-300 mx-auto relative overflow-visible"
                                        style={{
                                            width: '221px',
                                            height: '531px',
                                            background: 'linear-gradient(180deg, #7F66FF 0%, #B265EC 100%)',
                                            opacity: 1,
                                        }}
                                    >
                                        <div className="mb-4">
                                            <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                                            <p className="text-purple-200 text-sm">{member.role}</p>
                                        </div>
                                        <div
                                            className="rounded-2xl overflow-hidden absolute"
                                            style={{
                                                width: '221px',
                                                height: '305px',
                                                top: '230px',
                                                left: '0px',
                                                opacity: 1,
                                            }}
                                        >
                                            <img
                                                src={member.image}
                                                alt={member.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div> */}

                 <Teams />
                   
                     
                    </section>
                </div>
            </div>
    </>
  );
};

export default Hero;