// src/App.jsx
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  useParams,
  useNavigate,
  Outlet,
  useLocation,
  Navigate,
} from "react-router-dom";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Wrapper from "./component/wrapper/wrapper";
import i18n from "./i18n/i18n";
import Home from "./pages/Home";
import Resume from "./pages/Resume";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
      refetchIntervalInBackground: true,
      retry: 2,
      networkMode: "always",
    },
  },
});

function LanguageHandler() {
  const { lang } = useParams();
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    console.log("📍 Current lang:", lang);
    console.log("📍 Current path:", location.pathname);

    let languageToUse = lang;

    if (!languageToUse || (languageToUse !== "en" && languageToUse !== "ar")) {
      // ✅ Default to Arabic instead of English
      languageToUse = localStorage.getItem("language") || "ar";
    }

    if (i18n.language !== languageToUse) {
      i18n.changeLanguage(languageToUse);
    }

    const isArabic = languageToUse === "ar";
    document.documentElement.dir = isArabic ? "rtl" : "ltr";
    document.documentElement.lang = languageToUse;

    if (isArabic) {
      document.documentElement.style.fontFamily = "ShamelSansOne, sans-serif";
    } else {
      document.documentElement.style.fontFamily = "Lufga, sans-serif";
    }

    document.documentElement.style.fontWeight = "400";
    localStorage.setItem("language", languageToUse);

    // Redirect root to language path
    if (location.pathname === "/") {
      navigate(`/${languageToUse}`, { replace: true });
    }
  }, [lang, i18n, navigate, location.pathname]);

  return <Outlet />;
}

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<LanguageHandler />}>
        {/* ✅ Redirect root to /ar instead of /en */}
        <Route path="/" element={<Navigate to="/ar" replace />} />

        {/* Language routes */}
        <Route path="/:lang" element={<Wrapper />}>
          <Route index element={<Home />} />
          <Route path = "Resume" element={<Resume />} />

          {/* 404 route */}
          {/* <Route path="*" element={<NotFound />} /> */}
        </Route>
      </Route>,
    ),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
