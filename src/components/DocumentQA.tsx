
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, MessageSquare, Upload, Send, Bot } from 'lucide-react';
import { askDocumentQuestion } from '@/services/aiService';
import { toast } from 'sonner';

interface QAPair {
  question: string;
  answer: string;
  confidence: number;
  timestamp: Date;
}

const DocumentQA = () => {
  const [documentContent, setDocumentContent] = useState<string>('');
  const [question, setQuestion] = useState<string>('');
  const [qaPairs, setQaPairs] = useState<QAPair[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasDocument, setHasDocument] = useState(false);

  const handleDocumentUpload = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const content = e.target.value;
    setDocumentContent(content);
    setHasDocument(content.length > 0);
  };

  const handleAskQuestion = async () => {
    if (!question.trim() || !documentContent.trim()) {
      toast.error('Please provide both document content and a question');
      return;
    }

    setIsLoading(true);
    try {
      const response = await askDocumentQuestion(documentContent, question);
      
      const newQAPair: QAPair = {
        question,
        answer: response.answer,
        confidence: response.confidence,
        timestamp: new Date()
      };

      setQaPairs([...qaPairs, newQAPair]);
      setQuestion('');
      toast.success('Answer generated successfully!');
    } catch (error) {
      console.error('Failed to get answer:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleAskQuestion();
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-academic-blue" />
            Document Analysis & Help
          </CardTitle>
          <p className="text-sm text-academic-gray">
            Upload any academic document and get AI-powered analysis, summaries, and answers to your questions
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Document Content</label>
              <textarea
                className="w-full h-40 p-3 border border-gray-200 rounded-lg resize-none"
                placeholder="Paste your document content here (lecture notes, research papers, assignments, etc.)"
                value={documentContent}
                onChange={handleDocumentUpload}
              />
            </div>
            
            {hasDocument && (
              <div className="flex items-center gap-2 text-sm text-green-600">
                <FileText className="h-4 w-4" />
                Document loaded ({documentContent.length} characters)
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {hasDocument && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-academic-blue" />
              Ask Questions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Input
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask any question about your document..."
                className="flex-1"
                disabled={isLoading}
              />
              <Button 
                onClick={handleAskQuestion}
                disabled={isLoading || !question.trim()}
                className="bg-academic-blue hover:bg-academic-light-blue"
              >
                {isLoading ? (
                  <Bot className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {qaPairs.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Q&A History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {qaPairs.map((qa, index) => (
                <div key={index} className="border-l-4 border-academic-blue pl-4 py-2">
                  <div className="font-medium text-academic-blue mb-2">
                    Q: {qa.question}
                  </div>
                  <div className="text-academic-gray">
                    A: {qa.answer}
                  </div>
                  <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
                    <span>Confidence: {Math.round(qa.confidence * 100)}%</span>
                    <span>{qa.timestamp.toLocaleTimeString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DocumentQA;
