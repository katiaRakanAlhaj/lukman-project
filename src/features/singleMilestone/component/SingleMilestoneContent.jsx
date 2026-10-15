import formatDate from "../../../component/ux/formatDate";
import DOMPurify from "dompurify";

const SingleMilestoneContent = ({ milestoneByIdData }) => {
  return (
    <div>
      <div className="lg:flex justify-between lg:mt-[2rem]">
        <h1 className="font-bold text-[#333333] lg:text-[1.6rem] text-[1.2rem] w-[80%]">
          {milestoneByIdData?.title}
        </h1>
        <p className="text-[#666666] lg:mt-0 mt-3">{formatDate(milestoneByIdData?.date)}</p>
      </div>
      <p
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(milestoneByIdData?.description),
        }}
        className="text-[#666666] text-justify text-[1rem] leading-[2rem] mt-3 whitespace-pre-line"
      ></p>
    </div>
  );
};
export default SingleMilestoneContent;
