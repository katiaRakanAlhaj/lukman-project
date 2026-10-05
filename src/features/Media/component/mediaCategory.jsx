import React, { useState } from "react";
import i18next from "i18next";
const MediaCategory = ({ videoCategoryData, onApplyFilters }) => {
  // ===== Data: handle { data: [...] } OR [...] =====
  const categories = Array.isArray(videoCategoryData)
    ? videoCategoryData
    : Array.isArray(videoCategoryData?.data)
      ? videoCategoryData.data
      : [];

  // ===== State =====
  const [language, setLanguage] = useState("ar"); // "en" | "ar"
  const [selectedCategory, setSelectedCategory] = useState("all"); // "all" | category name
  const [sort, setSort] = useState("");

  // ===== Handlers =====
  const handleLanguageChange = (lang) => {
    setLanguage(lang);
  };

  const handleApply = () => {
    // Dynamic title sorting based on language
    let finalSort = sort;
    if (sort === "title_asc") {
      finalSort = language === "ar" ? "title_ar" : "title_en";
    }

    const filters = { language, category: selectedCategory, sort: finalSort };
    console.log("Applied filters:", filters);
    if (onApplyFilters) {
      onApplyFilters(filters);
    }
  };

  const handleReset = () => {
    setLanguage("ar");
    setSelectedCategory("all");
    setSort("");
    const resetFilters = { language: "ar", category: "all", sort: "" };
    if (onApplyFilters) {
      onApplyFilters(resetFilters);
    }
  };

  return (
    <div>
      <div
        className="w-full h-auto py-[1.5rem] mt-[1rem] rounded-3xl p-[1.5rem]"
        style={{ boxShadow: "rgba(0, 0, 0, 0.25) 0px 0px 4px 0px" }}
      >
        <h1 className="font-bold text-[1.2rem] text-secondary">
          {i18next.t("media.filter_and_sort")}
        </h1>

        {/* ===== Language ===== */}
        <div className="mt-4 mb-3">
          <p className="text-[1rem] mb-2 text-secondary font-medium">
            {i18next.t("media.interview_language")}
          </p>
          <div className="flex gap-2 p-1 rounded-full">
            <button
              onClick={() => handleLanguageChange("en")}
              className={`flex-1 px-4 text-[1rem] py-2 rounded-full transition-colors ${
                language === "en"
                  ? "bg-negative text-white font-bold"
                  : "text-primary bg-[#E7EDF3] hover:bg-gray-200"
              }`}
            >
              English
            </button>
            <button
              onClick={() => handleLanguageChange("ar")}
              className={`flex-1 px-4 py-2 text-[1rem] rounded-full transition-colors ${
                language === "ar"
                  ? "bg-negative text-white font-bold"
                  : "text-primary bg-[#E7EDF3] hover:bg-gray-200"
              }`}
            >
              العربية
            </button>
          </div>
        </div>

        {/* ===== Category ===== */}
        <p className="text-[1rem] font-medium text-secondary">
          {i18next.t("media.interview_category")}
        </p>
        <div className="flex flex-row flex-wrap gap-x-[0.5rem] gap-y-[1rem] mt-4">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`w-auto h-[2.2rem] px-[1rem] rounded-full flex justify-center items-center text-[1rem] transition-colors ${
              selectedCategory === "all"
                ? "bg-negative text-white font-bold"
                : "bg-[#E7EDF3] text-primary hover:bg-gray-200"
            }`}
          >
            {i18next.t("media.all")}
          </button>

          {categories.map((cat) => (
            <button
              key={cat.id || cat.name}
              onClick={() => setSelectedCategory(cat.name)} // Send category name instead of ID
              className={`w-auto h-[2.2rem] px-[1rem] rounded-full flex justify-center items-center text-[1rem] transition-colors ${
                selectedCategory === cat.name
                  ? "bg-negative text-white font-bold"
                  : "bg-[#E7EDF3] text-primary hover:bg-gray-200"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* ===== Sort + Apply ===== */}
        <div className="mt-5">
          <div className="space-y-2">
            <label
              htmlFor="sort"
              className="block text-sm font-medium text-gray-700"
            >
              {i18next.t("media.sort_by")}
            </label>
            <select
              id="sort"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            >
              <option value="" disabled hidden>
                {i18next.t("media.choose_sort_order")}
              </option>
              <option value="title_asc">{i18next.t("media.address")}</option>
              <option value="id_asc">{i18next.t("media.oldest_first")}</option>
              <option value="id_desc">{i18next.t("media.newest_first")}</option>
            </select>

            <button
              onClick={handleApply}
              className="w-full py-2 rounded-lg text-white font-bold bg-negative hover:bg-red-700 transition-colors"
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
      </div>
    </div>
  );
};

export default MediaCategory;
