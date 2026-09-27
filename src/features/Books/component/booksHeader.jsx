import DOMPurify from "dompurify";

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
          className="text-md text-[#666666] mt-1 whitespace-pre-line flex text-justify"
        />
      </div>
    </div>
  );
};
export default BooksHeader;
