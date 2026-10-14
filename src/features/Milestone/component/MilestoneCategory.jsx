import React from "react";
import { useTranslation } from "react-i18next";

const MilestoneCategory = ({
  milestoneCategoryData,
  activeCategory,
  setActiveCategory,
}) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  const categories = milestoneCategoryData?.data || [];

  return (
    <div className="lg:col-span-3 col-span-full" dir={isRTL ? "rtl" : "ltr"}>
      <div
        className="w-full h-auto py-[1.5rem] rounded-3xl p-[1.5rem]"
        style={{ boxShadow: "rgba(0, 0, 0, 0.25) 0px 0px 4px 0px" }}
      >
        <h1 className="font-bold text-[1.2rem] text-secondary">
          {t("Milestone.filterAndSort")}
        </h1>
        <p className="text-[1.2rem] mt-2 text-secondary">
          {t("Milestone.categoryLabel")}
        </p>

        <div className="flex flex-row flex-wrap gap-x-[0.5rem] gap-y-[1rem] mt-4">
          <button
            onClick={() => setActiveCategory("all")}
            className={`w-full h-[2.2rem] px-[1rem] rounded-full flex justify-center items-center text-[1.1rem] transition-colors ${
              activeCategory === "all"
                ? "bg-negative text-white"
                : "bg-[#E7EDF3] text-primary hover:bg-[#d8e2ec]"
            }`}
          >
            {t("Milestone.all")}
          </button>

          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`w-auto h-[2.2rem] px-[1rem] rounded-full flex justify-center items-center text-[1.1rem] transition-colors ${
                  isActive
                    ? "bg-negative text-white"
                    : "bg-[#E7EDF3] text-primary hover:bg-[#d8e2ec]"
                }`}
              >
                {cat.name}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MilestoneCategory;
