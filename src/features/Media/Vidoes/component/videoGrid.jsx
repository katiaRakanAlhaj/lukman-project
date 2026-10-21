import { useState, useEffect, useRef } from "react";
import DOMPurify from "dompurify";
import i18next from "i18next";
import autoPlay from "../../../../assets/images/autoPlay.svg";
import SeeMoreButton from "../../../../component/ux/seeMoreButton";
import formatDate from "../../../../component/ux/formatDate";
import EmptyState from "../../../../component/ux/emptyState";
import VidoesSkeleton from "./VidoesSkeleton";
import { descriptionClasses } from "../../../../component/ux/descriptionClasses";

const VideoGrid = ({ videosData, homePageData, isFiltering = false }) => {
  const [activeVideo, setActiveVideo] = useState(null);
  const [rect, setRect] = useState(null);
  const [visibleCount, setVisibleCount] = useState(8); // show first 8
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const gridRef = useRef(null);

  // ===== Normalize data =====
  const videos = Array.isArray(videosData)
    ? videosData
    : Array.isArray(videosData?.videos)
      ? videosData.videos
      : Array.isArray(videosData?.data)
        ? videosData.data
        : [];

  // ===== Slice videos for pagination =====
  const visibleVideos = videos.slice(0, visibleCount);
  const hasMore = visibleCount < videos.length;

  // ===== Reset pagination + scroll to top of grid when data changes =====
  useEffect(() => {
    setVisibleCount(8);
    if (gridRef.current) {
      gridRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [videosData]);

  // ===== Handle see more with skeleton =====
  const handleSeeMore = () => {
    setIsLoadingMore(true);
    // simulate loading delay (replace with real API call if needed)
    setTimeout(() => {
      setVisibleCount((prev) => prev + 6); // load 6 more
      setIsLoadingMore(false);
    }, 1200);
  };

  // ===== Lock body scroll while modal is open =====
  useEffect(() => {
    if (activeVideo) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeVideo]);

  // ===== Close on ESC =====
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setActiveVideo(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // ===== Handle thumbnail click =====
  const handleOpen = (e, video) => {
    const r = e.currentTarget.getBoundingClientRect();
    setRect({
      top: r.top,
      left: r.left,
      width: r.width,
      height: r.height,
    });
    setActiveVideo(video);
  };

  // ===== Render video player =====
  const renderPlayer = (video) => {
    const url = video?.video || "";

    const ytMatch = url.match(
      /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]+)/,
    );
    if (ytMatch) {
      const videoId = ytMatch[1];
      const src =
        `https://www.youtube.com/embed/${videoId}` +
        `?autoplay=1` +
        `&rel=0` +
        `&modestbranding=0` +
        `&playsinline=1` +
        `&enablejsapi=1` +
        `&origin=${encodeURIComponent(
          typeof window !== "undefined" ? window.location.origin : "",
        )}`;

      return (
        <iframe
          src={src}
          title={video.title || "video"}
          className="w-full h-full"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      );
    }

    const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
    if (vimeoMatch) {
      return (
        <iframe
          src={`https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1`}
          title={video.title || "video"}
          className="w-full h-full"
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        />
      );
    }

    return (
      <video
        src={url}
        controls
        autoPlay
        playsInline
        className="w-full h-full object-contain bg-black"
      />
    );
  };

  return (
    <div ref={gridRef}>
      {/* ===== Header ===== */}
      <h1 className="font-bold text-[1.5rem] text-secondary mt-[1rem]">
        {i18next.t("media.media")}
      </h1>
      {homePageData?.data?.media_description && (
        <p
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(homePageData?.data?.media_description),
          }}
          className={`text-[#666666] ${descriptionClasses} lg:w-[90%] w-[100%] mt-2`}
        />
      )}

      {/* ===== Filtering: show skeleton grid ===== */}
      {isFiltering ? (
        <div className="grid md:grid-cols-2 grid-cols-1 gap-x-[3rem] gap-y-[2rem] mt-[2rem]">
          <VidoesSkeleton count={6} />
        </div>
      ) : videos.length === 0 ? (
        /* ---- Empty state (reusable component) ---- */
        <EmptyState message={i18next.t("media.no_video")} />
      ) : (
        <>
          <div className="grid md:grid-cols-2 grid-cols-1 gap-x-[3rem] gap-y-[2rem] mt-[2rem]">
            {/* Real cards */}
            {visibleVideos.map((video) => (
              <div key={video.id} className="relative">
                <div className="relative">
                  <button
                    type="button"
                    onClick={(e) => handleOpen(e, video)}
                    className="relative block w-full lg:h-[24rem] h-[20rem] rounded-3xl cursor-pointer overflow-hidden text-left"
                  >
                    <img
                      className="w-full h-full object-cover"
                      alt={video.title || "media"}
                      src={video.video_image}
                    />

                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.95) 100%)",
                      }}
                    ></div>

                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="lg:w-[7rem] lg:h-[7rem] md:w-[5rem] md:h-[5rem] w-[3.5rem] h-[3.5rem] rounded-full bg-[#FF000080] flex justify-center items-center border border-white/30">
                        <img
                          className="md:w-[2rem] w-[1rem]"
                          alt="play"
                          src={autoPlay}
                        />
                      </div>
                    </div>

                    <div
                      className="absolute bottom-4 left-0 right-0 px-6 z-10 flex justify-between items-end gap-4"
                      dir="rtl"
                    >
                      {video.title && (
                        <h3 className="text-white text-[1.1rem] font-bold text-right leading-snug flex-1">
                          {video.title}
                        </h3>
                      )}
                      {video.date && (
                        <p className="text-white text-lg opacity-90 whitespace-nowrap">
                          {formatDate(video.date)}
                        </p>
                      )}
                    </div>
                  </button>
                </div>
              </div>
            ))}

            {/* Skeleton cards while loading more */}
            {isLoadingMore && <VidoesSkeleton count={6} />}
          </div>

          {/* ===== See More Button ===== */}
          {hasMore && !isLoadingMore && (
            <SeeMoreButton onClick={handleSeeMore} />
          )}
        </>
      )}

      {/* ===== Video Modal ===== */}
      {activeVideo && rect && (
        <div
          className="fixed inset-0 z-[9999]"
          onClick={() => setActiveVideo(null)}
        >
          <div
            className="absolute"
            style={{
              top: rect.top,
              left: rect.left,
              width: rect.width,
              height: rect.height,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-full rounded-3xl overflow-hidden bg-black">
              {renderPlayer(activeVideo)}

              <button
                type="button"
                onClick={() => setActiveVideo(null)}
                className="absolute top-2 right-2 z-30 w-9 h-9 flex items-center justify-center rounded-lg bg-black/70 hover:bg-black/90 text-white text-lg font-bold leading-none transition-colors"
                aria-label="Close"
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoGrid;
