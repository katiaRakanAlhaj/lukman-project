import i18next from "i18next";
import { useState } from "react";
import MilestoneCategory from "../features/Milestone/component/MilestoneCategory";
import MilestoneGrid from "../features/Milestone/component/MilestoneGrid";
import { useFetchMilestoneCategory } from "../features/Milestone/hook/useFetchMilestone";

const Milestone = () => {
  const {
    data: milestoneCategoryData,
    isLoading: milestoneCategoryDataLoading,
    error: milestoneCategoryDataError,
  } = useFetchMilestoneCategory();

  const [activeCategory, setActiveCategory] = useState("all");

  return (
    <div className="container4 mx-auto lg:mt-[5rem] mt-[2.5rem]">
      <h1 className="text-[2rem] text-secondary font-bold">
        {i18next.t("Milestone.milestone")}
      </h1>
      <div className="grid lg:grid-cols-12 grid-cols-1 mt-[2rem] gap-x-[2rem] lg:gap-y-0 gap-y-[2rem]">
        <MilestoneCategory
          milestoneCategoryData={milestoneCategoryData}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
        <MilestoneGrid
          milestoneCategoryData={milestoneCategoryData}
          activeCategory={activeCategory}
        />
      </div>
    </div>
  );
};
export default Milestone;