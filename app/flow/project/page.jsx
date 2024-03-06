"use client";
import React from "react";
import ReactFlow, { ReactFlowProvider } from "reactflow";
import "reactflow/dist/style.css";
import NodeEditor from "../NodeEditor";

function ControlPanel(props) {
  const { createNodes } = props;
  
  // Define a base class name for all buttons
  const buttonBaseClass = "bg-green-800 hover:bg-green-600 text-white font-small py-2 px-4 rounded text-sm";

  
  return (
    <>
      <button
        className={buttonBaseClass}
        onClick={(event) =>
          createNodes(event, "projects", ["attributes", "milestones", "reports"])
        }
      >
        New Project
      </button>
      <button
        className={buttonBaseClass}
        onClick={(event) =>
          createNodes(event, "directcosts", ["attributes"])
        }
      >
        New DirectCost
      </button>
      <button
        className={buttonBaseClass}
        onClick={(event) =>
          createNodes(event, "staffing", ["attributes"])
        }
      >
        New Staff
      </button>
      <button
        className={buttonBaseClass}
        onClick={(event) =>
          createNodes(event, "policies", ["attributes"])
        }
      >
        New Policy
      </button>
      <button
        className={buttonBaseClass}
        onClick={(event) =>
          createNodes(event, "supports", ["attributes"])
        }
      >
        New Support
      </button>
      <button
        className={buttonBaseClass}
        onClick={(event) =>
          createNodes(event, "milestones", ["attributes", "objectives"])
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
