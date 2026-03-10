import { useTranslation } from "react-i18next";

export default function Imprint() {
  const { t } = useTranslation();

  return (
    <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
      {t("imprint.title")}
    </h1>
  );
}
