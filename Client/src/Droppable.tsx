// src/components/Droppable.tsx
import React from 'react';
import { useDroppable } from '@dnd-kit/core';

type DroppableProps = {
  id: string;
  children: React.ReactNode;
};

function Droppable({ id, children }: DroppableProps) {
  const { isOver, setNodeRef } = useDroppable({
    id: id,
  });

  const style = {
    color: isOver ? 'green' : 'black', // Visual feedback
    border: '1px dashed grey',
    padding: '20px',
    minHeight: '100px',  // Ensure it has height when empty
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '10px'
  };

  return (
    <div ref={setNodeRef} style={style}>
      {children}
    </div>
  );
}

export default Droppable;
