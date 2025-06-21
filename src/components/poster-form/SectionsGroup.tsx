
import React from 'react';
import { CollapsibleSection } from '@/components/ui/collapsible-section';
import ContentSection from './ContentSection';
import { useDragAndDrop } from '@/hooks/useDragAndDrop';

interface SectionsGroupProps {
  posterData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSectionTitleChange: (index: number, value: string) => void;
  handleSectionsReorder: (newSectionTitles: string[]) => void;
  openSections: {[key: string]: boolean};
  toggleSection: (sectionId: string) => void;
}

const SectionsGroup: React.FC<SectionsGroupProps> = ({
  posterData,
  handleChange,
  handleSectionTitleChange,
  handleSectionsReorder,
  openSections,
  toggleSection
}) => {
  const sections = [
    { field: 'introduction', title: 'Introduction', index: 0 },
    { field: 'methods', title: 'Methods', index: 1 },
    { field: 'findings', title: 'Findings', index: 2 },
    { field: 'conclusions', title: 'Conclusions', index: 3 },
    { field: 'references', title: 'References', index: 4 }
  ];

  const [sectionOrder, setSectionOrder] = React.useState(sections);

  const {
    draggedItem,
    handleDragStart,
    handleDragOver,
    handleDrop,
    handleDragEnd
  } = useDragAndDrop(sectionOrder, (newOrder) => {
    setSectionOrder(newOrder);
    const newSectionTitles = newOrder.map((_, index) => 
      posterData.sectionTitles?.[newOrder[index].index] || `${index + 1}. ${newOrder[index].title}`
    );
    handleSectionsReorder(newSectionTitles);
  });

  const handleMoveUp = (currentIndex: number) => {
    if (currentIndex === 0) return;
    
    const newOrder = [...sectionOrder];
    [newOrder[currentIndex - 1], newOrder[currentIndex]] = [newOrder[currentIndex], newOrder[currentIndex - 1]];
    setSectionOrder(newOrder);
    
    const newSectionTitles = newOrder.map((section, index) => 
      posterData.sectionTitles?.[section.index] || `${index + 1}. ${section.title}`
    );
    handleSectionsReorder(newSectionTitles);
  };

  const handleMoveDown = (currentIndex: number) => {
    if (currentIndex === sectionOrder.length - 1) return;
    
    const newOrder = [...sectionOrder];
    [newOrder[currentIndex], newOrder[currentIndex + 1]] = [newOrder[currentIndex + 1], newOrder[currentIndex]];
    setSectionOrder(newOrder);
    
    const newSectionTitles = newOrder.map((section, index) => 
      posterData.sectionTitles?.[section.index] || `${index + 1}. ${section.title}`
    );
    handleSectionsReorder(newSectionTitles);
  };

  return (
    <CollapsibleSection
      id="sections"
      title="Content Sections"
      isOpen={openSections['sections']}
      onToggle={() => toggleSection('sections')}
    >
      <div className="space-y-4">
        {sectionOrder.map((section, displayIndex) => (
          <ContentSection
            key={section.field}
            posterData={posterData}
            handleChange={handleChange}
            handleSectionTitleChange={handleSectionTitleChange}
            sectionIndex={section.index}
            sectionField={section.field}
            sectionTitle={section.title}
            onDragStart={() => handleDragStart(displayIndex)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, displayIndex)}
            onDragEnd={handleDragEnd}
            isDragging={draggedItem?.index === displayIndex}
            onMoveUp={() => handleMoveUp(displayIndex)}
            onMoveDown={() => handleMoveDown(displayIndex)}
            canMoveUp={displayIndex > 0}
            canMoveDown={displayIndex < sectionOrder.length - 1}
          />
        ))}
      </div>
    </CollapsibleSection>
  );
};

export default SectionsGroup;
