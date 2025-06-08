
import { useReducer, useCallback } from 'react';
import { projectReducer, initialState } from '@/store/projectReducer';
import { PosterData, DesignSettings, ProjectData } from '@/types/project';
import { saveProject } from '@/utils/projectManager';

export const useProjectState = () => {
  const [state, dispatch] = useReducer(projectReducer, initialState);

  const setProjects = useCallback((projects: ProjectData[]) => {
    dispatch({ type: 'SET_PROJECTS', payload: projects });
  }, []);

  const setCurrentProject = useCallback((project: ProjectData | null) => {
    dispatch({ type: 'SET_CURRENT_PROJECT', payload: project });
  }, []);

  const addProject = useCallback((project: ProjectData) => {
    const saved = saveProject(project);
    dispatch({ type: 'ADD_PROJECT', payload: saved });
    return saved;
  }, []);

  const updateProject = useCallback((project: ProjectData) => {
    const saved = saveProject(project);
    dispatch({ type: 'UPDATE_PROJECT', payload: saved });
    return saved;
  }, []);

  const deleteProject = useCallback((projectId: string) => {
    dispatch({ type: 'DELETE_PROJECT', payload: projectId });
  }, []);

  const updatePosterData = useCallback((posterData: Partial<PosterData> | ((prev: PosterData) => PosterData)) => {
    dispatch({ type: 'UPDATE_POSTER_DATA', payload: posterData });
  }, []);

  const updateDesignSettings = useCallback((designSettings: Partial<DesignSettings> | ((prev: DesignSettings) => DesignSettings)) => {
    dispatch({ type: 'UPDATE_DESIGN_SETTINGS', payload: designSettings });
  }, []);

  const updateQrColor = useCallback((qrColor: string) => {
    dispatch({ type: 'UPDATE_QR_COLOR', payload: qrColor });
  }, []);

  return {
    state,
    setProjects,
    setCurrentProject,
    addProject,
    updateProject,
    deleteProject,
    updatePosterData,
    updateDesignSettings,
    updateQrColor,
  };
};
