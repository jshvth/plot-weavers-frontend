import heroImage from "../../assets/images/hero-girl.webp";
import { useTranslation } from "react-i18next";

export default function HeroSection() {
  const { t } = useTranslation();

  return (
    <section
      className="
      relative
      bg-white dark:bg-gray-900
      min-h-[55vh] sm:min-h-[60vh] lg:min-h-[85vh] xl:min-h-screen hero-viewport
      flex items-center
      pt-10 sm:pt-12 py-14 sm:py-18 lg:py-24 px-4 sm:px-6 md:px-12 lg:px-20
      transition-colors duration-300
    "
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center hero-mac-lift">
        {/* Text-Bereich */}
        <div className="flex-1 text-center md:text-left">
          {/* Hauptüberschrift (h1): dark:text-white hinzugefügt */}
          <h1
            className="
            text-3xl sm:text-4xl md:text-5xl
            font-extrabold font-space
            text-gray-900 dark:text-white
            leading-tight
            animate-hero-1
          "
          >
            {t("hero.titlePrefix")}
            <span className="text-pink-500">
              {t("hero.titleEmphasis")}
            </span>
            {t("hero.titleSuffix")}
          </h1>

          {/* Beschreibungstext: dark:text-gray-300 für gute Lesbarkeit */}
          <p
            className="
            mt-6 text-lg
            text-gray-700 dark:text-gray-300
            max-w-xl mx-auto md:mx-0
            animate-hero-2
          "
          >
            {t("hero.subtitle")}
          </p>

          <div className="mt-8 flex flex-wrap justify-center md:justify-start gap-3 animate-hero-3">
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
                bg-white/80 dark:bg-gray-700
                text-gray-900 dark:text-white
                border border-gray-300/60 dark:border-gray-600
                shadow-sm
                hover:bg-gray-100 dark:hover:bg-gray-600
                transition-transform transition-shadow duration-300
                hover:-translate-y-0.5
              "
            >
              {t("hero.ctaDiscover")}
            </a>
          </div>
        </div>

        {/* Bild-Bereich */}
        <div className="flex-1 mt-10 md:mt-0 md:ml-10 flex justify-center animate-hero-4">
          <img
            src={heroImage}
            alt={t("hero.imageAlt")}
            className="w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[36rem] lg:h-[36rem] object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.15)]"
          />
        </div>
      </div>
    </section>
  );
}
