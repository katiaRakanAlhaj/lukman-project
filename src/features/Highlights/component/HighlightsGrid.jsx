import i18next from "i18next";
import DOMPurify from "dompurify";
const HighlightsGrid = ({
  categories = [],
  categoriesLoading,
  activeCategoryId,
  onSelectCategory,
  content,
  contentLoading,
  contentError,
}) => {
  const activeCategory = categories.find((c) => c.id === activeCategoryId);

  // ⚠️ Adjust this to match YOUR API shape
  const items =
    content?.contents?.[0]?.content || // if wrapped
    content?.content || // if direct
    [];

  return (
    <div className="container mx-auto mt-[2rem]">
      <div className="grid lg:grid-cols-12 grid-cols-1 gap-x-[2rem] lg:gap-y-0 gap-y-[2rem]">
        {/* ---------- Column 1: categories ---------- */}
        <div className="lg:col-span-3 col-span-1 relative">
          <div
            className="w-full h-auto border border-[#EAEAEA] py-[1rem] px-[1.5rem] rounded-xl"
            style={{ boxShadow: "rgba(0, 0, 0, 0.25) 0px 0px 2px 0px" }}
          >
            <h1 className="font-bold text-[1rem] text-[#333333]">
              {i18next.t("Highlights.Sections")}
            </h1>
            <div className="w-full h-[0.1rem] bg-[#EAEAEA] mt-3"></div>

            {categoriesLoading && (
              <p className="mt-4">{i18next.t("Highlights.Loading")}</p>
            )}

            {categories.map((category) => {
              const isActive = category.id === activeCategoryId;
              return (
                <div
                  key={category.id}
                  onClick={() => onSelectCategory(category.id)}
                  className={`mt-[1.5rem] cursor-pointer transition-all duration-200 ${
                    isActive
                      ? "bg-[#F4CECE] text-negative font-semibold"
                      : "text-secondary"
                  }`}
                >
                  <div
                    className={`p-3 rounded-lg ${isActive ? "bg-[#F4CECE]" : ""}`}
                  >
                    <p className="text-[1.2rem]">{category.name}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ---------- Column 2: content ---------- */}
        <div className="lg:col-span-9 col-span-1">
          <h1 className="font-bold text-[#333333] text-[1.5rem] mb-4">
            {activeCategory?.name || ""}
          </h1>

          {contentLoading && <p>{i18next.t("Highlights.LoadingContent")}</p>}
          {contentError && (
            <p className="text-red-500">
              {i18next.t("Highlights.ContentError")}
            </p>
          )}

          {!contentLoading &&
            items.map((item, index) => (
              <div
                key={index}
                className="w-auto bg-[#CEECF4] h-auto rounded-lg relative mt-[1rem]"
              >
                <div className="absolute w-[0.3rem] h-full bg-primary right-0 rounded-tr-lg rounded-br-lg"></div>
                <div className="p-[1.5rem]">
                  <h1 className="font-bold text-[1.2rem] text-[#099EC8]">
                    {item.title}
                  </h1>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(item.description),
                    }}
                    className="text-[1rem] text-[#333333] flex text-justify"
                  />
                </div>
              </div>
            ))}

          {!contentLoading && items.length === 0 && (
            <p className="text-[1rem] text-[#333333]">
              {i18next.t("Highlights.NoContent")}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HighlightsGrid;
