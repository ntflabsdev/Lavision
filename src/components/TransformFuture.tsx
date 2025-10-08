import { useNavigate } from 'react-router-dom';
import { FutureImg } from '../utls/imagepath';

const TransformFuture = () => {
  const navigate = useNavigate();

  const handleBuildDreamLife = () => {
    navigate('/questionnaire');
  };

  const handleJoinEarlyAccess = () => {
    navigate('/pricing');
  };
  return (
    <section className="py-20 px-6 bg-[#FEF4FF]">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
        <img src={FutureImg} alt="Transform Your Future" className="w-full h-auto" />
          
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Ready to Transform Your{' '}
              <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                Future?
              </span>
            </h2>
            
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              Join thousands who are already living their dreams in 3D. Your ideal life is just one click away.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={handleBuildDreamLife}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-4 rounded-full font-semibold transition-all duration-200 transform hover:scale-105"
              >
                Build Your Dream Life Today
              </button>
              <button 
                onClick={handleJoinEarlyAccess}
                className="bg-transparent hover:bg-purple-50 text-purple-600 px-8 py-4 rounded-full font-semibold transition-all duration-200 border-2 border-purple-300 hover:border-purple-400"
              >
                Join Early Access
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TransformFuture;