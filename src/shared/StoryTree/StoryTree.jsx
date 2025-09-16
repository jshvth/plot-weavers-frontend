import { Link } from "react-router-dom";

export default function StoryTree() {
  const tree = [
    {
      id: 1,
      title: "Chapter 1: The Beginning",
      children: [
        {
          id: 2,
          title: "Chapter 2A: The Encounter",
          children: [
            { id: 3, title: "Chapter 3A: Hidden Powers", children: [] },
            { id: 4, title: "Chapter 3B: The Betrayal", children: [] },
          ],
        },
        {
          id: 5,
          title: "Chapter 2B: A Dark Path",
          children: [
            { id: 6, title: "Chapter 3C: Forbidden Knowledge", children: [] },
          ],
        },
      ],
    },
  ];

  const renderTree = (nodes) => {
    return (
      <ul className="ml-4 border-l pl-4 space-y-3">
        {nodes.map((node) => (
          <li key={node.id}>
            <Link
              to={`/chapters/${node.id}`}
              className="block px-3 py-2 bg-white rounded-lg shadow-sm hover:bg-pink-50 hover:shadow transition cursor-pointer"
            >
              {node.title}
            </Link>
            {node.children &&
              node.children.length > 0 &&
              renderTree(node.children)}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Story Tree</h2>
      <div className="bg-gray-50 p-4 rounded-lg">{renderTree(tree)}</div>
    </div>
  );
}
