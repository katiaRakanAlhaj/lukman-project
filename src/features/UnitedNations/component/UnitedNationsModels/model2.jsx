import DOMPurify from "dompurify";
import { descriptionClasses } from "../../../../component/ux/descriptionClasses";
const Model2 = ({ data }) => {
  return (
    <div>
      <h1 className="lg:text-[2.3rem] text-[1.5rem] font-bold text-secondary">
        {data?.title}
      </h1>
      <p
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(data?.description),
        }}
        className={`text-[#333333] ${descriptionClasses} flex text-justify whitespace-pre-line`}
      />
    </div>
  );
};

export default Model2;
