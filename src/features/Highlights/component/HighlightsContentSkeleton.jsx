import i18next from "i18next";

/**
 * Skeleton that mimics the exact shape of a Highlight content card:
 * - rounded-lg container with a light blue background (#CEECF4)
 * - colored vertical bar on the left (en) / right (ar)
 * - title placeholder line
 * - a few description placeholder lines
 *
 * @param {number} count - how many skeleton cards to render
 */
const HighlightsContentSkeleton = ({ count = 3 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="w-auto bg-[#CEECF4]/50 h-auto rounded-lg relative mt-[1rem] overflow-hidden animate-pulse"
        >
          {/* Colored side bar — matches primary bar position */}
          <div
            className={`absolute w-[0.3rem] h-full bg-primary/40 ${
              i18next.language == "ar"
                ? "right-0 rounded-tr-lg rounded-br-lg"
                : "left-0 rounded-tl-lg rounded-bl-lg"
            }`}
          ></div>

          <div className="p-[1.5rem] space-y-[0.75rem]">
            {/* Title placeholder */}
            <div className="h-[1.2rem] w-1/3 rounded bg-[#099EC8]/25"></div>

            {/* Description placeholders */}
            <div className="h-[0.9rem] w-full rounded bg-[#333333]/10"></div>
            <div className="h-[0.9rem] w-5/6 rounded bg-[#333333]/10"></div>
            <div className="h-[0.9rem] w-2/3 rounded bg-[#333333]/10"></div>
          </div>
        </div>
      ))}
    </>
  );
};

export default HighlightsContentSkeleton;