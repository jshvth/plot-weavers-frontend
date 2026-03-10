import heroImage from "../../assets/images/hero-girl.webp";
import { useTranslation } from "react-i18next";

export default function HeroSection() {
  const { t } = useTranslation();

  return (
    <section
      className="
      relative
      bg-white dark:bg-gray-900
      min-h-[60vh]
      flex items-center
      pt-6 py-16 px-6 md:px-12 lg:px-20
      transition-colors duration-300
    "
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center">
        {/* Text-Bereich */}
        <div className="flex-1 text-center md:text-left">
          {/* Hauptüberschrift (h1): dark:text-white hinzugefügt */}
          <h1
            className="
            text-4xl md:text-5xl
            font-extrabold
            text-gray-900 dark:text-white
            leading-tight
          "
          >
            {t("hero.titlePrefix")}
            <span className="text-pink-500">{t("hero.titleEmphasis")}</span>
            {t("hero.titleSuffix")}
          </h1>

          {/* Beschreibungstext: dark:text-gray-300 für gute Lesbarkeit */}
          <p
            className="
            mt-6 text-lg
            text-gray-700 dark:text-gray-300
            max-w-xl mx-auto md:mx-0
          "
          >
            {t("hero.subtitle")}
          </p>

          <div className="mt-8 flex justify-center md:justify-start space-x-4">
            <a
              href="/create"
              className="
                px-6 py-3 rounded-lg
                bg-pink-500 text-white
                font-medium shadow
                hover:bg-pink-600
                transition
              "
            >
              {t("hero.ctaCreate")}
            </a>

            <a
              href="/stories"
              className="
                px-6 py-3 rounded-lg
                bg-white dark:bg-gray-700
                text-gray-900 dark:text-white
                border border-gray-300 dark:border-gray-600
                shadow
                hover:bg-gray-100 dark:hover:bg-gray-600
                transition
              "
            >
              {t("hero.ctaDiscover")}
            </a>
          </div>
        </div>

        {/* Bild-Bereich */}
        <div className="flex-1 mt-10 md:mt-0 md:ml-10 flex justify-center">
          <img
            src={heroImage}
            alt={t("hero.imageAlt")}
            className="w-80 h-80 sm:w-96 sm:h-96 lg:w-[36rem] lg:h-[36rem] object-contain"
          />
        </div>
      </div>
    </section>
  );
}
