import React from 'react';
import { Button } from './Button';

interface ActionBarProps {
  photoCount: number;
  onReset: () => void;
  onDownload: () => void;
}

export const ActionBar: React.FC<ActionBarProps> = ({ photoCount, onReset, onDownload }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t-4 border-black p-4 shadow-[0_-4px_10px_rgba(0,0,0,0.1)] z-40">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
         <div className="flex items-center gap-2 text-black font-bold font-display">
             <span className="bg-black text-white px-2 py-0.5 rounded text-sm">{photoCount}</span>
             <span className="text-sm uppercase tracking-wide">Photos Ready</span>
         </div>
         <div className="flex gap-4">
             <Button 
                  variant="ghost" 
                  onClick={onReset} 
                  className="text-red-500 hover:text-red-600 hover:bg-red-50 border-transparent"
                  disabled={photoCount === 0}
              >
                 Reset All
             </Button>
             <Button 
                  variant="accent"
                  className="min-w-[200px] text-lg"
                  disabled={photoCount === 0}
                  onClick={onDownload}
             >
                 🚀 Download Art
             </Button>
         </div>
      </div>
    </div>
  );
};
