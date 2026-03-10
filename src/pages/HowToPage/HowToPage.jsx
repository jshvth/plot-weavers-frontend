import { useTranslation } from "react-i18next";

export default function HowToPage() {
  const { t } = useTranslation();
  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen py-12 px-6 transition-colors duration-300">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Headline */}
        <header className="text-center">
          <h1 className="text-4xl font-bold text-indigo-600 dark:text-indigo-400 mb-4">
            {t("howto.title")}
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            {t("howto.intro")}
          </p>
        </header>

        {/* What is Plotweavers */}
        <section className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 border border-transparent dark:border-gray-700">
          <h2 className="text-2xl font-semibold text-pink-600 dark:text-pink-400 mb-3">
            {t("howto.plotweaversTitle")}
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            {t("howto.plotweaversText")}
          </p>
        </section>

        {/* What is a Manga Plot */}
        <section className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 border border-transparent dark:border-gray-700">
          <h2 className="text-2xl font-semibold text-indigo-500 dark:text-indigo-300 mb-3">
            {t("howto.mangaPlotTitle")}
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            {t("howto.mangaPlotText1")}
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            {t("howto.mangaPlotText2")}
          </p>
        </section>

        {/* Genres & Tropes */}
        <section className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 border border-transparent dark:border-gray-700">
          <h2 className="text-2xl font-semibold text-pink-600 dark:text-pink-400 mb-3">
            {t("howto.genresTitle")}
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            {t("howto.genresText")}
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mb-4">
            <li>
              <span className="font-semibold text-gray-900 dark:text-white">
                {t("howto.labelShonen")}
              </span>{" "}
              {t("howto.genreShonen")}
            </li>
            <li>
              <span className="font-semibold text-gray-900 dark:text-white">
                {t("howto.labelShojo")}
              </span>{" "}
              {t("howto.genreShojo")}
            </li>
            <li>
              <span className="font-semibold text-gray-900 dark:text-white">
                {t("howto.labelSeinen")}
              </span>{" "}
              {t("howto.genreSeinen")}
            </li>
            <li>
              <span className="font-semibold text-gray-900 dark:text-white">
                {t("howto.labelIsekai")}
              </span>{" "}
              {t("howto.genreIsekai")}
            </li>
            <li>
              <span className="font-semibold text-gray-900 dark:text-white">
                {t("howto.labelSliceOfLife")}
              </span>{" "}
              {t("howto.genreSliceOfLife")}
            </li>
            <li>
              <span className="font-semibold text-gray-900 dark:text-white">
                {t("howto.labelHorror")}
              </span>{" "}
              {t("howto.genreHorror")}
            </li>
            <li>
              <span className="font-semibold text-gray-900 dark:text-white">
                {t("howto.labelComedy")}
              </span>{" "}
              {t("howto.genreComedy")}
            </li>
          </ul>
          <p className="text-gray-700 dark:text-gray-300">
            {t("howto.tropesText")}
          </p>
        </section>

        {/* Building a Great Chapter */}
        <section className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 border border-transparent dark:border-gray-700">
          <h2 className="text-2xl font-semibold text-indigo-500 dark:text-indigo-300 mb-3">
            {t("howto.chapterTitle")}
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              <span className="font-semibold text-gray-900 dark:text-white">
                {t("howto.labelHook")}
              </span>{" "}
              {t("howto.chapterHook")}
            </li>
            <li>
              <span className="font-semibold text-gray-900 dark:text-white">
                {t("howto.labelConflict")}
              </span>{" "}
              {t("howto.chapterConflict")}
            </li>
            <li>
              <span className="font-semibold text-gray-900 dark:text-white">
                {t("howto.labelCliffhanger")}
              </span>{" "}
              {t("howto.chapterCliffhanger")}
            </li>
            <li>
              <span className="font-semibold text-gray-900 dark:text-white">
                {t("howto.labelDialogue")}
              </span>{" "}
              {t("howto.chapterDialogue")}
            </li>
            <li>
              <span className="font-semibold text-gray-900 dark:text-white">
                {t("howto.labelFormatting")}
              </span>{" "}
              {t("howto.chapterFormatting")}
            </li>
          </ul>
        </section>

        {/* Rules */}
        <section className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 border border-transparent dark:border-gray-700">
          <h2 className="text-2xl font-semibold text-pink-600 dark:text-pink-400 mb-3">
            {t("howto.rulesTitle")}
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              <span className="font-semibold text-gray-900 dark:text-white">
                {t("howto.labelNoViolence")}
              </span>{" "}
              {t("howto.rulesViolence")}
            </li>
            <li>
              <span className="font-semibold text-gray-900 dark:text-white">
                {t("howto.labelNoHate")}
              </span>{" "}
              {t("howto.rulesHate")}
            </li>
            <li>
              <span className="font-semibold text-gray-900 dark:text-white">
                {t("howto.labelErotica")}
              </span>{" "}
              {t("howto.rulesErotica")}
            </li>
            <li>
              <span className="font-semibold text-gray-900 dark:text-white">
                {t("howto.labelPlagiarism")}
              </span>{" "}
              {t("howto.rulesPlagiarism")}
            </li>
            <li>
              <span className="font-semibold text-gray-900 dark:text-white">
                {t("howto.labelAI")}
              </span>{" "}
              {t("howto.rulesAI")}
            </li>
          </ul>
        </section>

        {/* Tips & Writing Aids */}
        <section className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 border border-transparent dark:border-gray-700">
          <h2 className="text-2xl font-semibold text-indigo-500 dark:text-indigo-300 mb-3">
            {t("howto.tipsTitle")}
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              <span className="font-semibold text-gray-900 dark:text-white">
                {t("howto.labelChapterLength")}
              </span>{" "}
              {t("howto.tipsLength")}
            </li>
            <li>
              <span className="font-semibold text-gray-900 dark:text-white">
                {t("howto.labelPlanningTools")}
              </span>{" "}
              {t("howto.tipsPlanning")}
            </li>
            <li>
              <span className="font-semibold text-gray-900 dark:text-white">
                {t("howto.labelFeedback")}
              </span>{" "}
              {t("howto.tipsFeedback")}
            </li>
          </ul>
        </section>

        {/* Inspiration */}
        <section className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 border border-transparent dark:border-gray-700">
          <h2 className="text-2xl font-semibold text-pink-600 dark:text-pink-400 mb-3">
            {t("howto.inspirationTitle")}
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            {t("howto.inspirationText")}
          </p>
        </section>
      </div>
    </div>
  );
}
