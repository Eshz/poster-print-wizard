
import React, { useState } from 'react';
import { useProjectManagement } from '@/hooks/useProjectManagement';
import ProjectDropdown from '@/components/project/ProjectDropdown';
import ProjectActions from '@/components/project/ProjectActions';

const ProjectSwitcher: React.FC = React.memo(() => {
  const { 
    currentProject, 
    projects, 
    loadProject, 
    createNewProject, 
    saveCurrentProject,
    renameCurrentProject,
    deleteCurrentProject 
  } = useProjectManagement();
  
  const [newProjectName, setNewProjectName] = useState('');
  const [renameValue, setRenameValue] = useState('');
  const [renameDialogOpen, setRenameDialogOpen] = useState(false);
  const [newProjectDialogOpen, setNewProjectDialogOpen] = useState(false);

  const handleProjectLoad = (projectId: string) => {
    loadProject(projectId);
  };

  const handleProjectCreate = async (name: string) => {
    try {
      await createNewProject(name);
      return true;
    } catch (error) {
      return false;
    }
  };

  const handleProjectRename = async (newName: string) => {
    try {
      await renameCurrentProject(newName);
      return true;
    } catch (error) {
      return false;
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <ProjectDropdown
        currentProject={currentProject}
        projects={projects}
        onProjectLoad={handleProjectLoad}
        onProjectCreate={handleProjectCreate}
        newProjectName={newProjectName}
        setNewProjectName={setNewProjectName}
        newProjectDialogOpen={newProjectDialogOpen}
        setNewProjectDialogOpen={setNewProjectDialogOpen}
      />

      <ProjectActions
        currentProjectName={currentProject?.name}
        onSave={saveCurrentProject}
        onRename={handleProjectRename}
        onDelete={deleteCurrentProject}
        renameValue={renameValue}
        setRenameValue={setRenameValue}
        renameDialogOpen={renameDialogOpen}
        setRenameDialogOpen={setRenameDialogOpen}
      />
    </div>
  );
});

ProjectSwitcher.displayName = 'ProjectSwitcher';

export default ProjectSwitcher;
