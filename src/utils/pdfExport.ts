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
  
  // Create a clone of the element to modify for PDF export
  const clonedElement = element.cloneNode(true) as HTMLElement;
  const posterContent = clonedElement.querySelector('.bg-white.border.border-gray-200') as HTMLElement;
  
  if (!posterContent) {
    toast.error("Could not find poster content to export");
    return;
  }
  
  // Add a hidden div to the document to contain our clone
  const tempDiv = document.createElement('div');
  tempDiv.style.position = 'absolute';
  tempDiv.style.left = '-9999px';
  tempDiv.style.top = '-9999px';
  document.body.appendChild(tempDiv);
  tempDiv.appendChild(posterContent);
  
  // Compress images before processing
  compressImages(posterContent);
  
  // A0 dimensions in mm: 841 x 1189 mm
  // Convert to points for PDF (1 mm ≈ 2.83 points)
  const width = 2384; // 841 mm in points
  const height = 3370; // 1189 mm in points
  
  // Set exact dimensions
  posterContent.style.width = `${width}px`;
  posterContent.style.height = `${height}px`;
  posterContent.style.margin = '0';
  posterContent.style.padding = '0';
  posterContent.style.overflow = 'hidden';
  posterContent.style.position = 'relative';
  posterContent.style.backgroundColor = '#ffffff';
  
  // Fix the number circles in the key takeaways
  const numberCircles = posterContent.querySelectorAll('[data-circle-number]');
  numberCircles.forEach((circle) => {
    const circleElement = circle as HTMLElement;
    circleElement.style.width = '4rem';
    circleElement.style.height = '4rem';
    circleElement.style.minWidth = '4rem';
    circleElement.style.display = 'flex';
    circleElement.style.justifyContent = 'center';
    circleElement.style.alignItems = 'center';
    circleElement.style.fontSize = '2rem';
  });
  
  // Increase text sizes to match A0 dimensions
  const headerTexts = posterContent.querySelectorAll('h1, h2, h3');
  headerTexts.forEach((header) => {
    const headerElement = header as HTMLElement;
    if (header.tagName === 'H1') {
      headerElement.style.fontSize = '6rem';
      headerElement.style.lineHeight = '1.2';
    } else if (header.tagName === 'H2') {
      headerElement.style.fontSize = '4rem';
      headerElement.style.lineHeight = '1.3';
    } else if (header.tagName === 'H3') {
      headerElement.style.fontSize = '2.8rem';
      headerElement.style.lineHeight = '1.4';
    }
  });
  
  // Increase paragraph text size
  const paragraphs = posterContent.querySelectorAll('p');
  paragraphs.forEach((p) => {
    const pElement = p as HTMLElement;
    pElement.style.fontSize = '2.4rem';
    pElement.style.lineHeight = '1.5';
  });

  // Style header title section specifically
  const headerDiv = posterContent.querySelector('.w-full.p-4.text-center') as HTMLElement;
  if (headerDiv) {
    // Fix header padding
    headerDiv.style.padding = '5rem';
    
    // Adjust the title container if QR code is visible
    const titleContainer = headerDiv.querySelector('div[class*="pr-24"]') as HTMLElement;
    if (titleContainer) {
      titleContainer.style.paddingRight = '15rem'; // More space in the exported PDF
    }
    
    // Style the QR code in the header if present
    const headerQrCode = headerDiv.querySelector('.absolute.right-4') as HTMLElement;
    if (headerQrCode) {
      headerQrCode.style.right = '10rem';
      
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
        qrCodeImg.style.width = '10rem';
        qrCodeImg.style.height = '10rem';
      }
      
      // Style the QR code text
      const qrCodeText = headerQrCode.querySelector('p') as HTMLElement;
      if (qrCodeText) {
        qrCodeText.style.fontSize = '1.8rem';
        qrCodeText.style.marginTop = '1rem';
      }
    }
  }
  
  // Style the author info with borders
  const authorInfoContainer = posterContent.querySelector('.w-full.text-center.py-2.mt-2') as HTMLElement;
  if (authorInfoContainer) {
    authorInfoContainer.style.padding = '1.5rem 0';
    authorInfoContainer.style.borderTopWidth = '3px';
    authorInfoContainer.style.borderBottomWidth = '3px';
    authorInfoContainer.style.marginTop = '2rem';
    
    const authorInfo = authorInfoContainer.querySelector('.flex.flex-col.md\\:flex-row') as HTMLElement;
    if (authorInfo) {
      authorInfo.style.fontSize = '2.4rem';
      authorInfo.style.padding = '0 4rem';
      authorInfo.style.gap = '3rem';
      
      // Make sure all divs inside author info are properly styled
      const authorDivs = authorInfo.querySelectorAll('div');
      authorDivs.forEach((div) => {
        const divElement = div as HTMLElement;
        divElement.style.fontSize = '2.4rem';
        divElement.style.lineHeight = '1.4';
        divElement.style.margin = '0.5rem 0';
      });
    }
  }

  // Fix padding for all content sections
  const contentSections = posterContent.querySelectorAll('[class*="PosterSection"], [class*="KeyTakeaway"]');
  contentSections.forEach((section) => {
    const sectionElement = section as HTMLElement;
    sectionElement.style.padding = '2rem';
    sectionElement.style.margin = '0.75rem';
    sectionElement.style.borderRadius = '0.75rem';
  });
  
  // Fix main content area padding - specific target for flex-grow overflow-hidden p-2
  const mainContentArea = posterContent.querySelector('.flex-grow.overflow-hidden.p-2');
  if (mainContentArea) {
    const mainContentElement = mainContentArea as HTMLElement;
    mainContentElement.style.padding = '1rem';
    // Make sure it doesn't take too much space
    mainContentElement.style.maxHeight = '80%';
  }
  
  // Adjust spacing in grid layouts
  const gridLayouts = posterContent.querySelectorAll('.grid.grid-cols-2, .grid.grid-cols-3');
  gridLayouts.forEach((grid) => {
    const gridElement = grid as HTMLElement;
    gridElement.style.gap = '1rem';
    gridElement.style.padding = '0.75rem';
  });
  
  // Specifically target p-4 flex-grow classes with improved selector
  const flexGrowSections = posterContent.querySelectorAll('.p-4.flex-grow, [class*="p-4"][class*="flex-grow"]');
  flexGrowSections.forEach((section) => {
    const sectionElement = section as HTMLElement;
    // Increase padding for these specific sections
    sectionElement.style.padding = '3rem';
    sectionElement.style.margin = '0.5rem';
    sectionElement.style.marginBottom = '1rem';
  });
  
  // Reduce space-y classes
  const spaceYElements = posterContent.querySelectorAll('[class*="space-y"]');
  spaceYElements.forEach((element) => {
    const spaceElement = element as HTMLElement;
    spaceElement.style.gap = '0.75rem';
  });
  
  // Specifically target and adjust the container with p-4 h-full flex flex-col class
  const mainContainers = posterContent.querySelectorAll('.p-4.h-full.flex.flex-col');
  mainContainers.forEach((container) => {
    const containerElement = container as HTMLElement;
    containerElement.style.padding = '2rem'; // Reduced padding from 3rem
    containerElement.style.gap = '0.5rem';  // Reduced gap from 0.75rem
  });
  
  // Adjust standard flex column containers (different from the main containers)
  const flexColContainers = posterContent.querySelectorAll('.p-4.flex.flex-col:not(.p-4.h-full.flex.flex-col)');
  flexColContainers.forEach((container) => {
    const containerElement = container as HTMLElement;
    containerElement.style.padding = '2.5rem'; 
    containerElement.style.gap = '0.75rem';
  });
  
  // Adjust any space-y components
  const spaceYComponents = posterContent.querySelectorAll('[class*="space-y-"]');
  spaceYComponents.forEach((component) => {
    const componentElement = component as HTMLElement;
    componentElement.style.gap = '0.75rem';
  });
  
  toast.info("Preparing compressed PDF export for A0 size (841 x 1189 mm)...");
  
  // Optimized settings for compression
  const opt = {
    margin: 0,
    filename: 'conference-poster-A0-compressed.pdf',
    image: { 
      type: 'jpeg', 
      quality: 0.85 // Reduced from 1 to 0.85 for better compression
    },
    html2canvas: { 
      scale: 2, // Reduced from 4 to 2 for smaller file size
      useCORS: true,
      letterRendering: true,
      logging: false,
      width: width,
      height: height,
      allowTaint: true,
      imageTimeout: 0,
      removeContainer: true
    },
    jsPDF: { 
      unit: 'pt', 
      format: [width, height], 
      orientation: 'portrait',
      hotfixes: ["px_scaling"],
      compress: true // Enable PDF compression
    }
  };
  
  setTimeout(() => {
    html2pdf().from(posterContent).set(opt).outputPdf('blob').then((pdfBlob: Blob) => {
      // Additional compression using canvas-based technique
      const reader = new FileReader();
      reader.onload = function() {
        // Create download link for the compressed PDF
        const url = URL.createObjectURL(pdfBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'conference-poster-A0-compressed.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        
        const sizeInMB = (pdfBlob.size / (1024 * 1024)).toFixed(2);
        toast.success(`Compressed A0 PDF exported successfully! File size: ${sizeInMB}MB`);
        
        // Clean up
        document.body.removeChild(tempDiv);
      };
      reader.readAsArrayBuffer(pdfBlob);
    }).catch(err => {
      console.error("PDF export failed:", err);
      toast.error("PDF export failed. Please try again.");
      // Clean up
      document.body.removeChild(tempDiv);
    });
  }, 3000); // Give more time for large format to load properly
};
