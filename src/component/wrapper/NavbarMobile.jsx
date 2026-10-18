import { useState, useEffect, useRef } from "react";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import logo from "../../assets/images/logo.png";

/* ── Nav links (key = translation key, path = route segment) ─────── */
const navLinks = [
  { path: "/", key: "home" },
  { path: "/resume", key: "resume" },
  { path: "/activities", key: "activities" },
  { path: "/articles", key: "articles" },
  { path: "/Milestone", key: "milestone" },
  {
    path: "/media",
    key: "media",
    children: [
      { path: "/Media/Videos", key: "videos" },
      { path: "/Media/Images", key: "images" },
    ],
  },
  { path: "/contact", key: "contact" },
  { path: "/Vision", key: "vision" },
  { path: "/united_nation", key: "united" },
  { path: "/Books", key: "books" },
  { path: "/Highlights", key: "highlights" },
  { path: "/Links", key: "links" },
];

/* ── Shared class strings ────────────────────────────────────────── */
const linkClass =
  "text-[1.3rem] font-[400] py-2 px-4 rounded-lg transition-colors text-white hover:bg-[#004a63]";
const activeLinkClass =
  "text-[1.3rem] font-bold py-2 px-4 rounded-lg transition-colors text-negative bg-[#004a63]/40";
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
  const [openDropdown, setOpenDropdown] = useState(null);

  const { t, i18n } = useTranslation();
  const { lang } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const currentLang = lang === "en" ? "en" : "ar";
  const otherLang = currentLang === "ar" ? "en" : "ar";

  /* ── Close dropdown on route change ────────────── */
  useEffect(() => {
    setOpenDropdown(null);
  }, [location.pathname]);

  /* ── Active link detection ─────────────────────── */
  const normalize = (p) => p.replace(/\/+$/, "") || "/";

  const isActive = (path) => {
    const fullPath = `/${currentLang}${path}`;
    return normalize(location.pathname) === normalize(fullPath);
  };

  // Parent is active if the current path matches it OR any of its children
  const isParentActive = (item) => {
    if (item.children) {
      const parentPath = normalize(`/${currentLang}${item.path}`);
      const currentPath = normalize(location.pathname);
      const parentMatch =
        currentPath === parentPath || currentPath.startsWith(parentPath + "/");
      const childMatch = item.children.some((child) => isActive(child.path));
      return parentMatch || childMatch;
    }
    return isActive(item.path);
  };

  const handleSwitchLanguage = () => {
    const segments = location.pathname.split("/").filter(Boolean);
    segments[0] = otherLang;
    const newPath = "/" + segments.join("/");
    i18n.changeLanguage(otherLang);
    localStorage.setItem("language", otherLang);
    navigate(newPath, { replace: true });
    window.location.reload();
  };

  const closeMenu = () => {
    setIsOpen(false);
    setOpenDropdown(null);
  };

  const toggleDropdown = (key) => {
    setOpenDropdown((prev) => (prev === key ? null : key));
  };

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
            {/* <button
              type="button"
              onClick={handleSwitchLanguage}
              className="cursor-pointer font-semibold text-primary"
            >
              <p
                style={
                  otherLang === "ar"
                    ? { fontFamily: "'ShamelSansOne', sans-serif" }
                    : { fontFamily: "'Lufga', sans-serif" }
                }
                className="text-[1.1rem]"
              >
                {otherLang === "en" ? t("navbar.english") : t("navbar.arabic")}
              </p>
            </button> */}

            <button
              className={`${iconBaseClass} ${
                isOpen ? "text-white" : "text-primary"
              }`}
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? (
                <svg {...iconProps} viewBox="0 0 352 512">
                  <path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path>
                </svg>
              ) : (
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
          {navLinks.map((item) => {
            const { path, key, children } = item;
            const active = isParentActive(item);

            /* ── Regular link (no children) ─────────── */
            if (!children) {
              return (
                <Link
                  key={path}
                  to={`/${currentLang}${path}`}
                  onClick={closeMenu}
                  aria-current={active ? "page" : undefined}
                  className={active ? activeLinkClass : linkClass}
                >
                  {t(`navbar.${key}`)}
                </Link>
              );
            }

            /* ── Link with dropdown ─────────────────── */
            const isDropdownOpen = openDropdown === key;

            return (
              <div key={path} className="flex flex-col">
                <button
                  type="button"
                  onClick={() => toggleDropdown(key)}
                  aria-haspopup="true"
                  aria-expanded={isDropdownOpen}
                  className={`${
                    active ? activeLinkClass : linkClass
                  } flex items-center justify-between w-full text-left`}
                >
                  <span>{t(`navbar.${key}`)}</span>
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isDropdownOpen ? "rotate-180" : ""
                    }`}
                    viewBox="0 0 12 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 1.5L6 6.5L11 1.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                {/* ── Dropdown children ──────────────── */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isDropdownOpen
                      ? "max-h-40 opacity-100 mt-1"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="flex flex-col gap-1 pl-4 border-l-2 border-white/30 ml-4">
                    {children.map((child) => {
                      const childActive = isActive(child.path);
                      return (
                        <Link
                          key={child.path}
                          to={`/${currentLang}${child.path}`}
                          onClick={closeMenu}
                          aria-current={childActive ? "page" : undefined}
                          className={`text-[1.15rem] py-2 px-4 rounded-lg transition-colors ${
                            childActive
                              ? "font-bold text-negative bg-[#004a63]/40"
                              : "font-[400] text-white/90 hover:bg-[#004a63] hover:text-white"
                          }`}
                        >
                          {t(`navbar.${child.key}`)}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default NavbarMobile;