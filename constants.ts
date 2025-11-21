import { PostcardSize, SizeConfig } from './types';

export const POSTCARD_CONFIGS: Record<PostcardSize, SizeConfig> = {
  [PostcardSize.Size4x6]: {
    label: '4" x 6" Standard',
    ratio: 4 / 6,
    description: 'The classic standard postcard size.',
  },
  [PostcardSize.Size5x7]: {
    label: '5" x 7" Large',
    ratio: 5 / 7,
    description: 'Great for framing and detailed photos.',
  },
  [PostcardSize.Size6x9]: {
    label: '6" x 9" Oversized',
    ratio: 6 / 9,
    description: 'High impact, maximum visibility.',
  },
  [PostcardSize.Size6x11]: {
    label: '6" x 11" Panoramic',
    ratio: 6 / 11,
    description: 'Perfect for wide landscapes or storyboards.',
  },
};

export interface PresetStyle {
  label: string;
  prompt: string;
  description: string;
}

export const EDITOR_TABS = {
  FILTERS: 'Artistic Filters',
  SCENES: 'Fun Scenes',
  OPTIMIZE: 'Retouch',
};

export const EDITOR_PRESETS: Record<string, PresetStyle[]> = {
  [EDITOR_TABS.FILTERS]: [
    { label: "Vintage Polaroid", prompt: "Make it look like a vintage polaroid photo with soft colors", description: "Retro instant camera look" },
    { label: "Black & White", prompt: "Convert to dramatic high-contrast black and white photography", description: "Classic monochrome" },
    { label: "Sepia Tone", prompt: "Apply an antique sepia tone filter", description: "Old western style" },
    { label: "Pencil Sketch", prompt: "Convert this image into a detailed charcoal pencil sketch", description: "Hand-drawn look" },
    { label: "Watercolor", prompt: "Turn this image into a soft, colorful watercolor painting", description: "Artistic painting" },
    { label: "Oil Painting", prompt: "Turn this image into a textured oil painting", description: "Classic canvas art" },
    { label: "Cyberpunk Neon", prompt: "Apply a cyber-punk neon filter with pink and blue glow", description: "Futuristic aesthetic" },
  ],
  [EDITOR_TABS.SCENES]: [
    { label: "Outer Space", prompt: "Place the subject floating in outer space with galaxies in the background", description: "Cosmic adventure" },
    { label: "Fantasy Forest", prompt: "Transform the background into a glowing magical forest", description: "Fairytale setting" },
    { label: "Tropical Beach", prompt: "Place the subject on a sunny tropical beach with palm trees", description: "Island vacation" },
    { label: "Winter Wonderland", prompt: "Add a snowy winter scene background with falling snow", description: "Snowy scenery" },
    { label: "Underwater", prompt: "Reimagine this scene as if it is underwater with coral reefs", description: "Deep sea dive" },
    { label: "Superhero", prompt: "Make the subject look like a superhero in a comic book style", description: "Action hero style" },
  ],
  [EDITOR_TABS.OPTIMIZE]: [
    { label: "Auto Enhance", prompt: "Enhance lighting, contrast, and white balance for a professional look", description: "Quick fix" },
    { label: "Studio Lighting", prompt: "Apply professional studio softbox lighting to the subject", description: "Portrait lighting" },
    { label: "Vibrant Colors", prompt: "Increase color vibrancy and saturation significantly", description: "Pop the colors" },
    { label: "Warm & Cozy", prompt: "Apply a warm, golden hour lighting effect", description: "Sunset feel" },
    { label: "Cool & Moody", prompt: "Apply a cool, cinematic blue tone", description: "Dramatic atmosphere" },
  ]
};