
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Upload, FileType, FilePlus, CheckCircle, AlertCircle, Loader2, Key, BookOpen, Target, HelpCircle } from 'lucide-react';
import { toast } from 'sonner';
import { transcribeVideo, generateSummary, processPdf, isApiKeySet, setApiKey } from '@/services/aiService';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Enhanced interface for processed lecture data
interface ProcessedLecture {
  transcription: string;
  summary: string;
  keyPoints: string[];
  topics?: string[];
  questions?: string[];
  learningObjectives?: string[];
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
  const [showApiKeyDialog, setShowApiKeyDialog] = useState(false);
  const [apiKey, setApiKeyState] = useState('');

  // Check if API key is set on component mount
  useEffect(() => {
    if (!isApiKeySet()) {
      setShowApiKeyDialog(true);
    }
  }, []);

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

  const handleApiKeySave = () => {
    if (!apiKey.trim()) {
      toast.error('Please enter a valid API key');
      return;
    }
    
    setApiKey(apiKey);
    setShowApiKeyDialog(false);
  };

  const handleUpload = async () => {
    if (!file) return;
    
    if (!isApiKeySet()) {
      setShowApiKeyDialog(true);
      return;
    }

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
        toast.success('Processing complete! View your comprehensive lecture analysis below.');
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
      
      // Step 2: Generate comprehensive analysis with AI
      setProcessingStage('Generating comprehensive analysis with AI...');
      const summaryData = await generateSummary(transcription);
      
      // Set processed data
      setProcessedData({
        transcription,
        summary: summaryData.summary,
        keyPoints: summaryData.keyPoints,
        topics: summaryData.topics,
        questions: summaryData.questions,
        learningObjectives: summaryData.learningObjectives,
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
      
      // Generate comprehensive analysis
      setProcessingStage('Generating comprehensive analysis with AI...');
      const summaryData = await generateSummary(pdfText);
      
      // Set processed data
      setProcessedData({
        transcription: pdfText,
        summary: summaryData.summary,
        keyPoints: summaryData.keyPoints,
        topics: summaryData.topics,
        questions: summaryData.questions,
        learningObjectives: summaryData.learningObjectives,
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
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Upload Lecture Material</CardTitle>
          <p className="text-academic-gray">
            Upload videos or PDFs to get comprehensive AI analysis including summaries, key points, topics, and learning objectives.
          </p>
        </CardHeader>
        <CardContent>
          {/* API Key Dialog */}
          <Dialog open={showApiKeyDialog} onOpenChange={setShowApiKeyDialog}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>OpenAI API Key Required</DialogTitle>
                <DialogDescription>
                  To use the AI features for transcription and summarization, please enter your OpenAI API key.
                  This key will be stored locally in your browser.
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <Input
                  value={apiKey}
                  onChange={(e) => setApiKeyState(e.target.value)}
                  placeholder="sk-..."
                  type="password"
                  className="w-full"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  Your API key is stored only in your browser and is never sent to our servers.
                  Get an API key from <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">OpenAI</a>.
                </p>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowApiKeyDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={handleApiKeySave}>
                  Save API Key
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          {/* API Key Button */}
          <div className="flex justify-end mb-4">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setShowApiKeyDialog(true)}
              className="flex items-center gap-2"
            >
              <Key className="h-4 w-4" />
              Set API Key
            </Button>
          </div>
          
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
        </CardContent>
      </Card>

      {processedData && (
        <div className="space-y-6">
          {/* Summary Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-academic-blue" />
                Lecture Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-academic-gray leading-relaxed">{processedData.summary}</p>
            </CardContent>
          </Card>

          {/* Key Points Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-academic-green" />
                Key Points
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {processedData.keyPoints.map((point, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-academic-blue rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-academic-gray">{point}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Topics and Learning Objectives */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {processedData.topics && processedData.topics.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-academic-yellow" />
                    Main Topics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {processedData.topics.map((topic, index) => (
                      <Badge key={index} className="bg-academic-light-blue text-academic-blue">
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {processedData.learningObjectives && processedData.learningObjectives.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-academic-green" />
                    Learning Objectives
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1">
                    {processedData.learningObjectives.map((objective, index) => (
                      <li key={index} className="text-academic-gray text-sm">
                        • {objective}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Study Questions */}
          {processedData.questions && processedData.questions.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HelpCircle className="h-5 w-5 text-academic-red" />
                  Study Questions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {processedData.questions.map((question, index) => (
                    <div key={index} className="p-3 bg-gray-50 rounded-lg">
                      <p className="font-medium text-academic-blue">Q{index + 1}: {question}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
          
          {/* Code Snippets */}
          {processedData.codeSnippets && processedData.codeSnippets.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileType className="h-5 w-5 text-academic-green" />
                  Code Snippets
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {processedData.codeSnippets.map((snippet, index) => (
                    <div key={index} className="border rounded-lg overflow-hidden">
                      <div className="bg-gray-100 px-4 py-2 border-b">
                        <span className="text-sm font-medium text-academic-gray">{snippet.language}</span>
                      </div>
                      <pre className="bg-gray-900 text-gray-100 p-4 overflow-x-auto text-sm">
                        {snippet.code}
                      </pre>
                      <div className="p-4 bg-gray-50">
                        <p className="text-academic-gray text-sm">{snippet.explanation}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
          
          <div className="flex justify-center">
            <Button variant="outline" onClick={() => setProcessedData(null)}>
              Process Another Lecture
            </Button>
          </div>
        </div>
      )}

      {/* Features Overview */}
      <Card>
        <CardHeader>
          <CardTitle>What happens next?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-academic-green mt-0.5 flex-shrink-0" />
              <p className="text-academic-gray text-sm">AI transcribes your content with high accuracy</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-academic-green mt-0.5 flex-shrink-0" />
              <p className="text-academic-gray text-sm">Generate comprehensive summaries and key points</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-academic-green mt-0.5 flex-shrink-0" />
              <p className="text-academic-gray text-sm">Extract main topics and learning objectives</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-academic-green mt-0.5 flex-shrink-0" />
              <p className="text-academic-gray text-sm">Create study questions for better retention</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-academic-green mt-0.5 flex-shrink-0" />
              <p className="text-academic-gray text-sm">Identify and explain code snippets</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-academic-green mt-0.5 flex-shrink-0" />
              <p className="text-academic-gray text-sm">Get structured, searchable learning materials</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LectureUpload;
