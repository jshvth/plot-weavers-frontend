import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import de from "./locales/de.json";
import en from "./locales/en.json";

const savedLanguage = localStorage.getItem("lang");
const supportedLanguages = ["de", "en"];
const initialLanguage = supportedLanguages.includes(savedLanguage)
  ? savedLanguage
  : "en";

i18n.use(initReactI18next).init({
  resources: {
    de: { translation: de },
    en: { translation: en },
  },
  lng: initialLanguage,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

i18n.on("languageChanged", (lng) => {
  document.documentElement.lang = lng;
  localStorage.setItem("lang", lng);
});

document.documentElement.lang = initialLanguage;
if (!supportedLanguages.includes(savedLanguage)) {
  localStorage.setItem("lang", "en");
}

export default i18n;
