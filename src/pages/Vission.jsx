import Loader from "../component/loader/loader";
import ScrollToTop from "../component/scrollToTop/ScrollToTop";
import VissionBanner from "../features/Vission/component/vissionBanner";
import VissionGrid from "../features/Vission/component/vissionGrid";
import {
  useFetchVissionCategory,
  useFetchVissionPage,
} from "../features/Vission/hook/useFetchVission";

const Vission = () => {
  const {
    data: vissionpageData,
    isLoading: vissionpageDataLoading,
    error: vissionpageDataError,
  } = useFetchVissionPage();
  const {
    data: vissionCategoryContent,
    isLoading: vissionCategoryContentLoading,
    error: vissionCategoryContentError,
  } = useFetchVissionCategory();
  const combinedLoading =
    vissionpageDataLoading || vissionCategoryContentLoading;
  if (combinedLoading) {
    return <Loader />;
  }
  return (
    <div>
      <ScrollToTop />
      <VissionBanner vissionpageData={vissionpageData} />
      <VissionGrid vissionCategoryContent={vissionCategoryContent} />
    </div>
  );
};
export default Vission;
