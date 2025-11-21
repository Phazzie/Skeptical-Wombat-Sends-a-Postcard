import { AIStudio } from './types';

declare global {
  interface Window {
    aistudio?: AIStudio;
  }
}

export {};
