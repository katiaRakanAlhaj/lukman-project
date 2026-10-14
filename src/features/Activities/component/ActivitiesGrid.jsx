import React, { useState, useEffect } from "react";
import DOMPurify from "dompurify";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ActivitiesGridSkeleton from "./ActivitiesGridSkeleton";
import SeeMoreButton from "../../../component/ux/seeMoreButton";
import EmptyState from "../../../component/ux/EmptyState"; // 👈 new import
import formatDate from "../../../component/ux/formatDate";

const INITIAL_COUNT = 4;
const LOAD_MORE_COUNT = 6;

const ActivitiesGrid = ({ CategoryContent }) => {
  const { lang } = useParams();
  const { t } = useTranslation();

  const categories = Array.isArray(CategoryContent)
    ? CategoryContent
    : CategoryContent?.data || [];

  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(false); // category switch loader
  const [loadingMore, setLoadingMore] = useState(false); // see-more loader
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

  // When category changes → reset visible count + show skeleton
  useEffect(() => {
    setLoading(true);
    setVisibleCount(INITIAL_COUNT);

    const timer = setTimeout(() => setLoading(false), 700); // simulate fetch
    return () => clearTimeout(timer);
  }, [activeIndex]);

  if (!categories.length) return null;

  const activeCategory = categories[activeIndex];
  const activities = activeCategory?.activities || [];

  // Reset visibleCount if category has fewer items than current visibleCount
  useEffect(() => {
    if (visibleCount > activities.length && activities.length > 0) {
      setVisibleCount(activities.length);
    }
  }, [activities.length, visibleCount]);
  const handleSeeMore = () => {
    setLoadingMore(true);
    setTimeout(() => {
      setVisibleCount((prev) =>
        Math.min(prev + LOAD_MORE_COUNT, activities.length),
      );
      setLoadingMore(false);
    }, 700); // simulate fetch delay
  };

  const visibleActivities = activities.slice(0, visibleCount);
  const hasMore = visibleCount < activities.length;

  return (
    <div className="mt-8">
      {/* Tabs */}
      <div className="flex overflow-x-auto scrollbar-hide lg:gap-[5rem] gap-[3rem] border-b border-b-[#C4C4C4] mt-[4rem]">
        {categories.map((category, index) => {
          const isActive = index === activeIndex;
          return (
            <button
              key={category.id}
              onClick={() => setActiveIndex(index)}
              className={`lg:text-[1.3rem] text-[1rem] transition-all duration-300 ${
                isActive
                  ? "text-negative border-b-[0.8rem] border-negative font-bold"
                  : "text-[#666] hover:text-negative"
              }`}
            >
              {category.name}
            </button>
          );
        })}
      </div>

      {/* Activities list */}
      <div>
        {loading ? (
          <ActivitiesGridSkeleton count={3} />
        ) : (
          <>
            {visibleActivities.map((activity) => (
              <Link to={`/${lang}/Activity/${activity.id}`} key={activity.id}>
                <div className="mt-[2.5rem] grid lg:grid-cols-12 grid-cols-1 gap-x-[2rem] lg:gap-y-0 gap-y-[2rem]">
                  {/* Left: text */}
                  <div className="lg:col-span-8 col-span-1">
                    <p className="text-[#000000] text-[0.9rem]">
                      {formatDate(activity.date)}
                    </p>
                    <h1 className="text-[#000000] mt-[1rem] font-bold lg:text-[1.3rem] text-[1.2rem]">
                      {activity.title}
                    </h1>
                    <div
                      className="text-[#666666] text-lg mt-2 w-[95%] whitespace-pre-line"
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(activity.description || ""),
                      }}
                    />
                  </div>

                  {/* Right: image */}
                  <div className="lg:col-span-4 col-span-1">
                    <img
                      className="w-full h-[15rem] object-cover rounded-3xl cursor-pointer hover:opacity-90 transition-opacity"
                      src={activity.banner}
                      alt={activity.title}
                    />
                  </div>
                </div>
              </Link>
            ))}

            {/* Loading more skeleton */}
            {loadingMore && <ActivitiesGridSkeleton count={3} />}

            {/* See more button (extracted component) */}
            {hasMore && !loadingMore && (
              <SeeMoreButton onClick={handleSeeMore} />
            )}

            {/* Empty state (reusable component) */}
            {!activities.length && (
              <EmptyState message={t("Activities.noActivities")} />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ActivitiesGrid;
