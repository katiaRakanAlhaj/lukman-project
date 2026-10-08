import { HelmetProvider } from "react-helmet-async";
import Loader from "../component/loader/loader";
import ScrollToTop from "../component/scrollToTop/ScrollToTop";
import ActivitiesBanner from "../features/Activities/component/ActivitiesBanner";
import ActivitiesGrid from "../features/Activities/component/ActivitiesGrid";
import {
  useFetchActivitiesPage,
  useFetchCategoryContent,
} from "../features/Activities/hook/useFetchActivities";
import MetaHelmet from "../component/metaHelmet/metaHelmet";

const Activities = () => {
  const {
    data: ActivitiesData,
    isLoading: ActivitiesDataLoading,
    error: ActivitiesDataError,
  } = useFetchActivitiesPage();
  const {
    data: CategoryContent,
    isLoading: CategoryContentLoading,
    error: CategoryContentError,
  } = useFetchCategoryContent();
  const combinedLoading = ActivitiesDataLoading || CategoryContentLoading;
  if (combinedLoading) {
    return <Loader />;
  }
  return (
    <div>
      <ScrollToTop />
      <HelmetProvider>
        <MetaHelmet
          title={ActivitiesData?.data?.meta_title}
          description={ActivitiesData?.data?.meta_description}
        />
        <div className="container4 mx-auto">
          <ActivitiesBanner ActivitiesData={ActivitiesData} />
          <ActivitiesGrid CategoryContent={CategoryContent} />
        </div>
      </HelmetProvider>
    </div>
  );
};
export default Activities;
