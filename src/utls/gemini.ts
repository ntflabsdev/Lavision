import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY =  'AIzaSyA6OuX2EJ9H5YwiOUhgolYCxmFCnFHtIgo';


// Initialize with specific API version if possible
const genAI = new GoogleGenerativeAI(API_KEY);
export interface RephraseOptions {
  tone?: 'professional' | 'casual' | 'inspiring' | 'creative' | 'concise';
  style?: 'detailed' | 'brief' | 'poetic' | 'straightforward';
}

export const rephraseText = async (
  originalText: string, 
  options: RephraseOptions = {}
): Promise<string> => {
  
  if (!originalText.trim()) {
    throw new Error('Text cannot be empty');
  }

  const { tone = 'inspiring', style = 'detailed' } = options;
  
  // Only working models based on test results (no quota issues, supports text generation)
  const modelNames = [
    'gemini-2.0-flash',           // ✅ Fast and reliable
    'gemini-2.0-flash-001',       // ✅ Stable version
    'gemini-2.0-flash-exp',       // ✅ Experimental but working
    'gemini-2.0-flash-lite',      // ✅ Lightweight version
    'gemini-2.0-flash-lite-001',  // ✅ Stable lite version
    'gemini-2.0-flash-lite-preview-02-05', // ✅ Preview version
    'gemini-2.0-flash-lite-preview',       // ✅ Latest lite preview
    'gemini-2.5-flash-lite-preview-06-17', // ✅ Latest working 2.5 model
  ];
  
  for (const modelName of modelNames) {
    try {
      
      const model = genAI.getGenerativeModel({ 
        model: modelName,
        generationConfig: {
          temperature: 0.7,
          topK: 1,
          topP: 1,
          maxOutputTokens: 200,
        },
      });

      const prompt = `Please rephrase the following text to make it more ${tone} and ${style}. 
      The text is about someone's dream life vision, so keep it personal and meaningful.
      Only return the rephrased text, nothing else.

      Original text: "${originalText}"`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      
      if (response.promptFeedback?.blockReason) {
        console.warn(`Content was blocked with model ${modelName}: ${response.promptFeedback.blockReason}`);
        continue; // Try next model
      }
      
      const rephrasedText = response.text().trim();
      
      if (!rephrasedText) {
        console.warn(`No response from model ${modelName}`);
        continue; // Try next model
      }

      return rephrasedText;
      
    } catch (error: any) {
      console.log(`❌ Model ${modelName} failed:`, error.message);
      
      // If this is the last model and it failed, throw error
      if (modelName === modelNames[modelNames.length - 1]) {
        console.error('All Gemini models failed for rephrasing');
        console.error('Final error details:', {
          message: error.message,
          status: error.status,
          code: error.code,
          response: error.response,
          stack: error.stack
        });
        
        // Handle specific Gemini errors for the final attempt
        if (error.message?.includes('API key') || error.message?.includes('API_KEY_INVALID')) {
          throw new Error('Invalid API key. Please check your Gemini API configuration.');
        } else if (error.status === 404 || error.message?.includes('404')) {
          throw new Error('Model not found. The Gemini model may not be available or the model name is incorrect.');
        } else if (error.status === 429 || error.message?.includes('quota') || error.message?.includes('limit') || error.message?.includes('RESOURCE_EXHAUSTED')) {
          throw new Error('API quota exceeded. Please wait before trying again or check your billing settings.');
        } else if (error.message?.includes('blocked')) {
          throw new Error('Content was blocked by safety filters.');
        } else if (error.code === 'ENOTFOUND' || error.message?.includes('network') || error.message?.includes('fetch')) {
          throw new Error('Network error. Please check your internet connection.');
        }
        
        throw new Error(`Failed to rephrase text: ${error.message || 'Unknown error'}`);
      }
      
      // Continue to next model
      continue;
    }
  }
  
  // If we reach here, all models failed
  throw new Error('All Gemini models failed to rephrase text');
};

export const getSuggestions = async (questionContext: string): Promise<string[]> => {
  // Only working models based on test results (no quota issues, supports text generation)
  const modelNames = [
    'gemini-2.0-flash',           // ✅ Fast and reliable
    'gemini-2.0-flash-001',       // ✅ Stable version
    'gemini-2.0-flash-exp',       // ✅ Experimental but working
    'gemini-2.0-flash-lite',      // ✅ Lightweight version
    'gemini-2.0-flash-lite-001',  // ✅ Stable lite version
    'gemini-2.0-flash-lite-preview-02-05', // ✅ Preview version
    'gemini-2.0-flash-lite-preview',       // ✅ Latest lite preview
    'gemini-2.5-flash-lite-preview-06-17', // ✅ Latest working 2.5 model
  ];
  
  for (const modelName of modelNames) {
    try {
      
      const model = genAI.getGenerativeModel({ 
        model: modelName,
        generationConfig: {
          temperature: 0.8,
          topK: 1,
          topP: 1,
          maxOutputTokens: 300,
        },
      });

      const prompt = `Generate 3 diverse and inspiring example answers for this dream life question: "${questionContext}"
      
      Make them:
      - Personal and relatable
      - Different from each other
      - Inspiring but realistic
      - Around 1-2 sentences each
      
      Return only the 3 examples, each on a new line, without numbering or bullets.`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      
      if (response.promptFeedback?.blockReason) {
        console.warn(`Content was blocked with model ${modelName}:`, response.promptFeedback.blockReason);
        continue; // Try next model
      }
      
      const responseText = response.text().trim();
      
      if (!responseText) {
        console.warn(`No suggestions received from model ${modelName}`);
        continue; // Try next model
      }

      const suggestions = responseText.split('\n').filter((line: string) => line.trim()).slice(0, 3);
      return suggestions;
      
    } catch (error: any) {
      console.log(`❌ Model ${modelName} failed for suggestions:`, error.message);
      
      // If this is the last model, return empty array
      if (modelName === modelNames[modelNames.length - 1]) {
        console.error('All Gemini models failed for suggestions:', error);
        return [];
      }
      
      // Continue to next model
      continue;
    }
  }
  
  // If we reach here, all models failed
  console.warn('All Gemini models failed for suggestions');
  return [];
};
