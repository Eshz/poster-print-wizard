
import React, { createContext, useContext, useState, useEffect } from 'react';
import { generateProjectId, getProject, getProjects, ProjectData, saveProject } from '@/utils/projectManager';
import { toast } from "sonner";

interface ProjectContextType {
  currentProject: ProjectData | null;
  projects: ProjectData[];
  loadProject: (id: string) => void;
  createNewProject: (name: string) => void;
  saveCurrentProject: () => void;
  renameCurrentProject: (newName: string) => void;
  deleteCurrentProject: () => void;
  updatePosterData: (posterData: any) => void;
  updateDesignSettings: (designSettings: any) => void;
  updateQrColor: (qrColor: string) => void;
}

const ProjectContext = createContext<ProjectContextType>({} as ProjectContextType);

export const useProjects = () => useContext(ProjectContext);

interface ProjectProviderProps {
  children: React.ReactNode;
}

export const ProjectProvider: React.FC<ProjectProviderProps> = ({ children }) => {
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [currentProject, setCurrentProject] = useState<ProjectData | null>(null);

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
  }, []);

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
    const defaultPosterData = {
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
    
    const defaultDesignSettings = {
      layout: 'classic',
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

    const saved = saveProject(newProject);
    setCurrentProject(saved);
    setProjects(prev => [...prev, saved]);
    toast.success(`Created new project: ${name}`);
  };

  const saveCurrentProject = () => {
    if (currentProject) {
      const updated = saveProject({
        ...currentProject,
        updatedAt: Date.now()
      });
      setCurrentProject(updated);
      setProjects(prev => {
        const existingIndex = prev.findIndex(p => p.id === updated.id);
        if (existingIndex >= 0) {
          const newProjects = [...prev];
          newProjects[existingIndex] = updated;
          return newProjects;
        }
        return [...prev, updated];
      });
      toast.success(`Saved project: ${updated.name}`);
    }
  };

  const renameCurrentProject = (newName: string) => {
    if (currentProject) {
      const updated = {
        ...currentProject,
        name: newName
      };
      const savedProject = saveProject(updated);
      setCurrentProject(savedProject);
      setProjects(prev => {
        return prev.map(p => p.id === currentProject.id ? savedProject : p);
      });
      toast.success(`Renamed project to: ${newName}`);
    }
  };

  const deleteCurrentProject = () => {
    if (currentProject) {
      const projectId = currentProject.id;
      const projectName = currentProject.name;
      
      // Filter out the current project
      const updatedProjects = projects.filter(p => p.id !== projectId);
      
      // Update localStorage
      localStorage.setItem("poster_projects", JSON.stringify(updatedProjects));
      
      // Set new current project (most recent) or create a new one if none left
      if (updatedProjects.length > 0) {
        const mostRecent = updatedProjects.sort((a, b) => b.updatedAt - a.updatedAt)[0];
        setCurrentProject(mostRecent);
      } else {
        createNewProject("Untitled Project");
      }
      
      setProjects(updatedProjects);
      toast.success(`Deleted project: ${projectName}`);
    }
  };

  const updatePosterData = (posterData: any) => {
    if (currentProject) {
      setCurrentProject(prev => {
        if (!prev) return null;
        return { ...prev, posterData, updatedAt: Date.now() };
      });
    }
  };

  const updateDesignSettings = (designSettings: any) => {
    if (currentProject) {
      setCurrentProject(prev => {
        if (!prev) return null;
        return { ...prev, designSettings, updatedAt: Date.now() };
      });
    }
  };

  const updateQrColor = (qrColor: string) => {
    if (currentProject) {
      setCurrentProject(prev => {
        if (!prev) return null;
        return { ...prev, qrColor, updatedAt: Date.now() };
      });
    }
  };

  return (
    <ProjectContext.Provider
      value={{
        currentProject,
        projects,
        loadProject,
        createNewProject,
        saveCurrentProject,
        renameCurrentProject,
        deleteCurrentProject,
        updatePosterData,
        updateDesignSettings,
        updateQrColor
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};
