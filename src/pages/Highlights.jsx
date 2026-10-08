import { useEffect, useState } from "react";
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

  // ✅ Auto-select first category once categories arrive
  useEffect(() => {
    if (!activeCategoryId && highlightsCategoriesData?.data?.length > 0) {
      setActiveCategoryId(highlightsCategoriesData.data[0].id);
    }
  }, [highlightsCategoriesData, activeCategoryId]);

  // ✅ This hook will re-run whenever activeCategoryId changes
  const {
    data: highlightsCategoryContentData,
    isLoading: highlightsCategoryContentLoading,
    error: highlightsCategoryContentError,
  } = useFetchCategoryContent(activeCategoryId);
  const combinedLoading =
    highlightsPageDataLoading ||
    highlightsCategoriesDataLoading ||
    highlightsCategoryContentLoading;
  const combinedError =
    highlightsPageDataError ||
    highlightsCategoriesDataError ||
    highlightsCategoryContentError;
  if (combinedLoading) {
    return <Loader />;
  }
  if (combinedError) {
    return <ErrorMessageNetwork />;
  }
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
        />
      </HelmetProvider>
    </div>
  );
};

export default Highlights;
