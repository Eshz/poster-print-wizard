
/**
 * Creates a temporary container for the cloned element with proper isolation
 */
export const createTempContainer = (clonedElement: HTMLElement) => {
  const tempDiv = document.createElement('div');
  tempDiv.style.position = 'fixed';
  tempDiv.style.left = '-9999px';
  tempDiv.style.top = '-9999px';
  tempDiv.style.zIndex = '-1000';
  tempDiv.style.width = '800px';
  tempDiv.style.height = '1131px';
  tempDiv.style.overflow = 'hidden';
  tempDiv.style.backgroundColor = '#ffffff';
  tempDiv.style.margin = '0';
  tempDiv.style.padding = '0';
  tempDiv.style.visibility = 'hidden'; // Make completely invisible
  document.body.appendChild(tempDiv);
  tempDiv.appendChild(clonedElement);
  return tempDiv;
};

/**
 * Cleans up the temporary container
 */
export const cleanupTempContainer = (tempDiv: HTMLElement) => {
  if (tempDiv && tempDiv.parentNode) {
    document.body.removeChild(tempDiv);
  }
};

/**
 * Gets the original poster element from the preview (without zoom scaling)
 */
export const getOriginalPosterElement = () => {
  // Get the poster content element that hasn't been scaled by zoom
  const posterPreview = document.getElementById('poster-preview');
  if (posterPreview) {
    const posterContent = posterPreview.querySelector('#poster-content');
    return posterContent as HTMLElement;
  }
  return document.getElementById('poster-content');
};

/**
 * Extracts design settings from the poster preview component
 */
export const extractDesignSettings = () => {
  const posterPreview = document.getElementById('poster-preview');
  let designSettings = null;
  if (posterPreview) {
    // Try to extract design settings from data attributes or global state
    const posterLayoutRenderer = posterPreview.querySelector('[data-design-settings]');
    if (posterLayoutRenderer) {
      try {
        designSettings = JSON.parse(posterLayoutRenderer.getAttribute('data-design-settings') || '{}');
      } catch (e) {
        console.warn('Could not parse design settings from data attribute');
      }
    }
  }
  return designSettings;
};
