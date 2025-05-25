
/**
 * Utility to check if poster content is likely to be fully visible
 * Based on content density and layout constraints
 */

export interface ContentVisibilityCheck {
  isContentVisible: boolean;
  warnings: string[];
}

export const checkContentVisibility = (
  posterData: any,
  designSettings: any
): ContentVisibilityCheck => {
  const warnings: string[] = [];
  
  // Calculate total text content
  const sections = [
    posterData?.introduction || "",
    posterData?.methods || "",
    posterData?.findings || "",
    posterData?.conclusions || "",
    posterData?.references || ""
  ];
  
  const totalTextLength = sections.reduce((acc, section) => acc + section.length, 0);
  const visibleImages = posterData?.images?.filter(img => img.visible)?.length || 0;
  const keypoints = posterData?.keypoints || [];
  const keyVisibility = posterData?.keyVisibility || [true, true, true, true];
  const visibleKeyPoints = keypoints.filter((_, index) => keyVisibility[index] !== false);
  
  // Check for excessive text content
  if (totalTextLength > 4000) {
    warnings.push("Text content is very long and may not fit properly in the poster layout");
  }
  
  // Check for too many images
  if (visibleImages > 4) {
    warnings.push("Too many images may crowd the layout and hide text content");
  }
  
  // Check for combination of high content density
  if (totalTextLength > 2500 && visibleImages > 2) {
    warnings.push("High text content combined with multiple images may cause layout issues");
  }
  
  // Check for too many key points
  if (visibleKeyPoints.length > 6) {
    warnings.push("Too many key takeaways may not fit in the available space");
  }
  
  // Check for very long individual sections
  const longSections = sections.filter(section => section.length > 1000);
  if (longSections.length > 2) {
    warnings.push("Multiple sections have very long content that may overflow");
  }
  
  return {
    isContentVisible: warnings.length === 0,
    warnings
  };
};
