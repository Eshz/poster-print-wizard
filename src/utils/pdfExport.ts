
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

  // Style author information specifically
  const headerDiv = posterContent.querySelector('.w-full.p-4.text-center') as HTMLElement;
  if (headerDiv) {
    // Fix header padding
    headerDiv.style.padding = '5rem';
    // Add margin below the title
    const titleElement = headerDiv.querySelector('h1') as HTMLElement;
    if (titleElement) {
      titleElement.style.marginBottom = '3rem';
    }
    
    const authorInfo = headerDiv.querySelector('.flex.flex-col.md\\:flex-row') as HTMLElement;
    if (authorInfo) {
      authorInfo.style.fontSize = '2.4rem';
      authorInfo.style.lineHeight = '1.4';
      authorInfo.style.gap = '2rem';
      
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
    sectionElement.style.padding = '3rem';
    sectionElement.style.margin = '1rem';
    sectionElement.style.borderRadius = '1rem';
  });
  
  // Fix main content area padding
  const mainContentArea = posterContent.querySelector('.flex-grow.overflow-hidden.p-2');
  if (mainContentArea) {
    const mainContentElement = mainContentArea as HTMLElement;
    mainContentElement.style.padding = '2rem';
  }
  
  // Adjust spacing in grid layouts
  const gridLayouts = posterContent.querySelectorAll('.grid.grid-cols-2, .grid.grid-cols-3');
  gridLayouts.forEach((grid) => {
    const gridElement = grid as HTMLElement;
    gridElement.style.gap = '1.5rem';
    gridElement.style.padding = '1rem';
  });
  
  // Specifically target all elements with p-4 flex-grow classes
  const flexGrowSections = posterContent.querySelectorAll('.p-4.flex-grow, [class*="p-4"][class*="flex-grow"]');
  flexGrowSections.forEach((section) => {
    const sectionElement = section as HTMLElement;
    sectionElement.style.padding = '3rem';
    sectionElement.style.margin = '1rem';
    // Reduce space between sections
    sectionElement.style.marginBottom = '1.5rem';
  });
  
  // Reduce space-y classes
  const spaceYElements = posterContent.querySelectorAll('[class*="space-y"]');
  spaceYElements.forEach((element) => {
    const spaceElement = element as HTMLElement;
    spaceElement.style.gap = '1rem';
  });
  
  toast.info("Preparing PDF export for A0 size (841 x 1189 mm)...");
  
  const opt = {
    margin: 0,
    filename: 'conference-poster-A0.pdf',
    image: { type: 'jpeg', quality: 1 },
    html2canvas: { 
      scale: 4, // Increase scale for better quality on large format
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
    html2pdf().from(posterContent).set(opt).save().then(() => {
      toast.success("A0 sized PDF exported successfully!");
      // Clean up
      document.body.removeChild(tempDiv);
    }).catch(err => {
      console.error("PDF export failed:", err);
      toast.error("PDF export failed. Please try again.");
      // Clean up
      document.body.removeChild(tempDiv);
    });
  }, 3000); // Give more time for large format to load properly
};
