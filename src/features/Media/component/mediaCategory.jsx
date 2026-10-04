import React, { useState } from "react";

const MediaCategory = ({ videoCategoryData }) => {
  // ===== Data: handle { data: [...] } OR [...] =====
  const categories = Array.isArray(videoCategoryData)
    ? videoCategoryData
    : Array.isArray(videoCategoryData?.data)
    ? videoCategoryData.data
    : [];

  // ===== State =====
  const [language, setLanguage] = useState("ar"); // "en" | "ar"
  const [selectedCategory, setSelectedCategory] = useState("all"); // "all" | id
  const [sort, setSort] = useState("");
  const [applied, setApplied] = useState({
    language: "ar",
    category: "all",
    sort: "",
  });

  // ===== Handlers =====
  const handleApply = () => {
    setApplied({ language, category: selectedCategory, sort });
    // 👉 Call your API / filter here using `applied` values
    console.log("Applied filters:", { language, selectedCategory, sort });
  };

  const handleReset = () => {
    setLanguage("ar");
    setSelectedCategory("all");
    setSort("");
    setApplied({ language: "ar", category: "all", sort: "" });
  };

  return (
    <div>
      <div
        className="w-full h-auto py-[1.5rem] mt-[1rem] rounded-3xl p-[1.5rem]"
        style={{ boxShadow: "rgba(0, 0, 0, 0.25) 0px 0px 4px 0px" }}
      >
        <h1 className="font-bold text-[1.2rem] text-secondary">
          تصفية و ترتيب
        </h1>

        {/* ===== Language ===== */}
        <div className="mt-4 mb-3">
          <p className="text-[1rem] mb-2 text-secondary font-medium">
            لغة المقابلة
          </p>
          <div className="flex gap-2 p-1 rounded-full">
            <button
              onClick={() => setLanguage("en")}
              className={`flex-1 px-4 text-[1rem] py-2 rounded-full transition-colors ${
                language === "en"
                  ? "bg-negative text-white font-bold"
                  : "text-primary bg-[#E7EDF3] hover:bg-gray-200"
              }`}
              style={
                language === "en"
                  ? { fontFamily: '"FF Shamel", sans-serif' }
                  : undefined
              }
            >
              English
            </button>
            <button
              onClick={() => setLanguage("ar")}
              className={`flex-1 px-4 py-2 text-[1rem] rounded-full transition-colors ${
                language === "ar"
                  ? "bg-negative text-white font-bold"
                  : "text-primary bg-[#E7EDF3] hover:bg-gray-200"
              }`}
              style={
                language === "ar"
                  ? { fontFamily: '"FF Shamel", sans-serif' }
                  : undefined
              }
            >
              العربية
            </button>
          </div>
        </div>

        {/* ===== Category ===== */}
        <p className="text-[1rem] font-medium text-secondary">
          تصنيف المقابلة
        </p>
        <div className="flex flex-row flex-wrap gap-x-[0.5rem] gap-y-[1rem] mt-4">
          {/* "All" button */}
          <button
            onClick={() => setSelectedCategory("all")}
            className={`w-auto h-[2.2rem] px-[1rem] rounded-full flex justify-center items-center text-[1rem] transition-colors ${
              selectedCategory === "all"
                ? "bg-negative text-white font-bold"
                : "bg-[#E7EDF3] text-primary hover:bg-gray-200"
            }`}
          >
            الكل
          </button>

          {/* Dynamic categories from API */}
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`w-auto h-[2.2rem] px-[1rem] rounded-full flex justify-center items-center text-[1rem] transition-colors ${
                selectedCategory === cat.id
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
              رتب حسب
            </label>
            <select
              id="sort"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            >
              <option value="" disabled hidden>
                اختر ترتيب الفرز
              </option>
              <option value="title_asc">العنوان</option>
              <option value="id_asc">الاقدم اولا</option>
              <option value="id_desc">الاحدث اولا</option>
            </select>

            <button
              onClick={handleApply}
              className="w-full py-2 rounded-lg text-white font-bold bg-negative hover:bg-red-700 transition-colors"
            >
              تطبيق الفلتر
            </button>

            <p
              onClick={handleReset}
              className="text-[#5B1B1B] text-center cursor-pointer hover:text-red-700"
            >
              إعادة تعيين
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaCategory;