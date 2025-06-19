import i18next from "i18next";
import translations from "./locales/index.js";

const i18nextInstance = i18next.createInstance();
i18nextInstance.init({
  lng: "ru",
  resources: translations,
  fallbackLng: "ru",
  supportedLngs: ["en", "ru"],
});

export default i18nextInstance;
