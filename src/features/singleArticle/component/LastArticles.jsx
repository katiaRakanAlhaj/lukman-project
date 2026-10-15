import React from "react";
import { useTranslation } from "react-i18next";
import LastSingleContent from "../../../component/ux/LastSingleContent";

const LastArticles = ({ articlesData }) => {
  const { t } = useTranslation();

  // Handle both shapes: array directly, or { data: [...] }
  const articles = Array.isArray(articlesData)
    ? articlesData
    : articlesData?.data || [];

  const latestArticles = articles.slice(0, 6);

  if (!latestArticles.length) return null;

  return (
    <div className="lg:col-span-4 col-span-1">
      <h1 className="text-[#333333] font-bold text-[1.3rem]">
        {t("last-articles")}
      </h1>

      <div
        className="w-full h-[0.3rem] bg-negative"
        style={{ boxShadow: "rgba(0, 0, 0, 0.25) 0px -2px 4px 0px" }}
      />

      <div className="flex flex-col space-y-[1.4rem] mt-[2rem]">
        {latestArticles.map((article) => (
          <LastSingleContent
            key={article.id}
            item={article}
            linkPrefix="/Article"
            showCategory
          />
        ))}
      </div>
    </div>
  );
};

export default LastArticles;
