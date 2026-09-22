import DOMPurify from "dompurify";
import i18next from "i18next";

const ActivitiesBanner = ({ ActivitiesData }) => {
  // Safely access the data object
  const data = ActivitiesData?.data || {};

  const banner = data.banner;
  const title = data.title;
  const description = data.description;

  return (
    <div>
      <h1 className="font-bold text-[2rem] text-secondary lg:mt-[2.5rem] mt-[0.9rem]">
        {i18next.t("Activities.Activities")}
      </h1>
      <p
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(ActivitiesData?.data?.description),
        }}
        className="text-[1rem] text-[#666666]"
      />
      <div className="lg:mt-[4rem] mt-[2rem] relative">
        <div className="w-full relative flex items-center justify-center text-center h-[30rem]">
          {/* Background banner image with gradient overlay */}
          <div
            className="absolute lg:rounded-3xl w-full h-full bg-cover -z-10 transition-all duration-700"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0) 0%, rgba(0, 6, 10, 0.15) 23.95%, rgba(0, 11, 19, 0.28) 45.9%, rgb(0, 41, 70) 100%), url("${banner}")`,
              backgroundRepeat: "no-repeat",
            }}
          />
        </div>

        {/* Bottom-right title label */}
        <div className="absolute bottom-[2rem] right-[4rem] text-[2rem] font-bold text-white">
          {title}
        </div>
      </div>
    </div>
  );
};

export default ActivitiesBanner;
