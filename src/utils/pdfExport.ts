
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
  tempDiv.appendChild(clonedElement);
  document.body.appendChild(tempDiv);
  
  // Fix the styling for PDF export - A0 dimensions: 84.1 x 118.8 cm
  // Convert to points for PDF (1 cm = 28.35 points)
  const width = Math.round(84.1 * 28.35);  // ~2384 points
  const height = Math.round(118.8 * 28.35); // ~3370 points
  
  clonedElement.style.width = `${width}px`;
  clonedElement.style.height = `${height}px`;
  
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
      headerElement.style.fontSize = '3.5rem';
    } else if (header.tagName === 'H2') {
      headerElement.style.fontSize = '2.5rem';
    } else if (header.tagName === 'H3') {
      headerElement.style.fontSize = '2rem';
    }
  });
  
  // Increase paragraph text size
  const paragraphs = clonedElement.querySelectorAll('p');
  paragraphs.forEach((p) => {
    const pElement = p as HTMLElement;
    pElement.style.fontSize = '1.5rem';
  });
  
  toast.info("Preparing PDF export for A0 size (84.1 x 118.8 cm)...");
  
  const opt = {
    margin: 0,
    filename: 'conference-poster-A0.pdf',
    image: { type: 'jpeg', quality: 1 },
    html2canvas: { 
      scale: 1, 
      useCORS: true,
      letterRendering: true,
      logging: false,
      width: width,
      height: height
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
  }, 1500); // Give more time for large format to load properly
};
