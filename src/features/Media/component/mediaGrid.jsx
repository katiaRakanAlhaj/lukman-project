import React, { useState, useEffect, useRef } from "react";
import DOMPurify from "dompurify";

const MediaGrid = ({ videosData, homePageData }) => {
  const [activeVideo, setActiveVideo] = useState(null);
  const [rect, setRect] = useState(null);
  const gridRef = useRef(null);

  // ===== Normalize data: handle array OR { data: [...] } =====
  const videos = Array.isArray(videosData)
    ? videosData
    : Array.isArray(videosData?.data)
    ? videosData.data
    : [];

  // ===== Play icon (base64) =====
  const playIcon =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAA2CAYAAACBWxqaAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAHxSURBVHgB1ZqJbcJAEEXHUQqgBNJBSiAdQAfQAakAqCCkAkMFoQPTQehgtwPo4GcmixUHGV/s+aQvcchiv+fP+ILoCoARa8Uq8Mc3a06xw4scsxTuo6I20rL4KoWYpZiQPYv+5NEYueZ8CAoxxAqPo4IagT1yhIgV7PPh1QjcoOApVpn8GrlDs2ZZlp3IEU/kljFLplzuLFbwy4psA/8oWOwP1z3QhPSF9IemB3DdA028sqQaOR7oj5AVqKJZO67GhnoSi4ESzdqwkV3XDWIzUHJgvXfpj5A90MSUOvZHrAZK5qyiaezGGqE6NJlYHaofxl6BKmPW122sUqpAlQvrTU4SUzUgiImXlCJ0y4i1TLkCgk7dQFJTqI5L6gZOqRvYp9wDBz4OzFKtwJ61kBfPlBaateA9fyw/SKUCctSVE7mX6uKFFCrwyVrzwi91X8Zs4Ehmrzfe1YvRgKabnDcRkwGJiMRley8udcRiYEcmLp0XXhJ6Ch3JXJgshiz+F4RBwdL9Ud8RGpTzRuAPuSAfk23gnoI1IVfAHWfWklwDN6xZI/IB7FLA97Ni2EHBZc5bDJwxHNl2TSHB/z849WELXzlvMTBBPwqEiss9YKZGG4o1pVi5mqjrhzN8jsWeZNU3MCNwQuYRqKDJPD20c97igB/F1DzJIPMHcgAAAABJRU5ErkJggg==";

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
      /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]+)/
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
          typeof window !== "undefined" ? window.location.origin : ""
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
        الميديا
      </h1>
      {homePageData?.data?.media_description && (
        <p
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(
              homePageData?.data?.media_description
            ),
          }}
          className="text-[#666666] text-[1rem] lg:w-[60%] w-[100%] mt-2 whitespace-pre-line"
        />
      )}

      {/* ===== Grid ===== */}
      {videos.length === 0 ? (
        <p className="text-[#666666] text-[0.9rem] mt-[2rem]">
          لا توجد فيديوهات حالياً
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
                        src={playIcon}
                      />
                    </div>
                  </div>

                  {/* Bottom title + date */}
                  <div className="absolute bottom-4 left-0 right-0 px-6 z-10 flex justify-between items-center gap-4">
                    {video.title && (
                      <h3 className="text-white text-[0.9rem] font-bold flex-1 width_title">
                        {video.title}
                      </h3>
                    )}
                    {video.date && (
                      <p className="text-white text-[0.9rem] opacity-90 whitespace-nowrap">
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