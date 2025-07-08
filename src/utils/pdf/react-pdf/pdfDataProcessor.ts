import { PosterData } from '@/types/project';

export const keyTakeawayColors = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'
];

/**
 * Process poster data for PDF rendering
 */
export const processPosterData = (posterData: PosterData) => {
  // Filter active sections
  const sections = [
    { title: posterData.sectionTitles?.[0] || "1. Introduction", content: posterData.introduction },
    { title: posterData.sectionTitles?.[1] || "2. Methods", content: posterData.methods },
    { title: posterData.sectionTitles?.[2] || "3. Findings", content: posterData.findings },
    { title: posterData.sectionTitles?.[3] || "4. Conclusions", content: posterData.conclusions },
  ].filter(section => section.content?.trim());

  // Filter visible key takeaways
  const visibleKeyPoints = posterData.keypoints?.filter(
    (point: string, index: number) => point?.trim() && posterData.keyVisibility?.[index] !== false
  ) || [];

  // Parse references into individual items
  const referenceItems = posterData.references?.split('\n').filter(ref => ref.trim()) || [];

  return {
    sections,
    visibleKeyPoints,
    referenceItems
  };
};