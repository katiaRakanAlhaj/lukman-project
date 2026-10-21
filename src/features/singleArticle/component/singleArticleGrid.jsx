import DOMPurify from "dompurify";
import formatDate from "../../../component/ux/formatDate";
import { descriptionClasses } from "../../../component/ux/descriptionClasses";
const SingleArticleContent = ({ articleByIdData }) => {
  const article = articleByIdData?.data || articleByIdData;
  if (!article) return null;

  return (
    <div className="lg:col-span-8 col-span-1">
      <div className="mb-[2rem]">
        <div className="lg:flex space-y-2 justify-between items-center">
          <h1 className="font-bold text-[#333333] lg:text-[1.4rem] text-[1.2rem]">
            {article.title}
          </h1>
          <p className="text-[#666666] text-lg">{formatDate(article.date)}</p>
        </div>

        {/* Replace <p> with <div> — <div> inside <p> is invalid HTML */}
        <div
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(article.description),
          }}
          className={`rich-text text-[#666666] text-justify ${descriptionClasses} leading-[2rem] mt-2`}
        />
      </div>

      <div>
        <h1 className="font-bold text-[#333333] text-[1.8rem]">
          {article.section_title}
        </h1>
        <div
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(article.section_description),
          }}
          className="rich-text text-[#666666] text-justify lg:text-xl text-lg leading-[2rem] mt-2 whitespace-pre-line"
        />
      </div>
    </div>
  );
};

export default SingleArticleContent;
