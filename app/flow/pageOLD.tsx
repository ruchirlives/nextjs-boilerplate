'use client'
import ReactFlow, { Controls, Background, Node, Edge} from 'reactflow';
import 'reactflow/dist/style.css';

const edges: Edge[] = [{ id: '1-2', source: '1', target: '2' }];

const nodes: Node[] = [
  {
    id: '1',
    data: { label: 'Hello' },
    position: { x: 0, y: 0 },
    type: 'input',
  },
  {
    id: '2',
    data: { label: 'World' },
    position: { x: 100, y: 100 },
  },
];

function Flow() {
  return (
    <div style={{ height: '500px' }}>
      <ReactFlow nodes={nodes} edges={edges}>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}


export default Flow;
