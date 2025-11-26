import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../store/hooks';
import { updateAnswer } from '../store/questionnaireSlice';
import oneSentenceImg from '../assets/onesentence.png';
import Lottie from 'lottie-react';
import animationData from '../assets/Artboard 1.json';

const OneSentenceScreen = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [sentence, setSentence] = useState('');

  const handleContinue = () => {
    if (sentence.trim()) {
      dispatch(updateAnswer({ key: 'emotional_anchor', value: sentence }));
      navigate('/outside-home-hub');
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a0b2e] via-[#2d1b4e] to-[#0f0520]">
        {/* Animated orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Silhouette overlay */}
      <div 
        className="absolute left-0 top-0 bottom-0 w-1/3 bg-cover bg-center opacity-40"
        style={{
          backgroundImage: `url(${oneSentenceImg})`,
          maskImage: 'linear-gradient(to right, rgba(0,0,0,0.8), transparent)',
          WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,0.8), transparent)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 md:px-5 gap-2">
        {/* Lottie Animation */}
        <div className="w-full max-w-md">
          <Lottie 
            animationData={animationData} 
            loop={true}
            autoplay={true}
          />
        </div>

        {/* Form Content */}
        <div className="max-w-2xl w-full text-center">
          <p className="text-xl md:text-2xl font-bold text-white mb-4">
            Tell Me In One Sentence...
          </p>
          <p className="text-l md:text-xl text-gray-300 mb-12">
            What Is The Real Reason You're Here?
          </p>

          <div className="mb-8">
            <textarea
              value={sentence}
              onChange={(e) => setSentence(e.target.value)}
              placeholder="This Is Your Emotional Anchor..."
              className="w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl px-6 py-6 text-white text-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-200 resize-none"
              rows={2   }
            />
          </div>

          <button
            onClick={handleContinue}
            disabled={!sentence.trim()}
            className="group px-16 py-5 bg-gradient-to-r from-[#3B82F6] via-[#8B5CF6] to-[#A855F7] text-white text-xl font-semibold rounded-full shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default OneSentenceScreen;
