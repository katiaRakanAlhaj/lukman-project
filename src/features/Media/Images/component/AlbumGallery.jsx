import { useRef, useCallback } from "react";
import AlbumImageCard from "./AlbumImageCard";
import EmptyState from "../../../../component/ux/emptyState";
import i18next from "i18next";
import Loader from "../../../../component/loader/loader";

const AlbumGallery = ({
  album,
  onBack,
  images,
  isLoading,
  isFetching,
  hasMore,
  onLoadMore,
  onImageClick,
}) => {
  const observerRef = useRef(null);

  const lastImageRef = useCallback(
    (node) => {
      if (isLoading || isFetching) return;
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          onLoadMore();
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [isLoading, isFetching, hasMore, onLoadMore],
  );

  // ── Initial loading state ──
  if (isLoading) {
    return (
      <div>
        <button
          onClick={onBack}
          className="mb-6 text-secondary font-bold hover:text-negative flex items-center gap-2"
        >
          <span>→</span> {i18next.t("Album.back_to_albums")}
        </button>

        <Loader />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="text-secondary font-bold hover:text-negative flex items-center gap-2"
        >
          <span>→</span> {i18next.t("Album.back_to_albums")}
        </button>
        <h2 className="text-xl font-bold text-secondary">{album.name}</h2>
      </div>

      {images.length === 0 && !isLoading && (
        <EmptyState message={i18next.t("Album.no_images")} />
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((img, index) => {
          const isLast = images.length === index + 1;

          return (
            <AlbumImageCard
              key={img.id}
              img={img}
              onClick={() => onImageClick(index)}
              innerRef={isLast ? lastImageRef : null}
            />
          );
        })}
      </div>

      {isFetching && <Loader />}
    </div>
  );
};

export default AlbumGallery;