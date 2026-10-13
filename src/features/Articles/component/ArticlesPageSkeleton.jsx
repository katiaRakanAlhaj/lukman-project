import React from "react";

const ArticleCardSkeleton = () => (
  <div
    className="h-[28rem] w-full rounded-3xl overflow-hidden bg-white animate-pulse"
    style={{ boxShadow: "rgba(0, 0, 0, 0.25) 0px 0px 4px 0px" }}
  >
    <div className="w-full h-[13rem] bg-gray-200 rounded-t-3xl" />
    <div className="mt-[1rem] px-[1rem] flex flex-col gap-[0.7rem]">
      <div className="h-[1rem] bg-gray-200 rounded w-[75%]" />
      <div className="h-[0.8rem] bg-gray-200 rounded w-[40%]" />
      <div className="h-[0.8rem] bg-gray-200 rounded w-[95%] mt-2" />
      <div className="h-[0.8rem] bg-gray-200 rounded w-[85%]" />
      <div className="h-[0.8rem] bg-gray-200 rounded w-[60%]" />
    </div>
    <div className="h-[2.5em] bg-gray-200 mt-4" />
  </div>
);

const FilterSidebarSkeleton = () => (
  <div className="animate-pulse">
    <div className="w-full h-[3.3rem] bg-gray-200 rounded-lg" />

    <div
      className="w-full py-[1.5rem] mt-[1rem] rounded-3xl p-[1.5rem] bg-white"
      style={{ boxShadow: "rgba(0, 0, 0, 0.25) 0px 0px 4px 0px" }}
    >
      <div className="h-[1rem] bg-gray-200 rounded w-[60%]" />
      <div className="h-[1rem] bg-gray-200 rounded w-[45%] mt-3" />

      <div className="flex flex-wrap gap-[0.5rem] mt-5">
        <div className="h-[2.2rem] w-full bg-gray-200 rounded-full" />
        <div className="h-[2.2rem] w-[30%] bg-gray-200 rounded-full" />
        <div className="h-[2.2rem] w-[30%] bg-gray-200 rounded-full" />
        <div className="h-[2.2rem] w-[30%] bg-gray-200 rounded-full" />
      </div>

      <div className="h-[0.8rem] bg-gray-200 rounded w-[40%] mt-6" />
      <div className="h-[2.5rem] bg-gray-200 rounded-lg w-full mt-2" />
      <div className="h-[0.9rem] bg-gray-200 rounded w-[35%] mx-auto mt-5" />
    </div>
  </div>
);

const DescriptionSkeleton = () => (
  <div className="lg:mt-[5.5rem] mt-[0.9rem] animate-pulse">
    {/* Title */}
    <div className="h-[2rem] bg-gray-200 rounded w-[10rem]" />
    {/* Description lines */}
    <div className="h-[1rem] bg-gray-200 rounded w-[80%] mt-[1rem]" />
    <div className="h-[1rem] bg-gray-200 rounded w-[70%] mt-2" />
  </div>
);

const ArticlesPageSkeleton = ({ cards = 6 }) => {
  return (
    <>
      {/* Description skeleton */}
      <DescriptionSkeleton />

      {/* Grid + sidebar skeleton */}
      <div className="lg:mt-[3rem] mt-[2.5rem]">
        <div className="grid lg:grid-cols-12 grid-cols-1 gap-x-[2rem] lg:gap-y-0 gap-y-[2rem]">
          <div className="lg:col-span-3 col-span-full">
            <FilterSidebarSkeleton />
          </div>
          <div className="lg:col-span-9 col-span-1">
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-[2rem]">
              {Array.from({ length: cards }).map((_, i) => (
                <ArticleCardSkeleton key={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ArticlesPageSkeleton;