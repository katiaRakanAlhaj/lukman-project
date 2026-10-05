import DOMPurify from "dompurify";
const Model2 = ({ data }) => {
  return (
    <div>
      <h1 className="text-[2.3rem] font-bold text-secondary">{data?.title}</h1>
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
