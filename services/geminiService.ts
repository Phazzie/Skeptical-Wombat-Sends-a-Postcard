import { GoogleGenAI, Modality } from "@google/genai";

/**
 * Creates a new GoogleGenAI instance.
 * We create a new instance per call to ensure we pick up any dynamically selected API keys.
 */
const getAiClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key is missing. Please set process.env.API_KEY.");
  }
  return new GoogleGenAI({ apiKey });
};

/**
 * Edits an image using the Gemini Flash Image model.
 * @param base64Image The source image in base64 format.
 * @param prompt The user's instruction for editing.
 * @returns A promise resolving to the new base64 image string.
 */
export const editImageWithGemini = async (
  base64Image: string,
  prompt: string
): Promise<string> => {
  const ai = getAiClient();
  
  // Detect mime type from base64 prefix if present, default to jpeg
  let mimeType = 'image/jpeg';
  const match = base64Image.match(/^data:(image\/[a-zA-Z]+);base64,/);
  if (match && match[1]) {
    mimeType = match[1];
  }

  // Clean the base64 string
  const cleanBase64 = base64Image.replace(/^data:image\/[a-zA-Z]+;base64,/, "");

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: cleanBase64,
              mimeType: mimeType,
            },
          },
          {
            text: prompt,
          },
        ],
      },
      config: {
        responseModalities: [Modality.IMAGE],
      },
    });

    // Extract image from response
    const candidates = response.candidates;
    if (candidates && candidates.length > 0) {
      const parts = candidates[0].content.parts;
      for (const part of parts) {
        if (part.inlineData && part.inlineData.data) {
          return `data:image/png;base64,${part.inlineData.data}`;
        }
      }
    }
    
    throw new Error("No image data returned from Gemini.");
  } catch (error) {
    console.error("Gemini Image Edit Error:", error);
    throw error;
  }
};

/**
 * Generates a new image using Gemini 3 Pro Image Preview.
 * @param prompt The text description of the image to generate.
 * @param size The resolution of the generated image.
 * @param aspectRatio The aspect ratio of the generated image.
 * @returns A promise resolving to the base64 image string.
 */
export const generateImageWithGemini = async (
  prompt: string,
  size: '1K' | '2K' | '4K',
  aspectRatio: '1:1' | '3:4' | '4:3' | '9:16' | '16:9'
): Promise<string> => {
  const ai = getAiClient();

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-image-preview',
      contents: {
        parts: [
          {
            text: prompt,
          },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: aspectRatio,
          imageSize: size,
        },
        // Note: google_search tool is available for this model if needed, but not requested here.
      },
    });

    const candidates = response.candidates;
    if (candidates && candidates.length > 0) {
      const parts = candidates[0].content.parts;
      for (const part of parts) {
        if (part.inlineData && part.inlineData.data) {
          return `data:image/png;base64,${part.inlineData.data}`;
        }
      }
    }

    throw new Error("No image generated.");
  } catch (error) {
    console.error("Gemini Image Generation Error:", error);
    throw error;
  }
};
