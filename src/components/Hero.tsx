

import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section 
      className="min-h-screen flex items-center justify-center px-6 pt-20"
      style={{
        background: `linear-gradient(90deg, #05051F 16.76%, #9F5EB0 140.63%), linear-gradient(122.01deg, #0A0B10 0%, #1A1339 50%, #402659 100%)`
      }}
    >
      <div className="max-w-4xl mx-auto text-center w-full">
        <div className="bg-slate-800/40 backdrop-blur-md rounded-3xl p-12 border border-purple-500/30">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Dream Life
            </span>
            <br />
            <span className="text-white">In 3D Reality</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto">
            Visualize and build your dream life in stunning 3D. Answer questions about your ideal lifestyle, and step into a personalized world that reflects your deepest aspirations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              className="bg-gradient-to-r from-[#00AAFF] to-[#CC66FF] hover:from-cyan-600 hover:to-blue-600 text-white px-8 py-4 rounded-[14px] font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg"
              onClick={() => navigate('/questionnaire')}
            >
              Start Creating Your Dream Life
            </button>
            <button className="bg-[#0D0F1233] hover:bg-slate-600/50 text-white px-8 py-4 rounded-[14px] font-semibold transition-all duration-200 border border-[#4B88F7] backdrop-blur-sm">
              View Demo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;