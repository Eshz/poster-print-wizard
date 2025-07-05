
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
    
    // Sort children by weight (largest first) for better distribution
    const sortedChildren = [...children].sort((a, b) => {
      return getItemWeight(b) - getItemWeight(a);
    });
    
    // Distribute children to columns, always picking the shortest column
    sortedChildren.forEach((child) => {
      const shortestColumnIndex = columnHeights.indexOf(Math.min(...columnHeights));
      const weight = getItemWeight(child);
      
      columnArrays[shortestColumnIndex].push(child);
      columnHeights[shortestColumnIndex] += weight;
    });
    
    // Check for significant height differences and redistribute if needed
    const maxHeight = Math.max(...columnHeights);
    const minHeight = Math.min(...columnHeights);
    const heightDifference = maxHeight - minHeight;
    
    // If there's a significant imbalance, try to move small items
    if (heightDifference > 1.5) {
      const tallestIndex = columnHeights.indexOf(maxHeight);
      const shortestIndex = columnHeights.indexOf(minHeight);
      
      // Find a small item in the tallest column to move
      const tallestColumn = columnArrays[tallestIndex];
      for (let i = tallestColumn.length - 1; i >= 0; i--) {
        const item = tallestColumn[i];
        const itemWeight = getItemWeight(item);
        
        if (itemWeight <= 1 && columnHeights[tallestIndex] - itemWeight >= columnHeights[shortestIndex] + itemWeight) {
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
