interface FontConfig {
  family: string;
  fallback: string;
  weights: Array<{
    weight: number | string;
    style: 'normal' | 'italic';
    fileName: string;
  }>;
}

// Font configurations with CDN TTF files for testing
export const FONT_CONFIGS: FontConfig[] = [
  {
    family: 'DejaVu Sans',
    fallback: 'Arial, sans-serif',
    weights: [
      { weight: 'normal', style: 'normal', fileName: 'https://kendo.cdn.telerik.com/2016.2.607/styles/fonts/DejaVu/DejaVuSans.ttf' },
      { weight: 'bold', style: 'normal', fileName: 'https://kendo.cdn.telerik.com/2016.2.607/styles/fonts/DejaVu/DejaVuSans-Bold.ttf' }
    ]
  },
  {
    family: 'DejaVu Sans Bold',
    fallback: 'Georgia, serif',
    weights: [
      { weight: 'normal', style: 'normal', fileName: 'https://kendo.cdn.telerik.com/2016.2.607/styles/fonts/DejaVu/DejaVuSans-Bold.ttf' },
      { weight: 'bold', style: 'normal', fileName: 'https://kendo.cdn.telerik.com/2016.2.607/styles/fonts/DejaVu/DejaVuSans-Bold.ttf' }
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