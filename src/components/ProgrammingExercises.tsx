
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Code, Play, Lightbulb, CheckCircle, Target, BookOpen } from 'lucide-react';
import { generateProgrammingExercise } from '@/services/aiService';
import { toast } from 'sonner';

interface Exercise {
  title: string;
  description: string;
  instructions: string[];
  starterCode: string;
  solution: string;
  hints: string[];
  testCases: Array<{ input: string; expectedOutput: string }>;
}

const ProgrammingExercises = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('python');
  const [selectedDifficulty, setSelectedDifficulty] = useState('beginner');
  const [selectedTopic, setSelectedTopic] = useState('variables');
  const [currentExercise, setCurrentExercise] = useState<Exercise | null>(null);
  const [userCode, setUserCode] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showHints, setShowHints] = useState(false);
  const [showSolution, setShowSolution] = useState(false);

  const languages = ['python', 'javascript', 'java', 'r'];
  const difficulties = ['beginner', 'intermediate', 'advanced'];
  const topics = [
    'variables', 'functions', 'loops', 'conditionals', 'arrays', 'objects',
    'data structures', 'algorithms', 'machine learning', 'data analysis'
  ];

  const generateExercise = async () => {
    setIsGenerating(true);
    setCurrentExercise(null);
    setUserCode('');
    setShowHints(false);
    setShowSolution(false);

    try {
      const exercise = await generateProgrammingExercise(selectedLanguage, selectedDifficulty, selectedTopic);
      setCurrentExercise(exercise);
      setUserCode(exercise.starterCode || '');
      toast.success('New exercise generated!');
    } catch (error) {
      console.error('Failed to generate exercise:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Exercise Generator */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-academic-blue" />
            Programming Learning Center
          </CardTitle>
          <p className="text-sm text-academic-gray">
            Generate interactive programming exercises tailored to your learning level
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-2">Language</label>
              <div className="flex flex-wrap gap-2">
                {languages.map((lang) => (
                  <Button
                    key={lang}
                    variant={selectedLanguage === lang ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedLanguage(lang)}
                    className={selectedLanguage === lang ? 'bg-academic-blue' : ''}
                  >
                    {lang.charAt(0).toUpperCase() + lang.slice(1)}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Difficulty</label>
              <div className="flex flex-wrap gap-2">
                {difficulties.map((diff) => (
                  <Button
                    key={diff}
                    variant={selectedDifficulty === diff ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedDifficulty(diff)}
                    className={selectedDifficulty === diff ? 'bg-academic-green' : ''}
                  >
                    {diff.charAt(0).toUpperCase() + diff.slice(1)}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Topic</label>
              <select
                value={selectedTopic}
                onChange={(e) => setSelectedTopic(e.target.value)}
                className="w-full p-2 border border-gray-200 rounded-md"
              >
                {topics.map((topic) => (
                  <option key={topic} value={topic}>
                    {topic.charAt(0).toUpperCase() + topic.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <Button
            onClick={generateExercise}
            disabled={isGenerating}
            className="w-full bg-academic-blue hover:bg-academic-light-blue"
          >
            {isGenerating ? (
              <>
                <Code className="h-4 w-4 mr-2 animate-spin" />
                Generating Exercise...
              </>
            ) : (
              <>
                <Play className="h-4 w-4 mr-2" />
                Generate New Exercise
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Current Exercise */}
      {currentExercise && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Exercise Description */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-academic-blue" />
                {currentExercise.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Description</h4>
                <p className="text-academic-gray">{currentExercise.description}</p>
              </div>

              <div>
                <h4 className="font-medium mb-2">Instructions</h4>
                <ol className="list-decimal list-inside space-y-1">
                  {currentExercise.instructions.map((instruction, index) => (
                    <li key={index} className="text-academic-gray text-sm">
                      {instruction}
                    </li>
                  ))}
                </ol>
              </div>

              {currentExercise.testCases && currentExercise.testCases.length > 0 && (
                <div>
                  <h4 className="font-medium mb-2">Test Cases</h4>
                  {currentExercise.testCases.map((testCase, index) => (
                    <div key={index} className="bg-gray-50 p-2 rounded text-sm">
                      <div><strong>Input:</strong> {testCase.input}</div>
                      <div><strong>Expected:</strong> {testCase.expectedOutput}</div>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowHints(!showHints)}
                >
                  <Lightbulb className="h-4 w-4 mr-1" />
                  {showHints ? 'Hide' : 'Show'} Hints
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowSolution(!showSolution)}
                >
                  <CheckCircle className="h-4 w-4 mr-1" />
                  {showSolution ? 'Hide' : 'Show'} Solution
                </Button>
              </div>

              {showHints && currentExercise.hints && (
                <div className="bg-yellow-50 p-3 rounded">
                  <h4 className="font-medium mb-2 text-yellow-800">Hints</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {currentExercise.hints.map((hint, index) => (
                      <li key={index} className="text-yellow-700 text-sm">{hint}</li>
                    ))}
                  </ul>
                </div>
              )}

              {showSolution && (
                <div className="bg-green-50 p-3 rounded">
                  <h4 className="font-medium mb-2 text-green-800">Solution</h4>
                  <pre className="bg-gray-900 text-gray-100 p-3 rounded text-sm overflow-x-auto">
                    {currentExercise.solution}
                  </pre>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Code Editor */}
          <Card>
            <CardHeader>
              <CardTitle>Your Code</CardTitle>
            </CardHeader>
            <CardContent>
              <textarea
                value={userCode}
                onChange={(e) => setUserCode(e.target.value)}
                className="w-full h-64 p-4 bg-gray-900 text-gray-100 font-mono text-sm rounded border"
                placeholder="Write your code here..."
              />
              <div className="mt-4 flex gap-2">
                <Button
                  className="bg-academic-green hover:bg-green-600"
                  onClick={() => toast.success('Code submitted! (This would run tests in a full implementation)')}
                >
                  <Play className="h-4 w-4 mr-2" />
                  Run Tests
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setUserCode(currentExercise.starterCode || '')}
                >
                  Reset Code
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ProgrammingExercises;
