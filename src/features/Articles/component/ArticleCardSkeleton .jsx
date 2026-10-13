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

const ArticlesGridSkeleton = ({ cards = 3 }) => (
  <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-[2rem]">
    {Array.from({ length: cards }).map((_, i) => (
      <ArticleCardSkeleton key={i} />
    ))}
  </div>
);

export default ArticlesGridSkeleton;