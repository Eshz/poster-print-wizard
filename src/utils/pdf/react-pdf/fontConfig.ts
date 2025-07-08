interface FontConfig {
  family: string;
  fallback: string;
  weights: Array<{
    weight: number | string;
    style: 'normal' | 'italic';
    fileName: string;
  }>;
}

// Font configurations with local TTF files
export const FONT_CONFIGS: FontConfig[] = [
  {
    family: 'Roboto',
    fallback: 'Arial, sans-serif',
    weights: [
      { weight: 300, style: 'normal', fileName: 'Roboto-Light.ttf' },
      { weight: 'normal', style: 'normal', fileName: 'Roboto-Regular.ttf' },
      { weight: 500, style: 'normal', fileName: 'Roboto-Medium.ttf' },
      { weight: 'bold', style: 'normal', fileName: 'Roboto-Bold.ttf' }
    ]
  },
  {
    family: 'Merriweather',
    fallback: 'Georgia, serif',
    weights: [
      { weight: 'normal', style: 'normal', fileName: 'Merriweather-Regular.ttf' },
      { weight: 'bold', style: 'normal', fileName: 'Merriweather-Bold.ttf' }
    ]
  },
  {
    family: 'Montserrat',
    fallback: 'Arial, sans-serif',
    weights: [
      { weight: 300, style: 'normal', fileName: 'Montserrat-Light.ttf' },
      { weight: 'normal', style: 'normal', fileName: 'Montserrat-Regular.ttf' },
      { weight: 500, style: 'normal', fileName: 'Montserrat-Medium.ttf' },
      { weight: 600, style: 'normal', fileName: 'Montserrat-SemiBold.ttf' },
      { weight: 'bold', style: 'normal', fileName: 'Montserrat-Bold.ttf' }
    ]
  },
  {
    family: 'Open Sans',
    fallback: 'Arial, sans-serif',
    weights: [
      { weight: 300, style: 'normal', fileName: 'OpenSans-Light.ttf' },
      { weight: 'normal', style: 'normal', fileName: 'OpenSans-Regular.ttf' },
      { weight: 500, style: 'normal', fileName: 'OpenSans-Medium.ttf' },
      { weight: 600, style: 'normal', fileName: 'OpenSans-SemiBold.ttf' },
      { weight: 'bold', style: 'normal', fileName: 'OpenSans-Bold.ttf' }
    ]
  }
];

export type { FontConfig };