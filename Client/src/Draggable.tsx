import React from 'react';
import { useDraggable } from '@dnd-kit/core';

type DraggableProps = {
  id: string;
  emoji: string;
};

const Draggable: React.FC<DraggableProps> = ({ id, emoji }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    cursor: 'grabbing',
  } : undefined;

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {emoji}
    </div>
  );
};

export default Draggable;
