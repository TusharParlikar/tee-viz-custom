
import { useState } from 'react';
import Navbar from '../components/Navbar';
import TShirtViewer from '../components/TShirtViewer';
import ColorPicker from '../components/ColorPicker';
import FileUploader from '../components/FileUploader';
import { Suspense } from 'react';
import Loader from '../components/Loader';

const Customize = () => {
  const [tshirtColor, setTshirtColor] = useState<string>('#9b87f5');
  const [designImage, setDesignImage] = useState<File | null>(null);

  const handleColorChange = (color: string) => {
    setTshirtColor(color);
  };

  const handleFileUpload = (file: File) => {
    setDesignImage(file);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-tshirt-light-gray">
      <Navbar />
      
      <main className="container mx-auto pt-32 pb-16 px-6">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center">
          Customize Your T-Shirt
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left sidebar - Customization controls */}
          <div className="space-y-6">
            <ColorPicker onChange={handleColorChange} />
            <FileUploader onFileUpload={handleFileUpload} />
            
            <div className="glass-card p-4">
              <h3 className="font-medium text-gray-800 mb-3">Instructions</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li className="flex items-start gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="mt-0.5">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                  </svg>
                  <span>Click and drag to rotate the t-shirt</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="mt-0.5">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <span>Use scroll to zoom in and out</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="mt-0.5">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                  <span>Upload PNG or JPG files (max 2MB)</span>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Main content - 3D T-shirt viewer */}
          <div className="lg:col-span-2">
            <Suspense fallback={<Loader />}>
              <TShirtViewer color={tshirtColor} designImage={designImage} />
            </Suspense>
            
            <div className="mt-6 glass-card p-4">
              <h3 className="font-medium text-gray-800 mb-2">Your Design Preview</h3>
              <p className="text-sm text-gray-600">
                {designImage 
                  ? `Using design: ${designImage.name}`
                  : 'No design uploaded yet. Upload an image to see it on the t-shirt.'}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Customize;
