import React, { useMemo, useState, useCallback } from "react";
import ReactFlow, {
  Background,
  BackgroundVariant,
  useViewport,
  MiniMap,
  Controls,
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
} from "reactflow";
import "reactflow/dist/style.css";
import UMLClassNode from "./UMLClassNode/UMLClassNode";
import { initialNodes } from "./initialNodes";

const defaultEdgeOptions = {
  interactionWidth: 150,
  edgeUpdaterRadius: 150,
  edgesUpdatable: true,
};

const initialEdges = [
  // Define edges (connections) between nodes here
];

const NodeEditor = () => {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const { x, y, zoom } = useViewport();
  const [rfInstance, setRfInstance] = useState(null);

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
    setNodes((currentNodes) =>
      currentNodes.filter((node) => node.id !== nodeId)
    );
  };

  // Handler for double-clicking on the canvas
  const handlePaneClick = useCallback(
    (event) => {
      event.preventDefault();
      const reactFlowBounds = event.currentTarget.getBoundingClientRect();
      const position = {
        // Adjust the position calculation to use the viewport values captured outside the callback
        x: (event.clientX - reactFlowBounds.left - x) / zoom,
        y: (event.clientY - reactFlowBounds.top - y) / zoom,
      };

      const newNode = {
        id: `UMLClassNode_${Date.now()}`,
        type: "UMLClassNode", // Make sure this type matches your custom node type
        position: position, // Using calculated position
        data: { name: "New Class", attributes: [], methods: [] },
      };

      setNodes((prevNodes) => prevNodes.concat(newNode));
    },
    [x, y, zoom]
  ); // Include x, y, zoom in the dependency array to ensure the callback updates with their latest values

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
        <UMLClassNode
          {...nodeProps}
          onDelete={handleNodeDelete}
          onNodeDataChange={NodeDataChange}
        />
      ),
    };
  }, []); // Empty dependency array if there are truly no dependencies

  // Export function
  const exportNodesToJson = useCallback(() => {
    const exportData = rfInstance.toObject();
    const fileName = "reactflow_export.json";
    const jsonStr = JSON.stringify(exportData, null, 2); // Pretty print the JSON
    const element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/json;charset=utf-8," + encodeURIComponent(jsonStr)
    );
    element.setAttribute("download", fileName);

    document.body.appendChild(element); // Required for this to work in Firefox
    element.click();
    document.body.removeChild(element);
  }, [rfInstance]); // Depend on both the nodes and edges state

  const handleFileImport = (event) => {
    const fileReader = new FileReader();
    fileReader.readAsText(event.target.files[0], "UTF-8");
    fileReader.onload = (e) => {
      try {
        const importedData = JSON.parse(e.target.result);

        // Assuming the imported JSON structure includes both nodes and edges
        if (
          importedData &&
          Array.isArray(importedData.nodes) &&
          Array.isArray(importedData.edges)
        ) {
          console.log(importedData.nodes);
          setNodes(importedData.nodes);
          console.log(nodes);
          setEdges(importedData.edges);
        } else {
          // Handle the case where the structure is not as expected
          console.error(
            "Imported data does not match the expected structure:",
            importedData
          );
          alert(
            "The imported JSON does not contain a valid structure for nodes and edges."
          );
        }
      } catch (error) {
        console.error("Error parsing JSON:", error);
        alert("Failed to parse JSON. Please check the file format.");
      }
    };
    fileReader.onerror = (error) => {
      console.error("FileReader error:", error);
      alert("Error reading the file. Please try again.");
    };
  };

  return (
    <div style={{ height: 700 }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onPaneContextMenu={handlePaneClick}
        nodeTypes={nodeTypes}
        defaultEdgeOptions={defaultEdgeOptions}
        onInit={setRfInstance}
        fitView
      >
        <MiniMap />
        <Controls />
        <Background
          id="2"
          gap={10}
          color="grey"
          variant={BackgroundVariant.Dots}
        />
      </ReactFlow>

      <div className="fixed top-20 right-4 z-50 flex space-x-2">
        <input
          type="file"
          id="fileInput"
          className="hidden"
          onChange={handleFileImport}
          accept=".json"
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded"
          onClick={() => document.getElementById("fileInput").click()}
        >
          Import JSON
        </button>
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-6 rounded"
          onClick={exportNodesToJson}
        >
          Export All Nodes to JSON
        </button>
        <button
          className="bg-green-900 hover:bg-green-700 text-white font-bold py-3 px-6 rounded"
          onClick={handlePaneClick}
        >
          New Node
        </button>
      </div>
    </div>
  );
};

export default NodeEditor;
