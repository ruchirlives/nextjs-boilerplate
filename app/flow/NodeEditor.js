import React, { useMemo, useState, useCallback } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  addEdge,
  applyNodeChanges,
  applyEdgeChanges
} from "reactflow";
import "reactflow/dist/style.css";
import UMLClassNode from "./UMLClassNode";

const initialNodes = [
  {
    id: "1",
    type: "UMLClassNode",
    position: { x: 100, y: 100 },
    data: {
      name: "Person",
      attributes: ["+name: string", "+age: int"],
      methods: ["+getName(): string", "+getAge(): int"],
    },
  },
  {
    id: "2",
    type: "UMLClassNode",
    position: { x: 300, y: 100 },
    data: {
      name: "Another Person",
      attributes: ["+name: string", "+age: int"],
      methods: ["+getName(): string", "+getAge(): int"],
    },
  },
];

const initialEdges = [
  // Define edges (connections) between nodes here
];

const NodeEditor = () => {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const onNodesChange = useCallback(
    (changes) => setNodes(applyNodeChanges(changes, nodes)),
    [nodes]
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges(applyEdgeChanges(changes, edges)),
    [edges]
  );
  const onConnect = useCallback(
    (connection) => setEdges(addEdge(connection, edges)),
    [edges]
  );

  // Handler for double-clicking on the canvas
  const handlePaneDoubleClick = useCallback((event) => {
    const reactFlowBounds = event.currentTarget.getBoundingClientRect();

    // Calculate position without useZoomPanHelper
    const position = {
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    };

    const newNode = {
      id: `UMLClassNode_${Date.now()}`,
      type: "UMLClassNode",
      position: position, // Using calculated position
      data: { name: "New Class", attributes: [], methods: [] },
    };

    setNodes((prevNodes) => prevNodes.concat(newNode));
  }, []);

  const nodeTypes = useMemo(() => {
    // Directly define NodeDataChange here if it has no external dependencies
    const NodeDataChange = (nodeId, newData) => {
      setNodes((prevNodes) =>
        prevNodes.map((node) =>
          node.id === nodeId
            ? { ...node, data: { ...node.data, ...newData } }
            : node
        )
      );
    };

    return {
      UMLClassNode: (nodeProps) => (
        <UMLClassNode {...nodeProps} onNodeDataChange={NodeDataChange} />
      ),
    };
  }, []); // Empty dependency array if there are truly no dependencies

  return (
    <div style={{ height: 500 }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onPaneClick={handlePaneDoubleClick}
        nodeTypes={nodeTypes}
        fitView
      >
        <MiniMap />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default NodeEditor;
