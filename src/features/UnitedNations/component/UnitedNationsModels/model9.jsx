import DOMPurify from "dompurify";
import i18next from "i18next";
const Model9 = ({ data }) => {
  return (
    <div className="w-full h-auto relative bg-[#CEECF4] rounded-md p-[1.5rem]">
      <div className={`absolute ${i18next.language == "ar"?'right-0 rounded-tr-md':'left-0 rounded-tl-md'} rounded-br-md h-full w-[0.3rem] bg-primary top-0`}></div>
      <h1 className="text-[1.3rem] font-bold text-[#099EC8]">{data.title}</h1>
      <p
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(data.description),
        }}
        className="text-[#333333] text-[1rem] mt-[1rem] whitespace-pre-line flex text-justify"
      />
    </div>
  );
};

export default Model9;
