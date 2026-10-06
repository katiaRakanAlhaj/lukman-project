import i18next from "i18next";

const LastAcivities = ({ activityContent }) => {
  // ===== Take the first category, then its first 6 activities =====
  const firstCategory = activityContent?.data?.[0];
  const recentActivities = firstCategory?.activities?.slice(0, 3) || [];

  // ===== Helper: format ISO date -> DD-MM-YYYY =====
  const formatDate = (isoDate) => {
    const d = new Date(isoDate);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <div className="lg:col-span-4 col-span-1">
      <h1 className="text-[#333333] font-bold text-[1.3rem]">
        {i18next.t("Activities.last_activities")}
      </h1>
      <div
        className="w-full h-[0.3rem] bg-negative"
        style={{ boxShadow: "rgba(0, 0, 0, 0.25) 0px -2px 4px 0px" }}
      ></div>

      <div className="flex flex-col space-y-[1.4rem] mt-[2rem]">
        {recentActivities.length === 0 ? (
          <p className="text-[#666666] text-[0.9rem]">لا توجد أنشطة حالياً</p>
        ) : (
          recentActivities.map((activity) => (
            <div key={activity.id} className="flex flex-col">
              <img
                className="w-full h-[15rem] object-cover rounded-2xl cursor-pointer hover:opacity-90 transition-opacity"
                alt={activity.title}
                src={activity.banner}
              />
              <div className="flex justify-between">
                <h1 className="font-bold text-[#000000] text-[1.2rem] mt-4">
                  {activity.title}
                </h1>
                <p className="text-[#000000] whitespace-nowrap text-[0.9rem] mt-4">
                  {formatDate(activity.date)}
                </p>
              </div>
              <div
                className="text-[#666666] text-[0.9rem] mt-1 whitespace-pre-line"
                dangerouslySetInnerHTML={{ __html: activity.description }}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default LastAcivities;
