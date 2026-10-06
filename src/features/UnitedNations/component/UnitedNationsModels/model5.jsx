import DOMPurify from "dompurify";
const Model5 = ({ data }) => {
  return (
    <div>
      <h1 className="text-[#333333] text-[1.3rem] font-bold">{data.title}</h1>
      <p
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(data.description),
        }}
        className="text-[#333333] text-[1.1rem] leading-[2rem] mt-2 flex text-justify whitespace-pre-line"
      />
      {data.image && (
        <img
          className="w-full h-[17rem] mt-[1rem] rounded-xl object-cover"
          src={data.image}
          alt={data.title}
        />
      )}
    </div>
  );
};

export default Model5;
