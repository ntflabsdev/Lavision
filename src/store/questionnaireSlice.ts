import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface QuestionnaireState {
  answers: { [key: string]: string };
  currentStep: number;
}

const initialState: QuestionnaireState = {
  answers: {},
  currentStep: 0,
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
    },
    setCurrentStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    },
  },
});

export const { updateAnswer, setAnswers, clearAnswers, setCurrentStep } = questionnaireSlice.actions;
export default questionnaireSlice.reducer;
