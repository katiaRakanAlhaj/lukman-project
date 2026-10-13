import React, { useMemo, useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { SORT_OPTIONS } from "../hook/useArtcilesFilter";
import { useSearchArticles } from "../hook/useFetchArticlesCategory";
import date from "../../../assets/images/date.svg";
import { Link, useParams } from "react-router-dom";
import i18next from "i18next";
import SeeMoreButton from "../../../component/ux/seeMoreButton";
import ArticlesGridSkeleton from "./ArticleCardSkeleton ";
import EmptyState from "../../../component/ux/EmptyState"; // 👈 new import

// --- Inline SVG Components ---
const SearchIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const INITIAL_COUNT = 6;
const LOAD_MORE_COUNT = 6;

const ArticlesGrid = ({
  articlesCategoryData,
  articlesData,
  isFetching,
  filters,
}) => {
  const { t } = useTranslation();
  const { lang } = useParams();

  const { category, sort, setCategory, setSort, reset } = filters;

  const [searchInput, setSearchInput] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const [gridSkeleton, setGridSkeleton] = useState(false);
  const firstRunRef = useRef(true);

  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

  useEffect(() => {
    if (firstRunRef.current) return;
    setVisibleCount(INITIAL_COUNT);
    setGridSkeleton(true);
    const timer = setTimeout(() => setGridSkeleton(false), 700);
    return () => clearTimeout(timer);
  }, [category, sort]);

  useEffect(() => {
    if (firstRunRef.current) {
      firstRunRef.current = false;
      return;
    }
    setVisibleCount(INITIAL_COUNT);
    setGridSkeleton(true);
    const timer = setTimeout(() => setGridSkeleton(false), 700);
    return () => clearTimeout(timer);
  }, [submittedQuery]);

  const {
    data: searchResults,
    isLoading: isSearchLoading,
    isFetching: isSearchFetching,
  } = useSearchArticles(submittedQuery);

  const isSearching = submittedQuery.trim().length > 0;

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

  const visibleArticles = useMemo(
    () => articlesList.slice(0, visibleCount),
    [articlesList, visibleCount],
  );

  const hasMore = visibleCount < articlesList.length;

  const isLoading =
    isFetching || isSearchLoading || isSearchFetching || gridSkeleton;

  const isEmpty = !isLoading && articlesList.length === 0;

  const handleLoadMore = () => {
    setGridSkeleton(true);
    setTimeout(() => {
      setVisibleCount((prev) =>
        Math.min(prev + LOAD_MORE_COUNT, articlesList.length),
      );
      setGridSkeleton(false);
    }, 700);
  };

  const handleReset = () => {
    reset();
    setSearchInput("");
    setSubmittedQuery("");
  };

  const handleSearchClick = () => {
    setSubmittedQuery(searchInput.trim());
  };

  return (
    <>
      <div className="lg:mt-[3rem] mt-[2.5rem]">
        <div className="grid lg:grid-cols-12 grid-cols-1 gap-x-[2rem] lg:gap-y-0 gap-y-[2rem]">
          {/* ============ Sidebar ============ */}
          <div className="lg:col-span-3 col-span-full">
            {/* Search box */}
            <div className="relative">
              <input
                className={`w-full h-[3.3rem] border border-[#E7E8E9] outline-none p-[1rem] ${
                  i18next.language == "ar" ? "rounded-tr-lg" : "rounded-tl-lg"
                }`}
                type="search"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleSearchClick();
                  }
                }}
              />

              {!searchInput && !isFocused && (
                <p
                  className={`absolute ${
                    i18next.language == "ar" ? "right-10" : "left-10"
                  } top-4 pointer-events-none text-gray-400`}
                >
                  {t("ArticlesGrid.searchPlaceholder")}
                </p>
              )}

              {!searchInput && !isFocused && (
                <SearchIcon
                  className={`absolute ${
                    i18next.language == "ar" ? "right-3" : "left-3"
                  } top-1/2 -translate-y-1/2 w-[1.2rem] h-[1.2rem] pointer-events-none text-gray-400`}
                />
              )}

              <div
                onClick={handleSearchClick}
                className={`absolute w-[5.5rem] ${
                  i18next.language == "en" ? "right-0" : "left-0"
                } top-0 bottom-0 bg-negative h-full ${
                  i18next.language == "ar" ? "rounded-tl-lg" : "rounded-tr-lg"
                } font-bold text-[1rem] text-white flex justify-center items-center cursor-pointer`}
              >
                {t("ArticlesGrid.searchButton")}
              </div>
            </div>

            {/* Filter card */}
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

          {/* ============ Grid ============ */}
          <div className="lg:col-span-9 col-span-1">
            {gridSkeleton ? (
              <ArticlesGridSkeleton cards={6} />
            ) : isEmpty ? (
              /* ---- Empty state (now a reusable component) ---- */
              <EmptyState message={t("ArticlesGrid.noResults")} />
            ) : (
              <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-[2rem]">
                {visibleArticles.map((article) => (
                  <Link to={`/${lang}/Article/${article.id}`} key={article.id}>
                    <div
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
                  </Link>
                ))}
              </div>
            )}

            {/* --- Load more (uses SeeMoreButton) --- */}
            {!gridSkeleton && !isEmpty && hasMore && (
              <SeeMoreButton onClick={handleLoadMore} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ArticlesGrid;