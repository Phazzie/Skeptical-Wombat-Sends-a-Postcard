export enum PostcardSize {
  Size4x6 = '4x6',
  Size6x9 = '6x9',
  Size5x7 = '5x7',
  Size6x11 = '6x11',
}

export enum Orientation {
  Portrait = 'portrait',
  Landscape = 'landscape',
}

export interface ImageAsset {
  id: string;
  originalData: string; // Base64
  currentData: string; // Base64 (potentially edited)
  name: string;
  isProcessing: boolean;
}

export interface SizeConfig {
  label: string;
  ratio: number; // width / height
  description: string;
}

export type ViewMode = 'upload' | 'edit' | 'preview';

// Type definitions for the AI Studio global object
export interface AIStudio {
  hasSelectedApiKey: () => Promise<boolean>;
  openSelectKey: () => Promise<void>;
}
