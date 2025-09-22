// src/shared/StoryTree/StoryTree.jsx
import React, { useMemo } from "react";
import ReactFlow, { MiniMap, Controls, Background } from "reactflow";
import "reactflow/dist/style.css";
import { Link } from "react-router-dom";
import dagre from "dagre";

// ---- Dagre Setup ----
const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 180;
const nodeHeight = 80;

function getLayoutedElements(nodes, edges, direction = "TB") {
  const isHorizontal = direction === "LR";
  dagreGraph.setGraph({ rankdir: direction });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  const layoutedNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    node.targetPosition = isHorizontal ? "left" : "top";
    node.sourcePosition = isHorizontal ? "right" : "bottom";

    return {
      ...node,
      position: {
        x: nodeWithPosition.x - nodeWidth / 2,
        y: nodeWithPosition.y - nodeHeight / 2,
      },
    };
  });

  return { nodes: layoutedNodes, edges };
}

export default function StoryTree({ chapters, onAddChapter }) {
  const { nodes, edges } = useMemo(() => {
    const nodes = chapters.map((c) => ({
      id: c.id.toString(),
      data: {
        label: (
          <div className="text-center">
            <Link
              to={`/chapters/${c.id}`}
              className="block px-3 py-2 mb-2 bg-white rounded shadow hover:bg-pink-100 transition"
            >
              {c.title}
            </Link>
            <button
              onClick={() => onAddChapter(c.id)}
              className="px-2 py-1 text-xs bg-pink-500 text-white rounded hover:bg-pink-600 transition"
            >
              + Branch
            </button>
          </div>
        ),
      },
      position: { x: 0, y: 0 }, // Dagre überschreibt das
    }));

    const edges = chapters
      .filter((c) => c.parentChapterId)
      .map((c) => ({
        id: `e${c.parentChapterId}-${c.id}`,
        source: c.parentChapterId.toString(),
        target: c.id.toString(),
        animated: true,
      }));

    return getLayoutedElements(nodes, edges, "TB"); // "TB" = Top -> Bottom
  }, [chapters, onAddChapter]);

  return (
    <div style={{ height: 500 }} className="bg-gray-50 rounded-lg">
      <ReactFlow nodes={nodes} edges={edges} fitView>
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
}
