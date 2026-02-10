
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-white/90 backdrop-blur-lg fixed top-0 z-50 shadow-sm border-b border-gray-100">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <path d="M16 10a4 4 0 0 1-8 0"></path>
          </svg>
          <span className="font-bold text-lg sm:text-xl bg-gradient-to-r from-violet-700 to-indigo-600 bg-clip-text text-transparent">T-Shirt Customizer</span>
        </Link>
        
        <nav className="hidden md:flex gap-6">
          <Link to="/" className="text-gray-600 hover:text-violet-600 transition-colors duration-300">
            Home
          </Link>
          <Link to="/customize" className="text-gray-600 hover:text-violet-600 transition-colors duration-300">
            Customize
          </Link>
        </nav>
        
        <Link to="/customize" className="hidden sm:inline-flex btn-primary text-sm md:text-base">
          Start Designing
        </Link>
        
        {/* Mobile hamburger */}
        <button 
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>
      
      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 pb-3 border-t border-gray-100 pt-3">
          <nav className="flex flex-col gap-2">
            <Link 
              to="/" 
              className="px-4 py-2 rounded-lg text-gray-600 hover:bg-violet-50 hover:text-violet-600 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/customize" 
              className="px-4 py-2 rounded-lg text-gray-600 hover:bg-violet-50 hover:text-violet-600 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Customize
            </Link>
            <Link 
              to="/customize" 
              className="mx-4 mt-2 btn-primary text-center text-sm"
              onClick={() => setMobileMenuOpen(false)}
            >
              Start Designing
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
