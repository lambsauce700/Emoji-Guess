// src/components/DragAndDrop.tsx
import React, { useState } from 'react';
import { DndContext, DragEndEvent, UniqueIdentifier } from '@dnd-kit/core';
import Draggable from './Draggable';
import Droppable from './Droppable';

function DragAndDrop() {
  const [droppedItems, setDroppedItems] = useState<Record<string, Array<{id: string, emoji: string}>>>({}); // Array of emoji objects
  const emojis = [
    { id: 'emoji-1', emoji: '😀' }, 
    { id: 'emoji-2', emoji: '😃' },
    { id: 'emoji-3', emoji: '😄' },
    { id: 'emoji-4', emoji: '😁' },
    { id: 'emoji-5', emoji: '😆' }
  ]; // Emoji objects with ID and character
  const containers = ['dropzone1', 'dropzone2']; // Droppable zones

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over) {
      const droppedZone = String(over.id); // Convert to string to ensure type safety
      const draggedItem = emojis.find(emoji => emoji.id === active.id);

      if (draggedItem) {
        setDroppedItems(prevItems => {
          const newItems = { ...prevItems };
          const targetList = newItems[droppedZone] || [];
          targetList.push(draggedItem);  // Add the dragged item to the target list
          newItems[droppedZone] = targetList;
          return newItems;
        });
      }
    } else if (!over) {
      // Remove the item from any droppable if it's dragged out
      setDroppedItems(prevItems => {
        const newItems = { ...prevItems };
        Object.keys(newItems).forEach(key => {
          newItems[key] = newItems[key].filter(item => item.id !== active.id);
        });
        return newItems;
      });
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      {emojis.map(emoji => (
        <Draggable key={emoji.id} id={emoji.id} emoji={emoji.emoji} />
      ))}

      {containers.map(id => (
        <Droppable key={id} id={id}>
          {droppedItems[id]?.map((item, idx) => (
            <Draggable key={idx} id={item.id} emoji={item.emoji} />
          ))}
          {!droppedItems[id]?.length && 'Drop here'}
        </Droppable>
      ))}
    </DndContext>
  );
}

export default DragAndDrop;
