import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import English from "./locales/en/translation.json";
import French from "./locales/fr/translation.json";
import Portuguese from "./locales/pt/translation.json";

const resources = {
  en: { translation: English },
  pt: { translation: Portuguese },
  fr: { translation: French },
};

i18n.use(initReactI18next).init({
  debug: false,
  resources,
  fallbackLng: "pt",
});
export default i18n;
