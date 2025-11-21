import React from 'react';
import { ImageAsset } from '../types';

interface GalleryProps {
  images: ImageAsset[];
  onEdit: (id: string) => void;
  onRemove: (id: string) => void;
}

export const Gallery: React.FC<GalleryProps> = ({ images, onEdit, onRemove }) => {
  if (images.length === 0) return null;

  return (
    <div className="mt-8 space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-lg font-bold font-display text-black">Your Gallery ({images.length})</p>
        <span className="text-xs font-bold bg-slate-100 px-2 py-1 rounded border border-slate-300">Auto-saved</span>
      </div>
      
      <div className="grid grid-cols-2 gap-4 max-h-[500px] overflow-y-auto p-1">
        {images.map((img) => (
          <div key={img.id} className="group relative aspect-square bg-white rounded-xl border-2 border-black overflow-hidden shadow-neo-sm hover:shadow-neo transition-all hover:-translate-y-1">
            {img.currentData ? (
              <img src={img.currentData} alt="thumbnail" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-slate-100">
                <div className="animate-pulse bg-slate-200 w-full h-full"></div>
              </div>
            )}
            
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
              <button 
                onClick={() => onEdit(img.id)}
                className="flex items-center gap-2 px-4 py-2 bg-pop-yellow text-black border-2 border-black font-bold rounded-full hover:scale-105 transition-transform shadow-neo-sm"
              >
                <span>✨ Edit</span>
              </button>
              <button 
                onClick={() => onRemove(img.id)}
                className="p-2 bg-white text-red-500 border-2 border-black rounded-full hover:bg-red-50 hover:scale-105 transition-transform"
                title="Remove"
                aria-label={`Remove ${img.name}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 000-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};