import i18next from "i18next";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import CategoryCard from "../../../component/ux/CategoryCard";

const SORT_OPTIONS = {
  TITLE_ASC: "title_asc",
  ID_ASC: "id_asc",
  ID_DESC: "id_desc",
};

const MilestoneCategory = ({
  milestoneCategoryData,
  activeCategory,
  setActiveCategory,
  sort,
  setSort,
  onReset,
  search,
  setSearch,
  onSearch,
}) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  const [isFocused, setIsFocused] = useState(false);

  const categories = milestoneCategoryData?.data || [];

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };

  return (
    <div className="lg:col-span-3 col-span-full" dir={isRTL ? "rtl" : "ltr"}>
      {/* ---- Search Bar ---- */}
      <div className="relative mb-[1.5rem]">
        <input
          className="w-full h-[3.3rem] border border-[#E7E8E9] outline-none p-[1rem] rounded-tr-lg"
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />

        {/* Placeholder — hidden when focused or has value */}
        {!search && !isFocused && (
          <p
            className={`absolute ${i18next.language == "ar" ? "right-10" : "left-10"} top-4 pointer-events-none text-gray-400`}
          >
            {i18next.t("Milestone.searchPlaceholder")}
          </p>
        )}

        {/* Search icon — hidden when focused */}
        {!isFocused && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`absolute ${i18next.language == "ar" ? "right-3" : "left-3"} top-1/2 -translate-y-1/2 w-[1.2rem] h-[1.2rem] pointer-events-none text-gray-400`}
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        )}

        <div
          onClick={onSearch}
          className={`absolute w-[5.5rem] ${i18next.language == "ar" ? "left-0 rounded-tl-lg" : "right-0 rounded-tr-lg"} top-0 bottom-0 bg-negative h-full  font-bold text-[1rem] text-white flex justify-center items-center cursor-pointer`}
        >
          {i18next.t("Milestone.searchButton")}
        </div>
      </div>

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

        {/* ---- Category buttons ---- */}
        <div className="flex flex-row flex-wrap gap-x-[0.5rem] gap-y-[1rem] mt-4">
          <CategoryCard
            label={t("Milestone.all")}
            isActive={activeCategory === "all"}
            onClick={() => setActiveCategory("all")}
            fullWidth
            className="text-[1.1rem]"
          />

          {categories.map((cat) => (
            <CategoryCard
              key={cat.id}
              label={cat.name}
              isActive={activeCategory === cat.name}
              onClick={() => setActiveCategory(cat.name)}
              className="text-[1.1rem]"
            />
          ))}
        </div>

        {/* ---- Sort + Reset ---- */}
        <div className="mt-5">
          <div className="space-y-2">
            <label
              htmlFor="sort"
              className="block text-sm font-medium text-gray-700"
            >
              {t("Milestone.sortBy")}
            </label>

            <select
              id="sort"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            >
              <option value="" disabled hidden>
                {t("Milestone.chooseSort")}
              </option>
              <option value={SORT_OPTIONS.TITLE_ASC}>
                {t("Milestone.sortTitle")}
              </option>
              <option value={SORT_OPTIONS.ID_ASC}>
                {t("Milestone.sortOldest")}
              </option>
              <option value={SORT_OPTIONS.ID_DESC}>
                {t("Milestone.sortNewest")}
              </option>
            </select>

            <p
              onClick={onReset}
              className="mt-[1rem] text-[#5B1B1B] text-center cursor-pointer hover:text-red-700"
            >
              {t("Milestone.reset")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MilestoneCategory;
