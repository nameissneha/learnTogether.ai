
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Upload, FileType, FilePlus, CheckCircle, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

const LectureUpload = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

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

  const handleUpload = () => {
    if (!file) return;

    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          toast.success('File uploaded successfully! AI is processing your lecture.');
          return 100;
        }
        return prev + 5;
      });
    }, 200);
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
          ) : (
            <Button 
              className="w-full bg-academic-blue hover:bg-academic-light-blue"
              onClick={handleUpload}
            >
              Start Upload
            </Button>
          )}
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
