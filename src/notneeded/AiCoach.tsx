import { useNavigate } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { MirrorImg } from '../utls/imagepath';

const AICoach = () => {
  const navigate = useNavigate();
  return (
    <section className="py-20 px-6 bg-[#FEF4FF]">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              ✦ Meet Your LAvision AI Coach
            </h2>
            <p className="text-gray-600 text-md mb-4 leading-relaxed">
              He’s here to guide you through every step of your transformation.
            </p>
            <p className="text-gray-600 text-md mb-4 leading-relaxed">
              He knows what you truly want, who you really are, and what it takes to get there — step by step.
            </p>
            <p className="text-gray-600 text-md mb-4 leading-relaxed">
              He’ll challenge you, push your limits, and make you see the power that’s already inside you.
            </p>
            <p className="text-gray-600 text-md mb-4 leading-relaxed">
              Ask him anything — your thoughts, your doubts, your dreams — he always knows how to bring you back to your path.
            </p>
            <p className="text-gray-600 text-md mb-8 leading-relaxed">
              This isn’t just a coach. It’s your guide to becoming who you were always meant to be.
            </p>
            <button
              onClick={() => navigate('/questionnaire')}
              className="bg-gradient-to-r from-[#7F66FF] to-[#CC66FF] hover:from-purple-600 hover:to-pink-600 text-white px-8 py-4 rounded-full font-semibold transition-all duration-200 transform hover:scale-105"
            >
              Meet Your AI Coach 
            </button>
          </div>
          <div className="relative flex flex-col lg:flex-row gap-4 w-full">
            <LazyLoadImage effect="blur" src={MirrorImg} alt="LAvision Coach" className="w-full h-auto rounded-md" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AICoach;