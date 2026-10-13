import { useEffect, useRef, useState } from "react";
import HighlightsBanner from "../features/Highlights/component/HighlightsBanner";
import HighlightsGrid from "../features/Highlights/component/HighlightsGrid";
import {
  useFetchCategories,
  useFetchCategoryContent,
  useFetchHighlights,
} from "../features/Highlights/hooks/useFetchHighlights";
import Loader from "../component/loader/loader";
import ScrollToTop from "../component/scrollToTop/ScrollToTop";
import { HelmetProvider } from "react-helmet-async";
import MetaHelmet from "../component/metaHelmet/metaHelmet";
import ErrorMessageNetwork from "../component/errorMessage/errorMessage";

const Highlights = () => {
  const [activeCategoryId, setActiveCategoryId] = useState(null);

  // Track whether the first content load has finished at least once
  const hasLoadedOnceRef = useRef(false);

  // Banner data
  const {
    data: highlightsPageData,
    isLoading: highlightsPageDataLoading,
    error: highlightsPageDataError,
  } = useFetchHighlights();

  // Sidebar categories
  const {
    data: highlightsCategoriesData,
    isLoading: highlightsCategoriesDataLoading,
    error: highlightsCategoriesDataError,
  } = useFetchCategories();

  // Auto-select first category once categories arrive
  useEffect(() => {
    if (!activeCategoryId && highlightsCategoriesData?.data?.length > 0) {
      setActiveCategoryId(highlightsCategoriesData.data[0].id);
    }
  }, [highlightsCategoriesData, activeCategoryId]);

  // Re-runs whenever activeCategoryId changes
  const {
    data: highlightsCategoryContentData,
    isLoading: highlightsCategoryContentLoading,
    error: highlightsCategoryContentError,
  } = useFetchCategoryContent(activeCategoryId);

  // Mark first successful content load
  if (
    activeCategoryId &&
    !highlightsCategoryContentLoading &&
    highlightsCategoryContentData
  ) {
    hasLoadedOnceRef.current = true;
  }

  // Full-page loader only on the very first load
  const isInitialLoading =
    !hasLoadedOnceRef.current &&
    (highlightsPageDataLoading ||
      highlightsCategoriesDataLoading ||
      highlightsCategoryContentLoading);

  const combinedError =
    highlightsPageDataError ||
    highlightsCategoriesDataError ||
    highlightsCategoryContentError;

  if (isInitialLoading) {
    return <Loader />;
  }

  if (combinedError) {
    return <ErrorMessageNetwork />;
  }

  // After the first load, switching category = show skeleton in the grid
  const isCategorySwitching =
    hasLoadedOnceRef.current && highlightsCategoryContentLoading;

  return (
    <div>
      <ScrollToTop />
      <HelmetProvider>
        <MetaHelmet
          title={highlightsPageData?.data?.meta_title}
          description={highlightsPageData?.data?.meta_description}
        />
        <HighlightsBanner highlightsPageData={highlightsPageData} />
        <HighlightsGrid
          categories={highlightsCategoriesData?.data || []}
          categoriesLoading={highlightsCategoriesDataLoading}
          activeCategoryId={activeCategoryId}
          onSelectCategory={setActiveCategoryId}
          content={highlightsCategoryContentData}
          contentLoading={highlightsCategoryContentLoading}
          contentError={highlightsCategoryContentError}
          isCategorySwitching={isCategorySwitching} // 👈 new prop
        />
      </HelmetProvider>
    </div>
  );
};

export default Highlights;