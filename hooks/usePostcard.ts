import { useState } from 'react';
import { PostcardSize, Orientation, ImageAsset } from '../types';

export type InputMode = 'upload' | 'generate';

export const usePostcard = () => {
  const [size, setSize] = useState<PostcardSize>(PostcardSize.Size4x6);
  const [orientation, setOrientation] = useState<Orientation>(Orientation.Landscape);
  const [images, setImages] = useState<ImageAsset[]>([]);
  const [editingImageId, setEditingImageId] = useState<string | null>(null);
  const [inputMode, setInputMode] = useState<InputMode>('upload');

  const handleUpload = (files: FileList) => {
    const newImages: ImageAsset[] = Array.from(files).map((file) => ({
      id: Math.random().toString(36).substring(2, 9),
      name: file.name,
      originalData: '',
      currentData: '',
      isProcessing: false,
    }));

    // Pre-allocate IDs to maintain order, then update async as files read
    Array.from(files).forEach((file, index) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setImages((prev) => {
          const updated = [...prev];
          // Find the placeholder we created
          const targetIndex = prev.findIndex(p => p.id === newImages[index].id);
          
          if (targetIndex === -1) {
               // Fallback if somehow state shifted
               updated.push({
                  id: Math.random().toString(36).substring(2,9),
                  name: file.name,
                  originalData: result,
                  currentData: result,
                  isProcessing: false
               });
          } else {
              updated[targetIndex] = {
                  ...updated[targetIndex],
                  originalData: result,
                  currentData: result
              };
          }
          return updated;
        });
      };
      reader.readAsDataURL(file);
    });

    setImages(prev => [...prev, ...newImages]);
  };

  const handleGeneratedImage = (base64: string, prompt: string) => {
    const newImage: ImageAsset = {
      id: Math.random().toString(36).substring(2, 9),
      name: `AI Generated: ${prompt.substring(0, 15)}...`,
      originalData: base64,
      currentData: base64,
      isProcessing: false,
    };
    setImages(prev => [...prev, newImage]);
  };

  const handleRemoveImage = (id: string) => {
    setImages(prev => prev.filter(img => img.id !== id));
  };

  const handleSaveEdit = (id: string, newData: string) => {
    setImages(prev => prev.map(img => 
      img.id === id ? { ...img, currentData: newData } : img
    ));
  };

  const resetImages = () => setImages([]);

  return {
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
  };
};