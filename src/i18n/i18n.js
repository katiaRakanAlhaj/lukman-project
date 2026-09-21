import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enJSON from "../../src/locale/en.json";
import arJSON from "../../src/locale/ar.json";

const resources = {
    en: { translation: enJSON },
    ar: { translation: arJSON }
};

// Default to Arabic always, unless URL explicitly says otherwise
const getInitialLanguage = () => {
    // 1. Check URL first (so /en/... still works)
    const path = window.location.pathname;
    const langMatch = path.match(/^\/(en|ar)(\/|$)/);
    if (langMatch) return langMatch[1];

    // 2. Otherwise ALWAYS Arabic (ignore localStorage)
    return "ar";
};

const language = getInitialLanguage();

i18n
    .use(initReactI18next)
    .init({
        resources: resources,
        fallbackLng: "ar", // Arabic is the fallback
        debug: true,
        interpolation: {
            escapeValue: false,
        },
        lng: language, // Initial language = Arabic
    }, (err) => {
        if (err) {
            console.log('i18next init error:', err);
            return;
        }
        console.log('i18next initialized with language:', language);

        // Set RTL direction for Arabic
        document.documentElement.lang = language;
        document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    });

export default i18n;