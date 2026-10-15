import i18next from "i18next";
import { useState } from "react";
import MilestoneCategory from "../features/Milestone/component/MilestoneCategory";
import MilestoneGrid from "../features/Milestone/component/MilestoneGrid";
import MilestoneSkeleton from "../features/Milestone/component/MilestoneSkeleton";
import {
  useFetchMilestoneCategory,
  useFetchMilestones,
  useFetchMilestoneSearch,
} from "../features/Milestone/hook/useFetchMilestone";
import ErrorMessageNetwork from "../component/errorMessage/errorMessage";
import Loader from "../component/loader/loader";
import ScrollToTop from "../component/scrollToTop/ScrollToTop";
import { HelmetProvider } from "react-helmet-async";
import MetaHelmet from "../component/metaHelmet/metaHelmet";

const Milestone = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [sort, setSort] = useState("");
  const [search, setSearch] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const isSearching = searchQuery.trim() !== "";
  const isRTL = i18next.language === "ar";

  // ---- Categories ----
  const {
    data: milestoneCategoryData,
    isLoading: milestoneCategoryDataLoading,
    error: milestoneCategoryDataError,
  } = useFetchMilestoneCategory();

  // ---- Normal list ----
  const {
    data: milestoneData,
    isLoading: milestoneDataLoading,
    error: milestoneDataError,
    isFetching: milestoneDataFetching,
  } = useFetchMilestones(activeCategory, sort);

  // ---- Search ----
  const {
    data: milestoneSearchData,
    isLoading: milestoneSearchLoading,
    error: milestoneSearchError,
    isFetching: milestoneSearchFetching,
  } = useFetchMilestoneSearch(searchQuery);

  // ---- Pick which data to render ----
  const displayedData = isSearching ? milestoneSearchData : milestoneData;
  const isFetching = isSearching
    ? milestoneSearchFetching || milestoneSearchLoading
    : milestoneDataFetching || milestoneDataLoading;

  // ---- Find active category description ----
  const activeCategoryData = (milestoneCategoryData?.data || []).find(
    (cat) => cat.name === activeCategory,
  );
  const showCategoryDescription =
    !isSearching && activeCategory !== "all" && activeCategoryData?.description;

  // ---- Handlers ----
  const handleSearch = () => setSearchQuery(search.trim());

  const handleReset = () => {
    setActiveCategory("all");
    setSort("");
    setSearch("");
    setSearchQuery("");
  };

  const handleSetCategory = (cat) => {
    setSearch("");
    setSearchQuery("");
    setActiveCategory(cat);
  };

  const handleSetSort = (s) => {
    setSearch("");
    setSearchQuery("");
    setSort(s);
  };

  // ---- Only block the whole page on the very first load ----
  const isFirstLoad = milestoneCategoryDataLoading && !milestoneCategoryData;

  if (isFirstLoad) {
    return <Loader />;
  }

  if (
    milestoneCategoryDataError ||
    milestoneDataError ||
    milestoneSearchError
  ) {
    return <ErrorMessageNetwork />;
  }

  // Show skeleton while data is being fetched (filter / sort / search)
  const showSkeleton = isFetching;

  return (
    <div>
      <ScrollToTop />
      <HelmetProvider>
        <MetaHelmet title={"milestone"} description={"milestone"} />
      </HelmetProvider>

      <div className="container4 mx-auto lg:mt-[5rem] mt-[2.5rem]">
        <h1 className="text-[2rem] text-secondary font-bold">
          {i18next.t("Milestone.milestone")}
        </h1>

        <div className="grid lg:grid-cols-12 grid-cols-1 mt-[2rem] gap-x-[2rem] lg:gap-y-0 gap-y-[2rem]">
          <MilestoneCategory
            milestoneCategoryData={milestoneCategoryData}
            activeCategory={activeCategory}
            setActiveCategory={handleSetCategory}
            sort={sort}
            setSort={handleSetSort}
            search={search}
            setSearch={setSearch}
            onSearch={handleSearch}
            onReset={handleReset}
          />

          <div className="lg:col-span-9 col-span-full">
            {showSkeleton ? (
              <MilestoneSkeleton
                cardsCount={6}
                showBanner={showCategoryDescription}
                isRTL={isRTL}
              />
            ) : (
              <>
                {showCategoryDescription && (
                  <div
                    className="mb-[2rem] relative py-[1rem] px-[1.5rem] rounded-2xl bg-white overflow-hidden"
                    style={{ boxShadow: "rgba(0, 0, 0, 0.25) 0px 0px 4px 0px" }}
                    dir={isRTL ? "rtl" : "ltr"}
                  >
                    <div className="absolute w-[0.3rem] h-full bg-negative top-0 right-0" />
                    <h2 className="text-[1.5rem] font-bold text-secondary mb-[1rem]">
                      {activeCategoryData.name}
                    </h2>
                    <div
                      className="text-[1rem] text-[#666666] leading-relaxed whitespace-pre-line line-clamp-3"
                      dangerouslySetInnerHTML={{
                        __html: activeCategoryData.description,
                      }}
                    />
                  </div>
                )}

                <MilestoneGrid
                  milestoneData={displayedData}
                  milestoneCategoryData={milestoneCategoryData}
                  activeCategory={activeCategory}
                  sort={sort}
                  isFetching={false}
                  searchQuery={searchQuery}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Milestone;
