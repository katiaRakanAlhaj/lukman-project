import i18next from "i18next";
const ContactBanner = ({ contactDataPage }) => {
  const data = contactDataPage?.data || {};
  return (
    <div className="container4 mx-auto">
      <div>
        <div className="lg:mt-[4rem] relative">
          {/* Banner Image */}
          <div
            className="w-full lg:h-[27rem] h-[20rem] bg-cover lg:rounded-[2.5rem]"
            style={{
              backgroundImage: `linear-gradient(0deg, rgb(0, 0, 0) 0%, rgba(0, 0, 0, 0) 48.63%), url("${data.banner}")`,
              backgroundRepeat: "no-repeat",
            }}
          ></div>

          {/* Name Label Background */}
          <div
            className={`absolute lg:block hidden ${i18next.language == "ar" ? "left-[13%]" : "right-[13%]"} bg-[#f0f0f0] backdrop-blur-sm`}
            style={{
              top: "83%",
              width: "calc(29%)",
              height: "17%",
              transform: "scaleX(1)",
              borderRadius: "2rem 2rem 0px 0px",
            }}
          ></div>

          {/* Name Label Text */}
          <div
            className={`absolute lg:block hidden top-[90%] ${i18next.language == "ar" ? "left-[16rem]" : "right-[13rem]"} text-primary font-bold text-[1.7rem]`}
          >
            {i18next.t("lukman_title")}{" "}
          </div>

          {/* Banner Title */}
          <div
            className={`absolute ${i18next.language == "ar" ? "right-[3rem]" : "left-[3rem]"} bottom-[3rem] text-[2rem] text-white font-bold`}
          >
            {data.title}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ContactBanner;
