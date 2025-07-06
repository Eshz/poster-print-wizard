
import { Font } from '@react-pdf/renderer';

/**
 * Registers all fonts from local TTF files in public/fonts folder
 */
export const registerFonts = () => {
  Font.register({
    family: 'Roboto',
    fonts: [
      { src: '/fonts/Roboto-Regular.ttf' },
      { src: '/fonts/Roboto-Bold.ttf', fontWeight: 'bold' }
    ]
  });

  Font.register({
    family: 'Merriweather',
    fonts: [
      { src: '/fonts/Merriweather-Regular.ttf' },
      { src: '/fonts/Merriweather-Bold.ttf', fontWeight: 'bold' }
    ]
  });

  Font.register({
    family: 'Playfair Display',
    fonts: [
      { src: '/fonts/PlayfairDisplay-Regular.ttf' },
      { src: '/fonts/PlayfairDisplay-Bold.ttf', fontWeight: 'bold' }
    ]
  });

  Font.register({
    family: 'Montserrat',
    fonts: [
      { src: '/fonts/Montserrat-Regular.ttf' },
      { src: '/fonts/Montserrat-Bold.ttf', fontWeight: 'bold' }
    ]
  });

  Font.register({
    family: 'Open Sans',
    fonts: [
      { src: '/fonts/OpenSans-Regular.ttf' },
      { src: '/fonts/OpenSans-Bold.ttf', fontWeight: 'bold' }
    ]
  });

  Font.register({
    family: 'Lora',
    fonts: [
      { src: '/fonts/Lora-Regular.ttf' },
      { src: '/fonts/Lora-Bold.ttf', fontWeight: 'bold' }
    ]
  });

  Font.register({
    family: 'Raleway',
    fonts: [
      { src: '/fonts/Raleway-Regular.ttf' },
      { src: '/fonts/Raleway-Bold.ttf', fontWeight: 'bold' }
    ]
  });
};
