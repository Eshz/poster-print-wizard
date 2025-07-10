
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
  // Reduced bullet width to prevent excessive spacing
  const bulletWidth = listType === 'disc' ? 15 : 25; // Reduced from 20/30 to 15/25
  
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
  
  // Use slightly smaller font size for bullets to match browser rendering
  const bulletFontSize = fontSize * 0.9;
  
  if (listType === 'disc') {
    // Draw bullet point (•)
    ctx.font = `normal ${bulletFontSize}px Arial, sans-serif`;
    ctx.fillText('•', x, y);
  } else if (listType === 'decimal' && itemIndex !== undefined) {
    // Draw number
    ctx.font = `normal ${bulletFontSize}px Arial, sans-serif`;
    ctx.fillText(`${itemIndex + 1}.`, x, y);
  }
  
  console.log(`Rendered ${listType} bullet at ${x}, ${y} with font size: ${bulletFontSize}`);
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
  
  // Reduced spacing to match browser rendering more closely
  const baseIndent = 12 * scaleX; // Reduced from 16 to 12
  const bulletSpace = listContext.bulletWidth * scaleX;
  const levelIndent = (listContext.indentLevel - 1) * 15 * scaleX; // Reduced from 20 to 15
  
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
  
  const baseIndent = 12 * scaleX; // Reduced from 16 to 12
  const levelIndent = (listContext.indentLevel - 1) * 15 * scaleX; // Reduced from 20 to 15
  
  return containerX + baseIndent + levelIndent;
};
