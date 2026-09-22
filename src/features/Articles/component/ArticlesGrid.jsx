import React, { useMemo } from "react";
import { SORT_OPTIONS } from "../hook/useArtcilesFilter";

// --- Inline SVG Components ---
const ChevronDownIcon = () => (
  <svg
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    viewBox="0 0 256 512"
    className="text-white text-[1.3rem]"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M168 345.941V44c0-6.627-5.373-12-12-12h-56c-6.627 0-12 5.373-12 12v301.941H41.941c-21.382 0-32.09 25.851-16.971 40.971l86.059 86.059c9.373 9.373 24.569 9.373 33.941 0l86.059-86.059c15.119-15.119 4.411-40.971-16.971-40.971H168z"></path>
  </svg>
);

const PlaceholderAvatar = () => (
  <img
    className="w-6 h-6"
    alt="author"
    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAqCAYAAADFw8lbAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAJISURBVHgB7ZhPbtNAFMa/N+OGplXVbCvxxytWhXjBAqFUMieAVXZISFyAG3AGDoBaxI4NR6gqIdQFEpHgAIYuoCsiRcQk9czgMYG29kwSG6cmlX+SFeXNl3nfzLwZKwNcejy/lTyL0qdgKEK7sw8VfU+e251nM/Va80ff3tktYpgjL7d2HoPw9O93go+t6wf49iUw6rc7fjwde2ciHpQ4xvHRIXKQf0ZJ+pmYkK5dT9k2Ym3kpNjSV8DSGKWZCl348iSuS3oAKHfyMzfVTXDalkYFWX0S0xuqBylf4uO7PfyTUe9eXPj05nwiU+JCRs/3SeI+eocBLNiX3rvrQrH9bJJFEOdQzockpwW7UcVjkyh8QBegFZvdtTWajeqzD+RiblQf5eDD07mzmI0yPEQu1JSZJz2I1EDIrpfm3I5RTLgBe2J3kjg4E/Pseui23u/BaIN69pM+LJg3pWNRz6rN1sTAvHinBwxN75to0xSu30xlY6lReg6pDlAFTAZYZoyv0LVX77eEFBuoAM74YPjoztd03Lj02iRXqhKjcW79kTFa7/qyqY2WzXIbJWdlhKpQkTCF/7sZJcXmN8qkHKMimGU1jUa5FJUZHUY8NMWNRgfNz2X9tcjP+srQFDbXaLcrBNEAF4yA6KO7bVxN62YaNdcDW2EvghPeiEZrm0e29ukXEK8/NRo/w5uOFFewQCKmhuPVqwG610KbZvaVjubF240miZbkq01FMr6qdHhR8xHjya4mSSGTP8ah4n086Vx4mdXU1NSUxC/i57PFL/NiPgAAAABJRU5ErkJggg=="
  />
);

const ArticlesGrid = ({
  articlesCategoryData,
  articlesData,
  isLoading,
  isFetching,
  filters,
}) => {
  // ---- Filters come from parent via props ----
  const { category, sort, setCategory, setSort, reset } = filters;

  // ---- Helpers ----
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const categories = articlesCategoryData?.data || [];

  // ✅ Normalize: API may return an array OR a category object { articles: [...] }
  const articlesList = useMemo(() => {
    if (!articlesData) return [];

    let list = [];
    if (Array.isArray(articlesData)) list = articlesData;
    else if (Array.isArray(articlesData.articles)) list = articlesData.articles;
    else return [];

    return list;
  }, [articlesData]);

  return (
    <>
    <div className="lg:mt-[3rem] mt-[2.5rem]">
      <div className="grid lg:grid-cols-12 grid-cols-1 gap-x-[2rem] lg:gap-y-0 gap-y-[2rem]">
        {/* ============ Sidebar ============ */}
        <div className="lg:col-span-3 col-span-full">
          {/* --- Filter / sort card --- */}
          <div
            className="w-full h-auto py-[1.5rem] mt-[1rem] rounded-3xl p-[1.5rem]"
            style={{ boxShadow: "rgba(0, 0, 0, 0.25) 0px 0px 4px 0px" }}
          >
            <h1 className="font-bold text-[1.2rem] text-secondary">
              تصفية و ترتيب
            </h1>
            <p className="text-[1.2rem] mt-2 text-secondary">تصنيف المقابلة</p>

            {/* --- Category buttons (by NAME) --- */}
            <div className="flex flex-row flex-wrap gap-x-[0.5rem] gap-y-[1rem] mt-4">
              <button
                type="button"
                className={`w-full h-[2.2rem] px-[1rem] rounded-full flex justify-center items-center text-[1.1rem] ${
                  category === "all"
                    ? "bg-negative text-white"
                    : "bg-[#E7EDF3] text-primary"
                }`}
                onClick={() => setCategory("all")}
              >
                الكل
              </button>

              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  className={`w-auto h-[2.2rem] px-[1rem] rounded-full flex justify-center items-center text-[1.1rem] ${
                    category === cat.name
                      ? "bg-negative text-white"
                      : "bg-[#E7EDF3] text-primary"
                  }`}
                  onClick={() => setCategory(cat.name)}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* --- Sort select --- */}
            <div className="mt-5">
              <div className="space-y-2">
                <label
                  htmlFor="sort"
                  className="block text-sm font-medium text-gray-700"
                >
                  رتب حسب
                </label>

                <select
                  id="sort"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                >
                  <option value="" disabled hidden>
                    اختر ترتيب الفرز
                  </option>
                  <option value={SORT_OPTIONS.TITLE_ASC}>العنوان</option>
                  <option value={SORT_OPTIONS.ID_ASC}>الاقدم اولا</option>
                  <option value={SORT_OPTIONS.ID_DESC}>الاحدث اولا</option>
                </select>

                <p
                  className="mt-[1rem] text-[#5B1B1B] text-center cursor-pointer hover:text-red-700"
                  onClick={reset}
                >
                  إعادة تعيين
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ============ Articles Grid ============ */}
        <div className="lg:col-span-9 col-span-1">
          {/* Loading state (first load only) */}
          {isLoading ? (
            <div className="text-center py-10 text-secondary">
              جاري التحميل...
            </div>
          ) : articlesList.length === 0 ? (
            <div className="text-center py-10 text-secondary">
              لا توجد مقالات
            </div>
          ) : (
            <>
              {/* Optional: subtle "updating" indicator while refetching */}
              {isFetching && (
                <div className="text-center text-sm text-gray-400 mb-2">
                  يتم التحديث...
                </div>
              )}

              <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-[2rem]">
                {articlesList.map((article) => (
                  <div
                    key={article.id}
                    className="h-[28rem] w-full object-cover relative rounded-3xl"
                    style={{
                      boxShadow: "rgba(0, 0, 0, 0.25) 0px 0px 4px 0px",
                    }}
                  >
                    <img
                      className="w-full h-[13rem] object-cover rounded-t-3xl"
                      src={article.banner}
                      alt={article.title}
                    />

                    <div className="mt-[1rem] px-[1rem]">
                      <h1 className="text-[1.2rem] font-bold text-secondary line-clamp-2">
                        {article.title}
                      </h1>

                      <div className="flex gap-x-2 mt-2 items-center">
                        <PlaceholderAvatar />
                        <p className="text-secondary text-[0.9em]">
                          {formatDate(article.date)}
                        </p>
                      </div>

                      <div
                        className="text-[1rem] text-[#666666] mt-1 line-clamp-3 whitespace-pre-line"
                        dangerouslySetInnerHTML={{
                          __html: article.description,
                        }}
                      />
                    </div>

                    <button className="w-full h-[2.5em] right-0 bg-negative rounded-b-3xl text-white font-bold text-[1.1em] flex items-center justify-center cursor-pointer absolute bottom-0 hover:bg-red-700 transition-colors">
                      قراءة المزيد
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* --- Load more --- */}
          <div className="flex justify-center items-center mt-[3rem]">
            <div>
              <button
                type="button"
                className="flex items-center justify-center gap-x-[0.5rem] w-[18rem] h-[3.5rem] bg-negative rounded-t-xl"
                style={{
                  boxShadow: "rgba(0, 0, 0, 0.25) 0px 5px 4px 0px",
                }}
              >
                <p className="text-[1.1rem] text-white font-bold">
                  تحميل المزيد
                </p>
                <ChevronDownIcon />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div></>
  );
};

export default ArticlesGrid;