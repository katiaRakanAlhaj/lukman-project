import React, { useState } from "react";
import DOMPurify from "dompurify";
import date from "../../../assets/images/date.svg";
import uploadBook from "../../../assets/images/uploadBook.svg";
import i18next from "i18next"
const BooksGrid = ({ booksData }) => {
  // حالة لتخزين معرف الكتاب الذي يتم تحميله حالياً
  const [downloadingId, setDownloadingId] = useState(null);

  // Format date from ISO string to DD-MM-YYYY
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  // دالة محاكاة التحميل أو التعامل مع الملف
  const handleDownload = (e, book) => {
    // إذا أردت فتح الرابط مباشرة مع إظهار حالة التحميل مؤقتاً:
    setDownloadingId(book.id);

    // محاكاة انتهاء التحميل بعد فترة (أو يمكنك إزالتها إذا كان المتصفح سيتولى التحميل الفوري)
    setTimeout(() => {
      setDownloadingId(null);
    }, 2000);
  };

  return (
    <div>
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-x-[4rem] gap-y-[9rem] lg:mt-[11rem] md:mt-[9rem] mt-[8rem]">
        {booksData?.data?.map((book) => {
          const isDownloading = downloadingId === book.id;

          return (
            <div
              key={book.id}
              className="relative w-full h-[20rem] rounded-b-3xl shadow-[0_0_4px_0_#00000040] md:flex"
            >
              <img
                className="md:h-[17rem] md:w-[15rem] w-[10rem] h-[10rem] mt-[-6rem] mr-[1.5rem] object-cover rounded-lg shadow-[0_4px_4px_0_#00000040]"
                src={book.image}
                alt={book.title}
              />
              <div className="flex flex-col p-6">
                <h1 className="text-[#333] md:text-[1.2rem] text-[1.1rem] font-bold mb-2">
                  {book.title}
                </h1>
                <div className="flex gap-x-2 mt-2 items-center">
                  <img
                    className="w-6 h-6"
                    src={date}
                    alt="calendar"
                  />
                  <p className="text-secondary text-[0.9em]">
                    {formatDate(book.date)}
                  </p>
                </div>
                <div
                  className="md:text-[1.1rem] text-[0.9rem] text-[#666] whitespace-pre-line line-clamp-4"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(book.description),
                  }}
                />
              </div>
              
              <a
                href={book.file}
                download
                onClick={(e) => handleDownload(e, book)}
                className={`w-full h-[3.8rem] flex items-center justify-center rounded-b-3xl gap-x-[0.8rem] absolute bottom-0 cursor-pointer transition-all ${isDownloading?'bg-primary':'bg-negative'}`}
              >
                {isDownloading ? (
                  <>
                    <p className="text-white text-[1.2rem] font-bold">{i18next.t("loading")}</p>
                    {/* أيقونة الدائرة المتحركة للتحميل */}
                    <svg
                      className="w-6 h-6 text-white animate-spin"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  </>
                ) : (
                  <>
                    <p className="text-white text-[1.2rem] font-bold">تحميل</p>
                    <img
                      className="w-[1.5rem]"
                      src={uploadBook}
                      alt="download"
                    />
                  </>
                )}
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BooksGrid;