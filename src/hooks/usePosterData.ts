
import { useCallback } from 'react';
import { PosterData } from '@/types/project';
import { useProjects } from '@/contexts/ProjectContext';

export const usePosterData = () => {
  const { currentProject, updatePosterData } = useProjects();

  const posterData: PosterData = currentProject?.posterData || {
    title: "Your Conference Poster Title",
    authors: "Author Name(s)",
    school: "Institution Name",
    contact: "email@example.com",
    introduction: "Introduction text...",
    methods: "Methods text...",
    findings: "Findings text...",
    conclusions: "Conclusions text...",
    references: "References...",
    keypoints: ["Key Point 1", "Key Point 2", "Key Point 3", "Key Point 4"],
    keyDescriptions: ["Description 1", "Description 2", "Description 3", "Description 4"],
    sectionTitles: [
      "1. Introduction",
      "2. Methods",
      "3. Findings",
      "4. Conclusions",
      "5. References"
    ],
    qrCodeUrl: "https://example.com/poster",
    qrCodeColor: "#000000",
    showKeypoints: true,
    showQrCode: true,
    images: []
  };

  const updateField = useCallback((field: keyof PosterData, value: any) => {
    updatePosterData(prev => ({ ...prev, [field]: value }));
  }, [updatePosterData]);

  const updateKeyPoint = useCallback((index: number, value: string) => {
    updatePosterData(prev => {
      const updatedKeypoints = [...prev.keypoints];
      updatedKeypoints[index] = value;
      return { ...prev, keypoints: updatedKeypoints };
    });
  }, [updatePosterData]);

  const updateKeyDescription = useCallback((index: number, value: string) => {
    updatePosterData(prev => {
      const updatedDescriptions = [...prev.keyDescriptions];
      updatedDescriptions[index] = value;
      return { ...prev, keyDescriptions: updatedDescriptions };
    });
  }, [updatePosterData]);

  const updateKeyVisibility = useCallback((index: number, visible: boolean) => {
    updatePosterData(prev => {
      const updatedVisibility = [...(prev.keyVisibility || [true, true, true, true])];
      updatedVisibility[index] = visible;
      return { ...prev, keyVisibility: updatedVisibility };
    });
  }, [updatePosterData]);

  const updateSectionTitle = useCallback((index: number, value: string) => {
    updatePosterData(prev => {
      const updatedSectionTitles = [...prev.sectionTitles];
      updatedSectionTitles[index] = value;
      return { ...prev, sectionTitles: updatedSectionTitles };
    });
  }, [updatePosterData]);

  return {
    posterData,
    updateField,
    updateKeyPoint,
    updateKeyDescription,
    updateKeyVisibility,
    updateSectionTitle,
    updatePosterData
  };
};
