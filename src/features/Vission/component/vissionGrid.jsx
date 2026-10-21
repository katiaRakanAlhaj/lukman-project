import { useState, useEffect } from "react";
import DOMPurify from "dompurify";
import VissionGridSkeleton from "./VissionGridSkeleton";
import EmptyState from "../../../component/ux/emptyState";
import i18next from "i18next";
import { descriptionClasses } from "../../../component/ux/descriptionClasses";

const VissionGrid = ({ vissionCategoryContent }) => {
  const categories = vissionCategoryContent?.data || [];
  const [activeIndex, setActiveIndex] = useState(0);
  const [isSwitching, setIsSwitching] = useState(false);

  const activeCategory = categories[activeIndex];
  const visions = activeCategory?.visions || [];
  const contents = visions[0]?.content || [];

  const handleTabClick = (index) => {
    if (index === activeIndex) return;
    setIsSwitching(true);
    setActiveIndex(index);
  };

  useEffect(() => {
    if (!isSwitching) return;
    const t = setTimeout(() => setIsSwitching(false), 400);
    return () => clearTimeout(t);
  }, [activeIndex, isSwitching]);

  return (
    <div className="px-4 lg:px-0">
      {/* ── Tabs ─────────────────────────────────── */}
      {/* Horizontally scrollable on mobile, evenly spaced on desktop */}
      <div className="flex overflow-x-auto lg:overflow-visible scrollbar-hide border-b border-gray-200 lg:border-0">
        <div className="flex lg:flex-1 min-w-max lg:min-w-0">
          {categories.map((cat, index) => (
            <button
              key={cat.id}
              onClick={() => handleTabClick(index)}
              className={`
                shrink-0 lg:flex-1
                w-auto lg:w-[17rem]
                h-[3rem] lg:h-[4rem]
                px-4 lg:px-0
                border border-gray-300
                text-[0.95rem] sm:text-[1rem] lg:text-[1.2rem]
                whitespace-nowrap
                transition-colors
                ${
                  index === activeIndex
                    ? "bg-negative text-white font-bold"
                    : "text-[#666666] text-[1rem] hover:bg-gray-50"
                }
              `}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* ── Content ──────────────────────────────── */}
      <div className="container2 mx-auto mt-[2rem] lg:mt-[3.5rem]">
        {isSwitching ? (
          <VissionGridSkeleton blocks={contents} />
        ) : contents.length === 0 ? (
          <EmptyState message={i18next.t("Vision.no_content")} />
        ) : (
          contents.map((block, i) => {
            const isRtl = i % 2 === 0;

            /* ---------- Block WITH image ---------- */
            if (block.image) {
              return (
                <div
                  key={i}
                  className={`
                    grid grid-cols-1 lg:grid-cols-12
                    gap-y-[1.5rem] lg:gap-y-[2rem]
                    gap-x-0 lg:gap-x-[3rem]
                    mb-[2.5rem] lg:mb-[3.5rem]
                    ${isRtl ? "lg:rtl lg:dir-rtl" : "lg:ltr lg:dir-ltr"}
                  `}
                >
                  {/* Image — full width on mobile, 5 cols on desktop */}
                  <div
                    className={`
                      col-span-1 lg:col-span-5
                      order-1
                      ${isRtl ? "lg:order-2" : "lg:order-3"}
                    `}
                  >
                    <img
                      className="
                        w-full
                        h-[15rem] sm:h-[18rem] lg:h-[25rem]
                        rounded-2xl lg:rounded-3xl
                        object-cover
                      "
                      src={block.image}
                      alt={block.title || ""}
                    />
                  </div>

                  {/* Text — full width below image on mobile */}
                  <div
                    className={`
                      col-span-1 lg:col-span-7
                      order-2
                      flex flex-col justify-center
                      ${isRtl ? "lg:order-3" : "lg:order-2"}
                    `}
                  >
                    {block.title && (
                      <h1
                        className="
                          text-[1.3rem] sm:text-[1.5rem] lg:text-[1.7rem]
                          text-[#000000] font-bold
                          mb-[0.5rem] lg:mb-[0.7rem]
                        "
                      >
                        {block.title}
                      </h1>
                    )}
                    <div
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(block.description),
                      }}
                      className={` ${descriptionClasses}
                       text-secondary
                        leading-[1.8rem] lg:leading-[2rem]
                        text-justify
                     `}
                    />
                  </div>
                </div>
              );
            }

            /* ---------- Block WITHOUT image ---------- */
            return (
              <div
                key={i}
                className="
                  grid grid-cols-1 lg:grid-cols-12
                  mb-[2.5rem] lg:mb-[3.5rem]
                "
              >
                <div className="col-span-1 lg:col-span-12 order-1">
                  {block.title && (
                    <h1
                      className="
                        text-[1.3rem] sm:text-[1.5rem] lg:text-[1.7rem]
                        text-[#000000] font-bold
                        mb-[0.5rem] lg:mb-0
                      "
                    >
                      {block.title}
                    </h1>
                  )}
                  <div
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(block.description),
                    }}
                    className="
                      text-[1.2rem]
                      text-secondary
                      mt-[0.5rem] lg:mt-[0.7rem]
                      leading-[1.8rem] lg:leading-[2rem]
                       text-justify
                    "
                  />
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default VissionGrid;
