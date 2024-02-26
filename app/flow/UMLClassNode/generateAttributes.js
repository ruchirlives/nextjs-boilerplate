import React from "react";

export function generateAttributes(
  editableData,
  editState,
  handleChange,
  saveChanges,
  toggleEditState,
  addAttribute
) {
  return (
    <div>
      <strong>Attributes</strong>
      <ul>
        {editableData.attributes.map((attribute, index) =>
          editState.attributes[index] || attribute === "" ? ( // Automatically focus on new attribute
            <input
              key={index}
              type="text"
              value={attribute}
              onChange={(e) =>
                handleChange("attributes", e, index)
              }
              onBlur={() => {
                if (attribute === "") {
                  saveChanges("attributes", index); // This will remove the entry if it's empty
                } else {
                  saveChanges(); // Call without parameters to simply save changes
                }
              }}
              autoFocus={attribute === ""}
              className="editInput nodrag"
            />
          ) : (
            <li
              key={index}
              onDoubleClick={() => toggleEditState("attributes", index)}
              className="nodrag"
            >
              {attribute}
            </li>
          )
        )}
        <button onClick={addAttribute} className="addButton">
          Add Attribute
        </button>
      </ul>
    </div>
  );
}
