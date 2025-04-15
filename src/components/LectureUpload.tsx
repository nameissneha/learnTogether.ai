
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Upload, FileType, FilePlus, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { transcribeVideo, generateSummary, processPdf } from '@/services/aiService';

// Interface for processed lecture data
interface ProcessedLecture {
  transcription: string;
  summary: string;
  keyPoints: string[];
  codeSnippets?: {
    code: string;
    explanation: string;
    language: string;
  }[];
}

const LectureUpload = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedData, setProcessedData] = useState<ProcessedLecture | null>(null);
  const [processingStage, setProcessingStage] = useState<string>('');

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (selectedFile: File) => {
    // Check file type
    const validTypes = ['video/mp4', 'application/pdf', 'video/quicktime', 'video/webm'];
    if (!validTypes.includes(selectedFile.type)) {
      toast.error('Please upload an MP4, WebM, QuickTime video, or PDF file.');
      return;
    }

    // Check file size (100MB limit)
    if (selectedFile.size > 100 * 1024 * 1024) {
      toast.error('File size exceeds 100MB limit.');
      return;
    }

    setFile(selectedFile);
    toast.success('File selected successfully!');
  };

  const handleUpload = async () => {
    if (!file) return;

    setIsUploading(true);
    setUploadProgress(0);
    setProcessedData(null);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5;
      });
    }, 200);

    // Once upload is "complete", start processing
    setTimeout(async () => {
      clearInterval(interval);
      setIsUploading(false);
      setUploadProgress(100);
      
      // Begin processing with AI
      try {
        setIsProcessing(true);
        
        // Process based on file type
        if (file.type.includes('video')) {
          await processVideo(file);
        } else if (file.type.includes('pdf')) {
          await processPdfFile(file);
        }
        
        setIsProcessing(false);
        toast.success('Processing complete! View your lecture summary below.');
      } catch (error) {
        console.error('Processing error:', error);
        setIsProcessing(false);
        toast.error('An error occurred during processing. Please try again.');
      }
    }, 2000);
  };

  const processVideo = async (videoFile: File) => {
    try {
      // Step 1: Transcribe the video
      setProcessingStage('Transcribing video...');
      const transcription = await transcribeVideo(videoFile);
      
      // Step 2: Generate summary with AI
      setProcessingStage('Generating insights with AI...');
      const summaryData = await generateSummary(transcription);
      
      // Set processed data
      setProcessedData({
        transcription,
        summary: summaryData.summary,
        keyPoints: summaryData.keyPoints,
        codeSnippets: summaryData.codeSnippets
      });
    } catch (error) {
      console.error('Video processing error:', error);
      throw error;
    }
  };

  const processPdfFile = async (pdfFile: File) => {
    try {
      // Process PDF file
      setProcessingStage('Extracting text from PDF...');
      const pdfText = await processPdf(pdfFile);
      
      // Generate summary
      setProcessingStage('Generating insights with AI...');
      const summaryData = await generateSummary(pdfText);
      
      // Set processed data
      setProcessedData({
        transcription: pdfText,
        summary: summaryData.summary,
        keyPoints: summaryData.keyPoints,
        codeSnippets: summaryData.codeSnippets
      });
    } catch (error) {
      console.error('PDF processing error:', error);
      throw error;
    }
  };

  const getFileIcon = () => {
    if (!file) return <Upload className="h-12 w-12 text-academic-blue" />;
    
    if (file.type.includes('video')) {
      return <FileType className="h-12 w-12 text-academic-blue" />;
    } else {
      return <FilePlus className="h-12 w-12 text-academic-blue" />;
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-center">Upload Lecture Material</h2>
      
      <div
        className={`border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer min-h-[200px] transition-colors ${
          isDragging ? 'border-academic-blue bg-blue-50' : 'border-gray-300 hover:border-academic-blue'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => document.getElementById('file-input')?.click()}
      >
        {getFileIcon()}
        
        <p className="mt-4 text-center text-academic-gray">
          {file 
            ? `Selected: ${file.name}` 
            : 'Drag and drop your lecture video or PDF here, or click to browse'}
        </p>
        <p className="mt-2 text-sm text-academic-gray">
          Supported formats: MP4, WebM, QuickTime, PDF (Max 100MB)
        </p>
        
        <input
          id="file-input"
          type="file"
          className="hidden"
          accept=".mp4,.pdf,.mov,.webm"
          onChange={handleFileInput}
        />
      </div>

      {file && (
        <div className="mt-6">
          {isUploading ? (
            <>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                <div 
                  className="bg-academic-blue h-2.5 rounded-full transition-all duration-200" 
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
              <p className="text-center text-academic-gray">
                Uploading... {uploadProgress}%
              </p>
            </>
          ) : isProcessing ? (
            <div className="flex flex-col items-center justify-center py-4">
              <Loader2 className="h-8 w-8 text-academic-blue animate-spin mb-2" />
              <p className="text-center text-academic-gray">{processingStage}</p>
            </div>
          ) : (
            <Button 
              className="w-full bg-academic-blue hover:bg-academic-light-blue"
              onClick={handleUpload}
            >
              Start Upload & Process
            </Button>
          )}
        </div>
      )}

      {processedData && (
        <div className="mt-8 bg-gray-50 p-6 rounded-lg border border-gray-200">
          <h3 className="text-xl font-semibold mb-4">Lecture Summary</h3>
          
          <div className="mb-4">
            <h4 className="font-medium text-academic-blue mb-2">Summary</h4>
            <p className="text-academic-gray">{processedData.summary}</p>
          </div>
          
          <div className="mb-4">
            <h4 className="font-medium text-academic-blue mb-2">Key Points</h4>
            <ul className="list-disc pl-5 space-y-1">
              {processedData.keyPoints.map((point, index) => (
                <li key={index} className="text-academic-gray">{point}</li>
              ))}
            </ul>
          </div>
          
          {processedData.codeSnippets && processedData.codeSnippets.length > 0 && (
            <div>
              <h4 className="font-medium text-academic-blue mb-2">Code Snippets</h4>
              {processedData.codeSnippets.map((snippet, index) => (
                <div key={index} className="mb-4 bg-gray-100 p-4 rounded">
                  <p className="text-sm font-medium text-academic-gray mb-2">{snippet.language}</p>
                  <pre className="bg-gray-900 text-gray-100 p-3 rounded text-sm overflow-x-auto">
                    {snippet.code}
                  </pre>
                  <p className="mt-2 text-academic-gray text-sm">{snippet.explanation}</p>
                </div>
              ))}
            </div>
          )}
          
          <div className="mt-4 pt-4 border-t border-gray-200">
            <Button variant="outline" onClick={() => setProcessedData(null)}>
              Process Another Lecture
            </Button>
          </div>
        </div>
      )}

      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">What happens next?</h3>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-academic-green mt-0.5" />
            <p className="text-academic-gray">Your video will be transcribed using advanced speech-to-text AI</p>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-academic-green mt-0.5" />
            <p className="text-academic-gray">Natural language processing will create concise summaries</p>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-academic-green mt-0.5" />
            <p className="text-academic-gray">Code snippets will be detected and explained</p>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-academic-green mt-0.5" />
            <p className="text-academic-gray">You'll get a structured, searchable version of your lecture</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LectureUpload;
