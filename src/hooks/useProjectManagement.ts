
import { useCallback } from 'react';
import { useProjectState } from '@/hooks/useProjectState';
import { ProjectCRUDService } from '@/services/ProjectCRUDService';
import { ProjectStateService } from '@/services/ProjectStateService';
import { ProjectStorageService } from '@/services/ProjectStorageService';
import { toast } from 'sonner';

export const useProjectManagement = () => {
  const {
    state,
    setProjects,
    setCurrentProject,
    addProject,
    updateProject,
    deleteProject,
    updatePosterData,
    updateDesignSettings,
    updateQrColor
  } = useProjectState();

  const loadProjects = useCallback(async () => {
    const { projects, currentProject } = await ProjectStateService.initializeProjects();
    setProjects(projects);
    if (currentProject) {
      setCurrentProject(currentProject);
    }
  }, [setProjects, setCurrentProject]);

  const createNewProject = useCallback(async (name: string) => {
    try {
      const newProject = await ProjectCRUDService.createNewProject(name);
      addProject(newProject);
      setCurrentProject(newProject);
      ProjectStateService.setCurrentProject(newProject);
      return newProject;
    } catch (error) {
      throw error;
    }
  }, [addProject, setCurrentProject]);

  const saveCurrentProject = useCallback(async () => {
    if (!state.currentProject) {
      toast.error('No project to save');
      return;
    }

    try {
      const savedProject = await ProjectStorageService.saveProject(state.currentProject);
      updateProject(savedProject);
      toast.success('Project saved successfully');
    } catch (error) {
      console.error('Failed to save project:', error);
      toast.error('Failed to save project');
    }
  }, [state.currentProject, updateProject]);

  const loadProject = useCallback(async (projectId: string) => {
    const project = await ProjectCRUDService.loadProject(projectId);
    if (project) {
      setCurrentProject(project);
      ProjectStateService.setCurrentProject(project);
    }
  }, [setCurrentProject]);

  const deleteCurrentProject = useCallback(async () => {
    if (!state.currentProject) {
      toast.error('No project to delete');
      return;
    }

    const success = await ProjectCRUDService.deleteProjectById(state.currentProject.id);
    if (success) {
      deleteProject(state.currentProject.id);
      setCurrentProject(null);
      ProjectStateService.clearCurrentProject();
    }
  }, [state.currentProject, deleteProject, setCurrentProject]);

  const renameCurrentProject = useCallback(async (newName: string) => {
    if (!state.currentProject) {
      toast.error('No project to rename');
      return;
    }

    try {
      const updatedProject = await ProjectCRUDService.renameProject(state.currentProject, newName);
      updateProject(updatedProject);
      setCurrentProject(updatedProject);
    } catch (error) {
      // Error handling is done in ProjectCRUDService
    }
  }, [state.currentProject, updateProject, setCurrentProject]);

  return {
    // State
    currentProject: state.currentProject,
    projects: state.projects,
    
    // Project Management
    loadProjects,
    createNewProject,
    saveCurrentProject,
    loadProject,
    deleteCurrentProject,
    renameCurrentProject,
    
    // Data Updates
    updatePosterData,
    updateDesignSettings,
    updateQrColor
  };
};
