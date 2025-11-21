import React, { useState } from 'react';
import { ImageAsset } from '../types';
import { Button } from './Button';
import { EDITOR_PRESETS, EDITOR_TABS, PresetStyle } from '../constants';
import { editImageWithGemini } from '../services/geminiService';

interface PhotoEditorModalProps {
  image: ImageAsset;
  onClose: () => void;
  onSave: (id: string, newData: string) => void;
}

export const PhotoEditorModal: React.FC<PhotoEditorModalProps> = ({
  image,
  onClose,
  onSave,
}) => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(image.currentData);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>(EDITOR_TABS.FILTERS);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    setError(null);

    try {
      const newImageData = await editImageWithGemini(image.currentData, prompt);
      setPreviewUrl(newImageData);
    } catch (err) {
      setError("Failed to process image. Please try a different prompt.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleApply = () => {
    onSave(image.id, previewUrl);
    onClose();
  };

  const handleReset = () => {
    setPreviewUrl(image.originalData);
    setPrompt('');
    setError(null);
  };

  const handlePresetClick = (preset: PresetStyle) => {
    setPrompt(preset.prompt);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
        {/* Backdrop */}
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity" aria-hidden="true" onClick={onClose}></div>

        {/* Modal Content */}
        <div className="inline-block align-bottom bg-zinc-900 rounded-2xl border-2 border-white/20 text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-6xl sm:w-full flex flex-col h-[85vh]">
          
          {/* Header */}
          <div className="bg-zinc-900 px-6 py-4 border-b border-zinc-800 flex justify-between items-center">
             <div className="flex items-center gap-3">
                <span className="text-2xl">✨</span>
                <h3 className="text-xl font-display font-bold text-white" id="modal-title">
                    Magic Studio
                </h3>
             </div>
             <button onClick={onClose} className="bg-zinc-800 hover:bg-zinc-700 text-white rounded-full p-2 transition-colors">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
             </button>
          </div>

          <div className="flex-1 overflow-hidden flex flex-col lg:flex-row">
             {/* Left: Canvas / Preview */}
             <div className="w-full lg:w-3/5 bg-zinc-950 p-8 flex flex-col justify-center items-center relative overflow-hidden">
                {/* Checkerboard background for transparency feeling */}
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#333 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                
                <div className="relative w-full h-full flex items-center justify-center z-10">
                    <img 
                        src={previewUrl} 
                        alt="Editing preview" 
                        className="max-w-full max-h-full object-contain shadow-2xl rounded-lg border-2 border-zinc-800"
                    />
                    
                    {isGenerating && (
                        <div className="absolute inset-0 bg-black/70 flex items-center justify-center rounded-lg backdrop-blur-sm">
                            <div className="flex flex-col items-center">
                                <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-pop-purple mb-4"></div>
                                <span className="text-pop-purple font-display font-bold text-xl animate-pulse">Designing...</span>
                            </div>
                        </div>
                    )}
                </div>

                <div className="mt-6 flex gap-4 z-10">
                     <button onClick={handleReset} className="px-4 py-2 bg-zinc-800 text-zinc-300 rounded-lg text-sm font-bold hover:bg-zinc-700 hover:text-white transition-colors border border-zinc-700">
                        ↺ Reset Original
                     </button>
                     {previewUrl !== image.originalData && !isGenerating && (
                        <div className="px-4 py-2 bg-green-500/20 text-green-400 border border-green-500/50 rounded-lg text-sm font-bold flex items-center gap-2">
                           <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                           Changes Applied
                        </div>
                     )}
                </div>
             </div>

             {/* Right: Control Panel */}
             <div className="w-full lg:w-2/5 flex flex-col bg-zinc-900 border-l border-zinc-800 h-full">
                <div className="flex-1 overflow-y-auto p-6">
                    {/* Prompt Input */}
                    <div className="mb-8">
                        <label className="block text-sm font-bold text-zinc-400 mb-3 uppercase tracking-wider">
                            Magic Editor (Gemini 2.5 Flash)
                        </label>
                        <div className="relative group">
                            <textarea
                                rows={3}
                                className="w-full bg-zinc-950 text-white border-2 border-zinc-700 rounded-xl p-4 focus:border-pop-purple focus:ring-0 resize-none transition-colors placeholder-zinc-600"
                                placeholder="Type instructions like 'Add a retro filter' or 'Remove the person in the background'..."
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                            />
                            <div className="absolute bottom-3 right-3">
                                <Button 
                                    variant="accent"
                                    onClick={handleGenerate} 
                                    disabled={!prompt || isGenerating}
                                    className="py-1 px-4 text-sm shadow-none"
                                >
                                    GO
                                </Button>
                            </div>
                        </div>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 bg-red-900/30 border-2 border-red-900 text-red-300 text-sm rounded-xl flex items-start gap-3">
                            <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            {error}
                        </div>
                    )}

                    {/* Tabs */}
                    <div className="mb-6">
                        <div className="flex p-1 bg-zinc-950 rounded-xl border border-zinc-800">
                            {Object.values(EDITOR_TABS).map((tabName) => (
                                <button
                                    key={tabName}
                                    onClick={() => setActiveTab(tabName)}
                                    className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${
                                        activeTab === tabName
                                            ? 'bg-zinc-800 text-white shadow-lg'
                                            : 'text-zinc-500 hover:text-zinc-300'
                                    }`}
                                >
                                    {tabName}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Presets */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {EDITOR_PRESETS[activeTab].map((preset) => (
                            <button
                                key={preset.label}
                                onClick={() => handlePresetClick(preset)}
                                className={`text-left p-3 rounded-xl border-2 transition-all duration-200 group ${
                                    prompt === preset.prompt 
                                        ? 'border-pop-purple bg-pop-purple/10' 
                                        : 'border-zinc-800 hover:border-zinc-600 bg-zinc-900'
                                }`}
                            >
                                <div className={`font-bold text-sm group-hover:text-white ${prompt === preset.prompt ? 'text-pop-purple' : 'text-zinc-300'}`}>
                                    {preset.label}
                                </div>
                                <div className="text-xs text-zinc-500 mt-1">{preset.description}</div>
                            </button>
                        ))}
                    </div>
                </div>
                
                {/* Footer */}
                <div className="bg-zinc-900 p-6 border-t border-zinc-800 flex gap-4">
                    <Button 
                        variant="ghost" 
                        onClick={onClose}
                        className="flex-1 border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white"
                    >
                        Cancel
                    </Button>
                    <Button onClick={handleApply} className="flex-1 bg-pop-purple hover:bg-purple-400 border-black text-white">
                        Save Art
                    </Button>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
