import Loader from "../component/loader/loader";
import ScrollToTop from "../component/scrollToTop/ScrollToTop";
import ActivitiesBanner from "../features/Activities/component/ActivitiesBanner";
import ActivitiesGrid from "../features/Activities/component/ActivitiesGrid";
import {
  useFetchActivitiesPage,
  useFetchCategoryContent,
} from "../features/Activities/hook/useFetchActivities";

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
      <div className="container4 mx-auto">
        <ActivitiesBanner ActivitiesData={ActivitiesData} />
        <ActivitiesGrid CategoryContent={CategoryContent} />
      </div>
    </div>
  );
};
export default Activities;
