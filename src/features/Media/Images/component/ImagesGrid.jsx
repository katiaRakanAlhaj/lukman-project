import { useEffect, useState } from "react";
import formatDate from "../../../../component/ux/formatDate";
import click from "../../../../assets/images/click.svg";
import i18next from "i18next";
import SeeMoreButton from "../../../../component/ux/seeMoreButton";
import ImageCardSkeleton from "./ImageCardSkeleton";
import EmptyState from "../../../../component/ux/emptyState";
import { MapPinIcon, CalendarIcon, HomeIcon, openLocationOnMap } from "./Icons";

const SKELETON_COUNT = 3;

const ImagesGrid = ({
  categoryId,
  data,
  isLoading,
  isError,
  error,
  isFetching,
  page,
  setPage,
}) => {
  const [images, setImages] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  // Reset internal state when category changes
  useEffect(() => {
    setImages([]);
    setHasMore(false);
  }, [categoryId]);

  // Merge incoming data into the accumulated images list
  useEffect(() => {
    if (!data) return;

    const newImages = Array.isArray(data)
      ? data
      : Array.isArray(data?.data)
        ? data.data
        : [];

    const meta = data?.meta;
    const more =
      meta?.current_page != null && meta?.last_page != null
        ? meta.current_page < meta.last_page
        : newImages.length >= (meta?.per_page ?? 9);

    setHasMore(more);

    if (page === 1) {
      setImages(newImages);
    } else {
      setImages((prev) => {
        const seen = new Set(prev.map((i) => i.id));
        return [...prev, ...newImages.filter((i) => !seen.has(i.id))];
      });
    }
  }, [data, page]);

  const handleLoadMore = () => {
    if (!isFetching && hasMore) setPage((p) => p + 1);
  };

  const isLoadingMore = isFetching && page > 1;

  // ---- Initial skeleton ----
  if (isLoading && page === 1) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <ImageCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-red-600">
        Error loading images: {error?.message ?? "Unknown error"}
      </div>
    );
  }

  if (images.length === 0 && !isLoadingMore) {
    return (
      <div className="text-gray-500 text-center py-10">
        <EmptyState message={i18next.t("images.no_images")} />
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((img) => (
          <div
            key={img.id}
            className="group rounded-2xl h-[28rem] relative overflow-hidden bg-white shadow-lg transition-all duration-300 flex flex-col border border-gray-100"
          >
            <div className="relative w-full h-[15rem] overflow-hidden">
              <img
                src={img.image}
                alt={img.location || img.address}
                loading="lazy"
                className="w-full h-full object-cover transform transition-transform duration-500 ease-out group-hover:scale-125"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            <div className="p-4 flex flex-col gap-2 flex-1 pb-[4rem]">
              <div className="flex items-start gap-2">
                <MapPinIcon className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <p className="text-lg font-semibold text-gray-800 line-clamp-1">
                  {img.location}
                </p>
              </div>

              <div className="flex items-start gap-2">
                <HomeIcon className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <p className="text-md text-[#333333] line-clamp-2">
                  {img.address}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <CalendarIcon className="w-4 h-4 flex-shrink-0" />
                <p className="text-sm text-gray-500 mt-1">
                  {formatDate(img.date)}
                </p>
              </div>
            </div>

            <button
              onClick={() => openLocationOnMap(img.location || img.address)}
              className="absolute left-0 right-0 bottom-0 w-full flex justify-center gap-x-2 items-center h-[3.5rem] rounded-b-2xl bg-negative cursor-pointer"
            >
              <p className="text-white font-bold text-[1.1rem] mt-[0.2rem]">
                {i18next.t("Links.click_button")}
              </p>
              <img
                src={click}
                className={`w-[1.5rem] ${i18next.language === "en" ? "rotate-90" : ""}`}
                alt="click svg"
              />
            </button>
          </div>
        ))}

        {isLoadingMore &&
          Array.from({ length: SKELETON_COUNT }).map((_, i) => (
            <ImageCardSkeleton key={`skeleton-${i}`} />
          ))}
      </div>

      {hasMore && !isLoadingMore && <SeeMoreButton onClick={handleLoadMore} />}
    </div>
  );
};

export default ImagesGrid;
