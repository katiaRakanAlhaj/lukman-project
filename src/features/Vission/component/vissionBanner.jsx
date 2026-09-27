import i18next from "i18next";

const VissionBanner = ({ vissionpageData }) => {
  return (
    <div className="relative">
      <div className="w-full relative flex items-center justify-center text-center lg:h-[27rem] h-[20rem]">
        <div
          className="absolute w-full h-full bg-cover -z-10 transition-all duration-700"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0) 0%, rgb(0, 47, 60) 100%), url("${vissionpageData?.data?.banner}")`,
            backgroundRepeat: 'no-repeat',
          }}
        ></div>
        <div className="mt-[2rem] lg:mt-0 w-[60%]">
          <p className="text-white font-[700] text-[2.8rem]"></p>
          <p className="text-white font-[400] text-[1.2rem] lg:line-clamp-none line-clamp-3 px-[2rem]"></p>
        </div>
      </div>
      <div className="absolute bottom-[4rem] right-[4rem] text-[2.5rem] font-bold text-white">
        {i18next.t("Vision.vission_and_principles")}
      </div>
    </div>
  );
};

export default VissionBanner;