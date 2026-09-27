import { useState } from "react";
import DOMPurify from "dompurify";

const VissionGrid = ({ vissionCategoryContent }) => {
  const categories = vissionCategoryContent?.data || [];
  const [activeIndex, setActiveIndex] = useState(0);

  const activeCategory = categories[activeIndex];
  const visions = activeCategory?.visions || [];
  const contents = visions[0]?.content || [];

  return (
    <div>
      {/* Tabs */}
      <div className="flex">
        {categories.map((cat, index) => (
          <button
            key={cat.id}
            onClick={() => setActiveIndex(index)}
            className={`w-[17rem] h-[4rem] border border-gray-300 text-[1.2rem] ${
              index === activeIndex
                ? "bg-negative text-white font-bold"
                : "text-[#666666] text-[1.1rem]"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="container2 mx-auto mt-[3.5rem]">
        {contents.map((block, i) => {
          const isRtl = i % 2 === 0;

          // Block WITH image → title + description grouped together, then image on opposite side
          if (block.image) {
            return (
              <div
                key={i}
                className={`grid lg:grid-cols-12 gap-y-[2rem] gap-x-[3rem] mb-[3.5rem] ${
                  isRtl ? "rtl" : "ltr"
                }`}
              >
                {/* Image Column */}
                <div
                  className={`lg:col-span-5 col-span-1 ${
                    isRtl ? "lg:order-2" : "lg:order-3"
                  }`}
                >
                  <img
                    className="w-full lg:h-[25rem] h-[20rem] rounded-3xl object-cover"
                    src={block.image}
                    alt={block.title || ""}
                  />
                </div>

                {/* Text Column (Title + Description) */}
                <div
                  className={`lg:col-span-7 col-span-1 flex flex-col justify-center ${
                    isRtl ? "lg:order-3" : "lg:order-2"
                  }`}
                >
                  {block.title && (
                    <h1 className="text-[1.7rem] text-[#000000] font-bold mb-[0.7rem]">
                      {block.title}
                    </h1>
                  )}

                  <div
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(block.description),
                    }}
                    className="text-[1.2rem] text-secondary leading-[2rem] whitespace-pre-line text-justify"
                  />
                </div>
              </div>
            );
          }

          // Block WITHOUT image → full-width text
          return (
            <div
              key={i}
              className={`grid lg:grid-cols-12 gap-y-[2rem] gap-x-[3rem] mb-[3.5rem] ${
                isRtl ? "rtl" : "ltr"
              }`}
            >
              <div className="lg:col-span-12 col-span-1 order-1">
                {block.title && (
                  <h1 className="text-[1.7rem] text-[#000000] font-bold">
                    {block.title}
                  </h1>
                )}
                <div
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(block.description),
                  }}
                  className="text-[1.2rem] text-secondary mt-[0.7rem] leading-[2rem] whitespace-pre-line text-justify"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VissionGrid;
