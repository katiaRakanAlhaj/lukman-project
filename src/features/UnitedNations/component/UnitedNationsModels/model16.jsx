import DOMPurify from "dompurify";
const Model16 = ({ data }) => {
  const items = data.content || [];
  return (
    <div>
      <h1 className="font-bold text-secondary text-[1.5rem]">{data.title}</h1>

      <div className="grid md:grid-cols-2 gap-[2rem] mt-[1rem]">
        {items.map((item, index) => (
          <div key={index} className="flex gap-x-[1.5rem]">
            <div className="h-[30rem] w-[0.2rem] bg-[#099EC8]"></div>
            <div className="flex flex-col">
              <h1 className="text-[1.2rem] font-bold text-secondary">
                {item.title}
              </h1>
              <p
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(item.description),
                }}
                className="text-[1rem] line-clamp-6 text-[#666666] whitespace-pre-line flex text-justify"
              />

              {item.image && (
                <img
                  className="w-full h-[18rem] rounded-xl mt-[1rem] object-cover"
                  src={item.image}
                  alt={item.title}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Model16;
