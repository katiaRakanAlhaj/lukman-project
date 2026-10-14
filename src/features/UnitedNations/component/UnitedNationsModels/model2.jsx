import DOMPurify from "dompurify";
const Model2 = ({ data }) => {
  return (
    <div>
      <h1 className="lg:text-[2.3rem] text-[1.5rem] font-bold text-secondary">{data?.title}</h1>
      <p
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(data?.description),
        }}
        className="text-[1.1rem] text-[#333333] whitespace-pre-line flex text-justify"
      />
    </div>
  );
};

export default Model2;
