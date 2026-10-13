const SkeletonTitle = ({ width = "w-2/3" }) => (
  <div
    className={`h-[1.7rem] ${width} bg-gray-200 rounded mb-[0.7rem] animate-pulse`}
  />
);

const SkeletonParagraph = ({ lines = 4 }) => {
  const widths = [
    "w-full",
    "w-full",
    "w-11/12",
    "w-10/12",
    "w-full",
    "w-9/12",
  ];
  return (
    <div className="space-y-[0.9rem]">
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className={`h-[1rem] ${
            widths[i % widths.length]
          } bg-gray-200 rounded animate-pulse`}
        />
      ))}
    </div>
  );
};

const SkeletonImage = () => (
  <div className="w-full lg:h-[25rem] h-[20rem] rounded-3xl bg-gray-200 animate-pulse" />
);

/* ------------------------------------------------------------------ */
/* Skeleton that takes the SAME shape as the real content              */
/* ------------------------------------------------------------------ */

const VissionGridSkeleton = ({ blocks = [] }) => {
  // Fallback: if we don't know the shape yet (e.g. first load), show
  // one image row and one text-only row as a safe default.
  const safeBlocks =
    blocks.length > 0 ? blocks : [{ image: true }, { image: false }];

  return (
    <>
      {safeBlocks.map((block, i) => {
        const isRtl = i % 2 === 0;

        /* ---------- Row with image (matches real image row) ---------- */
        if (block.image) {
          return (
            <div
              key={i}
              className={`grid lg:grid-cols-12 gap-y-[2rem] gap-x-[3rem] mb-[3.5rem] ${
                isRtl ? "rtl" : "ltr"
              }`}
            >
              {/* Image column */}
              <div
                className={`lg:col-span-5 col-span-1 ${
                  isRtl ? "lg:order-2" : "lg:order-3"
                }`}
              >
                <SkeletonImage />
              </div>

              {/* Title + description column */}
              <div
                className={`lg:col-span-7 col-span-1 flex flex-col justify-center ${
                  isRtl ? "lg:order-3" : "lg:order-2"
                }`}
              >
                <SkeletonTitle width="w-2/3" />
                <SkeletonParagraph lines={5} />
              </div>
            </div>
          );
        }

        /* ---------- Row without image (matches real text-only row) ---------- */
        return (
          <div
            key={i}
            className={`grid lg:grid-cols-12 gap-y-[2rem] gap-x-[3rem] mb-[3.5rem] ${
              isRtl ? "rtl" : "ltr"
            }`}
          >
            <div className="lg:col-span-12 col-span-1 order-1">
              <SkeletonTitle width="w-1/2" />
              <div className="mt-[0.7rem]">
                <SkeletonParagraph lines={6} />
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default VissionGridSkeleton;