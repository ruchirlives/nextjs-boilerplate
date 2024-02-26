import React from "react";

export function generateMethods(
  editableData,
  editState,
  handleChange,
  saveChanges,
  toggleEditState,
  addMethod
) {
  return (
    <div>
      <strong>Methods</strong>
      <ul>
        {editableData.methods.map((method, index) =>
          editState.methods[index] || method === "" ? ( // Automatically focus on new method
            <input
              key={index}
              type="text"
              value={method}
              onChange={(e) => handleChange("methods", e.target.value, index)}
              onBlur={() => {
                if (method === "") {
                  saveChanges("methods", index); // This will remove the entry if it's empty
                } else {
                  saveChanges(); // Call without parameters to simply save changes
                }
              }}
              autoFocus={method === ""}
              className="editInput nodrag"
            />
          ) : (
            <li
              key={index}
              onDoubleClick={() => toggleEditState("methods", index)}
              className="nodrag"
            >
              {method}
            </li>
          )
        )}
        <button onClick={addMethod} className="addButton">
          Add Method
        </button>
      </ul>
    </div>
  );
}
