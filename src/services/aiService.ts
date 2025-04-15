
import { toast } from 'sonner';

// API configuration
const OPENAI_API_KEY = "YOUR_OPENAI_API_KEY"; // Replace with your actual API key or environment variable

// Interface for transcription response
interface TranscriptionResponse {
  text: string;
}

// Interface for summary response
interface SummaryResponse {
  summary: string;
  keyPoints: string[];
  codeSnippets?: {
    code: string;
    explanation: string;
    language: string;
  }[];
}

// Function to transcribe video
export const transcribeVideo = async (file: File): Promise<string> => {
  try {
    // For large files, we need to stream or use a chunking approach
    // This is a simplified implementation
    const formData = new FormData();
    formData.append('file', file);
    formData.append('model', 'whisper-1');
    
    const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
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
    toast.error('Failed to transcribe video. Please try again.');
    throw error;
  }
};

// Function to generate summary from transcription
export const generateSummary = async (transcription: string): Promise<SummaryResponse> => {
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: 'You are an academic assistant that helps summarize lecture content. Extract key points, identify any code snippets, and provide clear explanations. Format your response as JSON with the following structure: { summary: "concise summary", keyPoints: ["point1", "point2"], codeSnippets: [{ code: "code here", explanation: "explanation here", language: "language name" }] }'
          },
          {
            role: 'user',
            content: `Please summarize the following lecture transcription: ${transcription}`
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
    
    // Parse the JSON response from the content
    const parsedContent = JSON.parse(data.choices[0].message.content);
    
    return {
      summary: parsedContent.summary,
      keyPoints: parsedContent.keyPoints,
      codeSnippets: parsedContent.codeSnippets || []
    };
  } catch (error) {
    console.error('Summary generation error:', error);
    toast.error('Failed to generate summary. Please try again.');
    throw error;
  }
};

// Function to process PDFs (placeholder for future implementation)
export const processPdf = async (file: File): Promise<string> => {
  // This would typically use a PDF parsing library or API
  // For now, return a message
  return "PDF processing would be implemented here with a PDF parsing library or API.";
};

