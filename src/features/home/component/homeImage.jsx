// src/features/home/component/homeImage.jsx
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import vission from "../../../assets/images/vission.svg";
import united from "../../../assets/images/united.svg";
import books from "../../../assets/images/books.svg";
import highlights from "../../../assets/images/highlights.svg";
import links from "../../../assets/images/links.svg";

/* ── Cards (keys only, translated via t()) ───────── */
const cards = [
  { id: 1, to: "/vision", icon: vission, key: "vision" },
  { id: 2, to: "/united", icon: united, key: "united" },
  { id: 3, to: "/books", icon: books, key: "books" },
  { id: 4, to: "/highlights", icon: highlights, key: "highlights" },
  { id: 5, to: "/links", icon: links, key: "links" },
];

const HomeImage = ({ banner }) => {
  const { t } = useTranslation();
  const { lang } = useParams();
  const currentLang = lang === "en" ? "en" : "ar";

  return (
    <div className="w-full lg:h-[100vh] h-[20em] relative">
      {/* ── Background banner ─────────────────────── */}
      <div
        className="absolute w-full h-full bg-cover"
        style={{
          backgroundImage: banner ? `url("${banner}")` : undefined,
          backgroundColor: "#262626",
        }}
      />

      {/* ── Cards row (desktop only) ──────────────── */}
      <div className="lg:block hidden">
        <div className="absolute -bottom-16 w-full">
          <div className="container1 mx-auto">
            <div className="grid grid-cols-5 gap-4 rounded-lg">
              {cards.map(({ id, to, icon, key }) => (
                <Link
                  key={id}
                  to={`/${currentLang}${to}`}
                  className="h-36 bg-[#262626] hover:bg-primary transition-all duration-300 rounded-lg flex items-center justify-center text-white cursor-pointer"
                >
                  <div className="flex flex-col items-center space-y-3">
                    <img
                      className="w-[4em] h-[4em] object-contain"
                      src={icon}
                      alt={t(`homeImage.${key}`)}
                    />
                    <p className="font-bold text-[1.1em]">
                      {t(`homeImage.${key}`)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeImage;
