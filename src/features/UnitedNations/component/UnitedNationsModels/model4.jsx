import DOMPurify from "dompurify";
const Model4 = ({ data }) => {
  return (
    <div
      className="w-full h-auto bg-white rounded-2xl px-[1.2rem] py-[1.5rem]"
      style={{ boxShadow: "rgba(0, 0, 0, 0.25) 0px 0px 2px 0px" }}
    >
      <img className="w-[2.5rem] h-[2.5rem]" src={data.logo} alt={data.title} />
      <h1 className="font-bold text-[1.3rem] text-secondary mt-1">
        {data.title}
      </h1>
      <p
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(data.description),
        }}
        className="text-[0.9rem] text-[#666666] mt-2 whitespace-pre-line flex text-justify"
      />
    </div>
  );
};

export default Model4;
