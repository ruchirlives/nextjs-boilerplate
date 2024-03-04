"use client";
import React from "react";
import ReactFlow, { ReactFlowProvider } from "reactflow";
import "reactflow/dist/style.css";
import NodeEditor from "../NodeEditor";

function ControlPanel(props) {
  const { createNodes } = props;
  return (
    <>
      <button
        className="bg-green-900 hover:bg-green-700 text-white font-bold py-3 px-6 rounded"
        onClick={(event) =>
          createNodes(event, "Project", ["attributes", "directcosts", "staffing", "policies", "milestones", "reports"])
        }
      >
        New Project
      </button>
      <button
        className="bg-green-900 hover:bg-green-700 text-white font-bold py-3 px-6 rounded"
        onClick={(event) =>
          createNodes(event, "DirectCost", ["attributes"])
        }
      >
        New DirectCost
      </button>
      <button
        className="bg-green-900 hover:bg-green-700 text-white font-bold py-3 px-6 rounded"
        onClick={(event) =>
          createNodes(event, "Staff", ["attributes"])
        }
      >
        New Staff
      </button>
      <button
        className="bg-green-900 hover:bg-green-700 text-white font-bold py-3 px-6 rounded"
        onClick={(event) =>
          createNodes(event, "Policy", ["attributes", "supports"])
        }
      >
        New Policy
      </button>
      <button
        className="bg-green-900 hover:bg-green-700 text-white font-bold py-3 px-6 rounded"
        onClick={(event) =>
          createNodes(event, "Milestone", ["attributes", "objectives"])
        }
      >
        New Milestone
      </button>
    </>
  );
}

function App() {
  return (
    <div className="App">
      <ReactFlowProvider>
        <NodeEditor ControlPanel={ControlPanel} />
      </ReactFlowProvider>
    </div>
  );
}

export default App;