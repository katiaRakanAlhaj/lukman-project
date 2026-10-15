import React from "react";
import { useTranslation } from "react-i18next";
import LastSingleContent from "../../../component/ux/LastSingleContent";
import EmptyState from "../../../component/ux/EmptyState";

const LastActivities = ({ activityContent }) => {
  const { t } = useTranslation();

  const firstCategory = activityContent?.data?.[0];
  const recentActivities = firstCategory?.activities?.slice(0, 3) || [];

  return (
    <div className="lg:col-span-4 col-span-1">
      <h1 className="text-[#333333] font-bold text-[1.3rem]">
        {t("Activities.last_activities")}
      </h1>
      <div
        className="w-full h-[0.3rem] bg-negative"
        style={{ boxShadow: "rgba(0, 0, 0, 0.25) 0px -2px 4px 0px" }}
      />

      <div className="flex flex-col space-y-[1.4rem] mt-[2rem]">
        {recentActivities.length === 0 ? (
          <EmptyState message={t("Activities.no_activities")} />
        ) : (
          recentActivities.map((activity) => (
            <LastSingleContent
              key={activity.id}
              item={activity}
              linkPrefix="/Activity"
            />
          ))
        )}
      </div>
    </div>
  );
};

export default LastActivities;
