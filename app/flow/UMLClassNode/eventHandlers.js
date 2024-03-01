import { useEffect} from "react";

export function eventHandlers(params) {
  const {
    setEditState,
    setEditableData,
    setMenuPosition,
    setMenuVisible,
    onDelete,
    id,
  } = params;

  const toggleEditState = (type, index = null, e) => {
    setEditState((prevState) => {
      // console.log(prevState)
      // Toggling for a singular field, like 'name' WHY IS IT TOGGLING TWICE?
      if (type === "name") {
        return { ...prevState, name: !prevState.name };
      } else if (prevState[type] && Array.isArray(prevState[type])) {
        // Ensure the section exists and is an array before attempting to map
        return {
          ...prevState,
          [type]: prevState[type].map(
            (item, idx) => (idx === index ? !item : item) // Toggle the edit state for the specified index
          ),
        };
      } else {
        // Optionally handle unexpected types or missing sections
        console.error(`Unexpected type or undefined array for type: ${type}`);
        return prevState; // Return the current state unchanged in case of error
      }
    });
  };

  // Adjusted handleChange function to manage input changes
  const handleChange = (type, e, index = null) => {
    const value = e.target.value;
    setEditableData((prevData) => {
      let updatedData = {};

      if (type === "name") {
        updatedData = { ...prevData, name: value }; //
      } else {
        updatedData = {
          ...prevData,
          [type]: prevData[type].map((item, idx) =>
            idx === index ? value : item
          ),
        };
      }

      return updatedData;
    });
  };

  const handleBlur = (type, index = null) => {
    setEditState((prevState) => {
      if (type === "name") {
        // If 'name' is being edited, simply set its edit state to false
        return { ...prevState, name: false };
      } else {
        // For array sections, update the edit state for the specified index
        const updatedEditState = prevState[type].map((edit, idx) => {
          // Set the edit state to false for the item being saved
          if (index !== null && idx === index) {
            return false;
          }
          // Otherwise, keep the current edit state
          return edit;
        });
        return { ...prevState, [type]: updatedEditState };
      }
    });
  };

  const deleteNode = () => {
    console.log("Delete node logic here");
    setMenuVisible(false); // Close menu after action
    onDelete(id); // Call the prop function with the node's id
  };

  const handleRightClick = (event) => {
    event.preventDefault(); // Prevent the default context menu from showing
    const position = { x: 10, y: 10 };
    setMenuPosition(position); // Position your custom context menu
    setMenuVisible(true); // Show your custom context menu
  };

  return {
    handleRightClick,
    handleChange,
    handleBlur,
    toggleEditState,
    deleteNode,
  };
}
