
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
  const { columnWrappers } = useMemo(() => {
    const columnArrays: React.ReactNode[][] = Array.from({ length: columns }, () => []);
    
    // Get item order for proper sequencing
    const getItemOrder = (child: React.ReactNode): number => {
      if (React.isValidElement(child)) {
        return child.props['data-order'] || 0;
      }
      return 0;
    };
    
    // Sort children by their order first
    const sortedChildren = [...children].sort((a, b) => {
      const orderA = getItemOrder(a);
      const orderB = getItemOrder(b);
      return orderA - orderB;
    });
    
    // Handle special positioning for References and Key Takeaways
    const referencesItem = sortedChildren.find(child => 
      React.isValidElement(child) && child.key === 'references'
    );
    
    const keyTakeawaysItem = sortedChildren.find(child => 
      React.isValidElement(child) && child.key === 'keytakeaways'
    );
    
    // Remove special items from sorted children for now
    const regularItems = sortedChildren.filter(child => 
      React.isValidElement(child) && 
      child.key !== 'references' && 
      child.key !== 'keytakeaways'
    );
    
    // Distribute regular items column by column (left to right, top to bottom)
    let currentColumn = 0;
    regularItems.forEach((child) => {
      columnArrays[currentColumn].push(child);
      currentColumn = (currentColumn + 1) % columns;
    });
    
    // Place Key Takeaways in the rightmost column
    if (keyTakeawaysItem) {
      const rightmostColumnIndex = columns - 1;
      columnArrays[rightmostColumnIndex].push(keyTakeawaysItem);
    }
    
    // Always place References last in the rightmost column
    if (referencesItem) {
      const rightmostColumnIndex = columns - 1;
      columnArrays[rightmostColumnIndex].push(referencesItem);
    }
    
    return { columnWrappers: columnArrays };
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
