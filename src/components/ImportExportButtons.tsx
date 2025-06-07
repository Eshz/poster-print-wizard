
import React, { useRef } from 'react';
import { Button } from "@/components/ui/button";
import { useProjects } from '@/contexts/ProjectContext';

const ImportExportButtons = () => {
  const { exportProject, importProject } = useProjects();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      importProject(file);
      // Reset the input so the same file can be selected again
      event.target.value = '';
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <Button 
        variant="outline" 
        onClick={handleImportClick}
        className="text-sm"
      >
        Import
      </Button>
      <Button 
        variant="outline" 
        onClick={exportProject}
        className="text-sm"
      >
        Export
      </Button>
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};

export default ImportExportButtons;
