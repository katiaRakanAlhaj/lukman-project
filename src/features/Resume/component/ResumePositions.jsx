import DOMPurify from "dompurify";
import i18next from "i18next";
const ResumePositions = ({ PositionsData }) => {
  // Safely access the array (works with both { data: [...] } and raw array)
  const positions = Array.isArray(PositionsData)
    ? PositionsData
    : PositionsData?.data || [];

  if (!positions.length) return null;

  return (
    <div className="mt-[3.5rem]">
      <h1 className="text-primary mb-2 text-[1.8rem] font-bold">
        {i18next.t("resumePage.postions")}
      </h1>

      <div>
        <div className="grid lg:grid-cols-12 grid-cols-1 gap-x-[4em] gap-y-[2rem]">
          <div className="lg:col-span-12 col-span-1 space-y-[1em]">
            {positions.map((position) => (
              <div
                key={position.id}
                className="w-full h-auto rounded-2xl p-6"
                style={{ boxShadow: "rgba(0, 0, 0, 0.25) 0px 0px 4px 0px" }}
              >
                <div className="lg:flex justify-between">
                  <h1 className="text-secondary lg:text-[1.3em] text-[1rem] font-bold lg:font-[500]">
                    {position.title}
                  </h1>
                  <p className="text-secondary lg:text-[1.2em] text-[0.9rem]">
                    {position.date}
                  </p>
                </div>

                {position.description && (
                  <p
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(position.description),
                    }}
                    className="text-[1em] text-secondary mt-2 whitespace-pre-line"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumePositions;
