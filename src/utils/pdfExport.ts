
import { toast } from "sonner";
import html2pdf from 'html2pdf.js';

/**
 * Compresses images in the DOM element for better PDF optimization
 */
const compressImages = (element: HTMLElement) => {
  const images = element.querySelectorAll('img');
  images.forEach((img) => {
    const imgElement = img as HTMLImageElement;
    
    // Create a canvas to compress the image
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (ctx && imgElement.complete) {
      // Set canvas dimensions
      canvas.width = imgElement.naturalWidth;
      canvas.height = imgElement.naturalHeight;
      
      // Draw and compress the image
      ctx.drawImage(imgElement, 0, 0);
      
      // Convert to compressed data URL (JPEG with 0.7 quality)
      const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.7);
      imgElement.src = compressedDataUrl;
    }
  });
};

/**
 * Exports a DOM element as a compressed A0-sized PDF
 * @param elementId The ID of the DOM element to export
 */
export const exportToPDF = (elementId: string) => {
  const element = document.getElementById(elementId);
  
  if (!element) {
    toast.error("Could not find element to export");
    return;
  }
  
  // Find the actual poster content, ignoring any zoom transformations
  const posterContent = element.querySelector('.bg-white.border.border-gray-200') as HTMLElement;
  
  if (!posterContent) {
    toast.error("Could not find poster content to export");
    return;
  }
  
  // Create a completely new poster for PDF export by cloning the original
  const clonedElement = posterContent.cloneNode(true) as HTMLElement;
  
  // Add a hidden div to the document to contain our clone
  const tempDiv = document.createElement('div');
  tempDiv.style.position = 'absolute';
  tempDiv.style.left = '-9999px';
  tempDiv.style.top = '-9999px';
  tempDiv.style.zIndex = '-1000';
  document.body.appendChild(tempDiv);
  tempDiv.appendChild(clonedElement);
  
  // Reset any transformations that might be applied from zoom
  clonedElement.style.transform = 'none';
  clonedElement.style.transformOrigin = 'initial';
  
  // Compress images before processing
  compressImages(clonedElement);
  
  // A0 dimensions in mm: 841 x 1189 mm
  // Convert to points for PDF (1 mm ≈ 2.83 points)
  const width = 2384; // 841 mm in points
  const height = 3370; // 1189 mm in points
  
  // Set exact dimensions for PDF
  clonedElement.style.width = `${width}px`;
  clonedElement.style.height = `${height}px`;
  clonedElement.style.margin = '0';
  clonedElement.style.padding = '0';
  clonedElement.style.overflow = 'hidden';
  clonedElement.style.position = 'relative';
  clonedElement.style.backgroundColor = '#ffffff';
  clonedElement.style.boxSizing = 'border-box';
  
  // Reset flex properties for consistent layout
  clonedElement.style.display = 'flex';
  clonedElement.style.flexDirection = 'column';
  
  // Fix the number circles in the key takeaways
  const numberCircles = clonedElement.querySelectorAll('[data-circle-number]');
  numberCircles.forEach((circle) => {
    const circleElement = circle as HTMLElement;
    circleElement.style.width = '4rem';
    circleElement.style.height = '4rem';
    circleElement.style.minWidth = '4rem';
    circleElement.style.display = 'flex';
    circleElement.style.justifyContent = 'center';
    circleElement.style.alignItems = 'center';
    circleElement.style.fontSize = '2rem';
    circleElement.style.fontWeight = 'bold';
  });
  
  // Increase text sizes to match A0 dimensions
  const headerTexts = clonedElement.querySelectorAll('h1, h2, h3');
  headerTexts.forEach((header) => {
    const headerElement = header as HTMLElement;
    if (header.tagName === 'H1') {
      headerElement.style.fontSize = '6rem';
      headerElement.style.lineHeight = '1.2';
      headerElement.style.fontWeight = 'bold';
    } else if (header.tagName === 'H2') {
      headerElement.style.fontSize = '3.5rem';
      headerElement.style.lineHeight = '1.3';
      headerElement.style.fontWeight = '600';
    } else if (header.tagName === 'H3') {
      headerElement.style.fontSize = '2.5rem';
      headerElement.style.lineHeight = '1.4';
      headerElement.style.fontWeight = '600';
    }
  });
  
  // Increase paragraph text size
  const paragraphs = clonedElement.querySelectorAll('p');
  paragraphs.forEach((p) => {
    const pElement = p as HTMLElement;
    pElement.style.fontSize = '2rem';
    pElement.style.lineHeight = '1.6';
  });

  // Style header title section specifically
  const headerDiv = clonedElement.querySelector('.w-full.p-4.text-center') as HTMLElement;
  if (headerDiv) {
    // Fix header padding
    headerDiv.style.padding = '4rem';
    headerDiv.style.position = 'relative';
    
    // Adjust the title container if QR code is visible
    const titleContainer = headerDiv.querySelector('div[class*="pr-24"]') as HTMLElement;
    if (titleContainer) {
      titleContainer.style.paddingRight = '15rem';
    }
    
    // Style the QR code in the header if present
    const headerQrCode = headerDiv.querySelector('.absolute.right-4') as HTMLElement;
    if (headerQrCode) {
      headerQrCode.style.right = '8rem';
      headerQrCode.style.top = '50%';
      headerQrCode.style.transform = 'translateY(-50%)';
      
      // Style the QR code container with white background
      const qrCodeContainer = headerQrCode.querySelector('.bg-white') as HTMLElement;
      if (qrCodeContainer) {
        qrCodeContainer.style.backgroundColor = '#FFFFFF';
        qrCodeContainer.style.padding = '1.5rem';
        qrCodeContainer.style.borderRadius = '0.75rem';
        qrCodeContainer.style.boxShadow = '0 0.2rem 0.5rem rgba(0, 0, 0, 0.15)';
      }
      
      // Style the QR code image
      const qrCodeImg = headerQrCode.querySelector('img') as HTMLElement;
      if (qrCodeImg) {
        qrCodeImg.style.width = '8rem';
        qrCodeImg.style.height = '8rem';
      }
      
      // Style the QR code text
      const qrCodeText = headerQrCode.querySelector('p') as HTMLElement;
      if (qrCodeText) {
        qrCodeText.style.fontSize = '1.5rem';
        qrCodeText.style.marginTop = '1rem';
      }
    }
  }
  
  // Style the author info with borders
  const authorInfoContainer = clonedElement.querySelector('.w-full.text-center.py-2.mt-2') as HTMLElement;
  if (authorInfoContainer) {
    authorInfoContainer.style.padding = '2rem 0';
    authorInfoContainer.style.borderTopWidth = '3px';
    authorInfoContainer.style.borderBottomWidth = '3px';
    authorInfoContainer.style.marginTop = '2rem';
    authorInfoContainer.style.marginBottom = '2rem';
    
    const authorInfo = authorInfoContainer.querySelector('.flex.flex-col.md\\:flex-row') as HTMLElement;
    if (authorInfo) {
      authorInfo.style.fontSize = '2rem';
      authorInfo.style.padding = '0 4rem';
      authorInfo.style.gap = '2rem';
      authorInfo.style.justifyContent = 'center';
      authorInfo.style.alignItems = 'center';
      
      // Make sure all divs inside author info are properly styled
      const authorDivs = authorInfo.querySelectorAll('div');
      authorDivs.forEach((div) => {
        const divElement = div as HTMLElement;
        divElement.style.fontSize = '2rem';
        divElement.style.lineHeight = '1.4';
        divElement.style.margin = '0.5rem 0';
      });
    }
  }

  // Fix main content area - target the flex-grow container
  const mainContentArea = clonedElement.querySelector('.flex-grow.overflow-hidden, .flex-grow');
  if (mainContentArea) {
    const mainContentElement = mainContentArea as HTMLElement;
    mainContentElement.style.padding = '2rem';
    mainContentElement.style.flex = '1 1 auto';
    mainContentElement.style.overflow = 'visible';
  }
  
  // Fix content sections with better targeting
  const contentSections = clonedElement.querySelectorAll('.p-4, .p-3, .p-2');
  contentSections.forEach((section) => {
    const sectionElement = section as HTMLElement;
    // Only adjust sections that are likely content sections (not main containers)
    if (!sectionElement.classList.contains('h-full')) {
      sectionElement.style.padding = '2rem';
      sectionElement.style.margin = '1rem';
      sectionElement.style.borderRadius = '0.5rem';
    }
  });
  
  // Adjust grid layouts for better spacing
  const gridLayouts = clonedElement.querySelectorAll('.grid');
  gridLayouts.forEach((grid) => {
    const gridElement = grid as HTMLElement;
    gridElement.style.gap = '2rem';
    gridElement.style.padding = '1rem';
  });
  
  // Fix space-y classes by converting to flex gap
  const spaceYElements = clonedElement.querySelectorAll('[class*="space-y"]');
  spaceYElements.forEach((element) => {
    const spaceElement = element as HTMLElement;
    spaceElement.style.display = 'flex';
    spaceElement.style.flexDirection = 'column';
    spaceElement.style.gap = '1.5rem';
  });
  
  // Ensure proper font sizes for different content types
  const smallTexts = clonedElement.querySelectorAll('.text-xs, .text-sm');
  smallTexts.forEach((text) => {
    const textElement = text as HTMLElement;
    textElement.style.fontSize = '1.8rem';
    textElement.style.lineHeight = '1.5';
  });
  
  const mediumTexts = clonedElement.querySelectorAll('.text-base, .text-lg');
  mediumTexts.forEach((text) => {
    const textElement = text as HTMLElement;
    textElement.style.fontSize = '2.2rem';
    textElement.style.lineHeight = '1.5';
  });
  
  toast.info("Preparing PDF export for A0 size (841 x 1189 mm)...");
  
  // Optimized settings for high-quality export
  const opt = {
    margin: 0,
    filename: 'conference-poster-A0.pdf',
    image: { 
      type: 'jpeg', 
      quality: 0.9
    },
    html2canvas: { 
      scale: 2.5,
      useCORS: true,
      letterRendering: true,
      logging: false,
      width: width,
      height: height,
      allowTaint: true,
      imageTimeout: 0,
      removeContainer: true,
      backgroundColor: '#ffffff'
    },
    jsPDF: { 
      unit: 'pt', 
      format: [width, height], 
      orientation: 'portrait',
      hotfixes: ["px_scaling"],
      compress: true
    }
  };
  
  setTimeout(() => {
    html2pdf().from(clonedElement).set(opt).outputPdf('blob').then((pdfBlob: Blob) => {
      // Create download link
      const url = URL.createObjectURL(pdfBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'conference-poster-A0.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      const sizeInMB = (pdfBlob.size / (1024 * 1024)).toFixed(2);
      toast.success(`A0 PDF exported successfully! File size: ${sizeInMB}MB`);
      
      // Clean up
      document.body.removeChild(tempDiv);
    }).catch(err => {
      console.error("PDF export failed:", err);
      toast.error("PDF export failed. Please try again.");
      // Clean up
      document.body.removeChild(tempDiv);
    });
  }, 2000);
};
