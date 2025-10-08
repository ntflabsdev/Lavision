import { Sparkles, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { NoteImg } from '../utls/imagepath';

const PersonalizedDream = () => {
  const navigate = useNavigate();
  return (
    <section className="py-20 px-6  bg-[#FEF4FF]">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Your Personalized{' '}
              <span className="bg-[#CC66FF] bg-clip-text text-transparent">
                manifest
              </span>
            </h2>
            
            <p className="text-gray-600 text-md mb-8 leading-relaxed">
              Let our AI put your vision into words. Based on the character you create, it generates inspiring sentences that capture your future lifestyle, values, and aspirations.
            </p>
            
            <ul className="space-y-3 mb-8">
              <li className="flex items-center text-gray-600">
                <div className="w-4 h-4 mr-3 flex items-center justify-center">
                  <CheckCircle color="#CB65FE80" />
                </div>
                Unique manifest aligned with your dream character
              </li>
              <li className="flex items-center text-gray-600">
                <div className="w-4 h-4 mr-3 flex items-center justify-center">
                  <CheckCircle color="#CB65FE80" />
                </div>
                Motivational sentences you can revisit daily
              </li>
              <li className="flex items-center text-gray-600">
                  <div className="w-4 h-4 mr-3 flex items-center justify-center">
                  <CheckCircle color="#CB65FE80" />
                </div>
                Shareable & editable for your personal journey
              </li>
            </ul>
            
            <button 
              onClick={() => navigate('/questionnaire')}
              className="bg-gradient-to-r from-[#7F66FF] to-[#CC66FF] hover:from-purple-600 hover:to-pink-600 text-white px-8 py-4 rounded-full font-semibold transition-all duration-200 transform hover:scale-105"
            >
              Create My manifest
            </button>
          </div>
          
          <div className="relative flex flex-col lg:flex-row gap-4 w-full">
            <img src={NoteImg} alt="NOTE" className="hidden md:block w-full lg:w-1/2 h-auto rounded-md" />
            <div className="w-full lg:w-1/2 bg-[#170C1DCC] rounded-md p-4 sm:p-6 text-white mt-4 lg:mt-0">
              <p className="text-sm leading-relaxed mb-6">
                My lifestyle is guided by a clearly defined vision that shapes every decision and action I take. Ambition is refined into measurable, structured goals that provide direction and clarity. Through consistent effort and disciplined execution, these goals are achieved step by step. Each accomplishment strengthens the foundation of long-term success, ensuring steady progress toward the future I have envisioned.
              </p>
              <div className="bg-white rounded-lg px-4 py-2 inline-flex items-center">
                <Sparkles className="text-purple-500 mr-2" size={16} />
                <span className="text-purple-500 font-semibold text-sm">AI Generated</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PersonalizedDream;