
import React, { useState, useRef } from 'react';
import { toast } from "sonner";

interface FileUploaderProps {
  onFileUpload: (file: File) => void;
  currentFile?: File | null;
  label?: string;
}

const FileUploader = ({ onFileUpload, currentFile, label }: FileUploaderProps) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Update preview when currentFile changes
  React.useEffect(() => {
    if (currentFile) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(currentFile);
    } else {
      setPreview(null);
    }
  }, [currentFile]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      validateAndProcessFile(file);
    }
  };

  const validateAndProcessFile = (file: File) => {
    // Check if file is an image
    if (!file.type.match('image.*')) {
      toast.error('Please upload an image file (PNG or JPG)');
      return;
    }

    // Check file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast.error('File is too large. Please upload an image less than 10MB');
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Pass the file to parent component
    onFileUpload(file);
    toast.success(`${label || 'Design'} uploaded successfully!`);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      validateAndProcessFile(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const removePreview = () => {
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div>
      {!preview ? (
        <div
          className={`border-2 border-dashed rounded-lg p-4 sm:p-6 text-center cursor-pointer transition-all ${
            isDragging ? 'border-violet-600 bg-violet-600/5' : 'border-gray-300 hover:border-violet-600'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={triggerFileInput}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="mx-auto mb-2 sm:mb-3 text-gray-400">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          <p className="text-sm text-gray-500">
            Drag and drop {label ? label.toLowerCase() : ''} design here, or <span className="text-violet-600">browse</span>
          </p>
          <p className="text-xs text-gray-400 mt-1">PNG or JPG (max. 10MB)</p>
        </div>
      ) : (
        <div className="relative">
          <img 
            src={preview} 
            alt="Design Preview" 
            className="w-full h-40 object-contain rounded-lg border border-gray-200" 
          />
          <button 
            onClick={removePreview} 
            className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}
      
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/png, image/jpeg"
        className="hidden"
      />
    </div>
  );
};

export default FileUploader;
