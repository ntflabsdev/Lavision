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
    title: 'Pre-Step',
    questions: [
      {
        label: 'How would you like us to address you?',
        key: 'how_to_address_you',
        placeholder: 'Write your answer here...'
      },
    ],
  },
  {
    title: 'Dream Life Essentials',
    questions: [
      {
        label: 'Imagine a completely ordinary morning in the life you want. You open your eyes. Where are you, and what is the first thing you see?',
        key: 'q1_ordinary_morning_first_see',
        placeholder: 'Write your answer here...'
      },
      {
        label: 'As you get out of bed and the day begins, how does the space around you feel? The light, the silence, the atmosphere.',
        key: 'q2_space_feel_morning',
        placeholder: 'Write your answer here...'
      },
      {
        label: 'You step out into your day. Where are you going, and how are you moving there?',
        key: 'q3_step_out_where_going',
        placeholder: 'Write your answer here...'
      },
      {
        label: 'There is a moment during the day when you feel most like yourself. What are you doing in that moment?',
        key: 'q4_most_like_yourself_moment',
        placeholder: 'Write your answer here...'
      },
      {
        label: 'How do you move through interactions with people in this life? How do you speak, respond, and carry yourself?',
        key: 'q5_interactions_with_people',
        placeholder: 'Write your answer here...'
      },
      {
        label: 'Think about your main space of work or creation. Where is it, and who are you when you are there?',
        key: 'q6_main_space_of_work',
        placeholder: 'Write your answer here...'
      },
      {
        label: 'When you are completely alone, with no one around and nothing demanding your attention, how do you feel with yourself?',
        key: 'q7_when_completely_alone',
        placeholder: 'Write your answer here...'
      },
      {
        label: 'Imagine a regular evening in this life. Where are you, and how does the day feel when you look back at it?',
        key: 'q8_regular_evening',
        placeholder: 'Write your answer here...'
      },
      {
        label: 'If someone were observing you from the outside in this life, what kind of presence would they notice?',
        key: 'q9_observer_notice_presence',
        placeholder: 'Write your answer here...'
      },
      {
        label: 'After imagining all of this, what is the strongest feeling you notice in your body right now?',
        key: 'q10_strongest_feeling_now',
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
      // Last question completed, save all answers and move to payments
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
      navigate('/welcome-home');
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
          <p className="text-white text-[22px] font-normal">Step {completedQuestions + 1} of {totalQuestions}</p>
          <div className="flex items-center gap-2">
            <p className="text-white text-[22px] font-normal">{progressPercentage}%</p>
            <p className="text-white text-[22px] font-normal">complete</p>
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
<<<<<<< HEAD
      <p className="text-[24px] text-left  text-white leading-relaxed mb-10 px-4">

=======
        <p className="text-[26px] text-left font-semibold text-white leading-relaxed mb-10 px-4">
>>>>>>> c6089880bd4a054956f72442ea452f02c08c50c0
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
