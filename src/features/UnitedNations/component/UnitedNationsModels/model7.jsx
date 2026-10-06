import DOMPurify from "dompurify";
const Model7 = ({ data }) => {
  return (
    <div>
      <h1 className="text-secondary text-[1.5rem] font-bold">{data.title}</h1>
      <div
        className="w-full bg-white rounded-2xl mt-2 p-[2rem] h-[100%]"
        style={{ boxShadow: "rgba(0, 0, 0, 0.25) 0px 0px 2px 0px" }}
      >
        <div className="flex gap-x-4">
          {/* Timeline icons + vertical lines */}
          <div className="flex flex-col items-center">
            {data.content.map((item, index) => {
              const isLast = index === data.content.length - 1;
              return (
                <div key={index} className="flex flex-col items-center">
                  <img
                    className="w-[1.5rem] h-[1.5rem]"
                    src={item.icon}
                    alt={item.title}
                  />
                  {!isLast && (
                    <div className="w-[0.1rem] lg:h-[6.5rem] md:h-[7.5rem] h-[10rem] bg-negative"></div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Content list */}
          <div className="flex flex-col space-y-[1.5rem] flex-1">
            {data.content.map((item, index) => {
              const isLast = index === data.content.length - 1;
              return (
                <div
                  key={index}
                  className={`w-full pb-2 ${
                    isLast ? "" : "border-b-[0.14rem] border-b-[#C4C4C4]"
                  }`}
                >
                  <h1 className="text-secondary text-[1.1rem] font-bold">
                    {item.title}
                  </h1>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(item.description),
                    }}
                    className="text-[1rem] text-[#666666] mt-2 mb-4 whitespace-pre-line flex text-justify"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Model7;
