import React from "react";

const ResumeGrid = ({ homePageData, degreesData }) => {
  // Safely access the image URL from homePageData
  const degreesImage = homePageData?.data?.degrees_image;

  // Safely access the degrees array
  const degrees = degreesData?.data || [];

  return (
    <div className="grid lg:grid-cols-12 grid-cols-1 gap-x-[4em] lg:mt-[5rem] mt-[2.5rem]">
      {/* Left Column: Image */}
      <div className="lg:col-span-4 col-span-full">
        <img
          className="w-full lg:h-[24em] h-[20rem] object-cover rounded-3xl"
          src={degreesImage}
          alt="Degrees"
          style={{ boxShadow: "rgba(0, 0, 0, 0.25) 0px 0px 4px 0px" }}
        />
      </div>

      {/* Right Column: Degrees List */}
      <div className="lg:col-span-8 col-span-full flex justify-center items-center">
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-x-[3em] gap-y-[3em] lg:mt-0 mt-[2rem]">
          {degrees.map((degree, index) => {
            const isLastItem = index === degrees.length - 1;

            const isLastInColumn =
              index === degrees.length - 1 ||
              (degrees.length % 2 === 0 && index === degrees.length - 2);

            return (
              <div
                key={degree.id}
                className="flex items-center gap-x-[1em] relative"
              >
                {/* Decorative bar */}
                <div className="w-[2em] h-[0.7em] bg-negative rounded-t-sm"></div>

                {/* Vertical line connector - only show if NOT the last in its column */}
                {!isLastInColumn && (
                  <div className="absolute w-[0.1em] h-[5em] bg-[#959595] top-[3em] right-[1em]"></div>
                )}

                {/* Text Content */}
                <div className="flex flex-col space-y-2">
                  <h1 className="md:text-[1.2em] text-[1rem] font-bold text-primary">
                    {degree.title}
                  </h1>
                  {degree.description && (
                    <p className="text-primary text-[1.1em] whitespace-pre-line flex text-justify">
                      {degree.description}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ResumeGrid;
