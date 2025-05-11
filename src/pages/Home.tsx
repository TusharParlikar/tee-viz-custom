
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-tshirt-blue">
      <Navbar />
      
      <main className="container mx-auto pt-32 pb-16 px-6">
        <section className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="md:w-1/2 animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight">
              Design Your Perfect <span className="text-tshirt-purple">T-Shirt</span> in 3D
            </h1>
            
            <p className="mt-6 text-lg text-gray-600 max-w-lg">
              Customize colors and add your own designs with our interactive 3D T-shirt customizer. Create unique apparel that reflects your personal style.
            </p>
            
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/customize" className="btn-primary">
                Start Customizing
              </Link>
              <a href="#features" className="btn-secondary">
                Learn More
              </a>
            </div>
          </div>
          
          <div className="md:w-1/2 flex justify-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="w-80 h-80 md:w-96 md:h-96 relative">
              <div className="absolute inset-0 bg-tshirt-purple/20 rounded-full blur-3xl"></div>
              <div className="relative w-full h-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#9b87f5" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <path d="M16 10a4 4 0 0 1-8 0"></path>
                </svg>
              </div>
            </div>
          </div>
        </section>
        
        <section id="features" className="mt-32 animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            How It Works
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-card p-6 transition-transform duration-300 hover:-translate-y-2">
              <div className="w-12 h-12 rounded-full bg-tshirt-blue flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#6b7280">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-800 mb-2">Choose Your Color</h3>
              <p className="text-gray-600">
                Select from our curated color palette or pick a custom color to create your perfect t-shirt.
              </p>
            </div>
            
            <div className="glass-card p-6 transition-transform duration-300 hover:-translate-y-2">
              <div className="w-12 h-12 rounded-full bg-tshirt-purple/20 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#6b7280">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-800 mb-2">Upload Your Design</h3>
              <p className="text-gray-600">
                Add your custom logo, artwork or design to personalize your t-shirt exactly the way you want.
              </p>
            </div>
            
            <div className="glass-card p-6 transition-transform duration-300 hover:-translate-y-2">
              <div className="w-12 h-12 rounded-full bg-tshirt-pink/20 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#6b7280">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-800 mb-2">View in 3D</h3>
              <p className="text-gray-600">
                Rotate and interact with your t-shirt in real-time to see your design from every angle.
              </p>
            </div>
          </div>
        </section>
        
        <section className="mt-32 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Ready to Create Your Custom T-Shirt?
          </h2>
          <Link to="/customize" className="btn-primary inline-flex">
            Start Designing Now
          </Link>
        </section>
      </main>
      
      <footer className="bg-gray-50 py-8 mt-20">
        <div className="container mx-auto px-6">
          <div className="text-center text-gray-500 text-sm">
            <p>© 2023 T-Shirt Customizer. All rights reserved.</p>
            <p className="mt-2">Built with React, Three.js and WebGL.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
