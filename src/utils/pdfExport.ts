
import { toast } from "sonner";
import html2pdf from 'html2pdf.js';

/**
 * Exports a DOM element as an A0-sized PDF
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
  
  // Add a hidden div to the document to contain our clone
  const tempDiv = document.createElement('div');
  tempDiv.style.position = 'absolute';
  tempDiv.style.left = '-9999px';
  tempDiv.style.top = '-9999px';
  document.body.appendChild(tempDiv);
  tempDiv.appendChild(clonedElement);
  
  // Fix the styling for PDF export - A0 dimensions: 84.1 x 118.8 cm
  // Convert to points for PDF (1 cm = 28.35 points)
  const width = 2384; // A0 width in points (~84.1 cm)
  const height = 3370; // A0 height in points (~118.8 cm)
  
  clonedElement.style.width = `${width}px`;
  clonedElement.style.height = `${height}px`;
  clonedElement.style.margin = '0';
  clonedElement.style.padding = '0';
  clonedElement.style.overflow = 'hidden';
  clonedElement.style.position = 'relative';
  
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
  });
  
  // Increase text sizes to match A0 dimensions
  const headerTexts = clonedElement.querySelectorAll('h1, h2, h3');
  headerTexts.forEach((header) => {
    const headerElement = header as HTMLElement;
    if (header.tagName === 'H1') {
      headerElement.style.fontSize = '5rem';
      headerElement.style.lineHeight = '1.2';
    } else if (header.tagName === 'H2') {
      headerElement.style.fontSize = '3.5rem';
      headerElement.style.lineHeight = '1.3';
    } else if (header.tagName === 'H3') {
      headerElement.style.fontSize = '2.5rem';
      headerElement.style.lineHeight = '1.4';
    }
  });
  
  // Increase paragraph text size
  const paragraphs = clonedElement.querySelectorAll('p');
  paragraphs.forEach((p) => {
    const pElement = p as HTMLElement;
    pElement.style.fontSize = '2rem';
    pElement.style.lineHeight = '1.5';
  });
  
  toast.info("Preparing PDF export for A0 size (84.1 x 118.8 cm)...");
  
  const opt = {
    margin: 0,
    filename: 'conference-poster-A0.pdf',
    image: { type: 'jpeg', quality: 1 },
    html2canvas: { 
      scale: 2, // Increase scale for better quality
      useCORS: true,
      letterRendering: true,
      logging: false
    },
    jsPDF: { 
      unit: 'pt', 
      format: [width, height], 
      orientation: 'portrait',
      hotfixes: ["px_scaling"]
    }
  };
  
  setTimeout(() => {
    html2pdf().from(clonedElement).set(opt).save().then(() => {
      toast.success("A0 sized PDF exported successfully!");
      // Clean up
      document.body.removeChild(tempDiv);
    }).catch(err => {
      console.error("PDF export failed:", err);
      toast.error("PDF export failed. Please try again.");
      // Clean up
      document.body.removeChild(tempDiv);
    });
  }, 2000); // Give more time for large format to load properly
};
