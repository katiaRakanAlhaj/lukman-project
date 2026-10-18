import { ResumeTitle } from "../../../component/ux/ResumeTitle";
import DOMPurify from "dompurify";

const ResumeExtraTabs = ({ ExtraTabsData }) => {
  // Safely access the tabs array (works with both { data: [...] } and raw array)
  const tabs = Array.isArray(ExtraTabsData)
    ? ExtraTabsData
    : ExtraTabsData?.data || [];

  if (!tabs.length) return null;

  return (
    <div className="mt-[3.5rem]">
      <div className="flex flex-col gap-y-[2.5rem]">
        {tabs.map((tab) => {
          // Only render image if a real URL exists (not empty / not a bare folder path)
          const hasImage =
            typeof tab.image === "string" &&
            tab.image.trim() !== "" &&
            tab.image.trim() !==
              "https://lfw.hostorr.net/storage/public/image/";

          return (
            <div key={tab.id} className="w-full">
              {/* Tab name OUTSIDE the box — ResumeTitle design */}
              <ResumeTitle title={tab.tab_name} />

              {/* Content box (no title inside anymore) */}
              <div
                className="w-full rounded-2xl p-6 bg-white"
                style={{ boxShadow: "rgba(0, 0, 0, 0.25) 0px 0px 4px 0px" }}
              >
                {/* Image — only if a real image exists */}
                {hasImage && (
                  <img
                    src={tab.image}
                    alt={tab.tab_name}
                    className="w-full max-h-[16rem] object-cover rounded-xl mb-4"
                  />
                )}

                {/* Optional Title */}
                {tab.title && (
                  <p className="text-[#555555] text-[1.1rem] font-semibold mb-2">
                    {tab.title}
                  </p>
                )}

                {/* Rich HTML Description */}
                <div
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(tab.description),
                  }}
                  className="extra-tab-description text-[#333333] text-lg leading-[1.9]"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ResumeExtraTabs;
