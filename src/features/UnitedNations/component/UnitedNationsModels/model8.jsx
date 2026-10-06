import DOMPurify from "dompurify";
const Model8 = ({ data }) => {
  return (
    <div>
      <h1 className="font-bold text-[#333333] text-[1.5rem]">{data.title}</h1>
      <p
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(data.description),
        }}
        className="text-[1rem] text-[#333333] mt-2 flex text-justify whitespace-pre-line"
      />
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-[2rem] mt-[1.6rem]">
        {data.content.map((item, index) => (
          <div
            key={index}
            className="w-full h-[9rem] bg-white rounded-2xl p-[1.5rem]"
            style={{
              boxShadow: "rgba(0, 0, 0, 0.25) 0px 0px 2px 0px",
            }}
          >
            <h1 className="text-secondary font-bold text-[1.1rem]">
              {item.title}
            </h1>
            <p
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(item?.description),
              }}
              className="text-[#666666] mt-2 text-[1rem] line-clamp-3 flex text-justify whitespace-pre-line"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
export default Model8;
