import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Wand2 } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { updateAnswer, setCurrentStep, syncWithApiResponse } from '../store/questionnaireSlice';
import { useGetUserQuery } from '../store/hooks';
import {
  useSaveQuestionnaireMutation,
  useGetQuestionnaireQuery
} from '../store/api';
import RephraseTooltip from './gemini/RephraseTooltip';

const questionGroups = [
  {
    title: 'Identity & Vision',
    questions: [
      { label: 'What is your name and who are you when you have achieved everything in life?', key: 'name', placeholder: 'Write your answer here...' },
      { label: 'If you could describe your dream life in one sentence, what would it be?', key: 'dream_sentence', placeholder: 'Write your answer here...' },
      { label: 'Which core values guide you most? (e.g., freedom, love, power, creativity)', key: 'core_values', placeholder: 'Write your answer here...' },
    ],
  },
  {
    title: 'Home & Environment',
    questions: [
      { label: 'Where do you live in your dream life? (city, beach, mountains, private island, penthouse, villa)', key: 'dream_location', placeholder: 'Write your answer here...' },
      { label: 'How does your dream home look inside and outside?', key: 'home_look', placeholder: 'Write your answer here...' },
      { label: 'What small details in your home make you feel “this is truly mine”?', key: 'home_details', placeholder: 'Write your answer here...' },
      { label: `What feelings does the house give off? Luxury, futuristic, vintage, warmth, minimalism?`, key: 'home_feelings', placeholder: 'Write your answer here...' },
    ],
  },
  {
    title: 'Body & Health',
    questions: [
      { label: 'What does your ideal body look and feel like?', key: 'body_look', placeholder: 'Write your answer here...' },
      { label: 'How do you feel physically in your dream life? (strong, light, energized, relaxed)', key: 'body_feel', placeholder: 'Write your answer here...' },
      { label: 'What daily health or fitness habits are part of your life?', key: 'health_habits', placeholder: 'Write your answer here...' },
    ],
  },
  {
    title: 'Daily Lifestyle',
    questions: [
      { label: 'How does your perfect day unfold from morning to night?', key: 'perfect_day', placeholder: 'Write your answer here...' },
      { label: 'What habits or rituals keep you at your best?', key: 'habits_rituals', placeholder: 'Write your answer here...' },
      { label: 'How do you usually spend your weekends?', key: 'weekends', placeholder: 'Write your answer here...' },
    ],
  },
  {
    title: 'Career & Purpose',
    questions: [
      { label: 'What work or mission brings you the most fulfillment?', key: 'fulfillment', placeholder: 'Write your answer here...' },
      { label: 'How does your dream workday look? (people, environment, technology)', key: 'workday', placeholder: 'Write your answer here...' },
      { label: 'What kind of impact does your work have on the world?', key: 'work_impact', placeholder: 'Write your answer here...' },
    ],
  },
  {
    title: 'Relationships',
    questions: [
      { label: 'Who are the key people in your dream life? (partner, friends, family, colleagues)', key: 'key_people', placeholder: 'Write your answer here...' },
      { label: 'How does your ideal romantic relationship feel and look?', key: 'romantic_relationship', placeholder: 'Write your answer here...' },
      { label: 'How do you feel within your social circle?', key: 'social_circle', placeholder: 'Write your answer here...' },
    ],
  },
  {
    title: 'Experiences & Freedom',
    questions: [
      { label: 'What kinds of adventures and experiences do you enjoy regularly?', key: 'adventures', placeholder: 'Write your answer here...' },
      { label: 'Where and how do you travel for vacations?', key: 'travel', placeholder: 'Write your answer here...' },
      { label: 'What’s one recurring moment you dream of experiencing again and again?', key: 'recurring_moment', placeholder: 'Write your answer here...' },
    ],
  },
  {
    title: 'Money & Abundance',
    questions: [
      { label: 'What does your financial reality look like?', key: 'financial_reality', placeholder: 'Write your answer here...' },
      { label: 'What assets or luxuries do you own? (homes, cars, businesses)', key: 'assets', placeholder: 'Write your answer here...' },
      { label: 'How do you use money both for enjoyment and for making an impact?', key: 'money_use', placeholder: 'Write your answer here...' },
    ],
  },
  {
    title: 'Mental State',
    questions: [
      { label: 'How do you feel in your dream life? (peaceful, passionate, powerful, free)', key: 'dream_feel', placeholder: 'Write your answer here...' },
      { label: 'What is your dominant state of mind each day? (flow, creativity, confidence, inspiration)', key: 'state_of_mind', placeholder: 'Write your answer here...' },
      { label: 'What thoughts fill your mind when you wake up in the morning?', key: 'morning_thoughts', placeholder: 'Write your answer here...' },
    ],
  },
  {
    title: 'Legacy & Big Goals',
    questions: [
      { label: 'What do you want to leave behind for the world?', key: 'legacy', placeholder: 'Write your answer here...' },
      { label: 'How would you like people to remember you?', key: 'remembered', placeholder: 'Write your answer here...' },
      { label: 'What is the “big contribution” you dream of making to humanity?', key: 'big_contribution', placeholder: 'Write your answer here...' },
    ],
  },
  {
    title: 'Bonus – Visual & Detail Questions',
    questions: [
      { label: 'Which colors best represent your dream life?', key: 'colors', placeholder: 'Write your answer here...' },
      { label: 'What kind of music or background sounds fill your world?', key: 'music', placeholder: 'Write your answer here...' },
      { label: 'What objects, symbols, or items are always with you? (e.g., car, book, necklace, trophy, artwork)', key: 'objects', placeholder: 'Write your answer here...' },
      { label: 'If you could step into one moment of your dream life right now what’s the very first thing you see?', key: 'first_moment', placeholder: 'Write your answer here...' },
    ],
  },
];


const StepperCard = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { answers, currentStep } = useAppSelector((state) => state.questionnaire);
  const [step, setStep] = useState(currentStep);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const [activeQuestionKey, setActiveQuestionKey] = useState<string>('');
  const textareaRefs = useRef<{ [key: string]: HTMLTextAreaElement | null }>({});

  // API hooks - get user ID from authentication
  const token = localStorage.getItem('token');
  const { data: userData } = useGetUserQuery(undefined, {
    skip: !token,
  });
  const currentUserId = userData?.data?.user?._id;
  
  const [saveQuestionnaire, { isLoading: isSaving }] = useSaveQuestionnaireMutation();

  // Load existing questionnaire data
  const { data: questionnaireData } = useGetQuestionnaireQuery(
    currentUserId || '',
    { skip: !currentUserId }
  );

  // Sync local state with API data when loaded
  useEffect(() => {
    if (questionnaireData?.success) {
      dispatch(syncWithApiResponse({
        answers: questionnaireData.data.answers,
        currentStep: questionnaireData.data.currentStep,
        sessionId: questionnaireData.data.userId, // Use userId as sessionId for compatibility
        isCompleted: questionnaireData.data.isCompleted
      }));
      setStep(questionnaireData.data.currentStep);
    }
  }, [questionnaireData, dispatch]);

  const isFirst = step === 0;
  const isLast = step === questionGroups.length - 1;
  const group = questionGroups[step];

  const isGroupValid = group.questions.every(q => answers[q.key] && answers[q.key].trim() !== '');

  const handleChange = (key: string, value: string) => {
    dispatch(updateAnswer({ key, value }));
    // Only update local state, no API call
  };

  const handleNext = async () => {
    // Close tooltip if open
    setTooltipVisible(false);

    if (!isGroupValid) return;

    if (!isLast) {
      const nextStep = step + 1;
      setStep(nextStep);
      dispatch(setCurrentStep(nextStep));
      // No API call here, just update local state
    } else {
      // Last step completed, save all answers and complete questionnaire
      if (currentUserId) {
        try {
          // First save all the questionnaire data
          await saveQuestionnaire({
            answers,
            currentStep: step,
            isCompleted: false
          }).unwrap();
          
        } catch (error) {
          console.error('Failed to save and complete questionnaire:', error);
          return; // Don't navigate if save failed
        }
      }
      navigate('/results');
    }
  };

  const handleBack = () => {
    // Close tooltip if open
    setTooltipVisible(false);

    if (!isFirst) {
      const prevStep = step - 1;
      setStep(prevStep);
      dispatch(setCurrentStep(prevStep));
      // No API call here, just update local state
    } else {
      navigate('/');
    }
  };

  const handleRephraseClick = (key: string, event: React.MouseEvent) => {
    event.preventDefault();
    const textarea = textareaRefs.current[key];
    if (!textarea) return;

    const rect = textarea.getBoundingClientRect();
    setTooltipPosition({
      top: rect.bottom + window.scrollY + 10,
      left: rect.left + window.scrollX
    });
    setActiveQuestionKey(key);
    setTooltipVisible(true);
  };

  const handleRephraseApply = (key: string, newText: string) => {
    handleChange(key, newText);
  };

  const handleCloseTooltip = () => {
    setTooltipVisible(false);
    setActiveQuestionKey('');
  };

  return (
    <div className="bg-gradient-to-br from-[#1A1339] to-[#402659] rounded-2xl p-8 md:p-12 max-w-2xl mx-auto w-full shadow-2xl border border-[#2B2042] text-center relative animate-fade-in">

      <div className="flex flex-col items-center mb-8">
        <span className="bg-white rounded-full p-4 mb-4 shadow-md">
          <Home className="text-[#8866FF]" size={36} />
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">{group.title}</h2>
        <p className="text-lg text-gray-300 mb-2">Shape your future identity</p>
      </div>
      {/* Questions */}
      <form className="flex flex-col gap-6 mb-4">
        {group.questions.map(q => (
          <div key={q.key} className="flex flex-col gap-2">
            <label htmlFor={q.key} className="text-left text-white text-2xl font-normal mb-1">{q.label}</label>
            <div className="relative">
              <textarea
                ref={(el) => (textareaRefs.current[q.key] = el)}
                id={q.key}
                className="w-full rounded-lg bg-[#18122B] border border-[#3C2960] text-white text-base px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-[#A66CFF] placeholder-gray-400 transition-all duration-200 resize-y"
                placeholder={q.placeholder || 'Write your answer here...'}
                value={answers[q.key] || ''}
                rows={2}
                onChange={e => handleChange(q.key, e.target.value)}
              />
              {/* Rephrase button - show only when there's text */}
              {answers[q.key] && answers[q.key].trim() && (
                <button
                  type="button"
                  onClick={(e) => handleRephraseClick(q.key, e)}
                  className="absolute top-3 right-3 p-2 text-[#8866FF] hover:text-[#A66CFF] hover:bg-[#2B2042] rounded-md transition-all duration-200 group"
                  title="AI Rephrase & Suggestions"
                >
                  <Wand2 size={16} className="group-hover:scale-110 transition-transform" />
                </button>
              )}
            </div>
          </div>
        ))}
      </form>
      {/* Buttons */}
      <div className="flex justify-between gap-4 mt-8">
        <button
          className="bg-transparent border border-[#4B88F7] text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 hover:bg-[#1A1339]"
          onClick={handleBack}
          disabled={isFirst}
        >
          Back
        </button>
        <button
          className="bg-gradient-to-r from-[#00AAFF] to-[#CC66FF] text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 hover:from-[#3C2960] hover:to-[#A66CFF] disabled:opacity-50"
          onClick={handleNext}
          disabled={!isGroupValid || isSaving }
        >
          {isSaving ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Saving...
            </>
          ) : isLast ? (
            'Complete & See Results'
          ) : (
            'Next'
          )}
        </button>
      </div>

      {/* Rephrase Tooltip */}
      <RephraseTooltip
        originalText={answers[activeQuestionKey] || ''}
        onRephrase={(newText) => handleRephraseApply(activeQuestionKey, newText)}
        questionLabel={group.questions.find(q => q.key === activeQuestionKey)?.label || ''}
        isVisible={tooltipVisible}
        onClose={handleCloseTooltip}
        position={tooltipPosition}
      />
    </div>
  );
};

export default StepperCard;
