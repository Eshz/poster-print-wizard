
import { ProjectData } from '@/types/project';
import { ProjectStorageService } from '@/services/ProjectStorageService';

export class ProjectStateService {
  static async initializeProjects(): Promise<{
    projects: ProjectData[];
    currentProject: ProjectData | null;
  }> {
    const projects = await ProjectStorageService.loadProjects();
    
    // Load current project if exists
    const currentProjectId = ProjectStorageService.getCurrentProjectId();
    let currentProject: ProjectData | null = null;
    
    if (currentProjectId) {
      currentProject = projects.find(p => p.id === currentProjectId) || null;
    }
    
    return { projects, currentProject };
  }

  static setCurrentProject(project: ProjectData): void {
    ProjectStorageService.setCurrentProjectId(project.id);
  }

  static clearCurrentProject(): void {
    ProjectStorageService.clearCurrentProject();
  }
}
