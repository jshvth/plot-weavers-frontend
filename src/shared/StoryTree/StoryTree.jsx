import React, { useMemo } from "react";
import ReactFlow, { MiniMap, Controls, Background } from "reactflow";
import "reactflow/dist/style.css";
import { Link } from "react-router-dom";
import dagre from "dagre";

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 180;
const nodeHeight = 80;

const nodeTypes = {};
const edgeTypes = {};

function getLayoutedElements(nodes, edges, direction = "TB") {
  const isHorizontal = direction === "LR";
  dagreGraph.setGraph({ rankdir: direction });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });
  edges.forEach((edge) => dagreGraph.setEdge(edge.source, edge.target));

  dagre.layout(dagreGraph);

  const layoutedNodes = nodes.map((node) => {
    const nodeWithPos = dagreGraph.node(node.id);
    node.targetPosition = isHorizontal ? "left" : "top";
    node.sourcePosition = isHorizontal ? "right" : "bottom";
    return {
      ...node,
      position: {
        x: nodeWithPos.x - nodeWidth / 2,
        y: nodeWithPos.y - nodeHeight / 2,
      },
    };
  });

  return { nodes: layoutedNodes, edges };
}

export default function StoryTree({ chapters = [], onAddChapter }) {
  const layout = useMemo(() => {
    if (!chapters || chapters.length === 0) return { nodes: [], edges: [] };

    const nodes = chapters.map((ch) => ({
      id: String(ch.id),
      data: {
        label: (
          <div className="text-center">
            <Link
              to={`/chapters/${ch.id}`}
              className="block px-3 py-2 mb-2 bg-white rounded shadow hover:bg-pink-100 transition"
            >
              {ch.title || "Untitled"}
            </Link>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onAddChapter?.(ch.id);
              }}
              className="px-2 py-1 text-xs bg-pink-500 text-white rounded hover:bg-pink-600 transition"
            >
              + Chapter
            </button>
          </div>
        ),
      },
      position: { x: 0, y: 0 },
    }));

    const edges = chapters
      .filter((c) => c.parent_id)
      .map((c) => ({
        id: `e${c.parent_id}-${c.id}`,
        source: String(c.parent_id),
        target: String(c.id),

        type: "straight",
        animated: false,
        style: {
          stroke: "#ec4899",
          strokeWidth: 1.5,
        },
        markerEnd: {
          type: "arrowclosed",
          color: "#ec4899",
        },
      }));

    return getLayoutedElements(nodes, edges);
  }, [chapters]);

  return (
    <div style={{ height: 600 }} className="bg-gray-50 rounded-lg border">
      <ReactFlow
        nodes={layout.nodes}
        edges={layout.edges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
      >
        {/* MiniMap jetzt oben links */}
        <MiniMap position="top-left" />

        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
}
