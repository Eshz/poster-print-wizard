
import { FONT_FAMILIES } from '@/constants/fonts';

export const getFontClass = (fontType: 'title' | 'content', titleFont: string, contentFont: string): string => {
  const font = fontType === 'title' ? titleFont : contentFont;
  
  switch(font) {
    case 'playfair': return 'font-playfair';
    case 'roboto': return 'font-roboto';
    case 'merriweather': return 'font-merriweather';
    case 'montserrat': return 'font-montserrat';
    case 'opensans': return 'font-opensans';
    case 'lora': return 'font-lora';
    case 'raleway': return 'font-raleway';
    default: return 'font-roboto';
  }
};

export const getFontFamily = (fontKey: string): string => {
  return FONT_FAMILIES[fontKey as keyof typeof FONT_FAMILIES] || FONT_FAMILIES.roboto;
};
