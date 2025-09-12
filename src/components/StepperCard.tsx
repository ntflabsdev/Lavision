import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { updateAnswer, setCurrentStep } from '../store/questionnaireSlice';

const questionGroups = [
  {
    title: 'Identity & Vision',
    questions: [
      { label: 'What’s your name, and how would you like the world to know you?', key: 'name', placeholder: 'Write your answer here...' },
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

  const isFirst = step === 0;
  const isLast = step === questionGroups.length - 1;
  const group = questionGroups[step];

  const isGroupValid = group.questions.every(q => answers[q.key] && answers[q.key].trim() !== '');

  const handleChange = (key: string, value: string) => {
    dispatch(updateAnswer({ key, value }));
  };

  const handleNext = () => {
    if (!isGroupValid) return;
    if (!isLast) {
      const nextStep = step + 1;
      setStep(nextStep);
      dispatch(setCurrentStep(nextStep));
    } else {
      // Last step completed, navigate to results
      navigate('/results');
    }
  };

  const handleBack = () => {
    if (!isFirst) {
      const prevStep = step - 1;
      setStep(prevStep);
      dispatch(setCurrentStep(prevStep));
    } else {
      navigate('/');
    }
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
            <textarea
              id={q.key}
              className="w-full rounded-lg bg-[#18122B] border border-[#3C2960] text-white text-base px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#A66CFF] placeholder-gray-400 transition-all duration-200 resize-y"
              placeholder={q.placeholder || 'Write your answer here...'}
              value={answers[q.key] || ''}
              rows={2}
              onChange={e => handleChange(q.key, e.target.value)}
            />
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
          className="bg-gradient-to-r from-[#00AAFF] to-[#CC66FF] text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 hover:from-[#3C2960] hover:to-[#A66CFF]"
          onClick={handleNext}
          disabled={!isGroupValid}
        >
          {isLast ? 'Finish' : 'Next'}
        </button>
      </div>
    </div>
  );
};

export default StepperCard;
