import React, { useState } from "react";
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
  // Define state for active filters with default language set to "ar"
  const [filters, setFilters] = useState({
    language: "ar",
    category: "all",
    sort: "",
  });

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

  // Pass filters to the hook so it automatically fetches with query params when changed
  const {
    data: videosData,
    isLoading: videosDataLoading,
    error: videosDataError,
  } = useFetchVideos(filters);
  const combinedLoading =
    mediaDataLoading ||
    videoCategoryDataLoading ||
    videosDataLoading ||
    homePageDataLoading;
  const combinedError =
    mediaDataError ||
    videoCategoryDataError ||
    videosDataError ||
    homePageDataError;
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
              <MediaGrid homePageData={homePageData} videosData={videosData} />
            </div>
          </div>
        </div>
      </HelmetProvider>
    </div>
  );
};

export default Media;
