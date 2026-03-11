import { useTranslation } from "react-i18next";

export default function Imprint() {
  const { t } = useTranslation();

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 mt-8 sm:mt-12 mb-12 sm:mb-20">
      <div className="soft-panel p-6 sm:p-8 md:p-10">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 font-space">
          {t("imprint.title")}
        </h1>
      </div>
    </div>
  );
}
