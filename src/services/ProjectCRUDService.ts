
import { ProjectData } from '@/types/project';
import { ProjectStorageService } from '@/services/ProjectStorageService';
import { ProjectService } from '@/services/ProjectService';
import { toast } from 'sonner';

export class ProjectCRUDService {
  static async createNewProject(name: string): Promise<ProjectData> {
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
        showReferences: true,
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

    try {
      const savedProject = await ProjectStorageService.saveProject(newProject);
      toast.success(`Project "${name}" created successfully`);
      return savedProject;
    } catch (error) {
      console.error('Failed to create project:', error);
      toast.error('Failed to create project');
      throw error;
    }
  }

  static async loadProject(projectId: string): Promise<ProjectData | null> {
    try {
      const projects = await ProjectStorageService.loadProjects();
      const project = projects.find(p => p.id === projectId);
      
      if (project) {
        toast.success(`Loaded project: ${project.name}`);
        return project;
      } else {
        toast.error('Project not found');
        return null;
      }
    } catch (error) {
      console.error('Failed to load project:', error);
      toast.error('Failed to load project');
      return null;
    }
  }

  static async renameProject(project: ProjectData, newName: string): Promise<ProjectData> {
    try {
      const updatedProject = {
        ...project,
        name: newName,
        updatedAt: Date.now()
      };
      
      const savedProject = await ProjectStorageService.saveProject(updatedProject);
      toast.success(`Project renamed to "${newName}"`);
      return savedProject;
    } catch (error) {
      console.error('Failed to rename project:', error);
      toast.error('Failed to rename project');
      throw error;
    }
  }

  static async deleteProjectById(projectId: string): Promise<boolean> {
    try {
      const success = await ProjectStorageService.deleteProject(projectId);
      if (success) {
        toast.success('Project deleted successfully');
        return true;
      } else {
        toast.error('Failed to delete project');
        return false;
      }
    } catch (error) {
      console.error('Failed to delete project:', error);
      toast.error('Failed to delete project');
      return false;
    }
  }
}
