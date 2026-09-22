import React, { useState } from "react";
import DOMPurify from "dompurify";

const ActivitiesGrid = ({ CategoryContent }) => {
  // Safely access the categories array
  const categories = Array.isArray(CategoryContent)
    ? CategoryContent
    : CategoryContent?.data || [];

  // Active category index (default: first one)
  const [activeIndex, setActiveIndex] = useState(0);

  if (!categories.length) return null;

  const activeCategory = categories[activeIndex];
  const activities = activeCategory?.activities || [];

  // Format date from ISO string (e.g. "2026-03-16T00:00:00.000000Z" → "16-03-2026")
  const formatDate = (isoDate) => {
    if (!isoDate) return "";
    const d = new Date(isoDate);
    if (isNaN(d.getTime())) return isoDate;
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <div className="mt-8">
      {/* Tabs */}
      <div className="flex overflow-x-auto scrollbar-hide lg:gap-[5rem] gap-[3rem] border-b border-b-[#C4C4C4] mt-[4rem]">
        {categories.map((category, index) => {
          const isActive = index === activeIndex;
          return (
            <button
              key={category.id}
              onClick={() => setActiveIndex(index)}
              className={`lg:text-[1.3rem] text-[1rem] transition-all duration-300 ${
                isActive
                  ? "text-negative border-b-[0.8rem] border-negative font-bold"
                  : "text-[#666] hover:text-negative"
              }`}
            >
              {category.name}
            </button>
          );
        })}
      </div>

      {/* Activities list */}
      <div>
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="mt-[2.5rem] grid lg:grid-cols-12 grid-cols-1 gap-x-[2rem] lg:gap-y-0 gap-y-[2rem]"
          >
            {/* Left: text */}
            <div className="lg:col-span-8 col-span-1">
              <p className="text-[#000000] text-[0.9rem]">
                {formatDate(activity.date)}
              </p>
              <h1 className="text-[#000000] mt-[1rem] font-bold text-[1.3rem]">
                {activity.title}
              </h1>
              <div
                className="text-[#666666] text-lg mt-2 w-[95%] whitespace-pre-line"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(activity.description || ""),
                }}
              />
            </div>

            {/* Right: image */}
            <div className="lg:col-span-4 col-span-1">
              <img
                className="w-full h-[15rem] object-cover rounded-3xl cursor-pointer hover:opacity-90 transition-opacity"
                src={activity.banner}
                alt={activity.title}
              />
            </div>
          </div>
        ))}

        {!activities.length && (
          <p className="text-center text-[#666] mt-[2rem]">
            لا توجد عناصر في هذا القسم.
          </p>
        )}
      </div>
    </div>
  );
};

export default ActivitiesGrid;
