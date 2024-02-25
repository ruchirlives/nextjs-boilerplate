import React, { useState } from 'react';
import { Handle, Position } from 'reactflow';
import './UMLClassNode.css';

const UMLClassNode = ({ id, data, onNodeDataChange }) => {
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

  // Toggle edit state
  const toggleEditState = (type, index = null) => {
    setEditState(prevState => {
      if (type === 'name') {
        return { ...prevState, name: !prevState.name };
      } else {
        return {
          ...prevState,
          [type]: prevState[type].map((item, idx) => idx === index ? !item : item),
        };
      }
    });
  };

  // Handle change for name, attributes, and methods
  const handleChange = (type, value, index = null) => {
    setEditableData(prevData => {
      if (type === 'name') {
        return { ...prevData, name: value };
      } else {
        return {
          ...prevData,
          [type]: prevData[type].map((item, idx) => idx === index ? value : item),
        };
      }
    });
  };

  // Save changes and reset edit state
  const saveChanges = () => {
    onNodeDataChange(id, editableData);
    setEditState({
      name: false,
      attributes: Array(editableData.attributes.length).fill(false),
      methods: Array(editableData.methods.length).fill(false),
    });
  };

  return (
    <div className="umlClassNode">
      <Handle type="target" position={Position.Top} />
      {editState.name ? (
        <input
          type="text"
          value={editableData.name}
          onChange={(e) => handleChange('name', e.target.value)}
          onBlur={saveChanges}
          autoFocus
          className="editInput nodrag"
        />
      ) : (
        <div className="title nodrag" onDoubleClick={() => toggleEditState('name')}>{editableData.name}</div>
      )}
      <hr />
      <div>
        <strong>Attributes</strong>
        <ul>
          {editableData.attributes.map((attribute, index) => (
            editState.attributes[index] ? (
              <input
                key={index}
                type="text"
                value={attribute}
                onChange={(e) => handleChange('attributes', e.target.value, index)}
                onBlur={saveChanges}
                className="editInput nodrag"
              />
            ) : (
              <li key={index} onDoubleClick={() => toggleEditState('attributes', index)} className="nodrag">{attribute}</li>
            )
          ))}
        </ul>
      </div>
      <div>
        <strong>Methods</strong>
        <ul>
          {editableData.methods.map((method, index) => (
            editState.methods[index] ? (
              <input
                key={index}
                type="text"
                value={method}
                onChange={(e) => handleChange('methods', e.target.value, index)}
                onBlur={saveChanges}
                className="editInput nodrag"
              />
            ) : (
              <li key={index} onDoubleClick={() => toggleEditState('methods', index)} className="nodrag">{method}</li>
            )
          ))}
        </ul>
      </div>
      <Handle type="source" position={Position.Bottom} id="a" className="nodrag" />
      <Handle type="source" position={Position.Bottom} id="b" className="nodrag" />
    </div>
  );
};

export default UMLClassNode;
