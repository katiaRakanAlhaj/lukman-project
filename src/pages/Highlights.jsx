import { useEffect, useState } from "react";
import HighlightsBanner from "../features/Highlights/component/HighlightsBanner";
import HighlightsGrid from "../features/Highlights/component/HighlightsGrid";
import {
  useFetchCategories,
  useFetchCategoryContent,
  useFetchHighlights,
} from "../features/Highlights/hooks/useFetchHighlights";

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

  return (
    <div>
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
    </div>
  );
};

export default Highlights;