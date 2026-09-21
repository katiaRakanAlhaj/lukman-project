// src/component/navbar/Navbar.jsx
import { useEffect, useState } from "react";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import logo from "../../assets/images/logo.png";
import youtube from "../../assets/images/youtube.svg";
import facebook from "../../assets/images/facebook.svg";
import twitter from "../../assets/images/twitter.svg";
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
  { to: "/platform_message", key: "platform" },
  { to: "/Resume", key: "resume" },
  { to: "/activities", key: "activities" },
  { to: "/articles", key: "articles" },
  { to: "/media", key: "media" },
  { to: "/contact", key: "contact" },
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
    { href: contactData?.data?.linkedin, icon: linkedin, alt: t("navbar.linkedin") },
    { href: contactData?.data?.instagram, icon: instgram, alt: t("navbar.instagram") },
    { href: contactData?.data?.x, icon: twitter, alt: t("navbar.twitter") },
    { href: contactData?.data?.facebook, icon: facebook, alt: t("navbar.facebook") },
    { href: contactData?.data?.youtube, icon: youtube, alt: t("navbar.youtube") },
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

  const handleSwitchLanguage = () => {
    const segments = location.pathname.split("/").filter(Boolean);
    segments[0] = otherLang;
    const newPath = "/" + segments.join("/");
    i18n.changeLanguage(otherLang);
    localStorage.setItem("language", otherLang);
    navigate(newPath, { replace: true });
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

          <div className="flex gap-x-8 justify-center flex-1 relative">
            {navLinks.map(({ to, key }) => (
              <Link
                key={to}
                to={`/${currentLang}${to}`}
                className="relative cursor-pointer px-2 py-1 text-primary text-[1.1rem]"
              >
                {t(`navbar.${key}`)}
              </Link>
            ))}
          </div>

          <button
            type="button"
            onClick={handleSwitchLanguage}
            className="cursor-pointer text-primary font-semibold"
          >
            <p className="text-[1.1rem]">
              {otherLang === "en" ? t("navbar.english") : t("navbar.arabic")}
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;