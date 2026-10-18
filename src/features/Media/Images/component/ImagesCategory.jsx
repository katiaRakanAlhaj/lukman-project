import React from "react";
import i18next from "i18next";
import CategoryCard from "../../../../component/ux/CategoryCard";

const ImagesCategory = ({
  imagesCategoryData,
  activeCategoryId,
  onSelectCategory,
  onApplyFilters,
}) => {
  const categories = Array.isArray(imagesCategoryData)
    ? imagesCategoryData
    : Array.isArray(imagesCategoryData?.data)
      ? imagesCategoryData.data
      : [];

  const handleCategoryClick = (id) => {
    onSelectCategory?.(id);
  };

  const handleApply = () => {
    if (onApplyFilters) {
      onApplyFilters({ category: activeCategoryId });
    }
  };

  const handleReset = () => {
    if (categories.length > 0) {
      const firstCategoryId = categories[0].id;
      onSelectCategory?.(firstCategoryId);
      onApplyFilters?.({ category: firstCategoryId });
    }
  };

  return (
    <div
      className="w-full h-auto py-[1.5rem] rounded-3xl p-[1.5rem]"
      style={{ boxShadow: "rgba(0, 0, 0, 0.25) 0px 0px 4px 0px" }}
    >
      <h1 className="font-bold text-[1.2rem] text-secondary mb-4">
        {i18next.t("media.filter_and_sort")}
      </h1>

      <p className="text-[1rem] font-medium text-secondary mb-2">
        {i18next.t("media.images_category")}
      </p>

      <div className="flex flex-row flex-wrap gap-x-[0.5rem] gap-y-[1rem]">
        {categories.map((cat) => (
          <CategoryCard
            key={cat.id ?? cat.name}
            label={cat.name}
            isActive={activeCategoryId === cat.id}
            onClick={() => handleCategoryClick(cat.id)}
          />
        ))}
      </div>

      <div className="mt-5 space-y-2">
        <button
          onClick={handleApply}
          className="w-full py-2 rounded-lg text-white font-bold transition-colors bg-negative hover:bg-red-700"
        >
          {i18next.t("media.apply_filter")}
        </button>

        <p
          onClick={handleReset}
          className="text-[#5B1B1B] text-center cursor-pointer hover:text-red-700"
        >
          {i18next.t("media.reset")}
        </p>
      </div>
    </div>
  );
};

export default ImagesCategory;