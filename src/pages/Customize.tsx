
import { useState, Suspense, useRef } from 'react';
import Navbar from '../components/Navbar';
import TShirtViewer from '../components/TShirtViewer';
import ColorPicker from '../components/ColorPicker';
import FileUploader from '../components/FileUploader';
import Loader from '../components/Loader';
import { toast } from 'sonner';

const Customize = () => {
  const [tshirtColor, setTshirtColor] = useState<string>('#7C3AED');
  const [frontDesignImage, setFrontDesignImage] = useState<File | null>(null);
  const [backDesignImage, setBackDesignImage] = useState<File | null>(null);
  const [frontDesignSize, setFrontDesignSize] = useState<'small' | 'medium'>('medium');
  const [backDesignSize, setBackDesignSize] = useState<'small' | 'medium'>('medium');
  const [activeDesignTab, setActiveDesignTab] = useState<'front' | 'back'>('front');
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const canvasRef = useRef<{ screenshot: () => void }>(null);

  const handleColorChange = (color: string) => {
    setTshirtColor(color);
  };

  const handleFrontFileUpload = (file: File) => {
    setFrontDesignImage(file);
  };

  const handleBackFileUpload = (file: File) => {
    setBackDesignImage(file);
  };

  const handleDownload = () => {
    if (canvasRef.current) {
      canvasRef.current.screenshot();
    }
  };

  const handleGenerateDesign = async () => {
    if (!aiPrompt.trim()) {
      toast.error('Please enter a prompt to generate a design');
      return;
    }
    
    setIsGenerating(true);
    const promptText = aiPrompt;
    toast.info('Generating design: "' + promptText + '"...');
    
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const errorMessage = 'Token limit exceeded. Please update your plan to continue generating designs.';
      toast.error(errorMessage, {
        duration: 5000
      });
    } catch (error) {
      toast.error('Failed to generate design');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-indigo-50">
      <Navbar />
      
      <main className="container mx-auto pt-24 sm:pt-32 pb-12 sm:pb-16 px-4 sm:px-6">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6 sm:mb-8 text-center">
          Customize Your T-Shirt
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-8">
          {/* 3D Viewer - shows first on mobile */}
          <div className="lg:col-span-2 order-1 lg:order-2">
            <Suspense fallback={<Loader />}>
              <TShirtViewer 
                ref={canvasRef}
                color={tshirtColor} 
                frontDesignImage={frontDesignImage} 
                backDesignImage={backDesignImage}
                frontDesignSize={frontDesignSize}
                backDesignSize={backDesignSize} 
              />
            </Suspense>
            
            {/* Download Button */}
            <div className="mt-4 sm:mt-6 flex justify-center">
              <button
                onClick={handleDownload}
                className="btn-primary flex items-center gap-2 w-full sm:w-auto justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download Design
              </button>
            </div>
            
            <div className="mt-4 sm:mt-6 glass-card p-3 sm:p-4">
              <h3 className="font-medium text-gray-800 mb-2">Your Design Preview</h3>
              <div className="text-sm text-gray-600 space-y-1">
                <p>
                  <span className="font-medium">Front:</span> {frontDesignImage 
                    ? frontDesignImage.name
                    : 'No design uploaded'}
                </p>
                <p>
                  <span className="font-medium">Back:</span> {backDesignImage 
                    ? backDesignImage.name
                    : 'No design uploaded'}
                </p>
              </div>
            </div>
          </div>
          
          {/* Controls sidebar - shows second on mobile */}
          <div className="space-y-4 sm:space-y-6 order-2 lg:order-1">
            <ColorPicker onChange={handleColorChange} />
            
            {/* Front/Back Design Toggle */}
            <div className="glass-card p-3 sm:p-4">
              <h3 className="font-medium text-gray-800 mb-3">Upload Design</h3>
              <div className="flex gap-2 mb-3 sm:mb-4">
                <button
                  onClick={() => setActiveDesignTab('front')}
                  className={`flex-1 py-2 px-4 rounded-lg border-2 transition-all duration-200 ${
                    activeDesignTab === 'front'
                      ? 'border-violet-600 bg-violet-600/10 text-violet-600 font-medium'
                      : 'border-gray-200 text-gray-600 hover:border-violet-600/50'
                  }`}
                >
                  Front Design
                </button>
                <button
                  onClick={() => setActiveDesignTab('back')}
                  className={`flex-1 py-2 px-4 rounded-lg border-2 transition-all duration-200 ${
                    activeDesignTab === 'back'
                      ? 'border-violet-600 bg-violet-600/10 text-violet-600 font-medium'
                      : 'border-gray-200 text-gray-600 hover:border-violet-600/50'
                  }`}
                >
                  Back Design
                </button>
              </div>
              
              {/* AI Prompt Input */}
              <div className="mb-3 sm:mb-4">
                <label htmlFor="ai-prompt" className="block text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                  AI Design Prompt
                </label>
                <textarea
                  id="ai-prompt"
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  placeholder="Describe the design you want... (e.g., sunset beach vibes, geometric patterns, space galaxy)"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-600 focus:border-transparent resize-none text-sm sm:text-base"
                  rows={2}
                  disabled={isGenerating}
                />
              </div>
              
              {/* AI Generate Button */}
              <button
                onClick={handleGenerateDesign}
                disabled={isGenerating || !aiPrompt.trim()}
                className="w-full mb-3 sm:mb-4 py-2.5 px-4 rounded-lg bg-gradient-to-r from-violet-600 to-pink-500 text-white font-medium text-sm sm:text-base hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                {isGenerating ? 'Generating AI Design...' : 'Generate AI Design'}
              </button>
              
              {/* Divider */}
              <div className="flex items-center gap-2 my-3 sm:my-4">
                <div className="flex-1 border-t border-gray-300"></div>
                <span className="text-sm text-gray-500">OR</span>
                <div className="flex-1 border-t border-gray-300"></div>
              </div>
              
              {activeDesignTab === 'front' ? (
                <FileUploader onFileUpload={handleFrontFileUpload} currentFile={frontDesignImage} label="Front" />
              ) : (
                <FileUploader onFileUpload={handleBackFileUpload} currentFile={backDesignImage} label="Back" />
              )}
            </div>
            
            {/* Design Size Selector - shows for active tab */}
            {activeDesignTab === 'front' && frontDesignImage && (
              <div className="glass-card p-4">
                <h3 className="font-medium text-gray-800 mb-3">Front Design Size</h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => setFrontDesignSize('small')}
                    className={`flex-1 py-2 px-4 rounded-lg border-2 transition-all duration-200 ${
                      frontDesignSize === 'small'
                        ? 'border-violet-600 bg-violet-600/10 text-violet-600 font-medium'
                        : 'border-gray-200 text-gray-600 hover:border-violet-600/50'
                    }`}
                  >
                    Small
                  </button>
                  <button
                    onClick={() => setFrontDesignSize('medium')}
                    className={`flex-1 py-2 px-4 rounded-lg border-2 transition-all duration-200 ${
                      frontDesignSize === 'medium'
                        ? 'border-violet-600 bg-violet-600/10 text-violet-600 font-medium'
                        : 'border-gray-200 text-gray-600 hover:border-violet-600/50'
                    }`}
                  >
                    Medium
                  </button>
                </div>
              </div>
            )}
            
            {activeDesignTab === 'back' && backDesignImage && (
              <div className="glass-card p-4">
                <h3 className="font-medium text-gray-800 mb-3">Back Design Size</h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => setBackDesignSize('small')}
                    className={`flex-1 py-2 px-4 rounded-lg border-2 transition-all duration-200 ${
                      backDesignSize === 'small'
                        ? 'border-violet-600 bg-violet-600/10 text-violet-600 font-medium'
                        : 'border-gray-200 text-gray-600 hover:border-violet-600/50'
                    }`}
                  >
                    Small
                  </button>
                  <button
                    onClick={() => setBackDesignSize('medium')}
                    className={`flex-1 py-2 px-4 rounded-lg border-2 transition-all duration-200 ${
                      backDesignSize === 'medium'
                        ? 'border-violet-600 bg-violet-600/10 text-violet-600 font-medium'
                        : 'border-gray-200 text-gray-600 hover:border-violet-600/50'
                    }`}
                  >
                    Medium
                  </button>
                </div>
              </div>
            )}
            
            <div className="glass-card p-3 sm:p-4 hidden sm:block">
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
                  <span>Upload PNG or JPG files (max 10MB)</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Customize;
