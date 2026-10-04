import { useFetchHomePage } from "../features/home/hook/useFetchHome";
import MediaCategory from "../features/Media/component/mediaCategory";
import MediaGrid from "../features/Media/component/mediaGrid";
import {
  useFetchVideoCategory,
  useFetchVideos,
  useFetchVideosPage,
} from "../features/Media/hook/useFetchVideos";

const Media = () => {
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
      error: videosDataError,
    } = useFetchVideos();
  return (
    <div className="container4 mx-auto lg:mt-[4rem] mt-[2.5rem]">
      <div className="grid lg:grid-cols-12 grid-cols-1 gap-x-[2rem] lg:gap-y-0 gap-y-[2rem]">
        <div className="lg:col-span-3 col-span-full">
          <MediaCategory videoCategoryData={videoCategoryData} />
        </div>
        <div className="lg:col-span-9 col-span-1">
          <MediaGrid homePageData = {homePageData} videosData = {videosData}/>
        </div>
      </div>
    </div>
  );
};
export default Media;
