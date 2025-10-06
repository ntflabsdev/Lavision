

import { useNavigate } from 'react-router-dom';
import curve3 from '../assets/curve3.png';
// import curve1 from '../assets/curve1.png';
import dreamhomeImg from '../assets/dreamhome.png';
import careerGoalsImg from '../assets/careergoals.png';
import dreamCarImg from '../assets/dreamcar.png';
import { Glass } from '../utls/imagepath';


// Career goals now represented by static image asset

// Dream Car now represented by static image asset
const Hero = () => {
  const navigate = useNavigate();

  const handleStartCreating = () => {
    navigate('/questionnaire');
  };

  return (
    <main className="relative min-h-screen overflow-hidden"
     style={{
        background: `linear-gradient(90deg, #05051F 16.76%, #9F5EB0 140.63%), linear-gradient(122.01deg, #0A0B10 0%, #1A1339 50%, #402659 100%)`
      }}>
      {/* Header Text */}
      <div className="relative z-10 pt-32 pb-16 text-center px-8">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
          Welcome to Your Vision Realized
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
          Step into your dream world, thoughtfully crafted from your
          vision, with a serene countryside ambiance that is both
          personal and inspiring.
        </p>
      </div>

      <div className="relative z-10 px-8 pb-16">
        <div className="max-w-7xl mx-auto hidden lg:grid grid-cols-3 gap-10 xl:gap-14 items-start">
          <div className="space-y-8">
            <div className="w-full  overflow-hidden ">
              <img src={dreamhomeImg} alt="Dream Home" className="w-full h-full object-cover" />
            </div>
              <div className="w-full ">
                <img src={dreamCarImg} alt="Dream Car" className="w-full h-full object-cover" />
              </div>
          </div>

          {/* Middle Column: Build Your Dream Life */}
          <div className="flex flex-col items-center justify-center">
            <div className="relative w-full rounded-3xl shadow-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-purple-600/10 to-purple-900/40" />
              <div className="relative z-10 backdrop-blur-xl rounded-3xl p-12 flex flex-col h-[520px] text-center">
                <div>
                  <h2 className="text-4xl font-extrabold text-white tracking-tight mb-2">
                    Build Your <span className="bg-gradient-to-r from-purple-300 via-fuchsia-300 to-pink-300 bg-clip-text text-transparent">Dream</span>
                  </h2>
                  <h2 className="text-4xl font-extrabold mb-6">
                    <span className="bg-gradient-to-r from-pink-300 via-fuchsia-300 to-purple-300 bg-clip-text text-transparent">Life</span>
                  </h2>
                  <p className="text-gray-200/90 text-sm leading-relaxed max-w-md mx-auto">
                    Visualize and build your dream life in stunning 3D. Answer questions about your ideal lifestyle, and step into a personalized world that reflects your deepest aspirations.
                  </p>
                </div>
                <div className="mt-auto pt-10">
                  <button
                    onClick={handleStartCreating}
                    className="mx-auto block bg-gradient-to-r from-cyan-400 via-sky-500 to-fuchsia-500 text-white px-9 py-3 rounded-full font-semibold text-sm tracking-wide shadow-lg hover:shadow-cyan-500/30 hover:from-cyan-300 hover:via-sky-400 hover:to-fuchsia-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-300/40"
                  >
                    Start Creating Your Dream Life
                  </button>
                </div>
              </div>
              <div className="absolute inset-0 rounded-3xl ring-1 ring-white/10 pointer-events-none" />
            </div>
          </div>
          <div className="space-y-8">
            <div className="overflow-hidden">
              <div className="w-full overflow-hidden shadow-lg">
                <img src={careerGoalsImg} alt="Career Goals" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className=" overflow-hidden flex items-center justify-center relative h-72" >
              <img src={Glass} alt="AI Visualization" className="w-full h-full object-cover rounded-xl opacity-90" />
            </div>
          </div>
        </div>

        <div className="lg:hidden space-y-6 max-w-4xl mx-auto relative">
          <div className="backdrop-blur-xl  p-6 shadow-2xl overflow-hidden" style={{ backgroundImage: `url(${curve3})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
            <h3 className="text-white text-xl font-semibold mb-4">Dream Home</h3>
            <div className="w-full rounded-xl overflow-hidden shadow-lg">
              <img src={dreamhomeImg} alt="Dream Home" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Career Goals Card (Mobile) */}
          <div className="overflow-hidden">
            <div className="w-full rounded-xl overflow-hidden shadow-lg">
              <img src={careerGoalsImg} alt="Career Goals" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Center Build Your Dream Life Card */}
          <div className="bg-gradient-to-br from-purple-700/60 to-blue-700/60 backdrop-blur-xl rounded-3xl border border-purple-400/40 p-8 shadow-2xl text-center">
            <h2 className="text-2xl font-bold text-white mb-2">
              Build Your <span className="bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">Dream</span>
            </h2>
            <h2 className="text-2xl font-bold mb-6">
              <span className="bg-gradient-to-r from-pink-300 to-purple-300 bg-clip-text text-transparent">Life</span>
            </h2>
            <p className="text-gray-200 text-sm mb-6 leading-relaxed">
              Visualize and build your dream life in stunning 3D. Answer
              questions about your ideal lifestyle, and step into a personalized
              world that reflects your deepest aspirations.
            </p>
            <button
              onClick={handleStartCreating}
              className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white px-6 py-2 md:px-8 md:py-3 rounded-full font-semibold text-base hover:from-cyan-300 hover:to-blue-400 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-cyan-500/25"
            >
              Start Creating Your Dream Life
            </button>
          </div>

          {/* Dream Car Card (Mobile) */}
          <div className="backdrop-blur-xl rounded-2xl p-6 shadow-2xl overflow-hidden">
            <div className="w-full ">
              <img src={dreamCarImg} alt="Dream Car" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* AI Visualization Card */}
          <div className=" p-4 shadow-2xl">
            <div className="w-full h-48 flex items-center justify-center overflow-hidden relative">
              <img
                src="/glass.png"
                alt="AI Visualization"
                className="w-full h-full object-cover rounded-xl animate-[float_4s_ease-in-out_infinite]"
              />
              <div className="absolute top-4 left-4 text-white text-sm font-medium opacity-80">
                AI Visualization
              </div>
            </div>
          </div>
        </div>
      </div>

    </main>
  );
};

export default Hero;