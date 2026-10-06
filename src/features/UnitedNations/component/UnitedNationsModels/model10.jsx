import DOMPurify from "dompurify";
const Model10 = ({ data }) => {
  return (
    <div>
      <h1 className="text-secondary text-[1.5rem] font-bold">{data.title}</h1>
      <p
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(data.description),
        }}
        className="text-[1rem] text-[#333333] mt-2 flex text-justify"
      />
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-[2rem] mt-[1.5rem]">
        {data.content.map((item, index) => (
          <div key={index} className="flex flex-col space-y-2">
            <div className="w-[4rem] h-[4rem] rounded-full bg-[#099EC8] flex justify-center items-center">
              <p className="text-[2rem] font-bold text-white mt-3 whitespace-pre-line">
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
              className="text-[1rem] text-[#333333] whitespace-pre-line flex text-justify"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
export default Model10;
