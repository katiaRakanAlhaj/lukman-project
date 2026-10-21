import DOMPurify from "dompurify";
import { descriptionClasses } from "../../../../component/ux/descriptionClasses";
const Model15 = ({ data }) => {
  const cards = data.content || [];
  return (
    <div>
      <h1 className="font-bold lg:text-[1.5rem] text-[1.3rem] text-secondary">
        {data.title}
      </h1>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-[2rem] mt-2">
        {cards.map((card, index) => (
          <div
            key={index}
            className="w-full lg:h-[16rem] bg-white rounded-3xl p-[1.3rem]"
            style={{ boxShadow: "rgba(0, 0, 0, 0.25) 0px 0px 2px 0px" }}
          >
            <h1 className="lg:text-[1.3rem] text-[1.2rem] font-bold text-[#099EC8]">
              {card.title}
            </h1>
            <p
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(card.description),
              }}
              className={`${descriptionClasses} lg:mt-0 mt-2 text-[#666666] line-clamp-6 whitespace-pre-line`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Model15;
