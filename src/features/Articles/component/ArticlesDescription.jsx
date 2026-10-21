import DOMPurify from "dompurify";
import i18next from "i18next";
import { descriptionClasses } from "../../../component/ux/descriptionClasses";

const ArticlesDescription = ({ homePageData }) => {
  return (
    <div className="lg:mt-[5.5rem] mt-[0.9rem]">
      <h1 className="text-[2rem] text-secondary font-bold">{i18next.t("footer.articles")}</h1>
      <p
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(homePageData?.data?.article_description),
        }}
        className={`text-[#666666] ${descriptionClasses} lg:w-[80%] w-[100%]`}
      />
    </div>
  );
};
export default ArticlesDescription;
