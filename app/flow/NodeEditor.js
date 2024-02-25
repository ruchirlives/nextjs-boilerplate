import React, { useMemo, useState, useCallback } from "react";
import ReactFlow, {
  useViewport,
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
  const { x, y, zoom } = useViewport();

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

  const handleNodeDelete = (nodeId) => {
    setNodes((currentNodes) => currentNodes.filter(node => node.id !== nodeId));
  };

  // Handler for double-clicking on the canvas
  const handlePaneClick = useCallback((event) => {
    const reactFlowBounds = event.currentTarget.getBoundingClientRect();
    const position = {
      // Adjust the position calculation to use the viewport values captured outside the callback
      x: ((event.clientX - reactFlowBounds.left) - x) / zoom,
      y: ((event.clientY - reactFlowBounds.top) - y) / zoom,
    };

    const newNode = {
      id: `UMLClassNode_${Date.now()}`,
      type: 'UMLClassNode', // Make sure this type matches your custom node type
      position: position, // Using calculated position
      data: { name: 'New Class', attributes: [], methods: [] },
    };

    setNodes((prevNodes) => prevNodes.concat(newNode));
  }, [x, y, zoom]); // Include x, y, zoom in the dependency array to ensure the callback updates with their latest values


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
        <UMLClassNode {...nodeProps} onDelete={handleNodeDelete} onNodeDataChange={NodeDataChange} />
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
        onPaneClick={handlePaneClick}
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
