import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="bg-white border-b-4 border-black sticky top-0 z-30 shadow-neo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-brand-500 text-white p-2 border-2 border-black shadow-neo-sm transform -rotate-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
          </div>
          <h1 className="text-3xl font-display font-black tracking-tight text-black uppercase italic">
            Postcard<span className="text-brand-600 not-italic">AI</span>
          </h1>
        </div>
        <div className="hidden sm:flex items-center gap-2 bg-pop-yellow px-3 py-1 rounded-full border-2 border-black font-bold text-xs shadow-neo-sm">
          <span className="animate-pulse">⚡</span>
          <span>Powered by Gemini</span>
        </div>
      </div>
    </header>
  );
};