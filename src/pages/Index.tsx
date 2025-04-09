
import React from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import FeatureCard from '@/components/FeatureCard';
import LectureUpload from '@/components/LectureUpload';
import CodeExplainer from '@/components/CodeExplainer';
import StudyRoom from '@/components/StudyRoom';
import { 
  BookText, Code, Users, Brain, BookOpen, GraduationCap, 
  CheckCircle, Clock, ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <Hero />
      
      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-academic-blue mb-4">
              How AI Enhances Your Learning
            </h2>
            <p className="text-xl text-academic-gray max-w-3xl mx-auto">
              Our platform combines cutting-edge AI with collaborative tools to create
              a powerful learning experience for students of all backgrounds.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              title="Smart Lecture Summaries"
              description="AI automatically converts lecture videos and PDFs into concise, structured notes you can easily review."
              icon={BookText}
              iconColor="text-academic-blue"
            />
            
            <FeatureCard
              title="Code Explanation"
              description="Get clear explanations for complex programming concepts, regardless of your technical background."
              icon={Code}
              iconColor="text-academic-green"
            />
            
            <FeatureCard
              title="Collaborative Study"
              description="Join or create study rooms to discuss concepts, share notes, and work together in real-time."
              icon={Users}
              iconColor="text-academic-yellow"
            />
            
            <FeatureCard
              title="AI Learning Assistant"
              description="Ask questions, get clarification, and receive personalized learning recommendations."
              icon={Brain}
              iconColor="text-academic-red"
            />
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-academic-blue mb-4">
              How It Works
            </h2>
            <p className="text-xl text-academic-gray max-w-3xl mx-auto">
              Our platform is designed to streamline your learning process with a simple workflow.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <div className="bg-blue-50 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <BookOpen className="h-8 w-8 text-academic-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Upload</h3>
              <p className="text-academic-gray">
                Upload your lecture video, audio, or PDF materials to our secure platform.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <div className="bg-green-50 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <Brain className="h-8 w-8 text-academic-green" />
              </div>
              <h3 className="text-xl font-semibold mb-3">AI Processing</h3>
              <p className="text-academic-gray">
                Our AI transcribes, summarizes, and extracts key concepts and code explanations.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <div className="bg-yellow-50 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <GraduationCap className="h-8 w-8 text-academic-yellow" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Learn & Collaborate</h3>
              <p className="text-academic-gray">
                Review AI-generated content and collaborate with peers in study rooms.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Demo Sections */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-academic-blue mb-4">
              Try It Yourself
            </h2>
            <p className="text-xl text-academic-gray max-w-3xl mx-auto">
              Experience the features of our platform with these interactive demos.
            </p>
          </div>
          
          {/* Lecture Upload Demo */}
          <div className="mb-20">
            <h3 className="text-2xl font-semibold mb-6 text-center">Lecture Summarization</h3>
            <LectureUpload />
          </div>
          
          {/* Code Explanation Demo */}
          <div className="mb-20">
            <h3 className="text-2xl font-semibold mb-6 text-center">Code Explainer</h3>
            <CodeExplainer />
          </div>
          
          {/* Study Room Demo */}
          <div>
            <h3 className="text-2xl font-semibold mb-6 text-center">Collaborative Study Room</h3>
            <StudyRoom />
          </div>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-academic-blue mb-4">
              Benefits for Students
            </h2>
            <p className="text-xl text-academic-gray max-w-3xl mx-auto">
              Our platform is designed to support students from all academic backgrounds.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="flex items-start space-x-4">
              <div className="bg-blue-50 rounded-full p-2 mt-1">
                <CheckCircle className="h-5 w-5 text-academic-blue" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Save Time</h3>
                <p className="text-academic-gray">
                  Reduce hours spent on manual note-taking and focus on understanding core concepts.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="bg-blue-50 rounded-full p-2 mt-1">
                <CheckCircle className="h-5 w-5 text-academic-blue" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Improve Comprehension</h3>
                <p className="text-academic-gray">
                  Get clear explanations of complex topics, especially helpful for non-technical students.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="bg-blue-50 rounded-full p-2 mt-1">
                <CheckCircle className="h-5 w-5 text-academic-blue" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Enhance Collaboration</h3>
                <p className="text-academic-gray">
                  Work together with classmates in real-time, sharing insights and helping each other.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="bg-blue-50 rounded-full p-2 mt-1">
                <CheckCircle className="h-5 w-5 text-academic-blue" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Accessible Learning</h3>
                <p className="text-academic-gray">
                  Review materials at your own pace, with structured content that's easy to navigate.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-academic-blue text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Learning Experience?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
            Join thousands of students who are already using our platform to enhance their academic journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-academic-blue hover:bg-gray-100 text-lg px-8 py-6">
              Get Started Free
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-academic-light-blue text-lg px-8 py-6">
              Learn More
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
          <p className="mt-6 text-sm opacity-80">
            No credit card required. Free for students during beta.
          </p>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <BookOpen className="h-8 w-8" />
                <span className="text-xl font-bold">Learn Together</span>
              </div>
              <p className="text-gray-400">
                Transforming academic learning with AI and collaboration.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Features</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Lecture Summarization</li>
                <li>Code Explanation</li>
                <li>Study Rooms</li>
                <li>AI Learning Assistant</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Documentation</li>
                <li>Tutorial Videos</li>
                <li>API</li>
                <li>Help Center</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-gray-400">
                <li>support@learntogether.ai</li>
                <li>+1 (555) 123-4567</li>
                <li>123 University Ave</li>
                <li>San Francisco, CA 94110</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 Learn Together AI. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0">
              <ul className="flex space-x-6">
                <li className="text-gray-400 text-sm hover:text-white cursor-pointer">Privacy Policy</li>
                <li className="text-gray-400 text-sm hover:text-white cursor-pointer">Terms of Service</li>
                <li className="text-gray-400 text-sm hover:text-white cursor-pointer">Cookie Policy</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
