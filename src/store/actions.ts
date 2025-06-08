
import { PosterData, DesignSettings, ProjectData } from '@/types/project';

export type ProjectAction =
  | { type: 'SET_PROJECTS'; payload: ProjectData[] }
  | { type: 'SET_CURRENT_PROJECT'; payload: ProjectData | null }
  | { type: 'ADD_PROJECT'; payload: ProjectData }
  | { type: 'UPDATE_PROJECT'; payload: ProjectData }
  | { type: 'DELETE_PROJECT'; payload: string }
  | { type: 'UPDATE_POSTER_DATA'; payload: Partial<PosterData> | ((prev: PosterData) => PosterData) }
  | { type: 'UPDATE_DESIGN_SETTINGS'; payload: Partial<DesignSettings> | ((prev: DesignSettings) => DesignSettings) }
  | { type: 'UPDATE_QR_COLOR'; payload: string };

export interface ProjectState {
  projects: ProjectData[];
  currentProject: ProjectData | null;
}
