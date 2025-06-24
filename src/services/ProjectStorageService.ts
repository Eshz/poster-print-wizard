
import { ProjectData } from '@/types/project';
import { ProjectService } from '@/services/ProjectService';
import { toast } from 'sonner';

export class ProjectStorageService {
  static async loadProjects(): Promise<ProjectData[]> {
    try {
      const projects = await ProjectService.loadProjects();
      return projects;
    } catch (error) {
      console.error('Failed to load projects:', error);
      toast.error('Failed to load projects');
      return [];
    }
  }

  static async saveProject(project: ProjectData): Promise<ProjectData> {
    try {
      const savedProject = await ProjectService.saveProject(project);
      return savedProject;
    } catch (error) {
      console.error('Failed to save project:', error);
      toast.error('Failed to save project');
      throw error;
    }
  }

  static async deleteProject(projectId: string): Promise<boolean> {
    try {
      const success = await ProjectService.deleteProject(projectId);
      return success;
    } catch (error) {
      console.error('Failed to delete project:', error);
      toast.error('Failed to delete project');
      return false;
    }
  }

  static getCurrentProjectId(): string | null {
    return ProjectService.getCurrentProjectId();
  }

  static setCurrentProjectId(id: string): void {
    ProjectService.setCurrentProjectId(id);
  }

  static clearCurrentProject(): void {
    ProjectService.clearCurrentProject();
  }
}
