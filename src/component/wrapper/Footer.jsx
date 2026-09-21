// src/component/footer/Footer.jsx
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import logo from "../../assets/images/logo.png";
import youtube from "../../assets/images/youtube.svg";
import facebook from "../../assets/images/facebook.svg";
import twitter from "../../assets/images/twitter.svg";
import instgram from "../../assets/images/instgram.svg";
import linkedin from "../../assets/images/linkedin.svg";

/* ── Quick links (keys only, translated via t()) ─── */
const quickLinksCol1 = [
  { to: "/resume", key: "resume" },
  { to: "/activities", key: "activities" },
  { to: "/articles", key: "articles" },
  { to: "/media", key: "media" },
];

const quickLinksCol2 = [
  { to: "/vision_and_principles", key: "visionAndPrinciples" },
  { to: "/important_links", key: "importantLinks" },
  { to: "/united_nations", key: "unitedNations" },
  { to: "/books_and_research", key: "booksAndResearch" },
];

/* ── Helper: check if a social link is valid ─────── */
const isValidSocialLink = (href) => {
  if (!href) return false;
  const trimmed = String(href).trim();
  if (trimmed === "" || trimmed === "#" || trimmed === ".") return false;
  return true;
};

const Footer = ({ contactData }) => {
  const { t } = useTranslation();
  const { lang } = useParams();
  const currentLang = lang === "en" ? "en" : "ar";

  const allSocials = [
    {
      href: contactData?.data?.linkedin,
      icon: linkedin,
      alt: t("footer.linkedin"),
    },
    {
      href: contactData?.data?.instagram,
      icon: instgram,
      alt: t("footer.instagram"),
    },
    { href: contactData?.data?.x, icon: twitter, alt: t("footer.twitter") },
    {
      href: contactData?.data?.facebook,
      icon: facebook,
      alt: t("footer.facebook"),
    },
    {
      href: contactData?.data?.youtube,
      icon: youtube,
      alt: t("footer.youtube"),
    },
  ];

  // Only keep socials with a valid link
  const socials = allSocials.filter(({ href }) => isValidSocialLink(href));

  return (
    <div className="w-full lg:h-[35em] overflow-hidden bg-[#00161C] mt-[5rem]">
      <div className="container2 mx-auto py-[3rem]">
        <div className="flex flex-col space-y-[3em]">
          {/* ── Logo + tagline ─────────────────────── */}
          <div className="md:flex lg:space-y-0 space-y-[1rem] justify-between">
            <div>
              <Link to={`/${currentLang}/`}>
                <img
                  src={logo}
                  alt="Logo"
                  style={{
                    width: "11.9rem",
                    filter: "brightness(0) invert(1)",
                  }}
                />
              </Link>
              <p className="text-[#FFFFFF] mt-1" style={{ fontSize: "1rem" }}>
                {t("footer.tagline")}
              </p>
            </div>
            <div className="relative flex justify-center items-center" />
          </div>

          {/* ── Divider ────────────────────────────── */}
          <div className="w-full h-[0.1em] bg-[#C1C7CD]" />

          {/* ── Quick links + Join us ──────────────── */}
          <div>
            <p className="text-white text-[1.2em] font-bold">
              {t("footer.quickLinks")}
            </p>

            <div className="mt-[2em] grid grid-cols-2 md:grid-cols-2 lg:grid-cols-12 lg:gap-y-0 md:gap-y-[2rem] gap-y-[2rem]">
              {/* Column 1 */}
              <div className="col-span-1 lg:col-span-4 space-y-1">
                {quickLinksCol1.map(({ to, key }) => (
                  <div key={to} className="flex items-center gap-x-2 mb-2">
                    <div className="w-[1em] h-[0.1em] bg-[#099EC8] rounded-full translate-y-[-0.2em]" />
                    <Link
                      to={`/${currentLang}${to}`}
                      className="text-white text-[1em]"
                    >
                      {t(`footer.${key}`)}
                    </Link>
                  </div>
                ))}
              </div>

              {/* Column 2 */}
              <div className="col-span-1 lg:col-span-4 space-y-1">
                {quickLinksCol2.map(({ to, key }) => (
                  <div key={to} className="flex items-center gap-x-2 mb-2">
                    <div className="w-[1em] h-[0.1em] bg-[#099EC8] rounded-full translate-y-[-0.2em]" />
                    <Link
                      to={`/${currentLang}${to}`}
                      className="text-white text-[1em]"
                    >
                      {t(`footer.${key}`)}
                    </Link>
                  </div>
                ))}
              </div>

              {/* Column 3 — Join us */}
              <div className="col-span-1 lg:col-span-4">
                <p className="text-white font-bold text-[1.2em]">
                  {t("footer.joinUs")}
                </p>
                {socials.length > 0 && (
                  <div className="flex justify-between mt-3">
                    <div className="flex gap-[5.5rem]">
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
                            className="w-[1.7rem] h-[1.7rem] object-contain"
                            style={{ filter: "brightness(0) invert(1)" }}
                          />
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ── Divider ────────────────────────────── */}
          <div className="w-full h-[0.1em] bg-[#C1C7CD]" />

          {/* ── Copyright ──────────────────────────── */}
          <div className="flex justify-center items-center">
            <p className="text-white text-center">{t("footer.rights")}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
