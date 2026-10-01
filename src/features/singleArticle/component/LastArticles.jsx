import i18next from "i18next";
import DOMPurify from "dompurify";
import { Link, useParams } from "react-router-dom";
const LastArticles = ({ articlesData }) => {
  const { lang } = useParams();
  // Handle both possible response shapes: array directly, or { data: [...] }
  const articles = Array.isArray(articlesData)
    ? articlesData
    : articlesData?.data || [];

  // Take only the first 6 articles
  const latestArticles = articles.slice(0, 6);

  if (!latestArticles.length) return null;

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const dateObj = new Date(dateString);
    const day = String(dateObj.getDate()).padStart(2, "0");
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const year = dateObj.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <div className="lg:col-span-4 col-span-1">
      <h1 className="text-[#333333] font-bold text-[1.3rem]">
        {i18next.t("last-articles")}
      </h1>

      <div
        className="w-full h-[0.3rem] bg-negative"
        style={{ boxShadow: "rgba(0, 0, 0, 0.25) 0px -2px 4px 0px" }}
      ></div>

      <div className="flex flex-col space-y-[1.4rem] mt-[2rem]">
        {latestArticles.map((article) => (
          <Link to={`/${lang}/article/${article.id}`}>
            <div key={article.id} className="flex flex-col">
              {article.banner && (
                <img
                  className="w-full h-[15rem] object-cover rounded-2xl"
                  src={article.banner}
                  alt={article.title}
                />
              )}

              <div className="flex justify-between">
                <h1 className="font-bold text-[#000000] text-[1.1rem] mt-4">
                  {article.title}
                </h1>
                <p className="text-[#000000] whitespace-nowrap text-[0.9rem] mt-4">
                  {formatDate(article.date)}
                </p>
              </div>

              {article.category?.name && (
                <div className="text-[#000000] text-[1rem] font-bold mt-1">
                  {article.category.name}
                </div>
              )}

              <div
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(article.description),
                }}
                className="text-[#666666] text-[0.9rem] mt-1 text-justify whitespace-pre-line line-clamp-3"
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default LastArticles;
