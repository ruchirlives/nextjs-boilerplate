import React from 'react';

export const ContextMenu = ({ visible, position, onClose, onDelete }) => {
  if (!visible) return null;

  return (
    <div
      className="context-menu"
      style={{ top: position.y, left: position.x, position: 'absolute', zIndex: 1000 }}
    >
      <ul>
        <li onClick={onDelete}>Delete</li>
        {/* Add more options here */}
      </ul>
      <div onClick={onClose}>Close</div>
    </div>
  );
};
