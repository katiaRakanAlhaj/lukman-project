const BooksGridSkeleton = () => {
  return (
    <div className="relative w-full h-[20rem] rounded-b-3xl shadow-[0_0_4px_0_#00000040] md:flex animate-pulse">
      {/* Book cover */}
      <div className="md:h-[17rem] md:w-[15rem] w-[10rem] h-[10rem] mt-[-6rem] mr-[1.5rem] rounded-lg bg-gray-200 shadow-[0_4px_4px_0_#00000040]" />

      {/* Text column */}
      <div className="flex flex-col p-6 flex-1">
        {/* Title */}
        <div className="h-[1.2rem] w-3/4 bg-gray-200 rounded mb-2" />

        {/* Date row */}
        <div className="flex gap-x-2 mt-2 items-center">
          <div className="w-6 h-6 rounded-full bg-gray-200" />
          <div className="h-[0.9rem] w-24 bg-gray-200 rounded" />
        </div>

        {/* Description lines */}
        <div className="mt-4 space-y-2">
          <div className="h-[0.9rem] w-full bg-gray-200 rounded" />
          <div className="h-[0.9rem] w-full bg-gray-200 rounded" />
          <div className="h-[0.9rem] w-11/12 bg-gray-200 rounded" />
          <div className="h-[0.9rem] w-9/12 bg-gray-200 rounded" />
        </div>
      </div>

      {/* Download bar */}
      <div className="w-full h-[3.8rem] bg-gray-300 absolute bottom-0 rounded-b-3xl" />
    </div>
  );
};

export default BooksGridSkeleton;
