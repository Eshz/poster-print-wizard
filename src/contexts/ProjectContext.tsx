import React, { createContext, useState, useContext, useCallback } from 'react';
import { PosterData, DesignSettings } from '@/types/project';

interface Project {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  posterData: PosterData;
  designSettings: DesignSettings;
  qrColor: string;
}

interface ProjectContextType {
  projects: Project[];
  currentProject: Project | null;
  createProject: (name: string, template?: Partial<Project>) => void;
  setCurrentProject: (project: Project | null) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  updatePosterData: (id: string, posterData: PosterData) => void;
  updateDesignSettings: (id: string, designSettings: DesignSettings) => void;
  updateQrColor: (id: string, qrColor: string) => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const useProjects = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error("useProjects must be used within a ProjectProvider");
  }
  return context;
};

export const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>(() => {
    const storedProjects = localStorage.getItem('postermaker-projects');
    return storedProjects ? JSON.parse(storedProjects) : [];
  });
  const [currentProject, setCurrentProject] = useState<Project | null>(() => {
    const currentProjectId = localStorage.getItem('postermaker-current-project');
    if (currentProjectId) {
      const storedProjects = localStorage.getItem('postermaker-projects');
      if (storedProjects) {
        const parsedProjects: Project[] = JSON.parse(storedProjects);
        return parsedProjects.find(project => project.id === currentProjectId) || null;
      }
    }
    return null;
  });

  const createProject = useCallback((name: string, template?: Partial<Project>) => {
    const newProject: Project = {
      id: Date.now().toString(),
      name,
      createdAt: new Date(),
      updatedAt: new Date(),
      posterData: template?.posterData || {
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
      },
      designSettings: template?.designSettings || {
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
      qrColor: template?.qrColor || "#000000"
    };

    setProjects(prev => [newProject, ...prev]);
    setCurrentProject(newProject);
    
    // Save to localStorage
    const updatedProjects = [newProject, ...projects];
    localStorage.setItem('postermaker-projects', JSON.stringify(updatedProjects));
    localStorage.setItem('postermaker-current-project', newProject.id);
    
    // Removed toast notification
  }, [projects]);

  const updateProject = useCallback((id: string, updates: Partial<Project>) => {
    setProjects(prevProjects => {
      const updatedProjects = prevProjects.map(project =>
        project.id === id ? { ...project, ...updates, updatedAt: new Date() } : project
      );
      localStorage.setItem('postermaker-projects', JSON.stringify(updatedProjects));
      return updatedProjects;
    });

    if (currentProject?.id === id) {
      setCurrentProject(prev => prev ? { ...prev, ...updates, updatedAt: new Date() } : null);
    }
  }, [currentProject]);

  const deleteProject = useCallback((id: string) => {
    setProjects(prevProjects => {
      const updatedProjects = prevProjects.filter(project => project.id !== id);
      localStorage.setItem('postermaker-projects', JSON.stringify(updatedProjects));
      return updatedProjects;
    });

    if (currentProject?.id === id) {
      setCurrentProject(null);
      localStorage.removeItem('postermaker-current-project');
    }
  }, [currentProject]);

  const updatePosterData = useCallback((id: string, posterData: PosterData) => {
    updateProject(id, { posterData });
  }, [updateProject]);

  const updateDesignSettings = useCallback((id: string, designSettings: DesignSettings) => {
    updateProject(id, { designSettings });
  }, [updateProject]);

  const updateQrColor = useCallback((id: string, qrColor: string) => {
    updateProject(id, { qrColor });
  }, [updateProject]);

  const value: ProjectContextType = {
    projects,
    currentProject,
    createProject,
    setCurrentProject,
    updateProject,
    deleteProject,
    updatePosterData,
    updateDesignSettings,
    updateQrColor,
  };

  return (
    <ProjectContext.Provider value={value}>
      {children}
    </ProjectContext.Provider>
  );
};
