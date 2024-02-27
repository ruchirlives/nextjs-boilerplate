import React from "react";

// Generalized function to handle different sections (methods, attributes, etc.)

export function generateSection(
  sectionKey, // New parameter to specify the section key (e.g., 'methods', 'attributes')
  editableData,
  editState,
  handleChange,
  saveChanges,
  toggleEditState,
  addAction // Renamed from addMethod to addAction for generality
) {
  return (
    <div>
      <strong>
        {sectionKey.charAt(0).toUpperCase() + sectionKey.slice(1)}
      </strong>{" "}
      {/* Dynamically set the title */}
      <ul>
        {editableData[sectionKey].map(
          (
            item,
            index // Use sectionKey to access the correct part of editableData
          ) =>
            editState[sectionKey][index] || item === "" ? ( // Use sectionKey to access the correct part of editState
              <input
                key={index}
                type="text"
                value={item}
                onChange={(e) => handleChange(sectionKey, e, index)}
                onBlur={() => {
                  if (item === "") {
                    saveChanges(sectionKey, index); // Adapted to use sectionKey
                  } else {
                    saveChanges(); // Call without parameters to simply save changes
                  }
                }}
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
        <button onClick={addAction} className="addButton">
          {`Add ${sectionKey.charAt(0).toUpperCase() + sectionKey.slice(1)}`}{" "}
          {/* Button text dynamically generated */}
        </button>
      </ul>
    </div>
  );
}
