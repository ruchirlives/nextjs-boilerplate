import React from "react";

// Assuming setEditableData and setEditState are available in this scope,
// you might need to pass them as props if they are defined in a parent component

export function generateSection(
  sectionKey, // New parameter to specify the section key (e.g., 'methods', 'attributes')
  editableData,
  editState,
  setEditableData, // Added: setter function for editableData
  setEditState, // Added: setter function for editState
  handleChange,
  saveChanges,
  toggleEditState,
) {
  const addItem = () => {
    // Now accepting sectionKey as a parameter
    setEditableData((editableData) => {
      console.log(sectionKey)
      // Check if the section exists and is an array; if not, initialize as an array
      const updatedList = [...(editableData[sectionKey] || []), ""]; // Adds a new empty string item
      return { ...editableData, [sectionKey]: updatedList };
    });

    setEditState((editableData) => {
      // Similarly, ensure the edit state for the section is an array before adding true
      const updatedEditState = [...(editableData[sectionKey] || []), true]; // Marks the new item as editable
      return { ...editableData, [sectionKey]: updatedEditState };
    });
  };

  return (
    <div>
      <strong>
        {sectionKey.charAt(0).toUpperCase() + sectionKey.slice(1)}
      </strong>
      <ul>
        {editableData[sectionKey].map((item, index) =>
          editState[sectionKey][index] || item === "" ? (
            <input
              key={index}
              type="text"
              value={item}
              onBlur={() => saveChanges(sectionKey, index)}
              onChange={(e) => handleChange(sectionKey, e, index)}
              autoFocus={item === ""}
              className="editInput nodrag"
            />
          ) : (
            <li
              key={index}
              onDoubleClick={() => toggleEditState(sectionKey, index)}
              className="nodrag"
            >
              {item}
            </li>
          )
        )}
        <button onClick={addItem} className="addButton">
          Add {sectionKey.charAt(0).toUpperCase() + sectionKey.slice(1)}
        </button>
      </ul>
    </div>
  );
}
