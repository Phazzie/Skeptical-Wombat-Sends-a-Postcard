import React from 'react';
import { PostcardSize, Orientation } from '../types';
import { POSTCARD_CONFIGS } from '../constants';

interface SizeSelectorProps {
  selectedSize: PostcardSize;
  selectedOrientation: Orientation;
  onSizeChange: (size: PostcardSize) => void;
  onOrientationChange: (orientation: Orientation) => void;
}

export const SizeSelector: React.FC<SizeSelectorProps> = ({
  selectedSize,
  selectedOrientation,
  onSizeChange,
  onOrientationChange,
}) => {
  return (
    <div className="space-y-8 p-8 bg-white rounded-2xl border-2 border-black shadow-neo">
      <div>
        <div className="flex items-center gap-3 mb-6">
            <div className="bg-pop-yellow border-2 border-black rounded-full w-8 h-8 flex items-center justify-center font-bold font-display">1</div>
            <h3 className="text-2xl font-display font-bold text-black">Pick Your Canvas</h3>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(POSTCARD_CONFIGS).map(([key, config]) => (
            <button
              key={key}
              onClick={() => onSizeChange(key as PostcardSize)}
              className={`relative p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                selectedSize === key
                  ? 'border-black bg-brand-100 shadow-neo -translate-y-1 -rotate-1'
                  : 'border-slate-300 bg-slate-50 hover:border-black hover:shadow-neo-sm'
              }`}
            >
              <div className="font-display font-bold text-lg text-black">{config.label}</div>
              <div className="text-sm text-slate-600 mt-1 leading-snug">{config.description}</div>
              {selectedSize === key && (
                <div className="absolute -top-3 -right-3 bg-brand-500 text-white border-2 border-black rounded-full p-1 shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center gap-3 mb-6">
            <div className="bg-pop-blue border-2 border-black rounded-full w-8 h-8 flex items-center justify-center font-bold font-display text-white">2</div>
            <h3 className="text-2xl font-display font-bold text-black">Orientation</h3>
        </div>
        <div className="flex gap-6">
          <button
            onClick={() => onOrientationChange(Orientation.Landscape)}
            className={`flex-1 py-4 px-6 rounded-xl border-2 font-display font-bold text-lg flex items-center justify-center gap-3 transition-all ${
              selectedOrientation === Orientation.Landscape
                 ? 'border-black bg-pop-blue text-white shadow-neo transform -translate-y-1'
                 : 'border-slate-300 text-slate-500 hover:border-black hover:text-black bg-white'
            }`}
          >
            <div className="w-8 h-5 border-2 border-current rounded-sm bg-white/20"></div>
            Landscape
          </button>
          <button
            onClick={() => onOrientationChange(Orientation.Portrait)}
            className={`flex-1 py-4 px-6 rounded-xl border-2 font-display font-bold text-lg flex items-center justify-center gap-3 transition-all ${
              selectedOrientation === Orientation.Portrait
                 ? 'border-black bg-pop-blue text-white shadow-neo transform -translate-y-1'
                 : 'border-slate-300 text-slate-500 hover:border-black hover:text-black bg-white'
            }`}
          >
            <div className="w-5 h-8 border-2 border-current rounded-sm bg-white/20"></div>
            Portrait
          </button>
        </div>
      </div>
    </div>
  );
};