import DOMPurify from "dompurify";
import { descriptionClasses } from "../../../../component/ux/descriptionClasses";
const Model10 = ({ data }) => {
  return (
    <div>
      <h1 className="text-secondary lg:text-[1.5rem] text-[1.3rem] font-bold">
        {data.title}
      </h1>
      <p
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(data.description),
        }}
        className={`${descriptionClasses} text-[#333333] mt-2 flex text-justify`}
      />
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-[2rem] mt-[1.5rem]">
        {data.content.map((item, index) => (
          <div key={index} className="flex flex-col space-y-2">
            <div className="lg:w-[4rem] lg:h-[4rem] w-[3rem] h-[3rem] rounded-full bg-[#099EC8] flex justify-center items-center">
              <p className="lg:text-[2rem] text-[1.5rem] font-bold text-white mt-3 whitespace-pre-line">
                {index + 1}
              </p>
            </div>
            <h1 className="font-bold text-[1.2rem] text-secondary">
              {item.title}
            </h1>
            <p
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(item.description),
              }}
              className="text-[1.1rem] text-[#333333]"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
export default Model10;
