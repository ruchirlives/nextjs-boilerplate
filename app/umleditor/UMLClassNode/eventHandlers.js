export function eventHandlers(
  setEditState,
  setEditableData,
  editableData,
  editState,
  setMenuPosition,
  setMenuVisible,
  onDelete,
  id
) {
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
  const handleChange = (type, e, index = null) => {
    const value = e.target.value;
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
        // console.error(`Unexpected type or undefined array for type: ${type}`);
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
        notes: Array(editableData.notes.length).fill(false),
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

  // const enableNodeMenu = () => {
  //   // Capture the properties you need from the event
  //   setTimeout(() => {
  //     // Use the captured properties here
  //     // Your logic to display the menu, using pageX and pageY
  //     const position = { x: 10, y: 10 };
  //     setMenuPosition(position);
  //     setMenuVisible(true);
  //   }, 500); // Adjust the timeout duration as needed
  // };

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

  const addItem = (type) => {
    setEditableData((prevData) => {
      const updatedList = [...prevData[type], ""]; // Add an empty string as a new item
      return { ...prevData, [type]: updatedList };
    });
    setEditState((prevState) => {
      const updatedEditState = [...prevState[type], true]; // Set the new item to be in edit mode
      return { ...prevState, [type]: updatedEditState };
    });
  };
  // Convert specific add methods to use the generic addItem function
  const addAttribute = () => addItem("attributes");
  const addMethod = () => addItem("methods");
  const addNotes = () => addItem("notes");

  return {
    handleRightClick,
    handleChange,
    saveChanges,
    toggleEditState,
    addAttribute,
    addMethod,
    addNotes,
    deleteNode,
  };
}
