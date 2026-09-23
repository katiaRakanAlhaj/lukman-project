import React, { useMemo, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { SORT_OPTIONS } from "../hook/useArtcilesFilter";
import { useSearchArticles } from "../hook/useFetchArticlesCategory";
import search from "../../../assets/images/search.svg";
import date from "../../../assets/images/date.svg";

// --- Inline SVG Components ---
const ChevronDownIcon = () => (
  <svg
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    viewBox="0 0 256 512"
    className="text-white text-[1.3rem]"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M168 345.941V44c0-6.627-5.373-12-12-12h-56c-6.627 0-12 5.373-12 12v301.941H41.941c-21.382 0-32.09 25.851-16.971 40.971l86.059 86.059c9.373 9.373 24.569 9.373 33.941 0l86.059-86.059c15.119-15.119 4.411-40.971-16.971-40.971H168z"></path>
  </svg>
);

const ArticlesGrid = ({
  articlesCategoryData,
  articlesData,
  isLoading,
  isFetching,
  filters,
}) => {
  const { t } = useTranslation();

  // ---- Filters come from parent via props ----
  const { category, sort, setCategory, setSort, reset } = filters;

  // ---- Search state (local) ----
  const [searchInput, setSearchInput] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  // ✅ Debounce: only update debouncedQuery 400ms after the user stops typing
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchInput.trim());
    }, 400);
    return () => clearTimeout(timer);
  }, [searchInput]);

  // ---- Search hook — fires automatically as the debounced value changes ----
  const {
    data: searchResults,
    isLoading: isSearchLoading,
    isFetching: isSearchFetching,
  } = useSearchArticles(debouncedQuery);

  const isSearching = debouncedQuery.trim().length > 0;

  // ---- Helpers ----
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const dateObj = new Date(dateString);
    const day = String(dateObj.getDate()).padStart(2, "0");
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const year = dateObj.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const categories = articlesCategoryData?.data || [];

  const normalizeArticles = (data) => {
    if (!data) return [];
    if (Array.isArray(data)) return data;
    if (Array.isArray(data.articles)) return data.articles;
    if (Array.isArray(data.data)) return data.data;
    return [];
  };

  const articlesList = useMemo(() => {
    if (isSearching) return normalizeArticles(searchResults);
    return normalizeArticles(articlesData);
  }, [isSearching, searchResults, articlesData]);

  const handleReset = () => {
    reset();
    setSearchInput("");
    setDebouncedQuery("");
  };

  const handleSearchClick = () => {
    setDebouncedQuery(searchInput.trim());
  };

  return (
    <>
      <div className="lg:mt-[3rem] mt-[2.5rem]">
        <div className="grid lg:grid-cols-12 grid-cols-1 gap-x-[2rem] lg:gap-y-0 gap-y-[2rem]">
          {/* ============ Sidebar ============ */}
          <div className="lg:col-span-3 col-span-full">
            {/* --- Search box --- */}
            <div className="relative">
              <input
                className="w-full h-[3.3rem] border border-[#E7E8E9] outline-none p-[1rem] rounded-tr-lg"
                type="search"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleSearchClick();
                  }
                }}
              />
              {!searchInput && (
                <p className="absolute right-10 top-4 pointer-events-none text-gray-400">
                  {t("ArticlesGrid.searchPlaceholder")}
                </p>
              )}

              {!searchInput && (
                <img
                  src={search}
                  alt="search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-[1.2rem] h-[1.5rem] pointer-events-none"
                />
              )}

              <div
                onClick={handleSearchClick}
                className="absolute w-[5.5rem] left-0 top-0 bottom-0 bg-negative h-full rounded-tl-lg font-bold text-[1rem] text-white flex justify-center items-center cursor-pointer"
              >
                {t("ArticlesGrid.searchButton")}
              </div>
            </div>

            {/* --- Filter / sort card --- */}
            <div
              className="w-full h-auto py-[1.5rem] mt-[1rem] rounded-3xl p-[1.5rem]"
              style={{ boxShadow: "rgba(0, 0, 0, 0.25) 0px 0px 4px 0px" }}
            >
              <h1 className="font-bold text-[1.2rem] text-secondary">
                {t("ArticlesGrid.filterAndSort")}
              </h1>
              <p className="text-[1.2rem] mt-2 text-secondary">
                {t("ArticlesGrid.categoryLabel")}
              </p>

              {/* --- Category buttons (by NAME) --- */}
              <div className="flex flex-row flex-wrap gap-x-[0.5rem] gap-y-[1rem] mt-4">
                <button
                  type="button"
                  className={`w-full h-[2.2rem] px-[1rem] rounded-full flex justify-center items-center text-[1.1rem] ${
                    category === "all"
                      ? "bg-negative text-white"
                      : "bg-[#E7EDF3] text-primary"
                  }`}
                  onClick={() => setCategory("all")}
                >
                  {t("ArticlesGrid.categoryAll")}
                </button>

                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    className={`w-auto h-[2.2rem] px-[1rem] rounded-full flex justify-center items-center text-[1.1rem] ${
                      category === cat.name
                        ? "bg-negative text-white"
                        : "bg-[#E7EDF3] text-primary"
                    }`}
                    onClick={() => setCategory(cat.name)}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>

              {/* --- Sort select --- */}
              <div className="mt-5">
                <div className="space-y-2">
                  <label
                    htmlFor="sort"
                    className="block text-sm font-medium text-gray-700"
                  >
                    {t("ArticlesGrid.sortLabel")}
                  </label>

                  <select
                    id="sort"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                  >
                    <option value="" disabled hidden>
                      {t("ArticlesGrid.sortPlaceholder")}
                    </option>
                    <option value={SORT_OPTIONS.TITLE_ASC}>
                      {t("ArticlesGrid.sortByTitle")}
                    </option>
                    <option value={SORT_OPTIONS.ID_ASC}>
                      {t("ArticlesGrid.sortOldestFirst")}
                    </option>
                    <option value={SORT_OPTIONS.ID_DESC}>
                      {t("ArticlesGrid.sortNewestFirst")}
                    </option>
                  </select>

                  <p
                    className="mt-[1rem] text-[#5B1B1B] text-center cursor-pointer hover:text-red-700"
                    onClick={handleReset}
                  >
                    {t("ArticlesGrid.reset")}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ============ Articles Grid ============ */}
          <div className="lg:col-span-9 col-span-1">
            {isLoading || (isSearching && isSearchLoading) ? (
              <div className="text-center py-10 text-secondary">
                {t("ArticlesGrid.loading")}
              </div>
            ) : articlesList.length === 0 ? (
              <div className="text-center py-10 text-secondary">
                {t("ArticlesGrid.noArticles")}
              </div>
            ) : (
              <>
                {(isFetching || (isSearching && isSearchFetching)) && (
                  <div className="text-center text-sm text-gray-400 mb-2">
                    {t("ArticlesGrid.updating")}
                  </div>
                )}

                <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-[2rem]">
                  {articlesList.map((article) => (
                    <div
                      key={article.id}
                      className="h-[28rem] w-full object-cover relative rounded-3xl"
                      style={{
                        boxShadow: "rgba(0, 0, 0, 0.25) 0px 0px 4px 0px",
                      }}
                    >
                      <img
                        className="w-full h-[13rem] object-cover rounded-t-3xl"
                        src={article.banner}
                        alt={article.title}
                      />

                      <div className="mt-[1rem] px-[1rem]">
                        <h1 className="text-[1.2rem] font-bold text-secondary line-clamp-2">
                          {article.title}
                        </h1>

                        <div className="flex gap-x-2 mt-2 items-center">
                          <img src={date} alt="date" />
                          <p className="text-secondary text-[0.9em]">
                            {formatDate(article.date)}
                          </p>
                        </div>

                        <div
                          className="text-[1rem] text-[#666666] mt-1 line-clamp-3 whitespace-pre-line"
                          dangerouslySetInnerHTML={{
                            __html: article.description,
                          }}
                        />
                      </div>

                      <button className="w-full h-[2.5em] right-0 bg-negative rounded-b-3xl text-white font-bold text-[1.1em] flex items-center justify-center cursor-pointer absolute bottom-0 hover:bg-red-700 transition-colors">
                        {t("ArticlesGrid.readMore")}
                      </button>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* --- Load more --- */}
            <div className="flex justify-center items-center mt-[3rem]">
              <div>
                <button
                  type="button"
                  className="flex items-center justify-center gap-x-[0.5rem] w-[18rem] h-[3.5rem] bg-negative rounded-t-xl"
                  style={{
                    boxShadow: "rgba(0, 0, 0, 0.25) 0px 5px 4px 0px",
                  }}
                >
                  <p className="text-[1.1rem] text-white font-bold">
                    {t("ArticlesGrid.loadMore")}
                  </p>
                  <ChevronDownIcon />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ArticlesGrid;