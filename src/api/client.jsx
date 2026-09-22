// src/api/axios.js
import axios from "axios";
import i18n from "../i18n/i18n";

const api = axios.create({
  baseURL: "https://lfw.hostorr.net/api",
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
  },
});

// Helper: always resolve a valid language, never undefined
const getLang = () => {
  const lang =
    i18n?.resolvedLanguage ||
    i18n?.language ||
    localStorage.getItem("i18nextLng") ||
    "ar";
  // normalize: "ar-SA" -> "ar"
  return lang.split("-")[0];
};

// Attach `lang` header to every request (no query params)
api.interceptors.request.use(
  (config) => {
    const lang = getLang();

    // Works with Axios 1.x (AxiosHeaders) and older versions
    if (typeof config.headers?.set === "function") {
      config.headers.set("lang", lang);
    } else {
      config.headers = config.headers || {};
      config.headers["lang"] = lang;
    }

    if (import.meta.env?.DEV) {
      console.log("[axios] lang header:", lang, "->", config.url);
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Optional: log the response language to confirm the backend honored it
api.interceptors.response.use(
  (response) => {
    if (import.meta.env?.DEV) {
      const cl = response.headers?.["content-language"];
      if (cl) console.log("[axios] Content-Language from server:", cl);
    }
    return response;
  },
  (error) => Promise.reject(error)
);

export default api;