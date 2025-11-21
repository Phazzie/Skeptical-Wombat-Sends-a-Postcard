import React from 'react';
import { SizeSelector } from './components/SizeSelector';
import { ImageUploader } from './components/ImageUploader';
import { ImageGenerator } from './components/ImageGenerator';
import { CollageCanvas } from './components/CollageCanvas';
import { PhotoEditorModal } from './components/PhotoEditorModal';
import { Button } from './components/Button';
import { Header } from './components/Header';
import { Gallery } from './components/Gallery';
import { usePostcard } from './hooks/usePostcard';

const App: React.FC = () => {
  const {
    size,
    setSize,
    orientation,
    setOrientation,
    images,
    editingImageId,
    setEditingImageId,
    inputMode,
    setInputMode,
    handleUpload,
    handleGeneratedImage,
    handleRemoveImage,
    handleSaveEdit,
    resetImages
  } = usePostcard();

  const editingImage = images.find(img => img.id === editingImageId);

  return (
    <div className="min-h-screen font-sans text-slate-900 pb-32">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        
        {/* Section 1: Config */}
        <section>
          <SizeSelector 
            selectedSize={size} 
            selectedOrientation={orientation}
            onSizeChange={setSize}
            onOrientationChange={setOrientation}
          />
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Section 2: Upload & Manage (Left Column) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white p-8 rounded-2xl border-2 border-black shadow-neo relative">
              {/* Decorative Badge */}
              <div className="absolute -top-5 -left-5 bg-pop-purple text-white border-2 border-black rounded-full w-12 h-12 flex items-center justify-center font-bold font-display text-xl shadow-neo-sm z-10">
                3
              </div>
              
              <div className="flex items-center justify-between mb-6 pl-4">
                 <h3 className="text-2xl font-display font-bold text-black">Add Photos</h3>
              </div>

              {/* Input Method Tabs */}
              <div className="flex border-2 border-black rounded-xl overflow-hidden mb-6 bg-white">
                <button 
                  onClick={() => setInputMode('upload')}
                  className={`flex-1 py-3 font-bold font-display uppercase tracking-wide transition-colors ${
                    inputMode === 'upload' 
                    ? 'bg-pop-yellow text-black' 
                    : 'bg-white text-slate-400 hover:bg-slate-50 hover:text-slate-600'
                  }`}
                >
                  Upload
                </button>
                <div className="w-0.5 bg-black"></div>
                <button 
                  onClick={() => setInputMode('generate')}
                  className={`flex-1 py-3 font-bold font-display uppercase tracking-wide transition-colors ${
                    inputMode === 'generate' 
                    ? 'bg-pop-blue text-white' 
                    : 'bg-white text-slate-400 hover:bg-slate-50 hover:text-slate-600'
                  }`}
                >
                  Generate AI
                </button>
              </div>
              
              {inputMode === 'upload' ? (
                 <ImageUploader onUpload={handleUpload} />
              ) : (
                 <ImageGenerator orientation={orientation} onImageGenerated={handleGeneratedImage} />
              )}
              
              <Gallery 
                images={images} 
                onEdit={setEditingImageId} 
                onRemove={handleRemoveImage} 
              />
            </div>
          </div>

          {/* Section 3: Preview (Right Column) */}
          <div className="lg:col-span-7">
             <div className="bg-pop-blue/5 p-8 rounded-2xl border-2 border-black shadow-neo h-full flex flex-col relative bg-white">
                <div className="absolute -top-5 -left-5 bg-brand-600 text-white border-2 border-black rounded-full w-12 h-12 flex items-center justify-center font-bold font-display text-xl shadow-neo-sm z-10">
                    4
                </div>
                <div className="flex items-center justify-between mb-6 pl-4">
                    <h3 className="text-2xl font-display font-bold text-black">Live Preview</h3>
                    <div className="text-sm font-bold border-2 border-black bg-white px-3 py-1 rounded-lg shadow-sm transform rotate-2">
                        {size} • {orientation}
                    </div>
                </div>
                <div className="flex-1 flex items-center justify-center min-h-[500px] bg-slate-100 rounded-xl border-2 border-black/10 p-8">
                    <CollageCanvas 
                        size={size} 
                        orientation={orientation} 
                        images={images} 
                    />
                </div>
             </div>
          </div>
        </div>
      </main>

      {/* Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t-4 border-black p-4 shadow-[0_-4px_10px_rgba(0,0,0,0.1)] z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
           <div className="flex items-center gap-2 text-black font-bold font-display">
               <span className="bg-black text-white px-2 py-0.5 rounded text-sm">{images.length}</span>
               <span className="text-sm uppercase tracking-wide">Photos Ready</span>
           </div>
           <div className="flex gap-4">
               <Button 
                    variant="ghost" 
                    onClick={resetImages} 
                    className="text-red-500 hover:text-red-600 hover:bg-red-50 border-transparent"
                    disabled={images.length === 0}
                >
                   Reset All
               </Button>
               <Button 
                    variant="accent"
                    className="min-w-[200px] text-lg"
                    disabled={images.length === 0}
                    onClick={() => alert("High-res artwork generated! (This is a demo)")}
               >
                   🚀 Download Art
               </Button>
           </div>
        </div>
      </div>

      {/* Editor Modal */}
      {editingImage && (
        <PhotoEditorModal
          image={editingImage}
          onClose={() => setEditingImageId(null)}
          onSave={handleSaveEdit}
        />
      )}
    </div>
  );
};

export default App;