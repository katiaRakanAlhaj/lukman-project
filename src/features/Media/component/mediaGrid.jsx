import React, { useState, useEffect, useRef } from "react";
import DOMPurify from "dompurify";
import i18next from "i18next";
import autoPlay from "../../../assets/images/autoPlay.svg";
const MediaGrid = ({ videosData, homePageData }) => {
  const [activeVideo, setActiveVideo] = useState(null);
  const [rect, setRect] = useState(null);
  const gridRef = useRef(null);

  // ===== Normalize data: handle array, pagination {data: [...]}, or category object {videos: [...]} =====
  const videos = Array.isArray(videosData)
    ? videosData
    : Array.isArray(videosData?.videos)
      ? videosData.videos
      : Array.isArray(videosData?.data)
        ? videosData.data
        : [];

  // ===== Helper: format date =====
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    if (/[\u0600-\u06FF]/.test(dateStr)) return dateStr;

    const d = new Date(dateStr);
    if (isNaN(d)) return dateStr;

    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
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

  // ===== Handle thumbnail click — capture its exact position & size =====
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

  // ===== Render video player (native YouTube/Vimeo UI or HTML5 video) =====
  const renderPlayer = (video) => {
    const url = video?.video || "";

    // ---- YouTube ----
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

    // ---- Vimeo ----
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

    // ---- Direct video file (.mp4, .webm, etc.) ----
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
          className="text-[#666666] text-[1rem] lg:w-[60%] w-[100%] mt-2 whitespace-pre-line"
        />
      )}

      {/* ===== Grid ===== */}
      {videos.length === 0 ? (
        <p className="text-[#666666] text-[0.9rem] mt-[2rem]">
          {i18next.t("media.no_video")}
        </p>
      ) : (
        <div className="grid md:grid-cols-2 grid-cols-1 gap-x-[3rem] gap-y-[2rem] mt-[2rem]">
          {videos.map((video) => (
            <div key={video.id} className="relative">
              <div className="relative">
                <button
                  type="button"
                  onClick={(e) => handleOpen(e, video)}
                  className="relative block w-full lg:h-[22rem] h-[20rem] rounded-3xl cursor-pointer overflow-hidden text-left"
                >
                  {/* Banner image */}
                  <img
                    className="w-full h-full object-cover"
                    alt={video.title || "media"}
                    src={video.video_image}
                  />

                  {/* Dark gradient overlay */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.95) 100%)",
                    }}
                  ></div>

                  {/* Play button */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="lg:w-[7rem] lg:h-[7rem] md:w-[5rem] md:h-[5rem] w-[3.5rem] h-[3.5rem] rounded-full bg-[#FF000080] flex justify-center items-center border border-white/30">
                      <img
                        className="md:w-[2rem] w-[1rem]"
                        alt="play"
                        src={autoPlay}
                      />
                    </div>
                  </div>

                  {/* Bottom title + date */}
                  <div
                    className="absolute bottom-4 left-0 right-0 px-6 z-10 flex justify-between items-end gap-4"
                    dir="rtl"
                  >
                    {video.title && (
                      <h3 className="text-white text-[0.9rem] font-bold text-right leading-snug flex-1">
                        {video.title}
                      </h3>
                    )}
                    {video.date && (
                      <p className="text-white text-[0.85rem] opacity-90 whitespace-nowrap">
                        {formatDate(video.date)}
                      </p>
                    )}
                  </div>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ===== Video Modal — positioned exactly over the clicked thumbnail ===== */}
      {activeVideo && rect && (
        <div
          className="fixed inset-0 z-[9999]"
          onClick={() => setActiveVideo(null)}
        >
          {/* Player wrapper positioned exactly where the thumbnail was */}
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
            {/* Player container – same size & position as the thumbnail */}
            <div className="relative w-full h-full rounded-3xl overflow-hidden bg-black">
              {renderPlayer(activeVideo)}

              {/* Close button — INSIDE the video, top-right corner */}
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

export default MediaGrid;
