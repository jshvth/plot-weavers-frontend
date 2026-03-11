import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getChapterById, deleteChapter } from "../../api/chapters";
import { useTranslation } from "react-i18next";

export default function ChapterDetailPage() {
  const { t } = useTranslation();
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
    const confirmDelete = window.confirm(
      t("chapter.confirmDelete", { title: chapter.title })
    );
    if (confirmDelete) {
      try {
        await deleteChapter(chapter.id);
        navigate(`/stories/${chapter.story_id}`);
      } catch (err) {
        console.error("Fehler beim Löschen des Kapitels:", err);
        alert(t("chapter.errorDelete"));
      }
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-10 text-gray-500 dark:text-gray-400">
        {t("chapter.loading")}
      </div>
    );
  }

  if (!chapter) {
    return (
      <div className="text-center mt-10 text-red-500 dark:text-red-400">
        {t("chapter.notFound")}
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 mt-8 sm:mt-12 mb-12 sm:mb-20">
      <h1 className="text-3xl font-bold mb-4">{chapter.title}</h1>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        {chapter.content}
      </p>

      <div className="flex items-center gap-4 mt-8">
        <button
          onClick={handleDeleteChapter}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          {t("chapter.delete")}
        </button>
        <Link
          to={`/stories/${chapter.story_id}`}
          className="px-4 py-2 bg-gray-200 dark:bg-gray-800 dark:text-gray-100 rounded hover:bg-gray-300 dark:hover:bg-gray-700 transition"
        >
          ← {t("chapter.backToStory")}
        </Link>
      </div>
    </div>
  );
}
