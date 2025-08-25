import { GoogleGenerativeAI } from '@google/generative-ai';

const GEMINI_API_KEY = 'Your_api_key'; // Replace with your actual API key
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

// Custom system prompt that defines how the AI should behave
const SYSTEM_PROMPT = `Please follow these guidelines:
- Be concise but informative
- give your answer in not more than 100 words
- Use a friendly but arrogant and professional tone
- Format your responses with clear structure using bullet points or numbered lists when appropriate
- Always provide practical examples when explaining concepts`;

async function run(userPrompt, customPrompt = null) {
  try {
    // Use custom prompt if provided, otherwise use default system prompt
    const systemPrompt = customPrompt || SYSTEM_PROMPT;
    
    // Combine system prompt with user prompt
    const fullPrompt = `${systemPrompt}\n\nUser Question: ${userPrompt}`;
    
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    
    return response.text();
  } catch (error) {
    console.error('Error generating content:', error);
    throw error;
  }
}

// Helper function to list available models
async function listModels() {
  try {
    const models = await genAI.listModels();
    console.log('Available models:', models);
    return models;
  } catch (error) {
    console.error('Error listing models:', error);
    throw error;
  }
}

export default run;

export { listModels };
