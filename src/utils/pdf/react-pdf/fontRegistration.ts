
import { Font } from '@react-pdf/renderer';

/**
 * Registers fonts using Google Fonts URLs for reliable PDF export
 */
export const registerFonts = async (): Promise<void> => {
  try {
    console.log('Starting font registration for PDF export...');
    
    // Register Roboto family
    Font.register({
      family: 'Roboto',
      fonts: [
        { 
          src: 'https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Mu4mxK.woff2',
          fontWeight: 400
        },
        { 
          src: 'https://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmWUlfBBc4.woff2',
          fontWeight: 700
        }
      ]
    });

    // Register Merriweather family
    Font.register({
      family: 'Merriweather',
      fonts: [
        { 
          src: 'https://fonts.gstatic.com/s/merriweather/v30/u-440qyriQwlOrhSvowK_l5-fCZM.woff2',
          fontWeight: 400
        },
        { 
          src: 'https://fonts.gstatic.com/s/merriweather/v30/u-4n0qyriQwlOrhSvowK_l521wRZVcf6lvA.woff2',
          fontWeight: 700
        }
      ]
    });

    // Register additional fonts with proper error handling
    const fontRegistrations = [
      {
        family: 'Playfair Display',
        fonts: [
          { 
            src: 'https://fonts.gstatic.com/s/playfairdisplay/v30/nuFiD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWBN2PKdFvXDXbtXK-F2qO0g.woff2',
            fontWeight: 400 as const
          },
          { 
            src: 'https://fonts.gstatic.com/s/playfairdisplay/v30/nuFiD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWBN2PKeFvXDXbtXK-F2qO0g.woff2',
            fontWeight: 700 as const
          }
        ]
      },
      {
        family: 'Montserrat',
        fonts: [
          { 
            src: 'https://fonts.gstatic.com/s/montserrat/v25/JTUSjIg1_i6t8kCHKm45xW4.woff2',
            fontWeight: 400 as const
          },
          { 
            src: 'https://fonts.gstatic.com/s/montserrat/v25/JTUSjIg1_i6t8kCHKm45xW5jyw.woff2',
            fontWeight: 700 as const
          }
        ]
      },
      {
        family: 'Open Sans',
        fonts: [
          { 
            src: 'https://fonts.gstatic.com/s/opensans/v34/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgsjZ0B4gaVc.woff2',
            fontWeight: 400 as const
          },
          { 
            src: 'https://fonts.gstatic.com/s/opensans/v34/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgsg-1x4gaVc.woff2',
            fontWeight: 700 as const
          }
        ]
      },
      {
        family: 'Lora',
        fonts: [
          { 
            src: 'https://fonts.gstatic.com/s/lora/v32/0QIvMX1D_JOuGQbT0gvTJPa787weuxJBkqsxPNGHzUM.woff2',
            fontWeight: 400 as const
          },
          { 
            src: 'https://fonts.gstatic.com/s/lora/v32/0QIvMX1D_JOuGQbT0gvTJPa787weuxJOkqsxPNGHzUM.woff2',
            fontWeight: 700 as const
          }
        ]
      },
      {
        family: 'Raleway',
        fonts: [
          { 
            src: 'https://fonts.gstatic.com/s/raleway/v28/1Ptxg8zYS_SKggPN4iEgvnHyvveLxVvaorCIPrCFRumuR0b4gaZElJtnAhccVA.woff2',
            fontWeight: 400 as const
          },
          { 
            src: 'https://fonts.gstatic.com/s/raleway/v28/1Ptxg8zYS_SKggPN4iEgvnHyvveLxVvaorCIPrCFRumuR0b4gaZElJtnGhYcVA.woff2',
            fontWeight: 700 as const
          }
        ]
      }
    ];

    // Register additional fonts
    fontRegistrations.forEach(fontConfig => {
      try {
        Font.register(fontConfig);
      } catch (error) {
        console.warn(`Failed to register font ${fontConfig.family}:`, error);
      }
    });

    console.log('Font registration completed successfully');
  } catch (error) {
    console.warn('Font registration encountered errors:', error);
    // Don't throw here - let PDF generation continue with system fonts
  }
};
