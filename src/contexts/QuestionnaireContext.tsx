import React, { createContext, useContext, useState, ReactNode } from 'react';

interface QuestionnaireContextType {
  answers: { [key: string]: string };
  setAnswers: (answers: { [key: string]: string }) => void;
  updateAnswer: (key: string, value: string) => void;
  clearAnswers: () => void;
}

const QuestionnaireContext = createContext<QuestionnaireContextType | undefined>(undefined);

export const useQuestionnaire = () => {
  const context = useContext(QuestionnaireContext);
  if (!context) {
    throw new Error('useQuestionnaire must be used within a QuestionnaireProvider');
  }
  return context;
};

interface QuestionnaireProviderProps {
  children: ReactNode;
}

export const QuestionnaireProvider: React.FC<QuestionnaireProviderProps> = ({ children }) => {
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});

  const updateAnswer = (key: string, value: string) => {
    setAnswers(prev => ({ ...prev, [key]: value }));
  };

  const clearAnswers = () => {
    setAnswers({});
  };

  const value = {
    answers,
    setAnswers,
    updateAnswer,
    clearAnswers,
  };

  return (
    <QuestionnaireContext.Provider value={value}>
      {children}
    </QuestionnaireContext.Provider>
  );
};
