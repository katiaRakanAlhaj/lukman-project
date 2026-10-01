import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import DOMPurify from "dompurify";

const SingleActivityContent = ({ singleActivityData }) => {
  const formattedDate = singleActivityData?.date
    ? new Date(singleActivityData.date)
        .toLocaleDateString("en-GB")
        .replace(/\//g, "-")
    : "";

  // Combine images + video (if any) into a single media array
  const mediaItems = [
    ...(singleActivityData?.section_image || []).map((img) => ({
      type: "image",
      src: img,
    })),
    ...(singleActivityData?.video
      ? [
          {
            type: "video",
            src: singleActivityData.video,
            poster: singleActivityData.video_image,
          },
        ]
      : []),
  ];

  return (
    <div className="lg:col-span-8 col-span-1 space-y-[2rem]">
      <div>
        <div className="lg:flex justify-between">
          <h1 className="font-bold text-[#333333] text-[1.2rem]">
            {singleActivityData?.title}
          </h1>
          <p className="text-[#666666] whitespace-nowrap mt-2">
            {formattedDate}
          </p>
        </div>
        <p
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(singleActivityData?.description),
          }}
          className="text-[#666666] text-justify text-[1rem] leading-[2rem] mt-2 whitespace-pre-line"
        />
      </div>

      {mediaItems.length > 0 && (
        <div className="relative w-full">
          <Swiper
            modules={[Pagination, Autoplay]}
            pagination={{
              clickable: true,
            }}
            autoplay={{
              delay: 3000, // 3 seconds per slide
              disableOnInteraction: false, // keep autoplay after user swipes
              pauseOnMouseEnter: true, // pause while hovering
            }}
            loop={mediaItems.length > 1} // loop only if more than 1 slide
            speed={700} // transition speed (ms)
            spaceBetween={0}
            slidesPerView={1}
            dir="rtl"
            className="!w-full !m-0 !p-0 rounded-xl single-activity-swiper"
          >
            {mediaItems.map((item, index) => (
              <SwiperSlide key={index} className="!w-full !m-0 !p-0">
                {item.type === "image" ? (
                  <img
                    className="w-full lg:h-[28rem] h-[20rem] object-cover rounded-xl"
                    src={item.src}
                    alt={`section-${index}`}
                  />
                ) : (
                  <video
                    className="w-full lg:h-[28rem] h-[20rem] object-cover rounded-xl"
                    src={item.src}
                    poster={item.poster}
                    controls
                  />
                )}
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom pagination dots */}
          <div className="swiper-pagination-custom mt-4 flex justify-center gap-2"></div>
        </div>
      )}

      {(singleActivityData?.section_title ||
        singleActivityData?.section_description) && (
        <div>
          <h1 className="font-bold text-[#333333] text-[1.8rem]">
            {singleActivityData?.section_title}
          </h1>
          <p
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(
                singleActivityData?.section_description,
              ),
            }}
            className="text-[#666666] text-[1rem] leading-[2rem] mt-2 whitespace-pre-line"
          />
        </div>
      )}
    </div>
  );
};

export default SingleActivityContent;
