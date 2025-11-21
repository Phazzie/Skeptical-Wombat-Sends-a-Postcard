import { useState } from 'react';
import { PostcardSize, Orientation, ImageAsset } from '../types';

export type InputMode = 'upload' | 'generate';

export const usePostcard = () => {
  const [size, setSize] = useState<PostcardSize>(PostcardSize.Size4x6);
  const [orientation, setOrientation] = useState<Orientation>(Orientation.Landscape);
  const [images, setImages] = useState<ImageAsset[]>([]);
  const [editingImageId, setEditingImageId] = useState<string | null>(null);
  const [inputMode, setInputMode] = useState<InputMode>('upload');
  const [apiKey, setApiKey] = useState<string>('');

  const handleUpload = async (files: FileList) => {
    const fileArray = Array.from(files);
    
    // 1. Create placeholders immediately so UI updates
    const newImages: ImageAsset[] = fileArray.map((file) => ({
      id: Math.random().toString(36).substring(2, 9),
      name: file.name,
      originalData: '',
      currentData: '',
      isProcessing: true, // Mark as processing initially
    }));

    setImages(prev => [...prev, ...newImages]);

    // 2. Process files in parallel
    const readPromises = fileArray.map((file, index) => {
      return new Promise<{ id: string, data: string }>((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          resolve({
            id: newImages[index].id,
            data: e.target?.result as string
          });
        };
        reader.readAsDataURL(file);
      });
    });

    // 3. Wait for all to finish and update state once
    const results = await Promise.all(readPromises);

    setImages((prev) => {
      return prev.map(img => {
        const result = results.find(r => r.id === img.id);
        if (result) {
          return {
            ...img,
            originalData: result.data,
            currentData: result.data,
            isProcessing: false
          };
        }
        return img;
      });
    });
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
    resetImages,
    apiKey,
    setApiKey
  };
};