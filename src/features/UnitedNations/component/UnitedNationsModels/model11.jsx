import DOMPurify from "dompurify";
const Model11 = ({ data }) => {
  return (
    <div className="flex flex-col space-y-2">
      <h1 className="font-bold text-[1.5rem] text-secondary">{data.title}</h1>
      <p
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(data.description),
        }}
        className="text-[1rem] text-[#333333] whitespace-pre-line flex text-justify"
      />
      {data.image && (
        <img
          className="w-[25rem] h-[20rem] object-contain pt-[1rem]"
          src={data.image}
          alt={data.title}
        />
      )}
    </div>
  );
};

export default Model11;
