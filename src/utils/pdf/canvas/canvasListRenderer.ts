
/**
 * List rendering utilities for canvas export
 */

export interface ListRenderingContext {
  isListItem: boolean;
  bulletWidth: number;
  indentLevel: number;
  listType: 'disc' | 'circle' | 'square' | 'decimal';
}

/**
 * Detects if an element is a list item and returns rendering context
 */
export const getListContext = (element: HTMLElement): ListRenderingContext => {
  const isListItem = element.tagName === 'LI';
  const parentList = element.closest('ul, ol');
  
  if (!isListItem || !parentList) {
    return {
      isListItem: false,
      bulletWidth: 0,
      indentLevel: 0,
      listType: 'disc'
    };
  }
  
  // Calculate indent level by counting nested lists
  let indentLevel = 0;
  let currentElement = element.parentElement;
  while (currentElement) {
    if (currentElement.tagName === 'UL' || currentElement.tagName === 'OL') {
      indentLevel++;
    }
    currentElement = currentElement.parentElement;
  }
  
  const listType = parentList.tagName === 'UL' ? 'disc' : 'decimal';
  const bulletWidth = listType === 'disc' ? 20 : 30; // Space for bullet/number
  
  return {
    isListItem: true,
    bulletWidth,
    indentLevel: Math.max(1, indentLevel),
    listType
  };
};

/**
 * Renders a bullet point for list items
 */
export const renderBullet = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  fontSize: number,
  color: string,
  listType: 'disc' | 'circle' | 'square' | 'decimal',
  itemIndex?: number
) => {
  ctx.fillStyle = color;
  ctx.textBaseline = 'top';
  
  if (listType === 'disc') {
    // Draw bullet point (•)
    ctx.font = `normal ${fontSize}px Arial, sans-serif`;
    ctx.fillText('•', x, y);
  } else if (listType === 'decimal' && itemIndex !== undefined) {
    // Draw number
    ctx.font = `normal ${fontSize}px Arial, sans-serif`;
    ctx.fillText(`${itemIndex + 1}.`, x, y);
  }
};

/**
 * Calculates the proper text position for list items accounting for bullets
 */
export const calculateListTextPosition = (
  originalX: number,
  listContext: ListRenderingContext,
  scaleX: number
): number => {
  if (!listContext.isListItem) {
    return originalX;
  }
  
  // Add space for bullet and proper indentation
  const baseIndent = 16 * scaleX; // Base list padding
  const bulletSpace = listContext.bulletWidth * scaleX;
  const levelIndent = (listContext.indentLevel - 1) * 20 * scaleX;
  
  return originalX + baseIndent + bulletSpace + levelIndent;
};

/**
 * Gets the bullet position for list items
 */
export const getBulletPosition = (
  containerX: number,
  listContext: ListRenderingContext,
  scaleX: number
): number => {
  if (!listContext.isListItem) {
    return containerX;
  }
  
  const baseIndent = 16 * scaleX;
  const levelIndent = (listContext.indentLevel - 1) * 20 * scaleX;
  
  return containerX + baseIndent + levelIndent;
};
