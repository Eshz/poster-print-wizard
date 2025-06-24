
import React from 'react';
import { CollapsibleSection } from '@/components/ui/collapsible-section';
import { Image } from 'lucide-react';
import { PosterData, PosterImage } from '@/types/project';
import ImagesSection from '../poster-form/ImagesSection';

interface ImagesFormSectionProps {
  posterData: PosterData;
  onUpdateField: (field: keyof PosterData, value: any) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export const ImagesFormSection: React.FC<ImagesFormSectionProps> = ({
  posterData,
  onUpdateField,
  isOpen,
  onToggle
}) => {
  const handleImagesChange = (images: PosterImage[]) => {
    console.log('ImagesFormSection - Images changing to:', images);
    onUpdateField('images', images);
  };

  return (
    <CollapsibleSection
      id="images"
      title="Images"
      icon={<Image className="h-3 w-3 text-blue-600" />}
      isOpen={isOpen}
      onToggle={onToggle}
    >
      <ImagesSection 
        images={posterData.images || []}
        onImagesChange={handleImagesChange}
      />
    </CollapsibleSection>
  );
};
