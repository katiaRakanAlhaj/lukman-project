import DOMPurify from "dompurify";
const SingleArticleContent = ({ articleByIdData }) => {
  const article = articleByIdData?.data || articleByIdData;

  if (!article) return null;

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const dateObj = new Date(dateString);
    const day = String(dateObj.getDate()).padStart(2, "0");
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const year = dateObj.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <div className="lg:col-span-8 col-span-1">
      <div className="mb-[2rem]">
        <div className="lg:flex justify-between items-center">
          <h1 className="font-bold text-[#333333] text-[1.6rem]">
            {article.title}
          </h1>
          <p className="text-[#666666]">{formatDate(article.date)}</p>
        </div>

        {/* Replace <p> with <div> — <div> inside <p> is invalid HTML */}
        <div
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(article.description),
          }}
          className="rich-text text-[#666666] text-justify text-[1rem] leading-[2rem] mt-2 whitespace-pre-line"
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
          className="rich-text text-[#666666] text-justify text-[1rem] leading-[2rem] mt-2 whitespace-pre-line"
        />
      </div>
    </div>
  );
};

export default SingleArticleContent;
