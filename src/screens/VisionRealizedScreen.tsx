import { useState, useEffect } from "react";
import { Home, Heart, Zap, Loader2 } from "lucide-react";
import { Curve1, Curve2, Curve3 } from "../utls/imagepath";
import { useAppSelector } from "../store/hooks";
import { useGetQuestionnaireQuery } from "../store/api";
import { useGetUserQuery } from "../store/hooks";
import {
  generatePersonalizedAffirmations
} from "../utls/generateAffirmations";
const categoryOptions = [
  {
    key: "home",
    title: "Home",
    icon: Home,
    description: "Design your dream living space",
    images: [Curve1, Curve2, Curve3, Curve1],
  },
  {
    key: "car",
    title: "Car",
    icon: Heart,
    description: "Visualize your perfect vehicle",
    images: [Curve2, Curve3, Curve1, Curve2],
  },
  {
    key: "career",
    title: "Career",
    icon: Zap,
    description: "Build your professional future",
    images: [Curve1, Curve3, Curve2, Curve1],
  },
  {
    key: "travel",
    title: "Travel",
    icon: Home,
    description: "Explore the world you want to see",
    images: [Curve2, Curve1, Curve3, Curve2],
  },
  {
    key: "health",
    title: "Health",
    icon: Heart,
    description: "Achieve your wellness goals",
    images: [Curve3, Curve2, Curve1, Curve3],
  },
];



const VisionRealizedScreen = () => {
  const [currentGallery, setCurrentGallery] = useState(0);
  const [affirmations, setAffirmations] = useState<string[]>([
    "I am creating a life of passion and purpose.",
    "My mind is focused and clear.",
    "I am creating a life that reflects passion, purpose, and the limitless potential within me.",
    "I consistently attract opportunities that support my personal growth, professional success, and financial abundance.",
    "Each day, I move closer to achieving my goals.",
    "I attract success and abundance.",
    "My confidence grows with each step I take.",
    "My confidence grows with each step I take.",
  ]);
  const [isGeneratingAffirmations, setIsGeneratingAffirmations] = useState(false);

  const handleEnter3DMode = () => {
    // For now, navigate to a demo or show a modal that 3D mode is coming soon
    alert('3D Mode coming soon! This would open an immersive 3D experience of your dream world.');
    // In the future, this would navigate to a 3D viewer or trigger a WebGL/Three.js component
  };
  const [userName, setUserName] = useState("YONATAN");

  // Get questionnaire data from Redux store
  const questionnaireState = useAppSelector((state) => state.questionnaire);
  
  // Get user ID from authentication  
  const token = localStorage.getItem('token');
  const { data: userData } = useGetUserQuery(undefined, {
    skip: !token,
  });
  const currentUserId = userData?.data?.user?._id;
  
  // Fetch questionnaire data if userId exists
  const { data: questionnaireData } = useGetQuestionnaireQuery(
    currentUserId || '',
    { skip: !currentUserId }
  );

  // Generate personalized affirmations when questionnaire data is available
  useEffect(() => {
    const generateAffirmations = async () => {
      const answers = questionnaireData?.data?.answers || questionnaireState.answers;
      
      // Check if we have enough questionnaire data to generate personalized affirmations
      if (Object.keys(answers).length > 0) {
        setIsGeneratingAffirmations(true);
        
        try {
          // Extract user's name if available
          if (answers.name) {
            setUserName(answers.name.toUpperCase());
          }
          
          const personalizedAffirmations = await generatePersonalizedAffirmations(answers);
          setAffirmations(personalizedAffirmations);
        } catch (error) {
          console.error('Error generating personalized affirmations:', error);
          // Keep default affirmations if generation fails
        } finally {
          setIsGeneratingAffirmations(false);
        }
      } else {
        // No questionnaire data available, use default affirmations
        console.log('No questionnaire data available, using default affirmations');
      }
    };

    generateAffirmations();
  }, [questionnaireData, questionnaireState.answers]);
  return (
    <div
      className="min-h-screen flex flex-col justify-between"
      style={{
        background:
          "linear-gradient(180deg, #05051F 0%, #1A1339 50%, #402659 100%)",
      }}
    >
      <section className="text-center py-10 px-6 mt-24">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 text-transparent bg-clip-text">
          Welcome to <span className="text-white">Your Vision Realized</span>
        </h1>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed mb-6">
          Step into your dream world, a space thoughtfully crafted from your unique vision. Designed with a serene countryside ambiance, it offers the perfect balance of tranquility and inspiration. Every detail is tailored to create a personal connection, transforming your environment into a meaningful reflection of who you are and the future you aspire to build.
        </p>
        <button 
          onClick={handleEnter3DMode}
          className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold px-6 py-3 rounded-full shadow-lg transition"
        >
          Enter 3D Mode
        </button>
      </section>

      <section className="flex flex-col items-center justify-center py-12 px-4 flex-1">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">
            Welcome Home <span className="text-cyan-400">{userName}</span>
          </h2>
        </div>

        <div className="relative w-full max-w-6xl mx-auto">
          <div className="bg-gradient-to-br from-purple-900/20 to-cyan-900/20 rounded-3xl p-8 mb-8 backdrop-blur-sm border border-white/10">
            <img
              src={categoryOptions[currentGallery]?.images[0] || Curve1}
              alt="Main Vision"
              className="w-full h-80 object-cover rounded-2xl shadow-2xl"
            />
          </div>

          <div className="absolute left-0 top-1/2 transform -translate-y-1/2">
            <div className="bg-black/60 backdrop-blur-md rounded-2xl p-4 border border-white/20 shadow-2xl">
              <div className="flex flex-col gap-4">
                {categoryOptions.map((option, idx) => {
                  const IconComponent = option.icon;
                  return (
                    <button
                      key={option.key}
                      onClick={() => setCurrentGallery(idx)}
                      className={`group flex items-center gap-3 p-3 rounded-xl transition-all duration-300 hover:bg-white/10 ${currentGallery === idx
                        ? "bg-gradient-to-r from-purple-500/30 to-cyan-500/30 border border-purple-400/50"
                        : "hover:scale-105"
                        }`}
                    >
                      <div className={`p-2 rounded-lg transition-colors ${currentGallery === idx
                        ? "bg-purple-500/50 text-white"
                        : "bg-white/10 text-gray-300 group-hover:text-white"
                        }`}>
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div className="text-left">
                        <div className={`font-semibold transition-colors ${currentGallery === idx ? "text-white" : "text-gray-300 group-hover:text-white"
                          }`}>
                          {option.title}
                        </div>
                        <div className="text-xs text-gray-400 max-w-32">
                          {option.description}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>


      </section>

      <section className="py-12 px-4">
        <h2 className="text-3xl font-bold text-center mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 text-transparent bg-clip-text">
          Personalized Affirmations
        </h2>
        <p className="text-center text-gray-300 mb-8">
          {isGeneratingAffirmations 
            ? "Generating personalized affirmations based on your vision..." 
            : (Object.keys(questionnaireData?.data?.answers || questionnaireState.answers).length > 0
              ? "Affirmations personalized based on your unique dream life vision"
              : "Universal affirmations that build confidence and resilience"
            )
          }
        </p>

        <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto">
          <div className="flex-1 space-y-4">
            {isGeneratingAffirmations ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-8 h-8 text-purple-400 animate-spin mr-3" />
                <span className="text-white text-lg">Creating your personalized affirmations...</span>
              </div>
            ) : (
              affirmations.map((text, idx) => (
                <div key={idx} className="flex items-center gap-4 text-white">
                  <div className="w-3 h-3 bg-purple-400 rounded-full flex-shrink-0"></div>
                  <p className="text-lg font-medium">{text}</p>
                </div>
              ))
            )}
          </div>
          <div className="flex-1 flex justify-center items-center">
            <div className="relative">
              <div className="w-80 h-80 rounded-3xl flex items-center justify-center">
                <img
                  src="/src/assets/glass.png"
                  alt="Brain Visualization"
                  className="w-64 h-80 object-contain"
                />
              </div>
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-purple-400/30 rounded-full animate-float"></div>
              <div className="absolute -bottom-4 -right-4 w-6 h-6 bg-cyan-400/30 rounded-full animate-float-delayed"></div>
              <div className="absolute top-1/2 -right-8 w-4 h-4 bg-pink-400/30 rounded-full animate-float-delayed-2"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VisionRealizedScreen;
