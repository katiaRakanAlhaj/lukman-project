import ActivitiesBanner from "../features/Activities/component/ActivitiesBanner";
import ActivitiesGrid from "../features/Activities/component/ActivitiesGrid";
import { useFetchActivitiesPage, useFetchCategoryContent } from "../features/Activities/hook/useFetchActivities";

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
  return (
    <div className="container4 mx-auto">
      <ActivitiesBanner ActivitiesData = {ActivitiesData}/>
      <ActivitiesGrid CategoryContent = {CategoryContent}/>
    </div>
  );
};
export default Activities;
