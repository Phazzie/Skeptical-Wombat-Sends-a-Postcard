import React from 'react';
import { ImageAsset, PostcardSize, Orientation } from '../types';
import { POSTCARD_CONFIGS } from '../constants';

interface CollageCanvasProps {
  size: PostcardSize;
  orientation: Orientation;
  images: ImageAsset[];
}

export const CollageCanvas: React.FC<CollageCanvasProps> = ({
  size,
  orientation,
  images,
}) => {
  const config = POSTCARD_CONFIGS[size];
  
  const cssAspectRatio = orientation === Orientation.Landscape
    ? `${1/config.ratio}` // e.g. 6/4 = 1.5
    : `${config.ratio}`;  // e.g. 4/6 = 0.66
  
  const getGridClass = (count: number) => {
    if (count === 0) return 'flex items-center justify-center';
    if (count === 1) return 'grid grid-cols-1';
    if (count === 2) return orientation === Orientation.Landscape ? 'grid grid-cols-2' : 'grid grid-rows-2';
    if (count === 3) return 'grid grid-cols-2 grid-rows-2';
    if (count === 4) return 'grid grid-cols-2 grid-rows-2';
    return 'grid grid-cols-3 grid-rows-2';
  };

  const gridClass = getGridClass(images.length);

  return (
    <div className="w-full flex items-center justify-center">
      <div 
        className={`relative bg-white shadow-xl w-full max-w-4xl ${gridClass} gap-1 overflow-hidden border-[12px] border-white ring-1 ring-slate-200`}
        style={{ aspectRatio: cssAspectRatio }}
      >
        {images.length === 0 && (
          <div className="text-slate-300 font-display font-bold text-2xl flex flex-col items-center justify-center h-full w-full border-4 border-slate-100 border-dashed m-2 rounded-lg">
             <div className="bg-slate-50 p-6 rounded-full mb-4">
                <span className="text-4xl">🎨</span>
             </div>
             <span>Preview Canvas</span>
             <span className="text-sm font-sans font-normal text-slate-400 mt-2">Photos you upload appear here</span>
          </div>
        )}

        {images.map((img, index) => {
          let spanClass = "";
          if (images.length === 3 && index === 0) {
            spanClass = orientation === Orientation.Landscape ? "row-span-2" : "col-span-2";
          }

          return (
            <div key={img.id} className={`relative w-full h-full overflow-hidden group ${spanClass}`}>
              <img 
                src={img.currentData} 
                alt={`Collage part ${index}`}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
              />
            </div>
          );
        })}
        
        {/* Brand Watermark */}
        {images.length > 0 && (
           <div className="absolute bottom-4 right-4 z-10">
               <div className="bg-black/80 text-white px-2 py-1 rounded text-[10px] font-bold font-display uppercase tracking-wider backdrop-blur-md border border-white/20">
                   PostcardAI
               </div>
           </div>
        )}
      </div>
    </div>
  );
};