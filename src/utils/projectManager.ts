
// Project management utilities
import { toast } from "sonner";

export interface ProjectData {
  id: string;
  name: string;
  createdAt: number;
  updatedAt: number;
  posterData: any;
  designSettings: any;
  qrColor: string;
}

const STORAGE_KEY = "poster_projects";

// Get all saved projects
export const getProjects = (): ProjectData[] => {
  try {
    const projectsString = localStorage.getItem(STORAGE_KEY);
    if (!projectsString) return [];
    return JSON.parse(projectsString);
  } catch (error) {
    console.error("Failed to load projects:", error);
    return [];
  }
};

// Get a specific project by ID
export const getProject = (id: string): ProjectData | null => {
  const projects = getProjects();
  return projects.find(project => project.id === id) || null;
};

// Save a new project or update an existing one
export const saveProject = (project: ProjectData): ProjectData => {
  const projects = getProjects();
  const now = Date.now();
  
  // Check if project with this ID already exists
  const existingIndex = projects.findIndex(p => p.id === project.id);
  
  const updatedProject = {
    ...project,
    updatedAt: now
  };
  
  if (existingIndex >= 0) {
    // Update existing project
    projects[existingIndex] = updatedProject;
  } else {
    // Add new project
    projects.push(updatedProject);
  }
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  return updatedProject;
};

// Delete a project
export const deleteProject = (id: string): boolean => {
  const projects = getProjects();
  const filteredProjects = projects.filter(project => project.id !== id);
  
  if (filteredProjects.length === projects.length) {
    return false; // Project not found
  }
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredProjects));
  return true;
};

// Generate a unique ID for new projects
export const generateProjectId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 9);
};
