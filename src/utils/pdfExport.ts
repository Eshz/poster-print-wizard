
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
  
  // Calculate the scale factor needed to go from preview size to A0
  const previewWidth = 800; // Current preview width in pixels
  const previewHeight = 1131; // Current preview height in pixels
  const scaleX = width / previewWidth;
  const scaleY = height / previewHeight;
  const uniformScale = Math.min(scaleX, scaleY);
  
  // Set exact dimensions for PDF maintaining aspect ratio
  clonedElement.style.width = `${previewWidth * uniformScale}px`;
  clonedElement.style.height = `${previewHeight * uniformScale}px`;
  clonedElement.style.margin = '0';
  clonedElement.style.padding = '0';
  clonedElement.style.overflow = 'visible';
  clonedElement.style.position = 'relative';
  clonedElement.style.backgroundColor = '#ffffff';
  clonedElement.style.boxSizing = 'border-box';
  
  // Apply uniform scaling to all text elements to maintain proportions
  const scaleFactor = uniformScale;
  
  // Scale all font sizes proportionally
  const allTextElements = clonedElement.querySelectorAll('*');
  allTextElements.forEach((el) => {
    const element = el as HTMLElement;
    const computedStyle = window.getComputedStyle(element);
    const fontSize = parseFloat(computedStyle.fontSize);
    
    if (fontSize > 0) {
      element.style.fontSize = `${fontSize * scaleFactor}px`;
    }
    
    // Scale padding and margins proportionally
    const padding = parseFloat(computedStyle.padding);
    if (padding > 0) {
      element.style.padding = `${padding * scaleFactor}px`;
    }
    
    const margin = parseFloat(computedStyle.margin);
    if (margin > 0) {
      element.style.margin = `${margin * scaleFactor}px`;
    }
    
    // Scale specific spacing properties
    ['paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft',
     'marginTop', 'marginRight', 'marginBottom', 'marginLeft'].forEach(prop => {
      const value = parseFloat(computedStyle[prop as any]);
      if (value > 0) {
        (element.style as any)[prop] = `${value * scaleFactor}px`;
      }
    });
    
    // Scale border radius
    const borderRadius = parseFloat(computedStyle.borderRadius);
    if (borderRadius > 0) {
      element.style.borderRadius = `${borderRadius * scaleFactor}px`;
    }
    
    // Scale gaps for grid and flex layouts
    const gap = parseFloat(computedStyle.gap);
    if (gap > 0) {
      element.style.gap = `${gap * scaleFactor}px`;
    }
  });
  
  // Scale QR codes and images proportionally
  const images = clonedElement.querySelectorAll('img');
  images.forEach((img) => {
    const imgElement = img as HTMLElement;
    const currentWidth = parseFloat(window.getComputedStyle(imgElement).width);
    const currentHeight = parseFloat(window.getComputedStyle(imgElement).height);
    
    if (currentWidth > 0) {
      imgElement.style.width = `${currentWidth * scaleFactor}px`;
    }
    if (currentHeight > 0) {
      imgElement.style.height = `${currentHeight * scaleFactor}px`;
    }
  });
  
  // Scale number circles in key takeaways
  const numberCircles = clonedElement.querySelectorAll('[data-circle-number]');
  numberCircles.forEach((circle) => {
    const circleElement = circle as HTMLElement;
    const currentWidth = parseFloat(window.getComputedStyle(circleElement).width) || 32;
    const currentHeight = parseFloat(window.getComputedStyle(circleElement).height) || 32;
    
    circleElement.style.width = `${currentWidth * scaleFactor}px`;
    circleElement.style.height = `${currentHeight * scaleFactor}px`;
    circleElement.style.minWidth = `${currentWidth * scaleFactor}px`;
    circleElement.style.display = 'flex';
    circleElement.style.justifyContent = 'center';
    circleElement.style.alignItems = 'center';
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
      scale: 1, // Use scale 1 since we're manually scaling the content
      useCORS: true,
      letterRendering: true,
      logging: false,
      width: previewWidth * uniformScale,
      height: previewHeight * uniformScale,
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
  }, 1000);
};
