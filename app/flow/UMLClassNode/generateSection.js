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
  handleBlur,
  toggleEditState,
) {
  const addItem = (type, e) => {
    setEditableData((prevData) => {
      const updatedList = [...prevData[type], ""]; // Add an empty string as a new item
      console.log(updatedList)
      return { ...prevData, [type]: updatedList };
    });
    setEditState((prevState) => {
      const updatedEditState = [...prevState[type], true]; // Set the new item to be in edit mode
      return { ...prevState, [type]: updatedEditState };
    });
  };
  return (
    <div key={sectionKey}>
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
              onBlur={() => handleBlur(sectionKey, index)}
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
        <button onClick={(e) => addItem(sectionKey, e)} className="addButton">
          Add {sectionKey.charAt(0).toUpperCase() + sectionKey.slice(1)}
        </button>
      </ul>
    </div>
  );
}
