'use client'
import React from 'react';
import ReactFlow, { ReactFlowProvider } from 'reactflow';
import 'reactflow/dist/style.css';
import NodeEditor from './NodeEditor';

function App() {
  return (
    <div className="App">
      <ReactFlowProvider><NodeEditor /></ReactFlowProvider>
    </div>
  );
}

export default App;
