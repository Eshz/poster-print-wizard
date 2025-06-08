
import { toast } from "sonner";
import { ProjectData } from '@/types/project';
import { projectDataSchema } from '@/utils/validation/schemas';

const STORAGE_KEY = "poster_projects";

// Get all saved projects with validation
export const getProjects = (): ProjectData[] => {
  try {
    const projectsString = localStorage.getItem(STORAGE_KEY);
    if (!projectsString) return [];
    
    const projects = JSON.parse(projectsString);
    
    // Validate each project
    const validatedProjects = projects.filter((project: unknown) => {
      try {
        projectDataSchema.parse(project);
        return true;
      } catch (error) {
        console.warn("Invalid project data found:", error);
        return false;
      }
    });
    
    return validatedProjects;
  } catch (error) {
    console.error("Failed to load projects:", error);
    toast.error("Failed to load projects from storage");
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
  try {
    // Validate project data
    const validatedProject = projectDataSchema.parse(project);
    
    const projects = getProjects();
    const now = Date.now();
    
    // Check if project with this ID already exists
    const existingIndex = projects.findIndex(p => p.id === validatedProject.id);
    
    const updatedProject: ProjectData = {
      ...validatedProject,
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
  } catch (error) {
    console.error("Failed to save project:", error);
    toast.error("Failed to save project");
    throw error;
  }
};

// Delete a project
export const deleteProject = (id: string): boolean => {
  try {
    const projects = getProjects();
    const filteredProjects = projects.filter(project => project.id !== id);
    
    if (filteredProjects.length === projects.length) {
      return false; // Project not found
    }
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredProjects));
    return true;
  } catch (error) {
    console.error("Failed to delete project:", error);
    toast.error("Failed to delete project");
    return false;
  }
};

// Generate a unique ID for new projects
export const generateProjectId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 9);
};
