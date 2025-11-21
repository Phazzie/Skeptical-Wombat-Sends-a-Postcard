import React, { useState } from 'react';
import { Button } from './Button';
import { Orientation } from '../types';
import { generateImageWithGemini } from '../services/geminiService';
import { MODEL_LABELS } from '../constants';

interface ImageGeneratorProps {
  orientation: Orientation;
  onImageGenerated: (base64: string, prompt: string) => void;
  apiKey?: string;
}

export const ImageGenerator: React.FC<ImageGeneratorProps> = ({
  orientation,
  onImageGenerated,
  apiKey,
}) => {
  const [prompt, setPrompt] = useState('');
  const [size, setSize] = useState<'1K' | '2K' | '4K'>('1K');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setError(null);

    // Mandatory API Key check for Gemini 3 Pro Image
    if (window.aistudio) {
      const hasKey = await window.aistudio.hasSelectedApiKey();
      if (!hasKey) {
        await window.aistudio.openSelectKey();
        // Assume success despite race condition
      }
    }

    setIsGenerating(true);

    // Map global orientation to supported aspect ratio
    const aspectRatio = orientation === Orientation.Landscape ? '16:9' : '9:16';

    try {
      const result = await generateImageWithGemini(prompt, size, aspectRatio, apiKey);
      onImageGenerated(result, prompt);
      setPrompt(''); // Clear prompt on success
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      
      if (errorMessage.includes("Requested entity was not found") && window.aistudio) {
        // Handle possible stale key
        await window.aistudio.openSelectKey();
        setError("API Key issue detected. Please try again.");
      } else {
        setError("Failed to generate image. Try a simpler prompt.");
      }
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="w-full bg-slate-50 rounded-2xl border-2 border-black border-dashed p-6 hover:bg-pop-yellow/5 transition-colors group">
      <div className="mb-4">
        <label className="block text-lg font-display font-bold text-black mb-2 flex items-center gap-2">
          <span className="bg-pop-blue text-white px-2 py-0.5 rounded text-sm">{MODEL_LABELS.GENERATE}</span>
          Describe your scene
        </label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="A futuristic city made of candy..."
          rows={3}
          className="w-full bg-white border-2 border-slate-300 rounded-xl p-3 focus:border-pop-blue focus:outline-none focus:shadow-neo-sm transition-all font-medium placeholder-slate-400"
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">
          Quality (Size)
        </label>
        <div className="flex bg-white rounded-xl border-2 border-slate-200 p-1">
          {(['1K', '2K', '4K'] as const).map((s) => (
            <button
              key={s}
              onClick={() => setSize(s)}
              className={`flex-1 py-2 rounded-lg font-bold text-sm transition-all ${
                size === s
                  ? 'bg-black text-white shadow-md'
                  : 'text-slate-500 hover:bg-slate-100'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div className="mb-4 text-red-500 text-sm font-bold bg-red-50 p-2 rounded-lg border border-red-200">
          ⚠️ {error}
        </div>
      )}

      <Button
        onClick={handleGenerate}
        disabled={!prompt || isGenerating}
        variant="primary"
        className="w-full bg-pop-blue hover:bg-blue-500 border-black"
        isLoading={isGenerating}
      >
        {isGenerating ? 'Dreaming...' : 'Generate Art 🎨'}
      </Button>
    </div>
  );
};