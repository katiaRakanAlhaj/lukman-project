import React from "react";

const ImageCardSkeleton = () => {
  return (
    <div className="rounded-2xl h-[28rem] relative overflow-hidden bg-white shadow-lg flex flex-col border border-gray-100 animate-pulse">
      {/* Image area — matches h-[15rem] */}
      <div className="relative w-full h-[15rem] overflow-hidden bg-gray-200" />

      {/* Content area — matches padding and gaps */}
      <div className="p-4 flex flex-col gap-2 flex-1 pb-[4rem]">
        {/* Location row (title) */}
        <div className="flex items-start gap-2">
          <div className="w-4 h-4 mt-0.5 rounded bg-gray-200 flex-shrink-0" />
          <div className="h-5 bg-gray-200 rounded w-3/4" />
        </div>

        {/* Address row */}
        <div className="flex items-start gap-2">
          <div className="w-4 h-4 mt-0.5 rounded bg-gray-200 flex-shrink-0" />
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-2/3" />
          </div>
        </div>

        {/* Date row */}
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-gray-200 flex-shrink-0" />
          <div className="h-3.5 bg-gray-200 rounded w-1/3 mt-1" />
        </div>
      </div>

      {/* Bottom button — matches h-[3.5rem] rounded-b-2xl */}
      <div className="absolute left-0 right-0 bottom-0 w-full h-[3.5rem] rounded-b-2xl bg-gray-300" />
    </div>
  );
};

export default ImageCardSkeleton;