import { useNavigate } from 'react-router-dom';

const PricingCTA = () => {
  const navigate = useNavigate();

  const handleStartFree = () => {
    navigate('/questionnaire');
  };
  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-3xl p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Ready to Start Building Your Dream Life?
          </h2>
          <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
            Join over 10,000 dreamers who have already stepped into their personalized 3D 
            worlds, transforming ambitions into clear visions and living each day inspired by 
            the future they've designed for themselves.
          </p>
          <button 
            onClick={handleStartFree}
            className="bg-[#D072FF] hover:bg-purple-700 text-white px-7 py-3 rounded-full text-lg font-medium transition-colors"
          >
            Start Free Today
          </button>
        </div>
      </div>
    </section>
  );
};

export default PricingCTA;