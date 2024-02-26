import React, { useState } from "react";
import { Handle, Position } from "reactflow";
import "./UMLClassNode.css";
import { ContextMenu } from "./ContextMenu";
import { generateMethods } from "./generateMethods";
import { generateAttributes } from "./generateAttributes";
import { generateName } from "./generateName";
import { eventHandlers } from "./eventHandlers";
import useLongPress from "./useLongPress";

const UMLClassNode = ({ id, data, onDelete }) => {
  // Edit state for name, attributes, and methods
  const [editableData, setEditableData] = useState({
    name: data.name,
    attributes: data.attributes || [],
    methods: data.methods || [],
  });

  const [editState, setEditState] = useState({
    name: false,
    attributes: Array(data.attributes.length).fill(false),
    methods: Array(data.methods.length).fill(false),
  });

  const [menuVisible, setMenuVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

  // Use the useLongPress hook
  const longPressProps = useLongPress((event) => {
    // Directly capture and use event properties here, if no async logic is involved
    enableNodeMenu(event);
  }, 500); // Assuming your useLongPress hook calls the callback with the original event

  const {
    handleRightClick,
    handleChange,
    saveChanges,
    toggleEditState,
    addAttribute,
    addMethod,
    deleteNode,
  } = eventHandlers(
    setEditState,
    setEditableData,
    editableData,
    setMenuPosition,
    setMenuVisible,
    onDelete,
    id
  );

  return (
    <div className="umlClassNode" onContextMenu={handleRightClick}>
      {/* Existing code for handles and the name field */}
      {/* Existing JSX, now the whole node listens for long presses */}
      <Handle type="target" position={Position.Top} />
      {generateName(
        editState,
        editableData,
        handleChange,
        saveChanges,
        toggleEditState,
        longPressProps
      )}
      <hr />
      {generateAttributes(
        editableData,
        editState,
        handleChange,
        saveChanges,
        toggleEditState,
        addAttribute
      )}
      {generateMethods(
        editableData,
        editState,
        handleChange,
        saveChanges,
        toggleEditState,
        addMethod
      )}
      <Handle
        type="source"
        position={Position.Bottom}
        id="a"
        className="nodrag"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="b"
        className="nodrag"
      />

      <ContextMenu
        visible={menuVisible}
        position={menuPosition}
        onClose={() => setMenuVisible(false)}
        onDelete={deleteNode}
      />
    </div>
  );
};

export default UMLClassNode;
