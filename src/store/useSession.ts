import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './hooks';
import { useCreateUserSessionMutation, useGetUserSessionQuery } from './api';
import { setSessionId } from './questionnaireSlice';

// Custom hook for session management
export const useSession = () => {
  const dispatch = useAppDispatch();
  const sessionId = useAppSelector((state) => state.questionnaire.sessionId);
  
  const [createSession, { isLoading: isCreating }] = useCreateUserSessionMutation();
  const { data: sessionData, isLoading: isLoadingSession } = useGetUserSessionQuery(
    sessionId || '',
    { skip: !sessionId }
  );

  // Initialize session on app load
  useEffect(() => {
    const initializeSession = async () => {
      // Check if we have a session ID in localStorage
      const storedSessionId = localStorage.getItem('dreamlife-session-id');
      
      if (storedSessionId) {
        dispatch(setSessionId(storedSessionId));
      } else {
        // Create new session
        try {
          const result = await createSession().unwrap();
          const newSessionId = result.data.sessionId;
          dispatch(setSessionId(newSessionId));
          localStorage.setItem('dreamlife-session-id', newSessionId);
        } catch (error) {
          console.error('Failed to create session:', error);
        }
      }
    };

    if (!sessionId) {
      initializeSession();
    }
  }, [sessionId, createSession, dispatch]);

  return {
    sessionId,
    sessionData: sessionData?.data,
    isLoading: isCreating || isLoadingSession,
  };
};
