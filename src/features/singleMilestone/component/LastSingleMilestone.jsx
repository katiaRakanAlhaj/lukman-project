import React from "react";
import { useTranslation } from "react-i18next";
import LastSingleContent from "../../../component/ux/LastSingleContent";

const LastSingleMilestone = ({ milestoneData }) => {
  const { t } = useTranslation();

  // Handle both shapes: array directly, or { data: [...] }
  const milestones = Array.isArray(milestoneData)
    ? milestoneData
    : milestoneData?.data || [];

  // Take only the first 4
  const latestMilestones = milestones.slice(0, 4);

  if (!latestMilestones.length) return null;

  return (
    <div className="lg:col-span-4 col-span-1">
      <h1 className="text-[#333333] font-bold text-[1.3rem]">
        {t("last-milestones")}
      </h1>

      <div
        className="w-full h-[0.3rem] bg-negative"
        style={{ boxShadow: "rgba(0, 0, 0, 0.25) 0px -2px 4px 0px" }}
      />

      <div className="flex flex-col space-y-[1.4rem] mt-[2rem]">
        {latestMilestones.map((milestone) => (
          <LastSingleContent
            key={milestone.id}
            item={milestone}
            linkPrefix="/Milestone"
          />
        ))}
      </div>
    </div>
  );
};

export default LastSingleMilestone;
