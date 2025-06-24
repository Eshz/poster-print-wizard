
import React, { createContext, useContext, useEffect } from 'react';
import { generateProjectId, getProject, getProjects, saveProject } from '@/utils/projectManager';
import { toast } from "sonner";
import { useProjectState } from '@/hooks/useProjectState';
import { ProjectContextType, ProjectData, PosterData, DesignSettings } from '@/types/project';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';

const ProjectContext = createContext<ProjectContextType>({} as ProjectContextType);

export const useProjects = () => useContext(ProjectContext);

interface ProjectProviderProps {
  children: React.ReactNode;
}

export const ProjectProvider: React.FC<ProjectProviderProps> = ({ children }) => {
  const {
    state,
    setProjects,
    setCurrentProject,
    addProject,
    updateProject,
    deleteProject,
    updatePosterData,
    updateDesignSettings,
    updateQrColor,
  } = useProjectState();

  // Load projects on initial render
  useEffect(() => {
    const savedProjects = getProjects();
    setProjects(savedProjects);
    
    // If there are projects, load the most recently updated one
    if (savedProjects.length > 0) {
      const mostRecent = savedProjects.sort((a, b) => b.updatedAt - a.updatedAt)[0];
      setCurrentProject(mostRecent);
    } else {
      // If no projects exist, create a default one
      createNewProject("Untitled Project");
    }
  }, [setProjects, setCurrentProject]);

  const loadProject = (id: string) => {
    const project = getProject(id);
    if (project) {
      setCurrentProject(project);
      toast.success(`Loaded project: ${project.name}`);
    } else {
      toast.error("Project not found");
    }
  };

  const createNewProject = (name: string) => {
    const defaultPosterData: PosterData = {
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
    
    const defaultDesignSettings: DesignSettings = {
      layout: 'classic',
      orientation: 'portrait',
      titleFont: 'playfair',
      contentFont: 'roboto',
      headerBgColor: '#4052b6',
      headerTextColor: '#FFFFFF',
      sectionBgColor: '#e6ebff',
      sectionTitleColor: '#4052b6',
      sectionTextColor: '#000000',
      keyPointsBgColor: '#f5f7ff',
      keyPointsTextColor: '#4052b6',
    };

    const newProject: ProjectData = {
      id: generateProjectId(),
      name,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      posterData: defaultPosterData,
      designSettings: defaultDesignSettings,
      qrColor: "#000000"
    };

    const saved = addProject(newProject);
    toast.success(`Created new project: ${name}`);
  };

  const saveCurrentProject = () => {
    if (state.currentProject) {
      const updated = updateProject(state.currentProject);
      toast.success(`Saved project: ${updated.name}`);
    }
  };

  const renameCurrentProject = (newName: string) => {
    if (state.currentProject) {
      const updated = {
        ...state.currentProject,
        name: newName,
        updatedAt: Date.now(),
      };
      updateProject(updated);
      toast.success(`Renamed project to: ${newName}`);
    }
  };

  const deleteCurrentProject = () => {
    if (state.currentProject) {
      const projectId = state.currentProject.id;
      const projectName = state.currentProject.name;
      
      // Filter out the current project
      const updatedProjects = state.projects.filter(p => p.id !== projectId);
      
      // Update localStorage
      localStorage.setItem("poster_projects", JSON.stringify(updatedProjects));
      
      // Set new current project (most recent) or create a new one if none left
      if (updatedProjects.length > 0) {
        const mostRecent = updatedProjects.sort((a, b) => b.updatedAt - a.updatedAt)[0];
        setCurrentProject(mostRecent);
      } else {
        createNewProject("Untitled Project");
      }
      
      deleteProject(projectId);
      toast.success(`Deleted project: ${projectName}`);
    }
  };

  const exportProject = () => {
    if (!state.currentProject) {
      toast.error("No project to export");
      return;
    }

    const exportData = {
      version: "1.0",
      project: state.currentProject,
      exportedAt: Date.now()
    };

    const dataStr = JSON.stringify(exportData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `${state.currentProject.name.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_poster_project.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    toast.success(`Exported project: ${state.currentProject.name}`);
  };

  const importProject = (file: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const importData = JSON.parse(event.target?.result as string);
        
        if (!importData.project) {
          toast.error("Invalid project file format");
          return;
        }

        const importedProject = importData.project;
        
        // Generate new ID and update timestamps
        const newProject: ProjectData = {
          ...importedProject,
          id: generateProjectId(),
          updatedAt: Date.now(),
          name: `${importedProject.name} (Imported)`
        };

        const saved = addProject(newProject);
        toast.success(`Imported project: ${newProject.name}`);
      } catch (error) {
        console.error("Import error:", error);
        toast.error("Failed to import project. Invalid file format.");
      }
    };
    reader.readAsText(file);
  };

  return (
    <ErrorBoundary>
      <ProjectContext.Provider
        value={{
          currentProject: state.currentProject,
          projects: state.projects,
          loadProject,
          createNewProject,
          saveCurrentProject,
          renameCurrentProject,
          deleteCurrentProject,
          updatePosterData,
          updateDesignSettings,
          updateQrColor,
          exportProject,
          importProject
        }}
      >
        {children}
      </ProjectContext.Provider>
    </ErrorBoundary>
  );
};
