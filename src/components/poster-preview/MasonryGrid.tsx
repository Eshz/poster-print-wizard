
import React, { useMemo } from 'react';

interface MasonryGridProps {
  children: React.ReactNode[];
  columns?: number;
  gap?: number;
  className?: string;
}

const MasonryGrid: React.FC<MasonryGridProps> = ({
  children,
  columns = 2,
  gap = 12,
  className = ''
}) => {
  const { columnWrappers, columnHeights } = useMemo(() => {
    const columnArrays: React.ReactNode[][] = Array.from({ length: columns }, () => []);
    const columnHeights = Array.from({ length: columns }, () => 0);
    
    // Assign weights based on data-size attribute
    const getItemWeight = (child: React.ReactNode): number => {
      if (React.isValidElement(child)) {
        const size = child.props['data-size'];
        switch (size) {
          case 'large': return 3;
          case 'small': return 0.5;
          case 'normal':
          default: return 1;
        }
      }
      return 1;
    };
    
    // Get item order for proper sequencing
    const getItemOrder = (child: React.ReactNode): number => {
      if (React.isValidElement(child)) {
        return child.props['data-order'] || 0;
      }
      return 0;
    };
    
    // Sort children by their order first, then by weight for items with same order
    const sortedChildren = [...children].sort((a, b) => {
      const orderA = getItemOrder(a);
      const orderB = getItemOrder(b);
      
      if (orderA !== orderB) {
        return orderA - orderB;
      }
      
      // For items with same order, sort by weight (largest first)
      return getItemWeight(b) - getItemWeight(a);
    });
    
    // Distribute children to columns in order, always picking the shortest column
    sortedChildren.forEach((child) => {
      const shortestColumnIndex = columnHeights.indexOf(Math.min(...columnHeights));
      const weight = getItemWeight(child);
      
      columnArrays[shortestColumnIndex].push(child);
      columnHeights[shortestColumnIndex] += weight;
    });
    
    // Special handling for References and Key Takeaways positioning
    // Try to ensure References is in the rightmost column and Key Takeaways is near it
    const referencesIndex = sortedChildren.findIndex(child => 
      React.isValidElement(child) && child.key === 'references'
    );
    
    const keyTakeawaysIndex = sortedChildren.findIndex(child => 
      React.isValidElement(child) && child.key === 'keytakeaways'
    );
    
    if (referencesIndex !== -1) {
      // Find which column has references
      let referencesColumnIndex = -1;
      let referencesItemIndex = -1;
      
      for (let colIndex = 0; colIndex < columnArrays.length; colIndex++) {
        const itemIndex = columnArrays[colIndex].findIndex(item => 
          React.isValidElement(item) && item.key === 'references'
        );
        if (itemIndex !== -1) {
          referencesColumnIndex = colIndex;
          referencesItemIndex = itemIndex;
          break;
        }
      }
      
      // If references is not in the last column, try to move it there
      if (referencesColumnIndex !== -1 && referencesColumnIndex !== columns - 1) {
        const referencesItem = columnArrays[referencesColumnIndex][referencesItemIndex];
        const referencesWeight = getItemWeight(referencesItem);
        
        // Check if we can move it to the last column
        const lastColumnIndex = columns - 1;
        const heightDifference = columnHeights[referencesColumnIndex] - columnHeights[lastColumnIndex];
        
        if (heightDifference > referencesWeight * 0.5) {
          // Move references to last column
          columnArrays[referencesColumnIndex].splice(referencesItemIndex, 1);
          columnArrays[lastColumnIndex].push(referencesItem);
          columnHeights[referencesColumnIndex] -= referencesWeight;
          columnHeights[lastColumnIndex] += referencesWeight;
        }
      }
    }
    
    // Check for significant height differences and redistribute if needed
    const maxHeight = Math.max(...columnHeights);
    const minHeight = Math.min(...columnHeights);
    const heightDifference = maxHeight - minHeight;
    
    // If there's a significant imbalance, try to move small items (but preserve References position)
    if (heightDifference > 1.5) {
      const tallestIndex = columnHeights.indexOf(maxHeight);
      const shortestIndex = columnHeights.indexOf(minHeight);
      
      // Find a small item in the tallest column to move (but not References or Key Takeaways)
      const tallestColumn = columnArrays[tallestIndex];
      for (let i = tallestColumn.length - 1; i >= 0; i--) {
        const item = tallestColumn[i];
        const itemWeight = getItemWeight(item);
        const isSpecialItem = React.isValidElement(item) && 
          (item.key === 'references' || item.key === 'keytakeaways');
        
        if (!isSpecialItem && itemWeight <= 1 && 
            columnHeights[tallestIndex] - itemWeight >= columnHeights[shortestIndex] + itemWeight) {
          // Move the item
          const movedItem = tallestColumn.splice(i, 1)[0];
          columnArrays[shortestIndex].push(movedItem);
          columnHeights[tallestIndex] -= itemWeight;
          columnHeights[shortestIndex] += itemWeight;
          break;
        }
      }
    }
    
    return { columnWrappers: columnArrays, columnHeights };
  }, [children, columns]);

  return (
    <div 
      className={`flex ${className}`}
      style={{ gap: `${gap}px` }}
    >
      {columnWrappers.map((columnChildren, columnIndex) => (
        <div 
          key={columnIndex}
          className="flex-1 flex flex-col"
          style={{ gap: `${gap}px` }}
        >
          {columnChildren}
        </div>
      ))}
    </div>
  );
};

export default MasonryGrid;
