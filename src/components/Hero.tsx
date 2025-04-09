
import React from 'react';
import { Button } from "@/components/ui/button";
import { BookOpen, Code, Users, Brain } from 'lucide-react';

const Hero = () => {
  return (
    <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-academic-blue mb-6">
              Learn Together with AI
            </h1>
            <p className="text-xl text-academic-gray mb-8">
              Transform your academic journey with our AI-powered platform. Get lecture summaries, code explanations, and collaborate in real-time with fellow students.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-academic-blue hover:bg-academic-light-blue text-lg px-6 py-6">
                Upload a Lecture
              </Button>
              <Button variant="outline" className="border-academic-blue text-academic-blue hover:bg-academic-light-gray text-lg px-6 py-6">
                Join a Study Room
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-6 animate-slide-in">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <BookOpen className="h-10 w-10 text-academic-blue mb-4" />
              <h3 className="text-xl font-semibold mb-2">Lecture Summaries</h3>
              <p className="text-academic-gray">AI-generated notes from your lecture videos and PDFs.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Code className="h-10 w-10 text-academic-green mb-4" />
              <h3 className="text-xl font-semibold mb-2">Code Explanations</h3>
              <p className="text-academic-gray">Get clear explanations for complex programming concepts.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Users className="h-10 w-10 text-academic-yellow mb-4" />
              <h3 className="text-xl font-semibold mb-2">Study Rooms</h3>
              <p className="text-academic-gray">Collaborate in real-time with fellow students.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Brain className="h-10 w-10 text-academic-red mb-4" />
              <h3 className="text-xl font-semibold mb-2">AI Assistant</h3>
              <p className="text-academic-gray">Get help with questions and clarify complex topics.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
