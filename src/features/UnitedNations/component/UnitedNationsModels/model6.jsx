import DOMPurify from "dompurify";
import { descriptionClasses } from "../../../../component/ux/descriptionClasses";
const Model6 = ({ data }) => {
  return (
    <div>
      <h1 className="text-[#333333] text-[1.3rem] font-bold">{data.title}</h1>
      <p
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(data.description),
        }}
        className={`${descriptionClasses} text-[#333333] leading-[2rem] mt-2 whitespace-pre-line  flex text-justify`}
      />
    </div>
  );
};

export default Model6;
