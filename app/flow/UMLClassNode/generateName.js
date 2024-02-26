import React from "react";

export function generateName(
  editState,
  editableData,
  handleChange,
  saveChanges,
  toggleEditState,
  longPressProps
) {
  return editState.name ? (
    <input
      type="text"
      value={editableData.name}
      onChange={(e) => handleChange("name", e)}
      onBlur={saveChanges}
      autoFocus
      className="editInput nodrag"
    />
  ) : (
    <div
      className="title nodrag"
      onDoubleClick={() => toggleEditState("name")}
      {...longPressProps}
    >
      {editableData.name}
    </div>
  );
}
