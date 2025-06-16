import i18next from "i18next";
import translations from "./locales/index.js";
i18next.init({
  lng: "ru",
  resources: translations,
  fallbackLng: "ru",
  supportedLngs: ["en", "ru"],
});

export default i18next;
