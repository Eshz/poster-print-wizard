
import { useCallback } from 'react';
import { useProjectState } from '@/hooks/useProjectState';
import { ProjectService } from '@/services/ProjectService';
import { ProjectData, PosterData, DesignSettings } from '@/types/project';
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
    try {
      const projects = await ProjectService.loadProjects();
      setProjects(projects);
      
      // Load current project if exists
      const currentProjectId = ProjectService.getCurrentProjectId();
      if (currentProjectId) {
        const currentProject = projects.find(p => p.id === currentProjectId);
        if (currentProject) {
          setCurrentProject(currentProject);
        }
      }
    } catch (error) {
      console.error('Failed to load projects:', error);
      toast.error('Failed to load projects');
    }
  }, [setProjects, setCurrentProject]);

  const createNewProject = useCallback(async (name: string) => {
    try {
      const newProject: ProjectData = {
        id: ProjectService.generateId(),
        name,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        posterData: {
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
          keyVisibility: [true, true, true, true],
          sectionTitles: [
            "1. Introduction",
            "2. Methods", 
            "3. Findings",
            "4. Conclusions",
            "5. References"
          ],
          qrCodeUrl: "https://example.com/poster",
          qrCodeColor: "#000000",
          qrCodeCaption: "",
          showKeypoints: true,
          showQrCode: true,
          images: []
        },
        designSettings: {
          layout: 'academic-modern-landscape',
          titleFont: 'merriweather',
          contentFont: 'roboto',
          headerBgColor: '#FFFFFF',
          headerTextColor: '#1E3A8A',
          sectionBgColor: '#3B82F6',
          sectionTitleColor: '#FFFFFF',
          sectionTextColor: '#FFFFFF',
          keyPointsBgColor: '#EFF6FF',
          keyPointsTextColor: '#1E3A8A',
        },
        qrColor: "#000000"
      };

      const savedProject = await ProjectService.saveProject(newProject);
      addProject(savedProject);
      setCurrentProject(savedProject);
      ProjectService.setCurrentProjectId(savedProject.id);
      
      toast.success(`Project "${name}" created successfully`);
      return savedProject;
    } catch (error) {
      console.error('Failed to create project:', error);
      toast.error('Failed to create project');
      throw error;
    }
  }, [addProject, setCurrentProject]);

  const saveCurrentProject = useCallback(async () => {
    if (!state.currentProject) {
      toast.error('No project to save');
      return;
    }

    try {
      const savedProject = await ProjectService.saveProject(state.currentProject);
      updateProject(savedProject);
      toast.success('Project saved successfully');
    } catch (error) {
      console.error('Failed to save project:', error);
      toast.error('Failed to save project');
    }
  }, [state.currentProject, updateProject]);

  const loadProject = useCallback(async (projectId: string) => {
    try {
      const projects = await ProjectService.loadProjects();
      const project = projects.find(p => p.id === projectId);
      
      if (project) {
        setCurrentProject(project);
        ProjectService.setCurrentProjectId(projectId);
        toast.success(`Loaded project: ${project.name}`);
      } else {
        toast.error('Project not found');
      }
    } catch (error) {
      console.error('Failed to load project:', error);
      toast.error('Failed to load project');
    }
  }, [setCurrentProject]);

  const deleteCurrentProject = useCallback(async () => {
    if (!state.currentProject) {
      toast.error('No project to delete');
      return;
    }

    try {
      const success = await ProjectService.deleteProject(state.currentProject.id);
      if (success) {
        deleteProject(state.currentProject.id);
        setCurrentProject(null);
        ProjectService.clearCurrentProject();
        toast.success('Project deleted successfully');
      } else {
        toast.error('Failed to delete project');
      }
    } catch (error) {
      console.error('Failed to delete project:', error);
      toast.error('Failed to delete project');
    }
  }, [state.currentProject, deleteProject, setCurrentProject]);

  const renameCurrentProject = useCallback(async (newName: string) => {
    if (!state.currentProject) {
      toast.error('No project to rename');
      return;
    }

    try {
      const updatedProject = {
        ...state.currentProject,
        name: newName,
        updatedAt: Date.now()
      };
      
      const savedProject = await ProjectService.saveProject(updatedProject);
      updateProject(savedProject);
      setCurrentProject(savedProject);
      toast.success(`Project renamed to "${newName}"`);
    } catch (error) {
      console.error('Failed to rename project:', error);
      toast.error('Failed to rename project');
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
