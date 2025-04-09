
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { ClipboardCopy, Code, Play, Lightbulb, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

const CodeExplainer = () => {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('python');
  const [isExplaining, setIsExplaining] = useState(false);
  const [explanation, setExplanation] = useState<string | null>(null);

  const handleExplain = () => {
    if (!code.trim()) {
      toast.error('Please enter code to explain.');
      return;
    }

    setIsExplaining(true);
    setExplanation(null);

    // Simulate AI processing delay
    setTimeout(() => {
      let sampleExplanation = '';
      
      if (language === 'python') {
        sampleExplanation = generatePythonExplanation();
      } else if (language === 'r') {
        sampleExplanation = generateRExplanation();
      } else {
        sampleExplanation = generateJavaExplanation();
      }
      
      setExplanation(sampleExplanation);
      setIsExplaining(false);
      toast.success('Code explanation generated!');
    }, 2000);
  };

  const generatePythonExplanation = () => {
    if (code.includes('def ') && code.includes('return ')) {
      return `
## Function Analysis

This Python function:
1. Takes input parameters and processes them
2. Uses standard data manipulation techniques
3. Returns a computed result

### Key Components:
- **Function Definition**: Uses Python's \`def\` keyword to create a reusable code block
- **Logic Flow**: The function processes data sequentially
- **Return Statement**: Provides the computed output

### Common Uses:
This pattern is frequently used in data analysis workflows, especially when processing datasets or performing statistical calculations.

### Potential Improvements:
- Consider adding type hints for better code documentation
- Add error handling for edge cases
- Include docstrings to explain the function's purpose
      `;
    } else if (code.includes('import pandas') || code.includes('import numpy')) {
      return `
## Data Science Code Analysis

This code uses popular data science libraries:
1. **Data Manipulation**: Using Pandas/NumPy for efficient data handling
2. **Array Operations**: Vectorized operations for better performance
3. **Data Structures**: Using specialized data structures for analytical work

### Key Concepts:
- **Vectorization**: Operations applied to entire arrays at once (faster than loops)
- **DataFrame Operations**: Manipulating tabular data efficiently
- **NumPy Functions**: Using optimized mathematical operations

### Best Practices:
- Consider using \`pandas.read_csv()\` for data import when working with tabular data
- Chain operations when possible for cleaner code
- Use \`.loc[]\` or \`.iloc[]\` for explicit indexing
      `;
    } else {
      return `
## Python Code Analysis

This code demonstrates fundamental Python concepts:
1. **Variables**: Creating and manipulating data containers
2. **Control Flow**: Directing the program's execution path
3. **Data Processing**: Transforming input to useful output

### Important Elements:
- **Syntax**: Following Python's indentation-based structure
- **Variables**: Using descriptive naming conventions
- **Logic**: Implementing business or computational rules

### Best Practices:
- Follow PEP 8 style guidelines for consistent formatting
- Use meaningful variable names that describe their purpose
- Consider breaking complex operations into smaller, reusable functions
      `;
    }
  };

  const generateRExplanation = () => {
    return `
## R Code Analysis

This R code focuses on statistical operations:
1. **Data Frames**: Working with R's primary tabular data structure
2. **Statistical Functions**: Using R's rich statistical library
3. **Data Visualization**: Creating analytical graphs (if visualization code is present)

### Key Features:
- **Vector Operations**: R's ability to work with entire data vectors
- **Formula Notation**: R's unique way of expressing statistical relationships
- **Statistical Methods**: Implementing analytical techniques

### Best Practices:
- Use the tidyverse package collection for modern data manipulation
- Consider using pipes (%>%) for more readable code
- Document statistical assumptions and interpretations
    `;
  };

  const generateJavaExplanation = () => {
    return `
## Java Code Analysis

This Java code demonstrates object-oriented programming:
1. **Class Structure**: Defining object templates
2. **Methods**: Implementing behavior
3. **Inheritance/Interfaces**: Using Java's type system

### Key Concepts:
- **Type Safety**: Java's strict typing system
- **Object Creation**: Instantiating and using objects
- **Control Structures**: Managing program flow

### Best Practices:
- Follow camelCase naming conventions
- Use appropriate access modifiers (private, public)
- Consider using Java's built-in collections framework for data structures
    `;
  };

  const copyToClipboard = () => {
    if (explanation) {
      navigator.clipboard.writeText(explanation);
      toast.success('Explanation copied to clipboard!');
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-center">Code Explainer</h2>
      
      <div className="mb-6">
        <label className="block mb-2 text-academic-gray font-medium">Programming Language</label>
        <div className="flex space-x-2">
          <Button
            variant={language === 'python' ? 'default' : 'outline'}
            className={language === 'python' ? 'bg-academic-blue' : ''}
            onClick={() => setLanguage('python')}
          >
            Python
          </Button>
          <Button
            variant={language === 'r' ? 'default' : 'outline'}
            className={language === 'r' ? 'bg-academic-blue' : ''}
            onClick={() => setLanguage('r')}
          >
            R
          </Button>
          <Button
            variant={language === 'java' ? 'default' : 'outline'}
            className={language === 'java' ? 'bg-academic-blue' : ''}
            onClick={() => setLanguage('java')}
          >
            Java
          </Button>
        </div>
      </div>
      
      <div className="mb-6">
        <label className="block mb-2 text-academic-gray font-medium">Paste Your Code</label>
        <div className="relative">
          <textarea
            className="w-full h-60 p-4 bg-gray-50 border border-gray-200 rounded-lg font-mono text-sm"
            placeholder={`// Paste your ${language} code here\n// Example:\n${language === 'python' 
              ? 'def calculate_average(numbers):\n    return sum(numbers) / len(numbers) if numbers else 0' 
              : language === 'r'
                ? 'calculate_mean <- function(values) {\n  return(mean(values, na.rm = TRUE))\n}'
                : 'public double calculateAverage(List<Double> numbers) {\n  return numbers.stream().mapToDouble(Double::valueOf).average().orElse(0.0);\n}'}`}
            value={code}
            onChange={(e) => setCode(e.target.value)}
          ></textarea>
          <div className="absolute top-2 right-2">
            <Code className="h-5 w-5 text-academic-gray" />
          </div>
        </div>
      </div>
      
      <Button 
        className="w-full bg-academic-blue hover:bg-academic-light-blue mb-8"
        onClick={handleExplain}
        disabled={isExplaining}
      >
        {isExplaining ? (
          <>
            <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
            Analyzing Code...
          </>
        ) : (
          <>
            <Play className="h-4 w-4 mr-2" />
            Explain Code
          </>
        )}
      </Button>
      
      {explanation && (
        <div className="bg-academic-light-gray p-6 rounded-lg relative animate-fade-in">
          <div className="absolute top-3 right-3">
            <Button variant="ghost" size="icon" onClick={copyToClipboard}>
              <ClipboardCopy className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex items-start gap-3 mb-4">
            <Lightbulb className="h-6 w-6 text-academic-yellow mt-1" />
            <h3 className="text-xl font-semibold">Code Explanation</h3>
          </div>
          
          <div className="prose max-w-none">
            <pre className="whitespace-pre-wrap font-normal text-academic-gray">
              {explanation}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default CodeExplainer;
