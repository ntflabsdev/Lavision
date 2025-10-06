import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface QuestionnaireState {
  answers: { [key: string]: string };
  currentStep: number;
  sessionId: string | null;
  isCompleted: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: QuestionnaireState = {
  answers: {},
  currentStep: 0,
  sessionId: null,
  isCompleted: false,
  isLoading: false,
  error: null,
};

const questionnaireSlice = createSlice({
  name: 'questionnaire',
  initialState,
  reducers: {
    updateAnswer: (state, action: PayloadAction<{ key: string; value: string }>) => {
      state.answers[action.payload.key] = action.payload.value;
    },
    setAnswers: (state, action: PayloadAction<{ [key: string]: string }>) => {
      state.answers = action.payload;
    },
    clearAnswers: (state) => {
      state.answers = {};
      state.currentStep = 0;
      state.isCompleted = false;
      state.error = null;
    },
    setCurrentStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    },
    setSessionId: (state, action: PayloadAction<string>) => {
      state.sessionId = action.payload;
    },
    setCompleted: (state, action: PayloadAction<boolean>) => {
      state.isCompleted = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    // Sync with API response
    syncWithApiResponse: (state, action: PayloadAction<{
      answers: { [key: string]: string };
      currentStep: number;
      sessionId: string;
      isCompleted: boolean;
    }>) => {
      state.answers = action.payload.answers;
      state.currentStep = action.payload.currentStep;
      state.sessionId = action.payload.sessionId;
      state.isCompleted = action.payload.isCompleted;
    },
  },
});

export const { 
  updateAnswer, 
  setAnswers, 
  clearAnswers, 
  setCurrentStep,
  setSessionId,
  setCompleted,
  setLoading,
  setError,
  syncWithApiResponse
} = questionnaireSlice.actions;

export default questionnaireSlice.reducer;
