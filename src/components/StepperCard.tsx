import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Wand2 } from 'lucide-react';
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
    title: 'Dream Life Essentials',
    questions: [
      { 
        label: 'When you wake up in your dream life, what’s the first thing you see?', 
        key: 'first_thing_you_see', 
        placeholder: 'Write your answer here...' 
      },
      { 
        label: 'As you walk through your dream home, what feeling fills your body?', 
        key: 'home_feeling_body', 
        placeholder: 'Write your answer here...' 
      },
      { 
        label: 'Where in the world do you feel “this is where I belong”?', 
        key: 'belong_location', 
        placeholder: 'Write your answer here...' 
      },
      { 
        label: 'If one moment of your future could be filmed forever — which moment is it?', 
        key: 'filmed_moment', 
        placeholder: 'Write your answer here...' 
      },
      { 
        label: 'Describe your perfect day from morning to night.', 
        key: 'perfect_day', 
        placeholder: 'Write your answer here...' 
      },
      { 
        label: 'What energy do you want people to feel when you enter a room?', 
        key: 'energy_enter_room', 
        placeholder: 'Write your answer here...' 
      },
      { 
        label: 'What detail in your dream home makes it feel truly yours?', 
        key: 'dream_home_detail', 
        placeholder: 'Write your answer here...' 
      },
      { 
        label: 'How does your ideal workspace look and feel?', 
        key: 'ideal_workspace', 
        placeholder: 'Write your answer here...' 
      },
      { 
        label: 'What daily habits keep you at your strongest?', 
        key: 'strongest_habits', 
        placeholder: 'Write your answer here...' 
      },
      { 
        label: 'If one sentence guided your entire life — what is it?', 
        key: 'life_sentence', 
        placeholder: 'Write your answer here...' 
      },
    ],
  }
];



const StepperCard = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { answers, currentStep } = useAppSelector((state) => state.questionnaire);
  const [step, setStep] = useState(currentStep);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
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

  const group = questionGroups[step];
  const currentQuestion = group.questions[currentQuestionIndex];
  
  // Calculate total questions across all groups
  const totalQuestions = questionGroups.reduce((sum, g) => sum + g.questions.length, 0);
  const completedQuestions = questionGroups.slice(0, step).reduce((sum, g) => sum + g.questions.length, 0) + currentQuestionIndex;
  const progressPercentage = Math.round(((completedQuestions + 1) / totalQuestions) * 100);

  const isCurrentQuestionValid = answers[currentQuestion.key] && answers[currentQuestion.key].trim() !== '';
  const isLastQuestionInGroup = currentQuestionIndex === group.questions.length - 1;
  const isLastGroup = step === questionGroups.length - 1;
  const isFirstQuestion = step === 0 && currentQuestionIndex === 0;

  const handleChange = (key: string, value: string) => {
    dispatch(updateAnswer({ key, value }));
    // Only update local state, no API call
  };

  const handleNext = async () => {
    // Close tooltip if open
    setTooltipVisible(false);

    if (!isCurrentQuestionValid) return;

    if (!isLastQuestionInGroup) {
      // Move to next question in current group
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else if (!isLastGroup) {
      // Move to next group
      const nextStep = step + 1;
      setStep(nextStep);
      setCurrentQuestionIndex(0);
      dispatch(setCurrentStep(nextStep));
    } else {
      // Last question completed, save all answers and complete questionnaire
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

    if (currentQuestionIndex > 0) {
      // Go back to previous question in current group
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else if (step > 0) {
      // Go back to previous group's last question
      const prevStep = step - 1;
      setStep(prevStep);
      setCurrentQuestionIndex(questionGroups[prevStep].questions.length - 1);
      dispatch(setCurrentStep(prevStep));
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
    <div className="relative z-10 text-center px-8 max-w-4xl backdrop-blur-xl bg-white/5 rounded-3xl py-12 border border-white/10 mx-auto w-full shadow-2xl">

      {/* Progress Section */}
      <div className="mb-12">
        <div className="flex justify-between items-center mb-3">
          <p className="text-white text-base font-normal">Step {completedQuestions + 1} of {totalQuestions}</p>
          <div className="text-right">
            <p className="text-white text-2xl font-semibold">{progressPercentage}%</p>
            <p className="text-gray-400 text-xs">complete</p>
          </div>
        </div>
        <div className="w-full bg-white/10 rounded-full h-4 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-[#4B88F7] via-[#8866FF] to-[#CC66FF] transition-all duration-500 ease-out rounded-full"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="mb-10">
        <p className="text-l md:text-3xl font-semibold text-white leading-relaxed mb-10 px-4">
          {currentQuestion.label}
        </p>
        
        <div className="relative">
          <textarea
            ref={(el) => (textareaRefs.current[currentQuestion.key] = el)}
            id={currentQuestion.key}
            className="w-full rounded-xl bg-[#1F1833]/80 border border-white/5 text-white text-base px-5 py-4 focus:outline-none focus:ring-2 focus:ring-[#8866FF]/50 focus:border-transparent placeholder-gray-500 transition-all duration-200 resize-none "
            placeholder={currentQuestion.placeholder || 'Write your answer here...'}
            value={answers[currentQuestion.key] || ''}
            rows={3}
            onChange={e => handleChange(currentQuestion.key, e.target.value)}
          />
          {/* Rephrase button - show only when there's text */}
          {answers[currentQuestion.key] && answers[currentQuestion.key].trim() && (
            <button
              type="button"
              onClick={(e) => handleRephraseClick(currentQuestion.key, e)}
              className="absolute top-4 right-4 p-2 text-[#8866FF] hover:text-[#A66CFF] hover:bg-[#2B2042] rounded-md transition-all duration-200 group"
              title="AI Rephrase & Suggestions"
            >
              <Wand2 size={18} className="group-hover:scale-110 transition-transform" />
            </button>
          )}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-between gap-4 mt-10">
        <button
          className="bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] text-white px-12 py-3.5 rounded-xl font-medium transition-all duration-200 hover:shadow-lg hover:shadow-purple-500/30 hover:scale-[1.02] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 text-base"
          onClick={handleBack}
          disabled={isFirstQuestion}
        >
          Back
        </button>
        <button
          className="bg-gradient-to-r from-[#3B82F6] to-[#60A5FA] text-white px-12 py-3.5 rounded-xl font-medium transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/30 hover:scale-[1.02] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 text-base"
          onClick={handleNext}
          disabled={!isCurrentQuestionValid || isSaving}
        >
          {isSaving ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Saving...
            </>
          ) : (isLastGroup && isLastQuestionInGroup) ? (
            'Complete'
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
