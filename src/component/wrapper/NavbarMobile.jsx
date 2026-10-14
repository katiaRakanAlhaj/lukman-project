import { useState } from "react";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import logo from "../../assets/images/logo.png";

/* ── Nav links (key = translation key, path = route segment) ─────── */
const navLinks = [
  { path: "/", key: "home" },
  { path: "/resume", key: "resume" },
  { path: "/activities", key: "activities" },
  { path: "/articles", key: "articles" },
  { path: "/media", key: "media" },
  { path: "/contact", key: "contact" },
  { path: "/Vision", key: "vision" },
  { path: "/united_nation", key: "united" },
  { path: "/Books", key: "books" },
  { path: "/Highlights", key: "highlights" },
  { path: "/Links", key: "links" },
];

/* ── Shared class strings (no repetition) ────────────────────────── */
const linkClass =
  "text-[1.3rem] font-[400] py-2 px-4 rounded-lg transition-colors text-white hover:bg-[#004a63]";
const iconBaseClass = "text-3xl transition-colors";
const iconProps = {
  stroke: "currentColor",
  fill: "currentColor",
  strokeWidth: "0",
  height: "1em",
  width: "1em",
  xmlns: "http://www.w3.org/2000/svg",
};

const NavbarMobile = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { t, i18n } = useTranslation();
  const { lang } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const currentLang = lang === "en" ? "en" : "ar";
  const otherLang = currentLang === "ar" ? "en" : "ar";

  const handleSwitchLanguage = () => {
    const segments = location.pathname.split("/").filter(Boolean);
    segments[0] = otherLang;
    const newPath = "/" + segments.join("/");
    i18n.changeLanguage(otherLang);
    localStorage.setItem("language", otherLang);
    navigate(newPath, { replace: true });
    window.location.reload();
  };

  const closeMenu = () => setIsOpen(false);

  return (
    <div className="relative h-[4.5rem]">
      {/* Top bar — always above the sidebar (z-50) */}
      <div className="absolute top-0 left-0 right-0 z-50">
        <div className="flex justify-between items-center w-full px-4 pt-2">
          {/* Logo */}
          <Link to={`/${currentLang}/`} onClick={closeMenu}>
            <img
              className="h-[2.8rem] mt-2 w-auto object-cover"
              alt="Logo"
              src={logo}
            />
          </Link>

          {/* Language + menu button */}
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={handleSwitchLanguage}
              className="cursor-pointer font-semibold text-primary"
            >
              <p
                className="text-[1.1rem]"
                style={{ fontFamily: "Roboto, sans-serif" }}
              >
                {otherLang === "en" ? t("navbar.english") : t("navbar.arabic")}
              </p>
            </button>

            <button
              className={`${iconBaseClass} ${
                isOpen ? "text-white" : "text-primary"
              }`}
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? (
                /* Close (X) — white */
                <svg {...iconProps} viewBox="0 0 352 512">
                  <path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path>
                </svg>
              ) : (
                /* Hamburger (☰) — primary */
                <svg {...iconProps} viewBox="0 0 448 512">
                  <path d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"></path>
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Backdrop overlay — only when menu is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={closeMenu}
        ></div>
      )}

      {/* Slide-in menu panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full bg-[#005774] z-40 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ maxHeight: "100%", overflowY: "auto" }}
      >
        <div className="flex flex-col p-6 space-y-4 mt-[1rem]">
          {navLinks.map(({ path, key }) => (
            <Link
              key={path}
              to={`/${currentLang}${path}`}
              onClick={closeMenu}
              className={linkClass}
            >
              {t(`navbar.${key}`)}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NavbarMobile;
