
import { useState } from 'react';

interface ColorPickerProps {
  onChange: (color: string) => void;
}

const ColorPicker = ({ onChange }: ColorPickerProps) => {
  const [selectedColor, setSelectedColor] = useState<string>('#7C3AED');
  
  const colors = [
    { name: 'Purple', value: '#7C3AED' },
    { name: 'Blue', value: '#3B82F6' },
    { name: 'Pink', value: '#EC4899' },
    { name: 'Green', value: '#10B981' },
    { name: 'Yellow', value: '#F59E0B' },
    { name: 'Red', value: '#EF4444' },
    { name: 'Black', value: '#222222' },
    { name: 'White', value: '#ffffff' },
  ];

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
    onChange(color);
  };

  const handleCustomColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const color = e.target.value;
    setSelectedColor(color);
    onChange(color);
  };

  return (
    <div className="glass-card p-3 sm:p-4">
      <h3 className="font-medium text-gray-800 mb-2 sm:mb-3">Choose T-Shirt Color</h3>
      <div className="flex flex-wrap gap-2 sm:gap-2 mb-3 sm:mb-4">
        {colors.map((color) => (
          <button
            key={color.value}
            className={`w-9 h-9 sm:w-8 sm:h-8 rounded-full flex items-center justify-center ${
              selectedColor === color.value ? 'ring-2 ring-offset-2 ring-violet-600' : 'hover:scale-110'
            } transition-all duration-200`}
            style={{ backgroundColor: color.value, border: color.value === '#ffffff' ? '1px solid #e5e7eb' : 'none' }}
            onClick={() => handleColorChange(color.value)}
            title={color.name}
          >
            {selectedColor === color.value && (
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 3L4.5 8.5L2 6" 
                  stroke={color.value === '#ffffff' || color.value === '#f5db87' ? '#222222' : '#ffffff'} 
                  strokeWidth="1.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </button>
        ))}
      </div>
      <div>
        <label className="block text-sm text-gray-600 mb-1" htmlFor="custom-color">Custom Color</label>
        <div className="flex items-center">
          <input
            type="color"
            id="custom-color"
            value={selectedColor}
            onChange={handleCustomColorChange}
            className="w-10 h-10 rounded overflow-hidden cursor-pointer"
          />
          <span className="ml-2 text-gray-600">{selectedColor}</span>
        </div>
      </div>
    </div>
  );
};

export default ColorPicker;
