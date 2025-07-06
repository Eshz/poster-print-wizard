
import { Font } from '@react-pdf/renderer';

/**
 * Registers fonts using Google Fonts URLs for reliable PDF export
 */
export const registerFonts = () => {
  try {
    // Register Roboto family
    Font.register({
      family: 'Roboto',
      fonts: [
        { 
          src: 'https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Mu4mxK.woff2',
          fontWeight: 'normal'
        },
        { 
          src: 'https://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmWUlfBBc4.woff2',
          fontWeight: 'bold'
        }
      ]
    });

    // Register Merriweather family
    Font.register({
      family: 'Merriweather',
      fonts: [
        { 
          src: 'https://fonts.gstatic.com/s/merriweather/v30/u-440qyriQwlOrhSvowK_l5-fCZM.woff2',
          fontWeight: 'normal'
        },
        { 
          src: 'https://fonts.gstatic.com/s/merriweather/v30/u-4n0qyriQwlOrhSvowK_l521wRZVcf6lvA.woff2',
          fontWeight: 'bold'
        }
      ]
    });

    // Register Playfair Display family
    Font.register({
      family: 'Playfair Display',
      fonts: [
        { 
          src: 'https://fonts.gstatic.com/s/playfairdisplay/v30/nuFiD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWBN2PKdFvXDXbtXK-F2qO0g.woff2',
          fontWeight: 'normal'
        },
        { 
          src: 'https://fonts.gstatic.com/s/playfairdisplay/v30/nuFiD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWBN2PKeFvXDXbtXK-F2qO0g.woff2',
          fontWeight: 'bold'
        }
      ]
    });

    // Register Montserrat family
    Font.register({
      family: 'Montserrat',
      fonts: [
        { 
          src: 'https://fonts.gstatic.com/s/montserrat/v25/JTUSjIg1_i6t8kCHKm45xW4.woff2',
          fontWeight: 'normal'
        },
        { 
          src: 'https://fonts.gstatic.com/s/montserrat/v25/JTUSjIg1_i6t8kCHKm45xW5jyw.woff2',
          fontWeight: 'bold'
        }
      ]
    });

    // Register Open Sans family
    Font.register({
      family: 'Open Sans',
      fonts: [
        { 
          src: 'https://fonts.gstatic.com/s/opensans/v34/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgsjZ0B4gaVc.woff2',
          fontWeight: 'normal'
        },
        { 
          src: 'https://fonts.gstatic.com/s/opensans/v34/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgsg-1x4gaVc.woff2',
          fontWeight: 'bold'
        }
      ]
    });

    // Register Lora family
    Font.register({
      family: 'Lora',
      fonts: [
        { 
          src: 'https://fonts.gstatic.com/s/lora/v32/0QIvMX1D_JOuGQbT0gvTJPa787weuxJBkqsxPNGHzUM.woff2',
          fontWeight: 'normal'
        },
        { 
          src: 'https://fonts.gstatic.com/s/lora/v32/0QIvMX1D_JOuGQbT0gvTJPa787weuxJOkqsxPNGHzUM.woff2',
          fontWeight: 'bold'
        }
      ]
    });

    // Register Raleway family
    Font.register({
      family: 'Raleway',
      fonts: [
        { 
          src: 'https://fonts.gstatic.com/s/raleway/v28/1Ptxg8zYS_SKggPN4iEgvnHyvveLxVvaorCIPrCFRumuR0b4gaZElJtnAhccVA.woff2',
          fontWeight: 'normal'
        },
        { 
          src: 'https://fonts.gstatic.com/s/raleway/v28/1Ptxg8zYS_SKggPN4iEgvnHyvveLxVvaorCIPrCFRumuR0b4gaZElJtnGhYcVA.woff2',
          fontWeight: 'bold'
        }
      ]
    });

    console.log('Successfully registered fonts for PDF export');
  } catch (error) {
    console.warn('Font registration failed, will use system fonts:', error);
  }
};
