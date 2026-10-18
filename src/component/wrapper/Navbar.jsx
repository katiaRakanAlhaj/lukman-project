import { useEffect, useState, useRef } from "react";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import logo from "../../assets/images/logo.png";
import youtube from "../../assets/images/youtube.svg";
import facebook from "../../assets/images/facebook.svg";
import twitter from "../../assets/images/x.svg";
import instgram from "../../assets/images/instgram.svg";
import linkedin from "../../assets/images/linkedin.svg";
import clock from "../../assets/images/clock.svg";

/* ── Live clock hook ─────────────────────────────── */
function useNow(intervalMs = 1000) {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);
  return now;
}

/* ── Formatters ──────────────────────────────────── */
function formatTime(date) {
  return new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(date);
}

function formatDate(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/* ── Nav links (keys only, translated via t()) ───── */
const navLinks = [
  { to: "/", key: "home" },
  { to: "/Resume", key: "resume" },
  { to: "/Activities", key: "activities" },
  { to: "/Articles", key: "articles" },
  { to: "/Milestone", key: "milestone" },
  {
    to: "/Media",
    key: "media",
    children: [
      { to: "/Media/Videos", key: "videos" },
      { to: "/Media/Images", key: "images" },
    ],
  },
  { to: "/Contact", key: "contact" },
];

/* ── Helper: check if a social link is valid ─────── */
const isValidSocialLink = (href) => {
  if (!href) return false;
  const trimmed = String(href).trim();
  if (trimmed === "" || trimmed === "#") return false;
  return true;
};

const Navbar = ({ contactData }) => {
  const { t } = useTranslation();

  const socials = [
    {
      href: contactData?.data?.linkedin,
      icon: linkedin,
      alt: t("navbar.linkedin"),
    },
    {
      href: contactData?.data?.instagram,
      icon: instgram,
      alt: t("navbar.instagram"),
    },
    { href: contactData?.data?.x, icon: twitter, alt: t("navbar.twitter") },
    {
      href: contactData?.data?.facebook,
      icon: facebook,
      alt: t("navbar.facebook"),
    },
    {
      href: contactData?.data?.youtube,
      icon: youtube,
      alt: t("navbar.youtube"),
    },
  ].filter((s) => isValidSocialLink(s.href));

  const { lang } = useParams();
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const currentLang = lang === "en" ? "en" : "ar";
  const otherLang = currentLang === "ar" ? "en" : "ar";

  const now = useNow(1000);
  const time = formatTime(now);
  const date = formatDate(now);

  /* ── Dropdown state ────────────────────────────── */
  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close dropdown on route change
  useEffect(() => {
    setOpenDropdown(null);
  }, [location.pathname]);

  /* ── Active link detection ─────────────────────── */
  const isActive = (to) => {
    const fullPath = `/${currentLang}${to}`;
    const normalize = (p) => p.replace(/\/+$/, "") || "/";
    return normalize(location.pathname) === normalize(fullPath);
  };

  // For parent with children, active if path starts with parent path
  const isParentActive = (item) => {
    if (item.children) {
      const parentPath = `/${currentLang}${item.to}`.replace(/\/+$/, "");
      const normalize = (p) => p.replace(/\/+$/, "") || "/";
      const currentPath = normalize(location.pathname);
      return (
        currentPath === parentPath || currentPath.startsWith(parentPath + "/")
      );
    }
    return isActive(item.to);
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

  const toggleDropdown = (key) => {
    setOpenDropdown((prev) => (prev === key ? null : key));
  };

  return (
    <div className="relative z-10 w-full">
      {/* ── Top bar ───────────────────────────────────── */}
      <div className="w-full bg-secondary">
        <div className="container1 mx-auto flex justify-between items-center h-[2.6rem]">
          {/* Clock + date */}
          <div className="flex items-center gap-x-2 text-white text-[0.8rem]">
            <img className="w-5" alt="Clock" src={clock} />
            <div className="flex font-[400] gap-x-2 mt-2">
              <p>{time}</p>
              <p>|</p>
              <p>{date}</p>
            </div>
          </div>

          {/* Social icons — only rendered if valid */}
          {socials.length > 0 && (
            <div className="flex gap-[2rem]">
              {socials.map(({ href, icon, alt }) => (
                <a
                  key={alt}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer"
                >
                  <img
                    src={icon}
                    alt={alt}
                    className="w-[1.2rem] h-[1.2rem] object-contain"
                  />
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Main bar ──────────────────────────────────── */}
      <div
        className="h-[7.5rem] bg-white mx-auto flex items-center"
        style={{ boxShadow: "rgba(0, 0, 0, 0.25) 0px 8px 8px 0px" }}
      >
        <div className="container1 mx-auto w-full flex justify-between items-center">
          <Link to={`/${currentLang}/`}>
            <img
              alt="Logo"
              src={logo}
              style={{ width: "11.9rem", height: "auto" }}
            />
            <p className="text-primary text-[1rem] mt-2">
              {t("navbar.tagline")}
            </p>
          </Link>

          <div
            ref={dropdownRef}
            className="flex gap-x-10 justify-center flex-1 relative"
          >
            {navLinks.map((item) => {
              const { to, key, children } = item;
              const active = isParentActive(item);

              /* ── Regular link (no children) ─────────── */
              if (!children) {
                return (
                  <Link
                    key={to}
                    to={`/${currentLang}${to}`}
                    aria-current={active ? "page" : undefined}
                    className={`relative cursor-pointer text-[1.2rem] transition-colors duration-200 pb-4 ${
                      active
                        ? "text-negative font-bold"
                        : "text-primary hover:text-secondary font-normal"
                    }`}
                  >
                    {t(`navbar.${key}`)}

                    {active && (
                      <span
                        className="absolute left-0 right-0 -bottom-[2rem] bg-negative"
                        style={{ height: "2.2rem", width: "100%" }}
                      />
                    )}
                  </Link>
                );
              }

              /* ── Link with dropdown ─────────────────── */
              const isOpen = openDropdown === key;

              return (
                <div key={to} className="relative">
                  <button
                    type="button"
                    onClick={() => toggleDropdown(key)}
                    aria-haspopup="true"
                    aria-expanded={isOpen}
                    className={`relative flex items-center gap-x-1 cursor-pointer text-[1.2rem] transition-colors duration-200 pb-4 bg-transparent border-none ${
                      active
                        ? "text-negative font-bold"
                        : "text-primary hover:text-secondary font-normal"
                    }`}
                  >
                    {t(`navbar.${key}`)}
                    <svg
                      className={`w-3 h-3 transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
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

                    {active && (
                      <span
                        className="absolute left-0 right-0 -bottom-[2rem] bg-negative"
                        style={{ height: "2.2rem", width: "100%" }}
                      />
                    )}
                  </button>

                  {/* ── Dropdown menu ─────────────────────── */}
                  {isOpen && (
                    <div
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-3 min-w-[11rem] bg-white rounded-xl overflow-hidden z-50 py-2"
                      style={{
                        border: "1px solid #E5E7EB",
                        boxShadow:
                          "0 10px 25px -5px rgba(0, 0, 0, 0.15), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
                        animation: "dropdownFadeIn 0.18s ease-out",
                      }}
                    >
                      {children.map((child, index) => {
                        const childActive = isActive(child.to);
                        return (
                          <Link
                            key={child.to}
                            to={`/${currentLang}${child.to}`}
                            className={`block mx-1 px-4 py-2.5 text-[1rem] rounded-lg transition-all duration-150 ${
                              childActive
                                ? "bg-negative text-white font-bold"
                                : "text-primary hover:bg-gray-50 hover:text-secondary font-normal"
                            }`}
                            style={index !== children.length - 1 ? {} : {}}
                          >
                            {t(`navbar.${child.key}`)}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          {/* 
          <button
            type="button"
            onClick={handleSwitchLanguage}
            className="cursor-pointer text-primary font-semibold"
            style={
              otherLang === "ar"
                ? { fontFamily: "'ShamelSansOne', sans-serif" }
                : { fontFamily: "'Lufga', sans-serif" }
            }
          >
            <p className="text-[1.1rem]">
              {otherLang === "en" ? t("navbar.english") : t("navbar.arabic")}
            </p>
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
