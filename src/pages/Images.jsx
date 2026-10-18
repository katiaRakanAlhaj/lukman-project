import { useEffect, useState } from "react";
import ImagesCategory from "../features/Media/Images/component/ImagesCategory";
import ImagesGrid from "../features/Media/Images/component/ImagesGrid";
import {
  useFetchImagesCategory,
  useFetchImages,
} from "../features/Media/Images/hook/useFetchImages";
import Loader from "../component/loader/loader";
import ErrorMessageNetwork from "../component/errorMessage/errorMessage";
import ScrollToTop from "../component/scrollToTop/ScrollToTop";
import { HelmetProvider } from "react-helmet-async";
import MetaHelmet from "../component/metaHelmet/metaHelmet";

const Images = () => {
  const {
    data: imagesCategoryData,
    isLoading: isCategoryLoading,
    error: categoryError,
  } = useFetchImagesCategory();

  // Highlighted category in the sidebar UI (doesn't fetch immediately)
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  // Committed category ID used for fetching data
  const [filters, setFilters] = useState({
    category: null,
  });

  const [page, setPage] = useState(1);

  // Auto-select the first category on initial load
  useEffect(() => {
    const categories = Array.isArray(imagesCategoryData)
      ? imagesCategoryData
      : Array.isArray(imagesCategoryData?.data)
        ? imagesCategoryData.data
        : [];

    if (categories.length > 0 && selectedCategoryId === null) {
      const firstId = categories[0].id;
      setSelectedCategoryId(firstId);
      setFilters({ category: firstId });
    }
  }, [imagesCategoryData, selectedCategoryId]);

  // Fetch images using only category ID & page
  const {
    data: imagesData,
    isLoading: isImagesLoading,
    isError: isImagesError,
    error: imagesError,
    isFetching: isImagesFetching,
  } = useFetchImages({
    id: filters.category,
    page,
  });

  // Reset page back to 1 whenever the committed filter changes
  useEffect(() => {
    setPage(1);
  }, [filters]);

  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters);
  };

  if (isCategoryLoading) {
    return <Loader />;
  }
  if (categoryError) {
    return <ErrorMessageNetwork />;
  }

  return (
    <div>
      <ScrollToTop />
      <HelmetProvider>
        <MetaHelmet title={"Images"} description={"Images"} />
        <div className="container4 mx-auto lg:mt-[6rem]">
          <div className="grid lg:grid-cols-12 grid-cols-1 gap-x-[2rem] lg:gap-y-0 gap-y-[2rem]">
            <div className="lg:col-span-3 col-span-full">
              <ImagesCategory
                imagesCategoryData={imagesCategoryData}
                activeCategoryId={selectedCategoryId}
                onSelectCategory={setSelectedCategoryId}
                onApplyFilters={handleApplyFilters}
                isLoading={isCategoryLoading}
                error={categoryError}
              />
            </div>
            <div className="lg:col-span-9 col-span-1">
              <ImagesGrid
                categoryId={filters.category}
                data={imagesData}
                isLoading={isImagesLoading}
                isError={isImagesError}
                error={imagesError}
                isFetching={isImagesFetching}
                page={page}
                setPage={setPage}
              />
            </div>
          </div>
        </div>
      </HelmetProvider>
    </div>
  );
};

export default Images;
