import { GoogleGenAI, Modality, GenerateContentResponse } from "@google/genai";
import { GEMINI_MODELS } from "../constants";

/**
 * Helper to extract the first image found in a Gemini response.
 */
const extractImageFromResponse = (response: GenerateContentResponse): string => {
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
};

/**
 * Helper to clean a base64 string and detect mime type.
 */
const processBase64Image = (base64Image: string) => {
  let mimeType = 'image/jpeg';
  const match = base64Image.match(/^data:(image\/[a-zA-Z]+);base64,/);
  if (match && match[1]) {
    mimeType = match[1];
  }
  const cleanData = base64Image.replace(/^data:image\/[a-zA-Z]+;base64,/, "");
  return { mimeType, cleanData };
};

/**
 * Creates a new GoogleGenAI instance.
 * We create a new instance per call to ensure we pick up any dynamically selected API keys.
 */
const getAiClient = (apiKey?: string) => {
  const key = apiKey || process.env.API_KEY;
  if (!key) {
    throw new Error("API Key is missing. Please provide it in the UI or set process.env.API_KEY.");
  }
  return new GoogleGenAI({ apiKey: key });
};

/**
 * Edits an image using the Gemini Flash Image model.
 * @param base64Image The source image in base64 format.
 * @param prompt The user's instruction for editing.
 * @param apiKey Optional API key to use for this request.
 * @returns A promise resolving to the new base64 image string.
 */
export const editImageWithGemini = async (
  base64Image: string,
  prompt: string,
  apiKey?: string
): Promise<string> => {
  const ai = getAiClient(apiKey);
  const { mimeType, cleanData } = processBase64Image(base64Image);

  try {
    const response = await ai.models.generateContent({
      model: GEMINI_MODELS.EDIT,
      contents: {
        parts: [
          {
            inlineData: {
              data: cleanData,
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

    return extractImageFromResponse(response);
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
 * @param apiKey Optional API key to use for this request.
 * @returns A promise resolving to the base64 image string.
 */
export const generateImageWithGemini = async (
  prompt: string,
  size: '1K' | '2K' | '4K',
  aspectRatio: '1:1' | '3:4' | '4:3' | '9:16' | '16:9',
  apiKey?: string
): Promise<string> => {
  const ai = getAiClient(apiKey);

  try {
    const response = await ai.models.generateContent({
      model: GEMINI_MODELS.GENERATE,
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
      },
    });

    return extractImageFromResponse(response);
  } catch (error) {
    console.error("Gemini Image Generation Error:", error);
    throw error;
  }
};
