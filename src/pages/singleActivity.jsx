import { useParams } from "react-router-dom";
import SingleActivityBanner from "../features/SingleActivity/component/SingleActivityBanner";
import { useFetchActivityById } from "../features/SingleActivity/hook/usefetchActivityById";
import SingleActivityContent from "../features/SingleActivity/component/SingleActivityContent";

const SingleActivity = () => {
  const { id } = useParams();
  const {
    data: singleActivityData,
    isLoading: singleActivityDataLoading,
    error: singleActivityDataError,
  } = useFetchActivityById(id);
  return (
    <div className="container4 mx-auto">
      <SingleActivityBanner singleActivityData={singleActivityData} />
      <div className="grid lg:grid-cols-12 grid-cols-1 gap-x-[3rem] mt-[2rem]">
        <div className="lg:col-span-8 col-span-1 space-y-[2rem]">
          <SingleActivityContent singleActivityData={singleActivityData} />
        </div>
      </div>
    </div>
  );
};
export default SingleActivity;
