// src/pages/ChapterDetailPage/ChapterDetailPage.jsx
import { useParams, Link, useNavigate } from "react-router-dom";
import { chapters as initialChapters } from "../../data/chapters";
import { useState, useEffect } from "react";

export default function ChapterDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  // ---------- Chapters aus localStorage laden ----------
  const [chapters, setChapters] = useState(() => {
    const saved = localStorage.getItem("chapters");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return initialChapters;
      }
    }
    return initialChapters;
  });

  // ---------- Speichern, wenn sich Chapters ändern ----------
  useEffect(() => {
    localStorage.setItem("chapters", JSON.stringify(chapters));
  }, [chapters]);

  const chapter = chapters.find((c) => c.id === parseInt(id));

  if (!chapter) {
    return (
      <div className="max-w-3xl mx-auto px-6 mt-12 mb-20">
        <h2 className="text-2xl font-bold mb-4">Chapter not found</h2>
        <Link
          to="/stories"
          className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition"
        >
          Back to all stories
        </Link>
      </div>
    );
  }

  // ---------- Votes aus localStorage laden ----------
  const votedChapters = JSON.parse(
    localStorage.getItem("votedChapters") || "[]"
  );
  const hasVoted = votedChapters.includes(chapter.id);

  // ---------- Upvote Toggle ----------
  const handleUpvote = () => {
    let updatedChapters;

    if (hasVoted) {
      // Vote entfernen
      updatedChapters = chapters.map((c) =>
        c.id === chapter.id ? { ...c, upvotes: (c.upvotes || 0) - 1 } : c
      );
      const updatedVotes = votedChapters.filter((cid) => cid !== chapter.id);
      localStorage.setItem("votedChapters", JSON.stringify(updatedVotes));
    } else {
      // Vote hinzufügen
      updatedChapters = chapters.map((c) =>
        c.id === chapter.id ? { ...c, upvotes: (c.upvotes || 0) + 1 } : c
      );
      const updatedVotes = [...votedChapters, chapter.id];
      localStorage.setItem("votedChapters", JSON.stringify(updatedVotes));
    }

    setChapters(updatedChapters);
  };

  // ---------- Kapitel löschen ----------
  const handleDeleteChapter = () => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete the chapter "${chapter.title}"?`
    );
    if (confirmDelete) {
      const updated = chapters.filter((c) => c.id !== chapter.id);
      setChapters(updated);
      navigate(`/stories/${chapter.storyId}`);
    }
  };

  // ---------- Kommentare laden ----------
  const [comments, setComments] = useState(() => {
    const saved = localStorage.getItem(`comments_${chapter.id}`);
    return saved ? JSON.parse(saved) : [];
  });

  // ---------- Kommentar speichern ----------
  useEffect(() => {
    localStorage.setItem(`comments_${chapter.id}`, JSON.stringify(comments));
  }, [comments, chapter.id]);

  const [newComment, setNewComment] = useState("");

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    const comment = {
      id: Date.now(),
      text: newComment,
    };
    setComments([...comments, comment]);
    setNewComment("");
  };

  // ---------- Kommentar löschen ----------
  const handleDeleteComment = (commentId) => {
    const updatedComments = comments.filter((c) => c.id !== commentId);
    setComments(updatedComments);
  };

  return (
    <div className="max-w-3xl mx-auto px-6 mt-12 mb-20">
      <h1 className="text-3xl font-bold mb-4">{chapter.title}</h1>

      {/* Content */}
      <p className="text-gray-700 whitespace-pre-line mb-6">
        {chapter.content}
      </p>

      {/* Actions */}
      <div className="flex items-center gap-6 mb-8">
        {/* Upvote mit Emoji */}
        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold">{chapter.upvotes || 0}</span>
          <button
            onClick={handleUpvote}
            className={`text-2xl transition ${
              hasVoted ? "text-pink-500" : "hover:scale-110"
            }`}
          >
            👍
          </button>
        </div>

        <button
          onClick={handleDeleteChapter}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
        >
          Delete Chapter
        </button>
        <Link
          to={`/stories/${chapter.storyId}`}
          className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
        >
          Back to Story
        </Link>
      </div>

      {/* ---------- Kommentare ---------- */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Comments</h2>

        {/* Kommentar-Eingabe */}
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            className="flex-grow px-3 py-2 border rounded-lg"
          />
          <button
            onClick={handleAddComment}
            className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition"
          >
            Add
          </button>
        </div>

        {/* Kommentar-Liste */}
        {comments.length === 0 ? (
          <p className="text-gray-500">No comments yet. Be the first!</p>
        ) : (
          <ul className="space-y-3">
            {comments.map((comment) => (
              <li
                key={comment.id}
                className="p-3 border rounded-lg bg-gray-50 shadow-sm flex justify-between items-center"
              >
                <span>{comment.text}</span>
                <button
                  onClick={() => handleDeleteComment(comment.id)}
                  className="text-red-500 hover:text-red-700 text-lg"
                  title="Delete comment"
                >
                  ❌
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
