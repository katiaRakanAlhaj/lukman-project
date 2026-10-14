import i18next from "i18next";
import React from "react";
import { useTranslation } from "react-i18next";

const MilestoneGrid = ({ milestoneCategoryData, activeCategory }) => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  const categories = milestoneCategoryData?.data || [];

  // "all" → show all categories, otherwise show only the selected one
  const visibleCategories = categories.filter(
    (cat) => cat.id === activeCategory,
  );

  return (
    <div className="lg:col-span-9 col-span-full" dir={isRTL ? "rtl" : "ltr"}>
      <div className="flex flex-col gap-[1.5rem]">
        {visibleCategories.map((cat) => (
          <div
            key={cat.id}
            className="w-auto bg-white h-auto rounded-lg relative p-[1.5rem]"
            style={{ boxShadow: "rgba(0, 0, 0, 0.25) 0px 0px 4px 0px" }}
          >
            <div
              className={`absolute w-[0.3rem] h-full bg-negative ${i18next.language == "ar" ? "right-0 rounded-tr-lg rounded-br-lg" : "left-0 rounded-tl-lg rounded-bl-lg"} top-0`}
            ></div>
            <div
              className="text-lg text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: cat.description }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MilestoneGrid;
