
import { toast } from 'sonner';

// API configuration
const getApiKey = (): string => {
  const storedKey = localStorage.getItem('OPENAI_API_KEY');
  if (storedKey) return storedKey;
  return "";
};

export const isApiKeySet = (): boolean => {
  return !!getApiKey();
};

export const setApiKey = (key: string): void => {
  localStorage.setItem('OPENAI_API_KEY', key);
  toast.success('API key saved successfully');
};

// Enhanced interfaces
interface TranscriptionResponse {
  text: string;
}

interface SummaryResponse {
  summary: string;
  keyPoints: string[];
  codeSnippets?: {
    code: string;
    explanation: string;
    language: string;
  }[];
  topics?: string[];
  questions?: string[];
  learningObjectives?: string[];
}

interface DocumentQAResponse {
  answer: string;
  relevantSections?: string[];
  confidence: number;
}

// Function to transcribe video
export const transcribeVideo = async (file: File): Promise<string> => {
  try {
    const apiKey = getApiKey();
    
    if (!apiKey) {
      throw new Error('API key not set. Please set your OpenAI API key first.');
    }
    
    const formData = new FormData();
    formData.append('file', file);
    formData.append('model', 'whisper-1');
    
    const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
      },
      body: formData,
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Failed to transcribe video');
    }
    
    const data: TranscriptionResponse = await response.json();
    return data.text;
  } catch (error) {
    console.error('Transcription error:', error);
    toast.error(error instanceof Error ? error.message : 'Failed to transcribe video. Please try again.');
    throw error;
  }
};

// Enhanced summary generation
export const generateSummary = async (transcription: string): Promise<SummaryResponse> => {
  try {
    const apiKey = getApiKey();
    
    if (!apiKey) {
      throw new Error('API key not set. Please set your OpenAI API key first.');
    }
    
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: 'You are an advanced academic assistant. Create comprehensive lecture analysis including summary, key points, code snippets, main topics, study questions, and learning objectives. Format as JSON: { summary: "detailed summary", keyPoints: ["point1", "point2"], codeSnippets: [{ code: "code", explanation: "explanation", language: "language" }], topics: ["topic1", "topic2"], questions: ["question1", "question2"], learningObjectives: ["objective1", "objective2"] }'
          },
          {
            role: 'user',
            content: `Please provide comprehensive analysis of this lecture: ${transcription}`
          }
        ],
        response_format: { type: "json_object" }
      }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Failed to generate summary');
    }
    
    const data = await response.json();
    const parsedContent = JSON.parse(data.choices[0].message.content);
    
    return {
      summary: parsedContent.summary,
      keyPoints: parsedContent.keyPoints,
      codeSnippets: parsedContent.codeSnippets || [],
      topics: parsedContent.topics || [],
      questions: parsedContent.questions || [],
      learningObjectives: parsedContent.learningObjectives || []
    };
  } catch (error) {
    console.error('Summary generation error:', error);
    toast.error(error instanceof Error ? error.message : 'Failed to generate summary. Please try again.');
    throw error;
  }
};

// Document Q&A functionality
export const askDocumentQuestion = async (documentContent: string, question: string): Promise<DocumentQAResponse> => {
  try {
    const apiKey = getApiKey();
    
    if (!apiKey) {
      throw new Error('API key not set. Please set your OpenAI API key first.');
    }
    
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful academic assistant. Answer questions about the provided document content. Provide detailed, accurate answers and cite relevant sections when possible. Format response as JSON: { answer: "detailed answer", relevantSections: ["section1", "section2"], confidence: 0.95 }'
          },
          {
            role: 'user',
            content: `Document content: ${documentContent}\n\nQuestion: ${question}`
          }
        ],
        response_format: { type: "json_object" }
      }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Failed to get answer');
    }
    
    const data = await response.json();
    const parsedContent = JSON.parse(data.choices[0].message.content);
    
    return {
      answer: parsedContent.answer,
      relevantSections: parsedContent.relevantSections || [],
      confidence: parsedContent.confidence || 0.8
    };
  } catch (error) {
    console.error('Document Q&A error:', error);
    toast.error(error instanceof Error ? error.message : 'Failed to get answer. Please try again.');
    throw error;
  }
};

// Generate programming exercises
export const generateProgrammingExercise = async (language: string, difficulty: string, topic: string): Promise<any> => {
  try {
    const apiKey = getApiKey();
    
    if (!apiKey) {
      throw new Error('API key not set. Please set your OpenAI API key first.');
    }
    
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: 'Create interactive programming exercises in the style of FreeCodeCamp. Format as JSON: { title: "exercise title", description: "detailed description", instructions: ["step1", "step2"], starterCode: "code template", solution: "solution code", hints: ["hint1", "hint2"], testCases: [{ input: "input", expectedOutput: "output" }] }'
          },
          {
            role: 'user',
            content: `Create a ${difficulty} ${language} exercise about ${topic}`
          }
        ],
        response_format: { type: "json_object" }
      }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Failed to generate exercise');
    }
    
    const data = await response.json();
    return JSON.parse(data.choices[0].message.content);
  } catch (error) {
    console.error('Exercise generation error:', error);
    toast.error(error instanceof Error ? error.message : 'Failed to generate exercise. Please try again.');
    throw error;
  }
};

export const processPdf = async (file: File): Promise<string> => {
  return "PDF processing would be implemented here with a PDF parsing library or API.";
};
