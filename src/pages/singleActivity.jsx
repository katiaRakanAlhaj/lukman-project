import { useParams } from "react-router-dom";
import SingleActivityBanner from "../features/SingleActivity/component/SingleActivityBanner";
import { useFetchActivityById } from "../features/SingleActivity/hook/usefetchActivityById";
import SingleActivityContent from "../features/SingleActivity/component/SingleActivityContent";
import { useFetchCategoryContent } from "../features/Activities/hook/useFetchActivities";
import LastAcivities from "../features/SingleActivity/component/lastAcivities";

const SingleActivity = () => {
  const { id } = useParams();
  
  const {
    data: singleActivityData,
    isLoading: singleActivityDataLoading,
    error: singleActivityDataError,
  } = useFetchActivityById(id);

  const {
    data: activityContent,
    isLoading: activityContentLoading,
    error: activityContentError,
  } = useFetchCategoryContent();

  // Assuming singleActivityData has a category name property (adjust based on your API structure, e.g., singleActivityData?.category?.name)
  const currentCategoryName = singleActivityData?.category?.name || "Participations";

  return (
    <div className="container4 mx-auto">
      <SingleActivityBanner singleActivityData={singleActivityData} />
      <div className="grid lg:grid-cols-12 grid-cols-1 gap-x-[3rem] mt-[2rem]">
        <div className="lg:col-span-8 col-span-1 space-y-[2rem]">
          <SingleActivityContent singleActivityData={singleActivityData} />
        </div>
        <div className="lg:col-span-4 col-span-1">
          <LastAcivities 
            activityContent={activityContent} 
            categoryName={currentCategoryName} 
          />
        </div>
      </div>
    </div>
  );
};

export default SingleActivity;