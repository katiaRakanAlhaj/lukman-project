import { useState, useRef, useEffect } from "react";
import i18next from "i18next";
import DOMPurify from "dompurify";
import { descriptionClasses } from "../../../component/ux/descriptionClasses";

const COLLAPSED_LINES = 11;

const WhyTheWebsite = ({ homePageData }) => {
  const { Why_the_website_image, Why_the_website } = homePageData?.data;

  const [expanded, setExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const contentRef = useRef(null);

  const sanitizedHtml = DOMPurify.sanitize(Why_the_website || "");

  // Detect if the content is taller than the collapsed height (9 lines)
  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const checkOverflow = () => {
      if (!el) return;
      // Temporarily remove clamp to measure real height
      const wasExpanded = el.classList.contains("is-expanded");
      if (!wasExpanded) {
        el.style.webkitLineClamp = "unset";
        el.style.display = "block";
      }
      const fullHeight = el.scrollHeight;
      // Restore clamp styles
      if (!wasExpanded) {
        el.style.webkitLineClamp = String(COLLAPSED_LINES);
        el.style.display = "-webkit-box";
      }
      const lineHeight = parseFloat(getComputedStyle(el).lineHeight) || 32;
      const collapsedHeight = lineHeight * COLLAPSED_LINES;
      setIsOverflowing(fullHeight > collapsedHeight + 4);
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, [sanitizedHtml]);

  return (
    <section className="mt-[4rem] py-16 md:py-24 bg-gradient-to-br from-slate-50 to-white overflow-hidden relative">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-60" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 opacity-60" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            {i18next.t("platform_message")}
          </h2>
          <div className="mt-4 w-[6rem] h-[0.25rem] bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
        </div>

        {/* Two-column layout: 1/3 image — 2/3 text */}
        <div className="flex flex-col lg:flex-row items-start gap-10 lg:gap-16">
          {/* Image Column (1/3) */}
          {Why_the_website_image && (
            <div className="w-full lg:w-1/3 flex-shrink-0">
              <div className="relative group lg:sticky lg:top-8">
                <div className="absolute -inset-3 bg-gradient-to-br from-primary/30 to-secondary/30 rounded-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500 blur-sm" />
                <div className="relative rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-500 border border-white/50">
                  <img
                    src={Why_the_website_image}
                    alt="Why the website"
                    className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                </div>
                <div className="absolute -bottom-4 -right-4 w-[6rem] h-[6rem] border-4 border-primary/30 rounded-2xl -z-10" />
              </div>
            </div>
          )}

          {/* Text Column (2/3) */}
          <div
            className={`w-full ${Why_the_website_image ? "lg:w-2/3" : "lg:w-full"}`}
          >
            {/* Collapsed/Expanded text */}
            <div
              ref={contentRef}
              dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
              className={`text-gray-800 leading-relaxed ${descriptionClasses} font-medium mt-2 overflow-hidden transition-all duration-300 flex text-justify ${expanded ? "is-expanded" : ""}`}
              style={
                expanded
                  ? {}
                  : {
                      display: "-webkit-box",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: COLLAPSED_LINES,
                    }
              }
            />

            {/* Read more / Read less button */}
            {(isOverflowing || expanded) && (
              <button
                onClick={() => setExpanded((v) => !v)}
                className="mt-4 inline-flex items-center gap-2 text-primary font-semibold hover:text-secondary transition-colors duration-300 group/btn"
              >
                <span>
                  {expanded ? i18next.t("read_less") : i18next.t("read_more")}
                </span>
                <svg
                  className={`w-5 h-5 transition-transform duration-300 ${
                    expanded ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyTheWebsite;
