
import React from 'react';
import { SectionInput } from '@/components/ui/section-input';
import { ContentEditor } from '@/components/ui/content-editor';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronUp, ChevronDown } from 'lucide-react';

interface ContentSectionItemProps {
  index: number;
  sectionTitle: string;
  sectionField: string;
  defaultTitle: string;
  content: string;
  onTitleChange: (value: string) => void;
  onContentChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onDragStart?: () => void;
  onDragOver?: (e: React.DragEvent) => void;
  onDrop?: (e: React.DragEvent) => void;
  onDragEnd?: () => void;
  isDragging?: boolean;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  canMoveUp?: boolean;
  canMoveDown?: boolean;
}

export const ContentSectionItem: React.FC<ContentSectionItemProps> = ({
  index,
  sectionTitle,
  sectionField,
  defaultTitle,
  content,
  onTitleChange,
  onContentChange,
  onDragStart,
  onDragOver,
  onDrop,
  onDragEnd,
  isDragging,
  onMoveUp,
  onMoveDown,
  canMoveUp,
  canMoveDown
}) => {
  return (
    <Card 
      className={`p-4 border border-gray-200 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow cursor-move ${isDragging ? 'opacity-50' : ''}`}
      draggable={true}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDrop={onDrop}
      onDragEnd={onDragEnd}
    >
      <CardContent className="p-0 space-y-4">
        {/* Header with title and reorder buttons */}
        <div className="flex items-center justify-between">
          <SectionInput
            id={`section-title-${index}`}
            label={`${sectionTitle} Title`}
            value={defaultTitle}
            onChange={(e) => onTitleChange(e.target.value)}
            placeholder={`Enter ${sectionTitle.toLowerCase()} title`}
            className="flex-1"
          />
          
          {/* Reorder buttons */}
          <div className="flex flex-col ml-4 gap-1">
            <Button
              variant="outline"
              size="icon"
              className="h-6 w-6"
              onClick={onMoveUp}
              disabled={!canMoveUp}
              title="Move up"
            >
              <ChevronUp className="h-3 w-3" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-6 w-6"
              onClick={onMoveDown}
              disabled={!canMoveDown}
              title="Move down"
            >
              <ChevronDown className="h-3 w-3" />
            </Button>
          </div>
        </div>
        
        <ContentEditor
          id={sectionField}
          label="Content"
          value={content}
          onChange={onContentChange}
          placeholder={`Enter ${sectionTitle.toLowerCase()} content`}
        />
      </CardContent>
    </Card>
  );
};
