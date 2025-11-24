import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getChapterById, deleteChapter } from "../../api/chapters";

export default function ChapterDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [chapter, setChapter] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChapter = async () => {
      try {
        const data = await getChapterById(id);
        setChapter(data);
      } catch (err) {
        console.error("Fehler beim Laden des Kapitels:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchChapter();
  }, [id]);

  const handleDeleteChapter = async () => {
    const confirmDelete = window.confirm(`Delete "${chapter.title}"?`);
    if (confirmDelete) {
      try {
        await deleteChapter(chapter.id);
        navigate(`/stories/${chapter.story_id}`);
      } catch (err) {
        console.error("Fehler beim Löschen des Kapitels:", err);
      }
    }
  };

  if (loading) {
    return <div className="text-center mt-10">Loading chapter...</div>;
  }

  if (!chapter) {
    return (
      <div className="text-center mt-10 text-red-500">Chapter not found.</div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-6 mt-12 mb-20">
      <h1 className="text-3xl font-bold mb-4">{chapter.title}</h1>
      <p className="text-gray-600 mb-6">{chapter.content}</p>

      <div className="flex items-center gap-4 mt-8">
        <button
          onClick={handleDeleteChapter}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          Delete Chapter
        </button>
        <Link
          to={`/stories/${chapter.story_id}`}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition"
        >
          ← Back to Story
        </Link>
      </div>
    </div>
  );
}
