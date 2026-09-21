// src/api/axios.js or axios.ts
import axios from "axios";
import i18n from "../i18n/i18n";
// src/api/axios.js
const api = axios.create({
    baseURL: "https://lfw.hostorr.net/api",
    withCredentials: false, // Add this
    headers: {
        'Content-Type': 'application/json',
    }
});
// Add the Accept-Language header dynamically to every request
api.interceptors.request.use((config) => {
    config.headers["Accept-Language"] = i18n.language || "ar"; // or "en"
    return config;
});

export default api;