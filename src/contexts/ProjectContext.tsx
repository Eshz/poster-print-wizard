
import React, { createContext, useState, useContext, useCallback } from 'react';
import { PosterData, DesignSettings, ProjectData } from '@/types/project';

interface ProjectContextType {
  projects: ProjectData[];
  currentProject: ProjectData | null;
  loadProject: (id: string) => void;
  createNewProject: (name: string) => void;
  saveCurrentProject: () => void;
  renameCurrentProject: (newName: string) => void;
  deleteCurrentProject: () => void;
  updatePosterData: (posterData: Partial<PosterData> | ((prev: PosterData) => PosterData)) => void;
  updateDesignSettings: (designSettings: Partial<DesignSettings> | ((prev: DesignSettings) => DesignSettings)) => void;
  updateQrColor: (qrColor: string) => void;
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
  const [projects, setProjects] = useState<ProjectData[]>(() => {
    const storedProjects = localStorage.getItem('postermaker-projects');
    return storedProjects ? JSON.parse(storedProjects) : [];
  });
  const [currentProject, setCurrentProject] = useState<ProjectData | null>(() => {
    const currentProjectId = localStorage.getItem('postermaker-current-project');
    if (currentProjectId) {
      const storedProjects = localStorage.getItem('postermaker-projects');
      if (storedProjects) {
        const parsedProjects: ProjectData[] = JSON.parse(storedProjects);
        return parsedProjects.find(project => project.id === currentProjectId) || null;
      }
    }
    return null;
  });

  const loadProject = useCallback((id: string) => {
    const project = projects.find(p => p.id === id);
    if (project) {
      setCurrentProject(project);
      localStorage.setItem('postermaker-current-project', project.id);
    }
  }, [projects]);

  const createNewProject = useCallback((name: string) => {
    const newProject: ProjectData = {
      id: Date.now().toString(),
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

    setProjects(prev => [newProject, ...prev]);
    setCurrentProject(newProject);
    
    // Save to localStorage
    const updatedProjects = [newProject, ...projects];
    localStorage.setItem('postermaker-projects', JSON.stringify(updatedProjects));
    localStorage.setItem('postermaker-current-project', newProject.id);
  }, [projects]);

  const saveCurrentProject = useCallback(() => {
    if (currentProject) {
      const updatedProject = { ...currentProject, updatedAt: Date.now() };
      setProjects(prev => prev.map(p => p.id === updatedProject.id ? updatedProject : p));
      setCurrentProject(updatedProject);
      localStorage.setItem('postermaker-projects', JSON.stringify(projects.map(p => p.id === updatedProject.id ? updatedProject : p)));
    }
  }, [currentProject, projects]);

  const renameCurrentProject = useCallback((newName: string) => {
    if (currentProject) {
      const updatedProject = { ...currentProject, name: newName, updatedAt: Date.now() };
      setProjects(prev => prev.map(p => p.id === updatedProject.id ? updatedProject : p));
      setCurrentProject(updatedProject);
      localStorage.setItem('postermaker-projects', JSON.stringify(projects.map(p => p.id === updatedProject.id ? updatedProject : p)));
    }
  }, [currentProject, projects]);

  const deleteCurrentProject = useCallback(() => {
    if (currentProject) {
      setProjects(prev => prev.filter(p => p.id !== currentProject.id));
      setCurrentProject(null);
      localStorage.setItem('postermaker-projects', JSON.stringify(projects.filter(p => p.id !== currentProject.id)));
      localStorage.removeItem('postermaker-current-project');
    }
  }, [currentProject, projects]);

  const updatePosterData = useCallback((posterData: Partial<PosterData> | ((prev: PosterData) => PosterData)) => {
    if (currentProject) {
      const newPosterData = typeof posterData === 'function'
        ? posterData(currentProject.posterData)
        : { ...currentProject.posterData, ...posterData };

      const updatedProject = {
        ...currentProject,
        posterData: newPosterData,
        updatedAt: Date.now(),
      };

      setCurrentProject(updatedProject);
      setProjects(prev => prev.map(p => p.id === updatedProject.id ? updatedProject : p));
      localStorage.setItem('postermaker-projects', JSON.stringify(projects.map(p => p.id === updatedProject.id ? updatedProject : p)));
    }
  }, [currentProject, projects]);

  const updateDesignSettings = useCallback((designSettings: Partial<DesignSettings> | ((prev: DesignSettings) => DesignSettings)) => {
    if (currentProject) {
      const newDesignSettings = typeof designSettings === 'function'
        ? designSettings(currentProject.designSettings)
        : { ...currentProject.designSettings, ...designSettings };

      const updatedProject = {
        ...currentProject,
        designSettings: newDesignSettings,
        updatedAt: Date.now(),
      };

      setCurrentProject(updatedProject);
      setProjects(prev => prev.map(p => p.id === updatedProject.id ? updatedProject : p));
      localStorage.setItem('postermaker-projects', JSON.stringify(projects.map(p => p.id === updatedProject.id ? updatedProject : p)));
    }
  }, [currentProject, projects]);

  const updateQrColor = useCallback((qrColor: string) => {
    if (currentProject) {
      const updatedProject = {
        ...currentProject,
        qrColor,
        updatedAt: Date.now(),
      };

      setCurrentProject(updatedProject);
      setProjects(prev => prev.map(p => p.id === updatedProject.id ? updatedProject : p));
      localStorage.setItem('postermaker-projects', JSON.stringify(projects.map(p => p.id === updatedProject.id ? updatedProject : p)));
    }
  }, [currentProject, projects]);

  const value: ProjectContextType = {
    projects,
    currentProject,
    loadProject,
    createNewProject,
    saveCurrentProject,
    renameCurrentProject,
    deleteCurrentProject,
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
