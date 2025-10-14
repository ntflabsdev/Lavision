import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Base API URL - adjust this based on your backend server
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

// Types for API responses and requests
export interface QuestionnaireResponse {
  success: boolean;
  data: {
    userId: string;
    answers: { [key: string]: string };
    currentStep: number;
    isCompleted: boolean;
    createdAt?: string;
    updatedAt?: string;
  };
}

export interface QuestionnaireRequest {
  answers: { [key: string]: string };
  currentStep: number;
  isCompleted: boolean;
}

export interface AnswerUpdateRequest {
  answer: {
    key: string;
    value: string;
  };
}

export interface ContactRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  message: string;
}

export interface ContactResponse {
  success: boolean;
  data: {
    id: string;
    message: string;
  };
}

export interface DreamWorldGenerationRequest {
  userId: string;
  questionnaireId?: string;
}

export interface DreamWorldResponse {
  success: boolean;
  data: {
    id: string;
    sessionId: string;
    worldData?: {
      title: string;
      description: string;
      environment: {
        location: string;
        weather: string;
        timeOfDay: string;
        ambiance: string;
      };
      colors: {
        primary: string;
        secondary: string;
        accent: string;
        background: string;
      };
      assets: {
        models: string[];
        textures: string[];
        sounds: string[];
        animations: string[];
      };
    };
    generationStatus: 'pending' | 'processing' | 'completed' | 'failed';
    generationStartedAt?: string;
    generationCompletedAt?: string;
    errorMessage?: string;
  };
  message?: string;
}

export interface UserSessionResponse {
  success: boolean;
  data: {
    sessionId: string;
    userId: string;
    isAnonymous: boolean;
    lastActiveAt?: string;
  };
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  price: string;
  setupFee: string;
  trialDays: number;
  features: string[];
}

export interface SubscriptionPlansResponse {
  success: boolean;
  data: {
    basicPlan: SubscriptionPlan;
    premiumPlan: SubscriptionPlan;
  };
}



export interface SubscriptionDetailsResponse {
  success: boolean;
  data: {
    database?: {
      id: string;
      status: string;
      planName: string;
      billing: {
        amount: number;
        currency: string;
        interval: string;
        intervalCount: number;
      };
      trialInfo?: {
        isTrialPeriod: boolean;
        trialDays: number;
        trialStartDate?: string;
        trialEndDate?: string;
      };
      paymentInfo: {
        nextBillingTime?: string;
        lastPaymentDate?: string;
        lastPaymentAmount?: number;
        failedPaymentCount: number;
      };
      isActive: boolean;
      isInTrial: boolean;
      createdAt: string;
      activatedAt?: string;
    };
    paypal?: any;
    user?: any;
  };
}

export interface CheckExistingSubscriptionsResponse {
  success: boolean;
  hasActiveSubscription: boolean;
  subscriptions?: Array<{
    id: string;
    planName: string;
    status: string;
    paypalSubscriptionId: string;
    nextBillingTime?: string;
    isInTrial: boolean;
  }>;
  message: string;
}

export interface CancelSubscriptionResponse {
  success: boolean;
  message: string;
}

export interface CreateSubscriptionRequest {
  planId: string;
  subscriberInfo?: {
    name: {
      given_name: string;
      surname: string;
    };
    email_address: string;
  };
}

export interface CreateSubscriptionResponse {
  success: boolean;
  data: {
    subscriptionId: string;
    status: string;
    approvalUrl?: string;
    databaseId: string;
  };
  message: string;
}

export interface UserSubscriptionsResponse {
  success: boolean;
  data: Array<{
    id: string;
    paypalSubscriptionId: string;
    planName: string;
    status: string;
    billing: {
      amount: number;
      currency: string;
      interval: string;
      intervalCount: number;
    };
    trialInfo?: {
      isTrialPeriod: boolean;
      trialDays: number;
      trialStartDate?: string;
      trialEndDate?: string;
    };
    paymentInfo: {
      nextBillingTime?: string;
      lastPaymentDate?: string;
      lastPaymentAmount?: number;
      failedPaymentCount: number;
    };
    isActive: boolean;
    isInTrial: boolean;
    createdAt: string;
    activatedAt?: string;
    cancelledAt?: string;
  }>;
}

// Auth types
export interface User {
  _id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  isEmailVerified: boolean;
  subscriptions: Array<{
    planId: string;
    planName: string;
    status: 'active' | 'cancelled' | 'expired';
    startDate: string;
    endDate?: string;
    paypalSubscriptionId?: string;
  }>;
  createdAt: string;
}

export interface AuthResponse {
  success: boolean;
  data: {
    user: User;
    token: string;
  };
}

export interface AuthProfileResponse {
  success: boolean;
  data: {
    user: User;
  };
}

export interface AuthRequest {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ForgotPasswordResponse {
  success: boolean;
  message: string;
}

// Dashboard response type
export interface DashboardResponse {
  success: boolean;
  data: {
    user: User;
    subscriptions: Array<{
      _id: string;
      planId: string;
      planName: string;
      status: 'active' | 'cancelled' | 'expired';
      paypalSubscriptionId?: string;
      startDate: string;
      endDate?: string;
      amount: number;
      currency: string;
      nextBillingTime?: string;
      isInTrial: boolean;
      createdAt: string;
    }>;
    transactions: Array<{
      _id: string;
      transactionId: string;
      planId?: string;
      planName?: string;
      amount: number;
      currency: string;
      status: 'completed' | 'pending' | 'failed';
      paypalOrderId?: string;
      createdAt: string;
    }>;
    questionnaires: Array<{
      _id: string;
      userId: string;
      answers: Record<string, any>;
      currentStep: number;
      isCompleted: boolean;
      createdAt: string;
      updatedAt: string;
    }>;
    stats: {
      totalQuestionnaires: number;
      activeSubscriptions: number;
      totalTransactions: number;
      totalSpent: number;
    };
  };
}

// Create the API service
export const dreamLifeApi = createApi({
  reducerPath: 'dreamLifeApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    credentials: 'include',
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json');
      headers.set('ngrok-skip-browser-warning', 'true');
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Questionnaire', 'DreamWorld', 'Contact', 'UserSession', 'Payments', 'Subscriptions', 'Auth'],
  endpoints: (builder) => ({

    login: builder.mutation<AuthResponse, { email: string; password: string }>({
      query: (body) => ({
        url: '/auth/login',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Auth'],
    }),
    register: builder.mutation<AuthResponse, AuthRequest>({
      query: (body) => ({
        url: '/auth/register',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Auth'],
    }),
    forgotPassword: builder.mutation<ForgotPasswordResponse, ForgotPasswordRequest>({
      query: (body) => ({
        url: '/auth/forgot-password',
        method: 'POST',
        body,
      }),
    }),
    getUser: builder.query<AuthProfileResponse, void>({
      query: () => '/auth/profile',
      providesTags: ['Auth'],
    }),
  // logout endpoint removed; handle logout client-side only
    getDashboard: builder.query<DashboardResponse, void>({
      query: () => '/auth/dashboard',
      providesTags: ['Auth', 'Subscriptions', 'Payments'],
    }),

    // Questionnaire endpoints
    saveQuestionnaire: builder.mutation<QuestionnaireResponse, QuestionnaireRequest>({
      query: (data) => ({
        url: '/questionnaire',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Questionnaire'],
    }),

    updateAnswer: builder.mutation<QuestionnaireResponse, { userId: string; answer: { key: string; value: string } }>({
      query: ({ userId, answer }) => ({
        url: `/questionnaire/${userId}/answer`,
        method: 'PATCH',
        body: { answer },
      }),
      invalidatesTags: ['Questionnaire'],
    }),

    getQuestionnaire: builder.query<QuestionnaireResponse, string>({
      query: (userId) => `/questionnaire/${userId}`,
      providesTags: ['Questionnaire'],
    }),

    generateDreamWorld: builder.mutation<DreamWorldResponse, DreamWorldGenerationRequest>({
      query: (data) => ({
        url: '/dream-world/generate',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['DreamWorld'],
    }),

    getDreamWorld: builder.query<DreamWorldResponse, string>({
      query: (sessionId) => `/dream-world/${sessionId}`,
      providesTags: ['DreamWorld'],
      // Poll every 3 seconds when generation is in progress
      async onCacheEntryAdded(
        sessionId,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        try {
          await cacheDataLoaded;
          
          const poll = setInterval(async () => {
            try {
              const response = await fetch(`${API_BASE_URL}/dream-world/${sessionId}`);
              const result = await response.json();
              
              if (result.success) {
                updateCachedData(() => result);
                
                // Stop polling if generation is completed or failed
                if (result.data.generationStatus === 'completed' || result.data.generationStatus === 'failed') {
                  clearInterval(poll);
                }
              }
            } catch (error) {
              console.error('Polling error:', error);
              clearInterval(poll);
            }
          }, 3000);

          await cacheEntryRemoved;
          clearInterval(poll);
        } catch (error) {
          console.error('Cache entry error:', error);
        }
      },
    }),



    // Payments / Transactions (user wallet) endpoints
    addTransaction: builder.mutation<
      { success: boolean; message: string; data: { transaction: any } },
      { transactionId: string; amount: number; currency?: string; status?: 'completed' | 'pending' | 'failed'; paypalOrderId?: string }
    >({
      query: (body) => ({
        url: '/payments/transactions',
        method: 'POST',
        body: {
          ...body,
          currency: body.currency || 'USD',
          status: body.status || 'completed'
        }
      }),
      invalidatesTags: ['Payments']
    }),

    addUserSubscription: builder.mutation<
      { success: boolean; message: string; data: { subscription: any } },
      { planId: string; planName: string; status?: 'active' | 'cancelled' | 'expired'; startDate?: string; endDate?: string; paypalSubscriptionId: string }
    >({
      query: (body) => ({
        url: '/payments/subscriptions',
        method: 'POST',
        body: {
          ...body,
          status: body.status || 'active',
          startDate: body.startDate || new Date().toISOString()
        }
      }),
      invalidatesTags: ['Subscriptions']
    }),

    cancelPaymentSubscription: builder.mutation<
      { success: boolean; message: string; data: any },
      { subscriptionId: string; reason?: string }
    >({
      query: ({ subscriptionId, reason }) => ({
        url: `/payments/subscriptions/${subscriptionId}/cancel`,
        method: 'POST',
        body: { reason }
      }),
      invalidatesTags: ['Subscriptions']
    }),

    // Subscription details endpoint
    getSubscriptionDetails: builder.query<SubscriptionDetailsResponse, string>({
      query: (subscriptionId) => `/payments/subscriptions/${subscriptionId}`,
      providesTags: ['Subscriptions'],
    }),

    // Contact form endpoint
    sendContactForm: builder.mutation<ContactResponse, ContactRequest>({
      query: (body) => ({
        url: '/contact',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Contact'],
    }),
  }),
});

// Export only the hooks that are used in the codebase
export const {
  useSaveQuestionnaireMutation,
  useUpdateAnswerMutation,
  useGetQuestionnaireQuery,
  useGenerateDreamWorldMutation,
  useGetDreamWorldQuery,
  useAddTransactionMutation,
  useAddUserSubscriptionMutation,
  useCancelPaymentSubscriptionMutation,
  // Auth hooks
  useLoginMutation,
  useRegisterMutation,
  useForgotPasswordMutation,
  useGetUserQuery,
  useGetDashboardQuery,
  // Session hooks

  // Subscription details hook
  useGetSubscriptionDetailsQuery,
  useSendContactFormMutation,
} = dreamLifeApi;
