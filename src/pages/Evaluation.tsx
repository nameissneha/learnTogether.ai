
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const EvaluationMatrix: React.FC = () => {
  const [evaluation, setEvaluation] = useState<any>(null);

  const generateEvaluation = () => {
    // Placeholder for future AI-driven evaluation generation
    const mockEvaluation = {
      academicPerformance: [
        { metric: 'Course Engagement', rating: 4 },
        { metric: 'Assignment Completion', rating: 5 }
      ],
      mentalWellbeing: [
        { metric: 'Stress Management', rating: 3 },
        { metric: 'Motivation Level', rating: 4 }
      ]
    };

    setEvaluation(mockEvaluation);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-academic-blue">
        Student Evaluation Matrix
      </h1>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Performance Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <Button onClick={generateEvaluation}>
            Generate Evaluation
          </Button>

          {evaluation && (
            <div className="mt-4">
              <h2 className="text-xl font-semibold mb-4">Your Evaluation</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-bold">Academic Performance</h3>
                  {evaluation.academicPerformance.map((item: any, index: number) => (
                    <div key={index} className="flex justify-between mb-2">
                      <span>{item.metric}</span>
                      <span>Rating: {item.rating}/5</span>
                    </div>
                  ))}
                </div>
                <div>
                  <h3 className="font-bold">Mental Well-being</h3>
                  {evaluation.mentalWellbeing.map((item: any, index: number) => (
                    <div key={index} className="flex justify-between mb-2">
                      <span>{item.metric}</span>
                      <span>Rating: {item.rating}/5</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default EvaluationMatrix;
