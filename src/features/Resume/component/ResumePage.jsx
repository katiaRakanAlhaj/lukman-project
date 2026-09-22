import { useState } from "react";
import { useTranslation } from "react-i18next";
import uploadFile from "../../../assets/images/uploadFile.svg";

const ResumePage = ({ resumePageData }) => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);

  const handleDownload = async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const link = document.createElement("a");
      link.href = resumePageData?.data?.cv_file;
      link.download = "resume.pdf";
      link.target = "_self";
      link.rel = "noopener";
      document.body.appendChild(link);
      link.click();
      link.remove();

      // Keep loader visible briefly for UX (optional)
      setTimeout(() => setIsLoading(false), 1500);
    } catch (error) {
      console.error("Download failed:", error);
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="lg:mt-[3.5rem] relative">
        <div className="w-full relative flex items-center justify-center text-center lg:h-[27rem] h-[20rem]">
          <div
            className="absolute lg:rounded-3xl w-full h-full bg-cover -z-10 transition-all duration-700"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 129.24%), url("${resumePageData?.data?.banner}")`,
              backgroundRepeat: "no-repeat",
            }}
          ></div>
          <div className="mt-[2rem] lg:mt-0 w-[60%]">
            <p className="text-white font-[700] text-[2.8rem]"></p>
            <p className="text-white font-[400] text-[1.2rem] lg:line-clamp-none line-clamp-3 px-[2rem]"></p>
          </div>
        </div>

        <button
          disabled={isLoading}
          className={`absolute flex items-center justify-center gap-x-2 bottom-[2.5rem] w-[20rem] h-[3rem] rounded-full transform lg:translate-x-1/3 lg:left-1/3 transition-all
            ${isLoading ? "bg-primary cursor-wait disabled:opacity-100" : "bg-negative cursor-pointer"}`}
          onClick={handleDownload}
        >
          {isLoading ? (
            <>
              {/* White spinner */}
              <svg
                className="w-[1.3rem] h-[1.3rem] animate-spin text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              <p className="text-[1.2rem] text-white mt-2">
                {t("resumePage.downloading")}
              </p>
            </>
          ) : (
            <>
              <img
                className="w-[1.5rem]"
                src={uploadFile}
                alt={t("resumePage.downloadIconAlt")}
              />
              <p className="text-[1.2rem] text-white mt-2 underline">
                {t("resumePage.downloadCV")}
              </p>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ResumePage;
