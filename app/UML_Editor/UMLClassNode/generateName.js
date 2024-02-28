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
      onBlur={() => saveChanges("name")}
      onChange={(e) => handleChange("name", e)}
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
