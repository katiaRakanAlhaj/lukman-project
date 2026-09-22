import DOMPurify from "dompurify";

const ArticlesDescription = ({ homePageData }) => {
  return (
    <div className="lg:mt-[5.5rem] mt-[0.9rem]">
      <h1 className="text-[2rem] text-secondary font-bold">المقالات</h1>
      <p
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(homePageData?.data?.article_description),
        }}
        className="text-[#666666] text-[1rem] lg:w-[80%] w-[100%] whitespace-pre-line"
      />
    </div>
  );
};
export default ArticlesDescription;
