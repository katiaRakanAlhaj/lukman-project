import React, { useState, useRef } from "react";
import { useFetchHomePage } from "../features/home/hook/useFetchHome";
import MediaCategory from "../features/Media/component/mediaCategory";
import MediaGrid from "../features/Media/component/mediaGrid";
import {
  useFetchVideoCategory,
  useFetchVideos,
  useFetchVideosPage,
} from "../features/Media/hook/useFetchVideos";
import Loader from "../component/loader/loader";
import ScrollToTop from "../component/scrollToTop/ScrollToTop";
import { HelmetProvider } from "react-helmet-async";
import MetaHelmet from "../component/metaHelmet/metaHelmet";
import ErrorMessageNetwork from "../component/errorMessage/errorMessage";

const Media = () => {
  const [filters, setFilters] = useState({
    language: "ar",
    category: "all",
    sort: "",
  });

  // Track whether the initial videos fetch has completed at least once
  const hasLoadedOnceRef = useRef(false);

  const {
    data: mediaData,
    isLoading: mediaDataLoading,
    error: mediaDataError,
  } = useFetchVideosPage();

  const {
    data: videoCategoryData,
    isLoading: videoCategoryDataLoading,
    error: videoCategoryDataError,
  } = useFetchVideoCategory();

  const {
    data: homePageData,
    isLoading: homePageDataLoading,
    error: homePageDataError,
  } = useFetchHomePage();

  const {
    data: videosData,
    isLoading: videosDataLoading,
    isFetching: videosDataFetching, // 👈 optional but useful with react-query
    error: videosDataError,
  } = useFetchVideos(filters);

  // Mark that we've loaded once (so future filter changes know it's a refetch)
  if (!videosDataLoading && videosData) {
    hasLoadedOnceRef.current = true;
  }

  // Only block the whole page on the very first load
  const isInitialLoading =
    !hasLoadedOnceRef.current &&
    (mediaDataLoading ||
      videoCategoryDataLoading ||
      videosDataLoading ||
      homePageDataLoading);

  const combinedError =
    mediaDataError ||
    videoCategoryDataError ||
    videosDataError ||
    homePageDataError;

  if (isInitialLoading) {
    return <Loader />;
  }

  if (combinedError) {
    return <ErrorMessageNetwork />;
  }

  // When filters change (after first load), show skeleton in the grid
  const isFiltering = hasLoadedOnceRef.current && videosDataLoading;

  return (
    <div>
      <ScrollToTop />
      <HelmetProvider>
        <MetaHelmet
          title={mediaData?.data?.meta_title}
          description={mediaData?.data?.meta_description}
        />

        <div className="container4 mx-auto lg:mt-[4rem] mt-[2.5rem]">
          <div className="grid lg:grid-cols-12 grid-cols-1 gap-x-[2rem] lg:gap-y-0 gap-y-[2rem]">
            <div className="lg:col-span-3 col-span-full">
              <MediaCategory
                videoCategoryData={videoCategoryData}
                onApplyFilters={(newFilters) => setFilters(newFilters)}
              />
            </div>
            <div className="lg:col-span-9 col-span-1">
              <MediaGrid
                homePageData={homePageData}
                videosData={videosData}
                isFiltering={isFiltering} // 👈 pass it down
              />
            </div>
          </div>
        </div>
      </HelmetProvider>
    </div>
  );
};

export default Media;