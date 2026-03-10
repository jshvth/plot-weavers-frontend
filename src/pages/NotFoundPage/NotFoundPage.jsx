import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function NotFoundPage() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <h1 className="text-5xl font-bold text-pink-500 mb-4">
        {t("notFound.title")}
      </h1>
      <p className="text-lg text-gray-400 dark:text-gray-300 mb-6">
        {t("notFound.message")}
      </p>
      <NavLink
        to="/"
        className="text-indigo-500 dark:text-indigo-400 hover:text-indigo-400 dark:hover:text-indigo-300 font-semibold underline"
      >
        {t("notFound.backHome")}
      </NavLink>
    </div>
  );
}
