
import { PosterData, DesignSettings, ProjectData } from '@/types/project';
import { projectDataSchema } from '@/utils/validation/schemas';
import { toast } from 'sonner';

export class ProjectService {
  private static readonly STORAGE_KEY = 'poster_projects';
  private static readonly CURRENT_PROJECT_KEY = 'poster_current_project';

  static async loadProjects(): Promise<ProjectData[]> {
    try {
      const projectsString = localStorage.getItem(this.STORAGE_KEY);
      if (!projectsString) return [];
      
      const projects = JSON.parse(projectsString);
      return projects.filter((project: unknown) => {
        try {
          projectDataSchema.parse(project);
          return true;
        } catch {
          console.warn('Invalid project data found:', project);
          return false;
        }
      });
    } catch (error) {
      console.error('Failed to load projects:', error);
      toast.error('Failed to load projects');
      return [];
    }
  }

  static async saveProject(project: ProjectData): Promise<ProjectData> {
    try {
      const validatedProject = projectDataSchema.parse(project);
      const projects = await this.loadProjects();
      const now = Date.now();
      
      // Ensure all required properties are present
      const updatedProject: ProjectData = {
        id: validatedProject.id || this.generateId(),
        name: validatedProject.name,
        createdAt: validatedProject.createdAt,
        posterData: validatedProject.posterData,
        designSettings: validatedProject.designSettings,
        qrColor: validatedProject.qrColor,
        updatedAt: now
      };
      
      const existingIndex = projects.findIndex(p => p.id === updatedProject.id);
      
      if (existingIndex >= 0) {
        projects[existingIndex] = updatedProject;
      } else {
        projects.unshift(updatedProject);
      }
      
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(projects));
      return updatedProject;
    } catch (error) {
      console.error('Failed to save project:', error);
      toast.error('Failed to save project');
      throw error;
    }
  }

  static async deleteProject(id: string): Promise<boolean> {
    try {
      const projects = await this.loadProjects();
      const filteredProjects = projects.filter(p => p.id !== id);
      
      if (filteredProjects.length === projects.length) {
        return false;
      }
      
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filteredProjects));
      
      // Clear current project if it was deleted
      const currentProjectId = localStorage.getItem(this.CURRENT_PROJECT_KEY);
      if (currentProjectId === id) {
        localStorage.removeItem(this.CURRENT_PROJECT_KEY);
      }
      
      return true;
    } catch (error) {
      console.error('Failed to delete project:', error);
      toast.error('Failed to delete project');
      return false;
    }
  }

  static getCurrentProjectId(): string | null {
    return localStorage.getItem(this.CURRENT_PROJECT_KEY);
  }

  static setCurrentProjectId(id: string): void {
    localStorage.setItem(this.CURRENT_PROJECT_KEY, id);
  }

  static clearCurrentProject(): void {
    localStorage.removeItem(this.CURRENT_PROJECT_KEY);
  }

  static generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substring(2, 9);
  }
}
