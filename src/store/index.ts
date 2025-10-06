import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import questionnaireReducer from './questionnaireSlice';
import { dreamLifeApi } from './api';

export const store = configureStore({
  reducer: {
    questionnaire: questionnaireReducer,
    [dreamLifeApi.reducerPath]: dreamLifeApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(dreamLifeApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
