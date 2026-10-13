const SkeletonCard = () => {
  return (
    <div className="mt-[2.5rem] grid lg:grid-cols-12 grid-cols-1 gap-x-[2rem] lg:gap-y-0 gap-y-[2rem] animate-pulse">
      
      {/* Right: text skeleton */}
      <div className="lg:col-span-7 col-span-1 flex flex-col gap-[1rem] lg:justify-center">
        {/* top line (short, right aligned) */}
        <div className="h-[1rem] bg-gray-200 rounded w-[30%] lg:ml-auto" />
        {/* long line */}
        <div className="h-[1rem] bg-gray-200 rounded w-[85%]" />
        {/* medium line */}
        <div className="h-[1rem] bg-gray-200 rounded w-[60%]" />
      </div>
      {/* Left: image skeleton */}
      <div className="lg:col-span-5 col-span-1">
        <div className="w-full h-[15rem] bg-gray-200 rounded-3xl" />
      </div>

    </div>
  );
};

const ActivitiesGridSkeleton = ({ count = 3 }) => {
  return (
    <div>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
};

export default ActivitiesGridSkeleton;