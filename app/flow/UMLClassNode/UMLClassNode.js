import React, { useState } from "react";
import { Handle, Position } from "reactflow";
import "./UMLClassNode.css";
import { ContextMenu } from "./ContextMenu";
import { generateName } from "./generateName";
import { generateSection } from "./generateSection";
import { eventHandlers } from "./eventHandlers";
import useLongPress from "./useLongPress";

const UMLClassNode = ({ id, data, onDelete }) => {
  // Dynamically determine sections excluding 'name'
  const sections = Object.keys(data).filter((key) => key !== "name");

  // Initialize editableData using dynamic sections
  const [editableData, setEditableData] = useState(
    sections.reduce(
      (acc, section) => ({
        ...acc,
        [section]: data[section] || [],
      }),
      { name: data.name }
    )
  );

  // Initialize editState for each section based on their lengths
  const [editState, setEditState] = useState(
    sections.reduce(
      (acc, section) => ({
        ...acc,
        [section]: Array(data[section]?.length || 0).fill(false),
      }),
      { name: false }
    ) // Assuming you want to track edit state for 'name' as well
  );

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
    deleteNode,

  } = eventHandlers(
    setEditState,
    setEditableData,
    editableData,
    editState,
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
      {sections.map((sectionKey) =>
        generateSection(
          sectionKey,
          editableData,
          editState,
          setEditState,
          setEditableData,
          handleChange,
          saveChanges,
          toggleEditState,
        )
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
