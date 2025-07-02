
import React from 'react';
import { ChevronDown, ChevronUp, BookOpen } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

interface ReferencesSectionProps {
  posterData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  openSections: {[key: string]: boolean};
  toggleSection: (sectionId: string) => void;
}

const ReferencesSection: React.FC<ReferencesSectionProps> = ({
  posterData,
  handleChange,
  openSections,
  toggleSection
}) => {
  const isOpen = openSections['references'];

  const handleToggleReferences = (checked: boolean) => {
    handleChange({ target: { name: 'showReferences', value: checked } } as any);
  };

  const handleReferencesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    let value = e.target.value;
    
    // Auto-format with bullets: replace * at start of lines with •
    value = value.replace(/^\* /gm, '• ');
    
    // Remove excessive spacing while maintaining structure
    const lines = value.split('\n');
    const formattedLines = lines.map(line => {
      // For bullet points, ensure consistent spacing
      if (line.startsWith('• ')) {
        return line.replace(/^• +/, '• ');
      }
      // For asterisk lines, convert to bullets with proper spacing
      if (line.startsWith('*')) {
        return line.replace(/^\*\s*/, '• ');
      }
      return line;
    });
    value = formattedLines.join('\n');
    
    handleChange({ target: { name: 'references', value } } as any);
  };

  return (
    <div className="border-b border-gray-200 py-4">
      <div 
        className="flex items-center justify-between cursor-pointer hover:bg-gray-50 p-2 rounded-md transition-colors"
        onClick={() => toggleSection('references')}
      >
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 bg-blue-50 rounded-md flex items-center justify-center">
            <BookOpen className="h-3 w-3 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">References</h3>
        </div>
        <div className="flex items-center gap-2">
          <Switch
            checked={posterData.showReferences !== false}
            onCheckedChange={handleToggleReferences}
            onClick={(e) => e.stopPropagation()}
          />
          {isOpen ? (
            <ChevronUp className="h-4 w-4 text-gray-500" />
          ) : (
            <ChevronDown className="h-4 w-4 text-gray-500" />
          )}
        </div>
      </div>
      
      {isOpen && posterData.showReferences !== false && (
        <div className="mt-4 pl-9 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="references" className="text-xs font-medium text-gray-700">
              Content
            </Label>
            <Textarea
              id="references"
              name="references"
              value={posterData?.references || ""}
              onChange={handleReferencesChange}
              rows={6}
              className="border-gray-200 focus:border-blue-400 rounded-md text-sm leading-relaxed"
              placeholder="Enter references in bullet format:&#10;* Reference 1&#10;* Reference 2&#10;* Reference 3"
              style={{ 
                lineHeight: '1.6', 
                fontFamily: 'monospace',
                paddingLeft: '0.75rem'
              }}
            />
            <p className="text-xs text-gray-500">
              Use asterisk (*) at the start of each line to create bullet points with consistent left alignment
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReferencesSection;
