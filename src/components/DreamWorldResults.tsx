import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useGetDashboardQuery } from '../store/hooks';


const DreamWorldResults = () => {
  const navigate = useNavigate();
  const { answers } = useAppSelector((state) => state.questionnaire);
  const { data: dashboardData } = useGetDashboardQuery();
  const [isGenerating, setIsGenerating] = useState(false);

  // Check for active subscription
  const isSubscribed = dashboardData?.data?.subscriptions?.some(
    (sub) => sub.status === 'active'
  );

  const handleGenerateDreamWorld = () => {
    if (!isSubscribed) {
      navigate('/pricing'); // Redirect to subscription page if not subscribed
      return;
    }
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      console.log('Generating dream world with answers:', answers);
      navigate('/vision-realized');
    }, 3000);
  };

  return (
    <div className="max-w-4xl mx-auto text-center w-full">
      <div className="bg-[#2A1B47] rounded-3xl p-12 shadow-2xl border border-[#3B2A5C]">
        
        {/* Header */}
        <p className="text-4xl md:text-4xl font-bold text-white mb-6">
          <span className="bg-gradient-to-r from-[#4A9EFF] to-[#B366FF] bg-clip-text text-transparent">
            Creating Your Dream World
          </span>
        </p>
        
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Our AI is analyzing your vision and crafting a personalized 3D world just for you.
        </p>
        
        <p className="text-xl text-white mb-12 font-medium">
          Ready to bring your dream life to life in 3D?
        </p>

        {/* Main Action Button */}
        <button
          className={`bg-gradient-to-r from-[#00AAFF] to-[#CC66FF] text-white px-12 py-4 rounded-xl font-semibold text-lg transition-all duration-200 transform hover:scale-105 shadow-xl flex items-center justify-center gap-3 mx-auto ${
            isGenerating ? 'opacity-80 cursor-not-allowed' : 'hover:from-cyan-500 hover:to-purple-500'
          }`}
          onClick={handleGenerateDreamWorld}
          disabled={isGenerating}
        >
          {isGenerating ? (
            <>
              <svg className="animate-spin h-6 w-6 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating Your Dream World...
            </>
          ) : (
            'Generate My Dream World'   
          )}
        </button>
      </div>
    </div>
  );
};

export default DreamWorldResults;
