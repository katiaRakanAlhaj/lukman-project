import { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Keyboard, Zoom } from "swiper/modules";
import i18next from "i18next";
import {
  MapPinIcon,
  CalendarIcon,
  HomeIcon,
  openLocationOnMap,
} from "../component/Icons";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/zoom";

import formatDate from "../../../../component/ux/formatDate";

const ImageLightbox = ({ images, initialIndex, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-[10000] w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition text-white text-2xl"
      >
        ✕
      </button>

      {/* White pagination + navigation */}
      <style>{`
        .image-lightbox-swiper .swiper-pagination {
          color: #ffffff !important;
          font-weight: 700;
          font-size: 0.875rem;
          letter-spacing: 0.05em;
          bottom: 1.5rem !important;
        }
        .image-lightbox-swiper .swiper-pagination-current,
        .image-lightbox-swiper .swiper-pagination-total {
          color: #ffffff !important;
        }
        .image-lightbox-swiper .swiper-button-next,
        .image-lightbox-swiper .swiper-button-prev {
          color: #ffffff !important;
        }
        /* force every slide's content to be exactly the same box */
        .image-lightbox-swiper .swiper-slide {
          display: flex !important;
          align-items: center;
          justify-content: center;
        }
      `}</style>

      <Swiper
        modules={[Navigation, Pagination, Keyboard, Zoom]}
        navigation
        pagination={{ clickable: true, type: "fraction" }}
        keyboard={{ enabled: true }}
        zoom={{ maxRatio: 3 }}
        initialSlide={initialIndex}
        spaceBetween={30}
        slidesPerView={1}
        className="image-lightbox-swiper w-full h-full"
      >
        {images.map((img) => (
          <SwiperSlide key={img.id} className="w-full h-full !p-0">
            {/* FIXED BOX — identical for every image */}
            <div
              className="relative shadow-2xl rounded-lg overflow-hidden bg-black"
              style={{
                width: "min(80vw, 68.75rem)",
                height: "min(80vh, 43.75rem)",
              }}
            >
              {/* Image fills the box (cover crops if aspect differs) */}
              <img
                src={img.image}
                alt={img.location || img.address}
                className="w-full h-full object-cover select-none"
                draggable={false}
              />

              {/* Details overlay — pinned to bottom-left of the SAME box */}
              <div
                className="absolute bottom-0 left-0 w-full sm:w-auto bg-gradient-to-r from-black/90 to-black/40 sm:bg-black/60 p-4 sm:rounded-tr-xl text-white pointer-events-auto"
                onClick={(e) => e.stopPropagation()}
                dir="rtl"
              >
                <div className="flex flex-col gap-2">
                  {img.location && (
                    <p className="flex items-center gap-2 text-lg font-bold">
                      <MapPinIcon className="w-5 h-5 text-negative" />
                      {img.location}
                    </p>
                  )}
                  {img.address && (
                    <p className="flex items-start gap-2 text-sm text-gray-300">
                      <HomeIcon className="w-4 h-4 mt-1 flex-shrink-0" />
                      <span className="line-clamp-2">{img.address}</span>
                    </p>
                  )}

                  <div className="flex items-center justify-between gap-4 mt-1">
                    {img.date && (
                      <p className="flex items-center gap-1 text-xs text-gray-400">
                        <CalendarIcon className="w-4 h-4" />
                        {formatDate(img.date)}
                      </p>
                    )}
                    {(img.location || img.address) && (
                      <button
                        onClick={() =>
                          openLocationOnMap(img.location || img.address)
                        }
                        className="px-3 py-1 bg-negative text-white text-xs font-bold rounded hover:bg-red-700 transition"
                      >
                        {i18next.t("Links.click_button")}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImageLightbox;