import DOMPurify from "dompurify";
import { descriptionClasses } from "../../../../component/ux/descriptionClasses";
const Model11 = ({ data }) => {
  return (
    <div className="flex flex-col space-y-2">
      <h1 className="font-bold lg:text-[1.5rem] text-[1.3rem] text-secondary">
        {data.title}
      </h1>
      <p
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(data.description),
        }}
        className={`${descriptionClasses} text-[#333333]  flex text-justify`}
      />
      {data.image && (
        <img
          className="w-[25rem] h-[20rem] object-contain pt-[1rem]"
          src={data.image}
          alt={data.title}
        />
      )}
    </div>
  );
};

export default Model11;
