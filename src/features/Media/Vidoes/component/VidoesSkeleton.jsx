const VidoesSkeleton = ({ count = 6 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div key={`media-skeleton-${i}`} className="relative">
          <div className="relative w-full lg:h-[22rem] h-[20rem] rounded-3xl overflow-hidden bg-gray-200 animate-pulse">
            {/* Play button skeleton */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="lg:w-[7rem] lg:h-[7rem] md:w-[5rem] md:h-[5rem] w-[3.5rem] h-[3.5rem] rounded-full bg-gray-300" />
            </div>

            {/* Bottom title + date skeleton */}
            <div className="absolute bottom-4 left-0 right-0 px-6 flex justify-between items-end gap-4">
              <div className="h-[0.9rem] bg-gray-300 rounded w-[60%]" />
              <div className="h-[0.85rem] bg-gray-300 rounded w-[4rem]" />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default VidoesSkeleton;