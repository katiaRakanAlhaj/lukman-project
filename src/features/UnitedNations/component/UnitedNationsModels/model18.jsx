import { useState } from "react";
import uploadBook from "../../../../assets/images/uploadBook.svg";
import i18next from "i18next";

const Model18 = ({ data }) => {
  if (!data) return null;

  const items = data.content || [];

  // State to track which item and which language is currently downloading
  const [downloading, setDownloading] = useState({ id: null, lang: null });

  const handleDownload = (url, itemId, lang) => {
    if (!url) return;

    // Set loading state
    setDownloading({ id: itemId, lang });

    // Create a temporary anchor element to trigger download
    const link = document.createElement("a");
    link.href = url;
    // Extract filename from URL or use a default name
    const fileName = url.split("/").pop() || `book_${lang}.pdf`;
    link.download = fileName;
    link.target = "_self"; // stay on the same page
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Reset loading state after a short delay
    setTimeout(() => {
      setDownloading({ id: null, lang: null });
    }, 1500);
  };

  return (
    <div>
      <h1 className="text-[1.5rem] text-secondary font-bold">{data.title}</h1>

      <div className="grid md:grid-cols-2 grid-cols-1 gap-[2rem] mt-[1rem]">
        {items.map((item, index) => {
          const isDownloadingAr =
            downloading.id === index && downloading.lang === "ar";
          const isDownloadingEn =
            downloading.id === index && downloading.lang === "en";

          return (
            <div
              key={index}
              className="w-full lg:h-[12rem] h-[17rem] bg-white rounded-3xl px-[2.5rem] py-[2rem] relative"
              style={{ boxShadow: "rgba(0, 0, 0, 0.25) 0px 0px 4px 0px" }}
            >
              {/* Header: icon + title + description */}
              <div className="flex gap-x-[1.5rem]">
                <div>
                  {item.icon && (
                    <img
                      className="w-[4rem] h-[4rem] object-cover"
                      src={item.icon}
                      alt={item.title}
                    />
                  )}
                </div>
                <div>
                  <h1 className="text-secondary text-[1.2rem] font-bold">
                    {item.title}
                  </h1>
                  <p className="text-[#666666] text-[1rem] mt-2 whitespace-pre-line flex text-justify">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Download buttons */}
              {/* Arabic download button */}
              <div
                onClick={() => handleDownload(item.book_ar, index, "ar")}
                className={`absolute bottom-0 h-[3.2rem] w-[49%] right-0 rounded-br-3xl pl-[1rem] flex justify-center items-center gap-x-[0.5rem] cursor-pointer transition-colors duration-200 ${
                  isDownloadingAr
                    ? "bg-primary opacity-70 cursor-wait"
                    : "bg-negative hover:opacity-90"
                }`}
              >
                {isDownloadingAr ? (
                  <>
                    <p className="font-bold text-white text-[1rem] mt-1">
                      {i18next.t("books.Uploading")}
                    </p>
                    <div className="w-[1.5rem] h-[1.5rem] border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  </>
                ) : (
                  <>
                    <p className="font-bold text-white text-[1rem] mt-1">
                      {i18next.t("books.down-arabic")}
                    </p>
                    <img
                      className="w-[1.5rem] h-[1.5rem] object-contain"
                      src={uploadBook}
                      alt="download"
                    />
                  </>
                )}
              </div>

              {/* English download button */}
              <div
                onClick={() => handleDownload(item.book_en, index, "en")}
                className={`absolute bottom-0 h-[3.2rem] w-[49%] left-0 rounded-bl-3xl flex justify-center items-center gap-x-[0.5rem] cursor-pointer transition-colors duration-200 ${
                  isDownloadingEn
                    ? "bg-primary opacity-70 cursor-wait"
                    : "bg-negative hover:opacity-90"
                }`}
              >
                {isDownloadingEn ? (
                  <>
                    <p className="font-bold text-white text-[1rem] mt-1">
                      {i18next.t("books.Uploading")}
                    </p>
                    <div className="w-[1.5rem] h-[1.5rem] border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  </>
                ) : (
                  <>
                    <p className="font-bold text-white text-[1rem] mt-1">
                      {i18next.t("books.down_english")}
                    </p>
                    <img
                      className="w-[1.5rem] h-[1.5rem] object-contain"
                      src={uploadBook}
                      alt="download"
                    />
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Model18;
