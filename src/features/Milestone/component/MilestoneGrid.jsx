import { useState, useMemo, useEffect } from "react";
import { useTranslation } from "react-i18next";
import SeeMoreButton from "../../../component/ux/seeMoreButton";
import EmptyState from "../../../component/ux/emptyState";
import i18next from "i18next";
import ContentCard from "../../../component/ux/ContentCard";

const INITIAL_COUNT = 6;
const LOAD_MORE_COUNT = 6;

const SORT_OPTIONS = {
  TITLE_ASC: "title_asc",
  ID_ASC: "id_asc",
  ID_DESC: "id_desc",
};

// ---- Card skeleton that matches the real milestone card ----
const MilestoneCardSkeleton = () => (
  <div
    className="h-[28rem] w-full relative rounded-3xl bg-white overflow-hidden"
    style={{ boxShadow: "rgba(0, 0, 0, 0.25) 0px 0px 4px 0px" }}
    aria-hidden="true"
  >
    {/* Image */}
    <div className="w-full h-[13rem] rounded-t-3xl bg-gray-200 animate-pulse" />

    {/* Text body */}
    <div className="mt-[1rem] px-[1rem] space-y-[0.75rem]">
      {/* Title — 2 lines */}
      <div className="space-y-[0.5rem]">
        <div className="h-[1.1rem] w-[85%] bg-gray-200 rounded animate-pulse" />
        <div className="h-[1.1rem] w-[55%] bg-gray-200 rounded animate-pulse" />
      </div>

      {/* Date row */}
      <div className="flex items-center gap-x-2 mt-2">
        <div className="w-[1rem] h-[1rem] rounded-full bg-gray-200 animate-pulse" />
        <div className="h-[0.85rem] w-[6rem] bg-gray-200 rounded animate-pulse" />
      </div>

      {/* Description — 3 lines */}
      <div className="space-y-[0.45rem] pt-1">
        <div className="h-[0.85rem] w-full bg-gray-200 rounded animate-pulse" />
        <div className="h-[0.85rem] w-[92%] bg-gray-200 rounded animate-pulse" />
        <div className="h-[0.85rem] w-[70%] bg-gray-200 rounded animate-pulse" />
      </div>
    </div>

    {/* Footer button */}
    <div className="w-full h-[2.5em] bg-gray-300 animate-pulse rounded-b-3xl absolute bottom-0" />
  </div>
);

const MilestoneGrid = ({
  milestoneData,
  activeCategory,
  sort = "",
  isFetching = false,
  searchQuery = "",
}) => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // ---- Normalize API response into array ----
  const items = useMemo(() => {
    if (!milestoneData) return [];
    if (Array.isArray(milestoneData)) return milestoneData;
    if (Array.isArray(milestoneData.milestones))
      return milestoneData.milestones;
    if (Array.isArray(milestoneData.data)) return milestoneData.data;
    return [];
  }, [milestoneData]);

  // ---- Apply sorting (respects language for title) ----
  const sortedItems = useMemo(() => {
    const list = [...items];

    switch (sort) {
      case SORT_OPTIONS.TITLE_ASC: {
        const key = isRTL ? "title_ar" : "title_en";
        return list.sort((a, b) => {
          const aTitle = a[key] || a.title || "";
          const bTitle = b[key] || b.title || "";
          return aTitle.localeCompare(bTitle, isRTL ? "ar" : "en");
        });
      }
      case SORT_OPTIONS.ID_ASC:
        return list.sort((a, b) => a.id - b.id);
      case SORT_OPTIONS.ID_DESC:
        return list.sort((a, b) => b.id - a.id);
      default:
        return list;
    }
  }, [items, sort, isRTL]);

  // ---- Reset pagination on category/sort/search/data change ----
  useEffect(() => {
    setVisibleCount(INITIAL_COUNT);
    setIsLoadingMore(false);
  }, [activeCategory, sort, searchQuery, sortedItems.length]);

  const visibleItems = useMemo(
    () => sortedItems.slice(0, visibleCount),
    [sortedItems, visibleCount],
  );

  const hasMore = visibleCount < sortedItems.length;

  // ---- Load more with skeleton flash ----
  const handleLoadMore = () => {
    if (isLoadingMore) return;
    setIsLoadingMore(true);

    // Let skeleton render for a moment before expanding the list.
    // If you have a real "load more" fetch, call it here and
    // setIsLoadingMore(false) inside its onSuccess / onSettled.
    setTimeout(() => {
      setVisibleCount((prev) =>
        Math.min(prev + LOAD_MORE_COUNT, sortedItems.length),
      );
      setIsLoadingMore(false);
    }, 600);
  };

  const stripHtml = (html) => {
    if (!html) return "";
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  // ---- First-load / refetch skeleton (whole grid) ----
  if (isFetching && sortedItems.length === 0) {
    return (
      <div className="lg:col-span-9 col-span-full" dir={isRTL ? "rtl" : "ltr"}>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-[2rem]">
          {Array.from({ length: 6 }).map((_, i) => (
            <MilestoneCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  // ---- Empty ----
  if (!isFetching && sortedItems.length === 0) {
    return <EmptyState message={i18next.t("Milestone.noMilestones")} />;
  }

  return (
    <div className="lg:col-span-9 col-span-full" dir={isRTL ? "rtl" : "ltr"}>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-[2rem]">
        {visibleItems.map((item) => {
          const displayTitle =
            (isRTL ? item.title_ar : item.title_en) || item.title;

          return (
            <ContentCard
              key={item.id}
              id={item.id}
              banner={item.banner}
              title={displayTitle}
              date={item.date}
              description={item.description}
              linkPrefix="/Milestone"
            />
          );
        })}
        {/* ---- Skeleton cards while loading more ---- */}
        {isLoadingMore &&
          Array.from({ length: LOAD_MORE_COUNT }).map((_, i) => (
            <MilestoneCardSkeleton key={`sk-${i}`} />
          ))}
      </div>

      {/* Hide the See More button while loading to prevent double-clicks */}
      {hasMore && !isLoadingMore && <SeeMoreButton onClick={handleLoadMore} />}
    </div>
  );
};

export default MilestoneGrid;
