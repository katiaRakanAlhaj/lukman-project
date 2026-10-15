import React from "react";

const Bone = ({ className = "" }) => (
  <div
    className={`animate-pulse bg-gray-200 rounded-md ${className}`}
    aria-hidden="true"
  />
);

/**
 * Skeleton for the category description banner.
 * Matches: rounded-2xl white card + right/left accent bar + title + 3-line desc
 */
const BannerSkeleton = ({ isRTL = false }) => (
  <div
    className="mb-[2rem] relative py-[1rem] px-[1.5rem] rounded-2xl bg-white overflow-hidden"
    style={{ boxShadow: "rgba(0, 0, 0, 0.25) 0px 0px 4px 0px" }}
    dir={isRTL ? "rtl" : "ltr"}
  >
    {/* Accent bar */}
    <div className="absolute w-[0.3rem] h-full bg-gray-300 top-0 right-0" />

    {/* Title */}
    <Bone className="h-[1.75rem] w-[40%] mb-[1rem]" />

    {/* Description lines */}
    <div className="space-y-[0.6rem]">
      <Bone className="h-[1rem] w-full" />
      <Bone className="h-[1rem] w-[92%]" />
      <Bone className="h-[1rem] w-[78%]" />
    </div>
  </div>
);

/**
 * Skeleton card — matches the MilestoneGrid card shape.
 * (image block + 2 title lines + 2 description lines + footer row)
 */
const CardSkeleton = () => (
  <div
    className="w-full rounded-2xl bg-white overflow-hidden p-[1rem] flex flex-col gap-[1rem]"
    style={{ boxShadow: "rgba(0, 0, 0, 0.25) 0px 0px 4px 0px" }}
  >
    {/* Image */}
    <Bone className="w-full h-[12rem] rounded-xl" />

    {/* Title */}
    <div className="space-y-[0.5rem]">
      <Bone className="h-[1.2rem] w-[85%]" />
      <Bone className="h-[1.2rem] w-[55%]" />
    </div>

    {/* Description */}
    <div className="space-y-[0.4rem]">
      <Bone className="h-[0.9rem] w-full" />
      <Bone className="h-[0.9rem] w-[90%]" />
    </div>

    {/* Footer / button */}
    <div className="mt-auto flex justify-between items-center">
      <Bone className="h-[0.9rem] w-[30%]" />
      <Bone className="h-[2rem] w-[6rem] rounded-full" />
    </div>
  </div>
);

/**
 * Full page skeleton — banner + grid of cards.
 */
const MilestoneSkeleton = ({ cardsCount = 6, showBanner = true, isRTL = false }) => {
  return (
    <>
      {showBanner && <BannerSkeleton isRTL={isRTL} />}

      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-[1.5rem]">
        {Array.from({ length: cardsCount }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    </>
  );
};

export default MilestoneSkeleton;