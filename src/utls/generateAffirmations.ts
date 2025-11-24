import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = 'AIzaSyA6OuX2EJ9H5YwiOUhgolYCxmFCnFHtIgo';
const genAI = new GoogleGenerativeAI(API_KEY);

export interface QuestionnaireAnswers {
  [key: string]: string;
}
const WORKING_MODELS = [
  'gemini-2.0-flash',          
  'gemini-2.0-flash-001',      
  'gemini-2.0-flash-exp',       
  'gemini-2.0-flash-lite',     
  'gemini-2.0-flash-lite-001',  
  'gemini-2.0-flash-lite-preview-02-05', 
  'gemini-2.0-flash-lite-preview',       
  'gemini-2.5-flash-lite-preview-06-17', 
];

export const getAvailableModelsFromAPI = async (): Promise<string[]> => {
  try {
    
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch models: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    
    if (data.models && Array.isArray(data.models)) {
      const availableModels = data.models
        .filter((model: any) => {
          // Filter out models that don't support text-only generation
          const methods = model.supportedGenerationMethods || [];
          const outputModalities = model.outputModalities || [];
          
          return methods.includes('generateContent') && 
                 outputModalities.includes('TEXT') &&
                 !model.name.includes('tts') &&  // Exclude TTS models
                 !model.name.includes('image-generation'); // Exclude image-only models
        })
        .map((model: any) => model.name.replace('models/', ''));
        
      return availableModels;
    }
    
    return [];
    
  } catch (error: any) {
    return WORKING_MODELS; // Fallback to known working models
  }
};

// Function to get available models using multiple methods
export const discoverAvailableModels = async (): Promise<string[]> => {
  
  // Try the direct API method first
  let models = await getAvailableModelsFromAPI();
  
  if (models.length > 0) {
    return models;
  }
  
  return WORKING_MODELS;
};

// Function to test which models actually work
export const testWorkingModels = async (modelNames: string[]): Promise<string[]> => {
  const workingModels: string[] = [];
  
  
  for (const modelName of modelNames) {
    try {
      
      const model = genAI.getGenerativeModel({ 
        model: modelName,
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 50,
        },
      });
      
      const result = await model.generateContent("Test");
      const response = await result.response;
      
      if (response.text()) {
        workingModels.push(modelName);
      }
    } catch (error: any) {
      console.log(`❌ Model ${modelName} failed:`, error.message);
    }
  }
  
  return workingModels;
};

// Cache for working models to avoid repeated API calls


export const generatePersonalizedAffirmations = async (
  answers: QuestionnaireAnswers
): Promise<string[]> => {
  // Use only working models based on test results
  const modelNames = WORKING_MODELS;

  for (const modelName of modelNames) {
    try {

      const model = genAI.getGenerativeModel({
        model: modelName,
        generationConfig: {
          temperature: 0.8,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 800,
        },
      });

      // Extract key information from answers
      const name = answers.name || 'this person';
      const dreamSentence = answers.dream_sentence || '';
      const coreValues = answers.core_values || '';
      const dreamLocation = answers.dream_location || '';
      const perfectDay = answers.perfect_day || '';
      const fulfillment = answers.fulfillment || '';
      const financialReality = answers.financial_reality || '';
      const legacy = answers.legacy || '';

      const prompt = `Based on the following questionnaire responses about someone's dream life, create 8 powerful, personalized affirmations that reflect their unique vision and goals. Make them inspiring, present-tense, and specific to their dreams.

Person's name: ${name}
Dream life description: ${dreamSentence}
Core values: ${coreValues}
Dream location: ${dreamLocation}
Perfect day description: ${perfectDay}
Career fulfillment: ${fulfillment}
Financial reality: ${financialReality}
Legacy goals: ${legacy}

Create 8 affirmations that:
1. Are written in first person ("I am...", "I have...", "I create...")
2. Are specific to their unique vision and values
3. Cover different aspects of their dream life (career, relationships, abundance, health, purpose)
4. Are inspiring and empowering
5. Feel personal and meaningful to their specific goals

Format: Return exactly 8 affirmations, one per line, no numbering or bullet points.`;

      const result = await model.generateContent(prompt);
      const response = await result.response;

      if (response.promptFeedback?.blockReason) {
        console.warn(`Content was blocked with model ${modelName}: ${response.promptFeedback.blockReason}`);
        continue; // Try next model
      }

      const text = response.text();
      const affirmations = text
        .split('\n')
        .filter(line => line.trim().length > 0)
        .map(line => line.trim())
        .slice(0, 8); // Ensure we only get 8 affirmations

      // If we don't get enough affirmations, pad with defaults
      if (affirmations.length < 8) {
        const defaultAffirmations = getDefaultAffirmations();
        while (affirmations.length < 8) {
          affirmations.push(defaultAffirmations[affirmations.length]);
        }
      }

      return affirmations;

    } catch (error: any) {
      console.log(`❌ Model ${modelName} failed:`, error.message);

      // If this is the last model and it failed, fall back to offline generation
      if (modelName === modelNames[modelNames.length - 1]) {
        console.error('All Gemini models failed, falling back to offline generation');
        console.error('Final error details:', {
          message: error.message,
          status: error.status,
          code: error.code,
        });

        // Fallback to offline generation
        return generateOfflineAffirmations(answers);
      }

      // Continue to next model
      continue;
    }
  }

  // If we reach here, all models failed
  console.warn('All Gemini models failed, using offline generation');
  return generateOfflineAffirmations(answers);
};

// Offline affirmations generation based on questionnaire answers
const generateOfflineAffirmations = (answers: QuestionnaireAnswers): string[] => {
  const name = answers.name || '';
  const dreamSentence = answers.dream_sentence || '';
  const coreValues = answers.core_values || '';
  const dreamLocation = answers.dream_location || '';
  const fulfillment = answers.fulfillment || '';
  const financialReality = answers.financial_reality || '';

  const personalizedAffirmations: string[] = [];

  // Name-based affirmation
  if (name) {
    personalizedAffirmations.push(`I am ${name}, and I am creating the life of my dreams.`);
  }

  // Core values affirmation
  if (coreValues) {
    personalizedAffirmations.push(`I live by my core values of ${coreValues.toLowerCase()}, and they guide me toward success.`);
  }

  // Location-based affirmation
  if (dreamLocation) {
    personalizedAffirmations.push(`I am living my dream life in ${dreamLocation.toLowerCase()}, surrounded by beauty and possibility.`);
  }

  // Career fulfillment affirmation
  if (fulfillment) {
    personalizedAffirmations.push(`I am fulfilled through meaningful work that aligns with my purpose and passion.`);
  }

  // Financial affirmation
  if (financialReality) {
    personalizedAffirmations.push(`I attract abundance and financial freedom that supports my dream lifestyle.`);
  }

  // Dream sentence affirmation
  if (dreamSentence) {
    personalizedAffirmations.push(`I am manifesting this vision: ${dreamSentence.toLowerCase()}`);
  }

  // Fill remaining slots with default affirmations
  const defaultAffirmations = getDefaultAffirmations();
  while (personalizedAffirmations.length < 8) {
    const nextDefault = defaultAffirmations[personalizedAffirmations.length];
    if (nextDefault && !personalizedAffirmations.includes(nextDefault)) {
      personalizedAffirmations.push(nextDefault);
    } else {
      break;
    }
  }

  return personalizedAffirmations.slice(0, 8);
};

const getDefaultAffirmations = (): string[] => [
  "I am creating a life of passion and purpose.",
  "My mind is focused and clear.",
  "I am creating a life that reflects passion, purpose, and the limitless potential within me.",
  "I consistently attract opportunities that support my personal growth, professional success, and financial abundance.",
  "Each day, I move closer to achieving my goals.",
  "I attract success and abundance.",
  "My confidence grows with each step I take.",
  "I am worthy of all the beautiful experiences life has to offer.",
];

export const discoverAndTestAllModels = async (): Promise<{
  apiModels: string[];
  workingModels: string[];
  summary: string;
}> => {
  
  const apiModels = await getAvailableModelsFromAPI();
  
  const modelsToTest = apiModels.length > 0 ? apiModels : [
    'gemini-1.5-flash-8b-latest',
    'gemini-1.5-flash-latest', 
    'gemini-1.5-pro-latest',
    'gemini-1.5-flash',
    'gemini-1.5-pro',
    'gemini-pro',
  ];
  
  const workingModels = await testWorkingModels(modelsToTest);
  
  const summary = `
🎯 DISCOVERY COMPLETE:
   • Found ${apiModels.length} models from Google AI API
   • Tested ${modelsToTest.length} models
   • ${workingModels.length} models are working
   • Working models: ${workingModels.join(', ') || 'None'}
   
📞 Next steps: Use these working model names in your code!
  `;
  
  
  return {
    apiModels,
    workingModels,
    summary
  };
};
