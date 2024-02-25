import React, { useState } from "react";
import { Handle, Position } from "reactflow";
import "./UMLClassNode.css";
import useLongPress from "./useLongPress"; // Adjust the path as necessary

const ContextMenu = ({
  visible,
  position,
  onClose,
  onDelete,
  onExportJson,
}) => {
  if (!visible) return null;

  return (
    <div
      className="context-menu"
      style={{
        top: position.y,
        left: position.x,
        position: "absolute",
        zIndex: 1000,
      }}
    >
      <ul>
        <li onClick={onDelete}>Delete</li>
        <li onClick={onExportJson}>Export as JSON</li> {/* New option here */}
        {/* Add more options here */}
      </ul>
      <div onClick={onClose}>Close</div>
    </div>
  );
};

const UMLClassNode = ({ id, data, onNodeDataChange, onDelete }) => {
  const [editableData, setEditableData] = useState({
    name: data.name,
    attributes: data.attributes || [],
    methods: data.methods || [],
  });

  // Edit state for name, attributes, and methods
  const [editState, setEditState] = useState({
    name: false,
    attributes: Array(data.attributes.length).fill(false),
    methods: Array(data.methods.length).fill(false),
  });

// Function to handle JSON data export
const exportToJson = (data) => {
  const fileName = "export.json";
  const jsonStr = JSON.stringify(data, null, 2);
  const element = document.createElement("a");
  element.setAttribute("href", "data:text/json;charset=utf-8," + encodeURIComponent(jsonStr));
  element.setAttribute("download", fileName);

  element.style.display = "none";
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);

  // Close the menu after export
  setMenuVisible(false);
};

// Updated ContextMenu component to include export option
const ContextMenu = ({ visible, position, onClose, onDelete, data }) => {
  if (!visible) return null;

  return (
    <div
      className="context-menu"
      style={{ top: position.y, left: position.x, position: 'absolute', zIndex: 1000 }}
    >
      <ul>
        <li onClick={onDelete}>Delete</li>
        <li onClick={() => exportToJson(data)}>Export to JSON</li> {/* Add this line */}
        {/* Add more options here */}
      </ul>
      <div onClick={onClose}>Close</div>
    </div>
  );
};


  const [menuVisible, setMenuVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  // Toggle edit state
  const toggleEditState = (type, index = null) => {
    setEditState((prevState) => {
      if (type === "name") {
        return { ...prevState, name: !prevState.name };
      } else {
        return {
          ...prevState,
          [type]: prevState[type].map((item, idx) =>
            idx === index ? !item : item
          ),
        };
      }
    });
  };

  // Adjusted handleChange function to manage input changes
  const handleChange = (type, value, index = null) => {
    setEditableData((prevData) => {
      if (type === "name") {
        return { ...prevData, name: value };
      } else {
        return {
          ...prevData,
          [type]: prevData[type].map((item, idx) =>
            idx === index ? value : item
          ),
        };
      }
    });
  };

  const saveChanges = (type, index = null) => {
    setEditableData((prevData) => {
      // Now, prevData is correctly accessed within this callback
      console.log(prevData); // This log is now valid

      if (type === "name") {
        return { ...prevData, name: prevData.name };
      } else if (prevData[type] && Array.isArray(prevData[type])) {
        const filtered = prevData[type].filter((item, idx) => {
          if (idx === index) {
            return item !== ""; // Keep the item if it's not the current empty one being edited
          }
          return item !== ""; // Remove empty items except the one currently being edited
        });
        return {
          ...prevData,
          [type]: filtered,
        };
      } else {
        // Log an error or handle the case where type is not as expected
        console.error(`Unexpected type or undefined array for type: ${type}`);
        return { ...prevData }; // Return the current state unchanged
      }
    });

    // Handling the reset of edit states should be outside but still within saveChanges function
    if (type !== "attributes" && type !== "methods") {
      setEditState((prevState) => ({
        ...prevState,
        name: false,
        attributes: Array(editableData.attributes.length).fill(false),
        methods: Array(editableData.methods.length).fill(false),
      }));
    } else {
      setEditState((prevState) => ({
        ...prevState,
        [type]: prevState[type].map((item, idx) =>
          idx === index ? true : false
        ),
      }));
    }
  };

  const addAttribute = () => {
    setEditableData((prevData) => ({
      ...prevData,
      attributes: [...prevData.attributes, ""], // Add an empty string as a new attribute
    }));
    setEditState((prevState) => ({
      ...prevState,
      attributes: [...prevState.attributes, true], // Set the new attribute to be in edit mode
    }));
  };

  const addMethod = () => {
    setEditableData((prevData) => ({
      ...prevData,
      methods: [...prevData.methods, ""], // Add an empty string as a new method
    }));
    setEditState((prevState) => ({
      ...prevState,
      methods: [...prevState.methods, true], // Set the new method to be in edit mode
    }));
  };

  const enableNodeMenu = (event) => {
    // Capture the properties you need from the event
    const pageX = event.pageX;
    const pageY = event.pageY;

    setTimeout(() => {
      // Use the captured properties here
      // Your logic to display the menu, using pageX and pageY
      const position = { x: 10, y: 10 };
      setMenuPosition(position);
      setMenuVisible(true);
    }, 500); // Adjust the timeout duration as needed
  };

  // Use the useLongPress hook
  const longPressProps = useLongPress((event) => {
    // Directly capture and use event properties here, if no async logic is involved
    enableNodeMenu(event);
  }, 500); // Assuming your useLongPress hook calls the callback with the original event

  const deleteNode = () => {
    console.log("Delete node logic here");
    setMenuVisible(false); // Close menu after action
    onDelete(id); // Call the prop function with the node's id
  };

  return (
    <div className="umlClassNode">
      {/* Existing code for handles and the name field */}
      {/* Existing JSX, now the whole node listens for long presses */}
      <Handle type="target" position={Position.Top} />
      {editState.name ? (
        <input
          type="text"
          value={editableData.name}
          onChange={(e) => handleChange("name", e.target.value)}
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
      )}
      <hr />
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
                  handleChange("attributes", e.target.value, index)
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
        onExportJson={exportToJson} // Passing the export function
      />
    </div>
  );
};

export default UMLClassNode;
