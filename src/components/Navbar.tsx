
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <header className="w-full px-6 py-4 bg-white bg-opacity-80 backdrop-blur-sm fixed top-0 z-50 shadow-sm">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9b87f5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <path d="M16 10a4 4 0 0 1-8 0"></path>
          </svg>
          <span className="font-bold text-xl text-gray-800">T-Shirt Customizer</span>
        </Link>
        <nav className="hidden md:flex gap-6">
          <Link to="/" className="text-gray-600 hover:text-tshirt-purple transition-colors duration-300">
            Home
          </Link>
          <Link to="/customize" className="text-gray-600 hover:text-tshirt-purple transition-colors duration-300">
            Customize
          </Link>
        </nav>
        <Link to="/customize" className="btn-primary text-sm md:text-base">
          Start Designing
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
