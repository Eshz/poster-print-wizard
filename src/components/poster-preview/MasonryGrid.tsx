
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
  const columnWrappers = useMemo(() => {
    const columnArrays: React.ReactNode[][] = Array.from({ length: columns }, () => []);
    const columnHeights = Array.from({ length: columns }, () => 0);
    
    // Distribute children to columns, always picking the shortest column
    children.forEach((child, index) => {
      const shortestColumnIndex = columnHeights.indexOf(Math.min(...columnHeights));
      columnArrays[shortestColumnIndex].push(child);
      // Estimate height - this is simplified, in real scenarios you'd measure actual heights
      columnHeights[shortestColumnIndex] += 1;
    });
    
    return columnArrays;
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
