import DOMPurify from "dompurify";
import { descriptionClasses } from "../../../component/ux/descriptionClasses";

const BooksHeader = ({ booksPageData }) => {
  return (
    <div>
      <div className="lg:mt-[4rem] mt-[0.9rem]">
        <h1 className="font-bold lg:text-[2rem] text-[1.5rem] text-secondary">
          {booksPageData?.data?.title}
        </h1>
        <p
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(booksPageData?.data?.description),
          }}
          className={`${descriptionClasses} text-[#666666] mt-1  flex text-justify`}
        />
      </div>
    </div>
  );
};
export default BooksHeader;
