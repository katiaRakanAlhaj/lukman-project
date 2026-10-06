import DOMPurify from "dompurify";
const Model13 = ({ data }) => {
  const cards = data.content || [];
  return (
    <div className="flex flex-col space-y-2">
      <h1 className="text-secondary font-bold text-[1.5rem]">{data.title}</h1>

      <p
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(data.description),
        }}
        className="text-[#666666] text-[1rem] whitespace-pre-line flex text-justify"
      />

      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-[2rem] pt-[0.8rem]">
        {cards.map((card, index) => (
          <div
            key={index}
            className="w-full h-[11rem] rounded-2xl bg-white flex flex-col space-y-2 p-[1rem]"
            style={{ boxShadow: "rgba(0, 0, 0, 0.25) 0px 0px 2px 0px" }}
          >
            {card.icon && (
              <img
                className="w-[2rem] h-[2rem] object-contain"
                src={card.icon}
                alt={card.title}
              />
            )}
            <h1 className="text-[1.1rem] text-secondary font-bold">
              {card.title}
            </h1>
            <p
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(card.description),
              }}
              className="text-[0.9rem] text-[#666666] line-clamp-3 whitespace-pre-line flex text-justify"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Model13;
