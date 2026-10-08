import { HelmetProvider } from "react-helmet-async";
import Loader from "../component/loader/loader";
import ScrollToTop from "../component/scrollToTop/ScrollToTop";
import VissionBanner from "../features/Vission/component/vissionBanner";
import VissionGrid from "../features/Vission/component/vissionGrid";
import {
  useFetchVissionCategory,
  useFetchVissionPage,
} from "../features/Vission/hook/useFetchVission";
import MetaHelmet from "../component/metaHelmet/metaHelmet";
import ErrorMessageNetwork from "../component/errorMessage/errorMessage";

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
  if (vissionpageDataError || vissionCategoryContentError) {
    return <ErrorMessageNetwork />;
  }
  return (
    <div>
      <ScrollToTop />
      <HelmetProvider>
        <MetaHelmet
          title={vissionpageData?.data?.meta_title}
          description={vissionpageData?.data?.meta_description}
        />
        <VissionBanner vissionpageData={vissionpageData} />
        <VissionGrid vissionCategoryContent={vissionCategoryContent} />
      </HelmetProvider>
    </div>
  );
};
export default Vission;
