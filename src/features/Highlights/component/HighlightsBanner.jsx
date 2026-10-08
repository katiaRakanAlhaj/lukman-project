import i18next from "i18next";

const HighlightsBanner = ({ highlightsPageData }) => {
  return (
    <div className="relative">
      <div className="w-full relative flex items-center justify-center text-center lg:h-[28rem] h-[20rem]">
        <div
          className="absolute w-full h-full bg-cover -z-10 transition-all duration-700"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0) 0%, rgb(0, 47, 60) 100%), url("${highlightsPageData?.data?.banner}")`,
            backgroundRepeat: "no-repeat",
          }}
        ></div>
      </div>
      <div
        className={`absolute bottom-[4rem] ${i18next.language == "ar" ? "right-[4rem]" : "left-[4rem]"} text-[2.5rem] font-bold text-white`}
      >
        {i18next.t("Highlights.Highlights")}
      </div>
    </div>
  );
};

export default HighlightsBanner;
