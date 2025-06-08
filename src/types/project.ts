
import { PosterData, DesignSettings } from './poster';
import { DesignSettings as DesignSettingsType } from './design';

export interface ProjectData {
  id: string;
  name: string;
  createdAt: number;
  updatedAt: number;
  posterData: PosterData;
  designSettings: DesignSettingsType;
  qrColor: string;
}

export interface ProjectContextType {
  currentProject: ProjectData | null;
  projects: ProjectData[];
  loadProject: (id: string) => void;
  createNewProject: (name: string) => void;
  saveCurrentProject: () => void;
  renameCurrentProject: (newName: string) => void;
  deleteCurrentProject: () => void;
  updatePosterData: (posterData: Partial<PosterData> | ((prev: PosterData) => PosterData)) => void;
  updateDesignSettings: (designSettings: Partial<DesignSettingsType> | ((prev: DesignSettingsType) => DesignSettingsType)) => void;
  updateQrColor: (qrColor: string) => void;
  exportProject: () => void;
  importProject: (file: File) => void;
}
