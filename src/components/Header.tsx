
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { BookOpen, Code, Users, Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <BookOpen className="h-8 w-8 text-academic-blue" />
            <span className="text-xl font-bold text-academic-blue">Learn Together</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-academic-gray hover:text-academic-blue transition-colors">
              Home
            </Link>
            <Link to="/lectures" className="text-academic-gray hover:text-academic-blue transition-colors">
              Lectures
            </Link>
            <Link to="/code-explain" className="text-academic-gray hover:text-academic-blue transition-colors">
              Code Explainer
            </Link>
            <Link to="/study-rooms" className="text-academic-gray hover:text-academic-blue transition-colors">
              Study Rooms
            </Link>
            <Button className="bg-academic-blue hover:bg-academic-light-blue">
              Get Started
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-academic-gray"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 py-2 flex flex-col space-y-4 animate-fade-in">
            <Link 
              to="/" 
              className="px-2 py-2 text-academic-gray hover:bg-academic-light-gray rounded"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/lectures" 
              className="px-2 py-2 text-academic-gray hover:bg-academic-light-gray rounded"
              onClick={() => setIsMenuOpen(false)}
            >
              Lectures
            </Link>
            <Link 
              to="/code-explain" 
              className="px-2 py-2 text-academic-gray hover:bg-academic-light-gray rounded"
              onClick={() => setIsMenuOpen(false)}
            >
              Code Explainer
            </Link>
            <Link 
              to="/study-rooms" 
              className="px-2 py-2 text-academic-gray hover:bg-academic-light-gray rounded"
              onClick={() => setIsMenuOpen(false)}
            >
              Study Rooms
            </Link>
            <Button 
              className="bg-academic-blue hover:bg-academic-light-blue w-full"
              onClick={() => setIsMenuOpen(false)}
            >
              Get Started
            </Button>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
