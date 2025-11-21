import React from 'react';

interface ImageUploaderProps {
  onUpload: (files: FileList) => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onUpload }) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onUpload(e.target.files);
      e.target.value = ''; // Reset to allow same file selection
    }
  };

  return (
    <div className="w-full group">
        <label className="flex flex-col items-center justify-center w-full h-56 border-4 border-slate-300 border-dashed rounded-2xl cursor-pointer bg-slate-50 group-hover:bg-pop-yellow/10 group-hover:border-pop-yellow group-hover:scale-[1.02] transition-all duration-300 relative overflow-hidden">
            
            {/* Background decorative icons */}
            <div className="absolute -right-4 -top-4 text-slate-200 transform rotate-12 group-hover:text-yellow-200 transition-colors">
                <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24"><path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
            </div>

            <div className="flex flex-col items-center justify-center pt-5 pb-6 z-10">
                <div className="bg-white p-4 rounded-full border-2 border-black shadow-neo-sm mb-4 group-hover:shadow-neo transition-all group-hover:-translate-y-1">
                    <svg className="w-8 h-8 text-pop-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                </div>
                <p className="mb-2 text-lg font-display font-bold text-slate-700 group-hover:text-black">
                    Drop photos here!
                </p>
                <p className="text-sm font-medium text-slate-400 group-hover:text-slate-600">
                    or click to browse (PNG, JPG, WEBP)
                </p>
            </div>
            <input 
                type="file" 
                className="hidden" 
                accept="image/png, image/jpeg, image/webp" 
                multiple 
                onChange={handleFileChange}
            />
        </label>
    </div>
  );
};