import { useParams } from "react-router-dom";
import SingleMilestoneBanner from "../features/singleMilestone/component/singleMilestoneBanner";
import {
  useFetchMilestoneById,
  useFetchMilestones,
} from "../features/singleMilestone/hook/useFetchMilestone";
import ScrollToTop from "../component/scrollToTop/ScrollToTop";
import SingleMilestoneContent from "../features/singleMilestone/component/SingleMilestoneContent";
import LastSingleMilestone from "../features/singleMilestone/component/LastSingleMilestone";
import Loader from "../component/loader/loader";
import ErrorMessageNetwork from "../component/errorMessage/errorMessage";

const SingleMilestone = () => {
  const { id } = useParams();
  const {
    data: milestoneByIdData,
    isLoading: milestoneByIdDataLoading,
    error: milestoneByIdDataError,
  } = useFetchMilestoneById(id);
  
  const {
    data: milestoneData,
    isLoading: milestoneDataLoading,
    error: milestoneDataError,
  } = useFetchMilestones();

  if (milestoneByIdDataLoading || milestoneDataLoading) {
    return <Loader />;
  }

  if (milestoneByIdDataError || milestoneDataError) {
    return <ErrorMessageNetwork />;
  }

  return (
    <div>
      <ScrollToTop />
      <div className="container4 mx-auto lg:mt-[2.5rem]">
        <SingleMilestoneBanner milestoneByIdData={milestoneByIdData} />
        
        {/* Grid layout with items-start */}
        <div className="grid gap-y-[2rem] lg:grid-cols-12 grid-cols-1 gap-x-[3rem] mt-[2rem] items-start">
          
          {/* Main Content Area */}
          <div className="lg:col-span-8 col-span-1">
            <SingleMilestoneContent milestoneByIdData={milestoneByIdData} />
          </div>

          {/* Sticky Sidebar Area with scrollbar hidden */}
          <div className="lg:col-span-4 col-span-1 lg:sticky lg:top-[2rem] max-h-[calc(100vh-4rem)] overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            <LastSingleMilestone milestoneData={milestoneData} />
          </div>

        </div>
      </div>
    </div>
  );
};

export default SingleMilestone;