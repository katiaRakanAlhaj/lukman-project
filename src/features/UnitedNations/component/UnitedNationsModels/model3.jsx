import DOMPurify from "dompurify";
const Model3 = ({ data }) => {
  return (
    <div className="w-full relative h-[20rem]">
      <div
        className="absolute rounded-3xl w-full h-full bg-cover -z-10 transition-all duration-700"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 46, 59, 0) 0%, rgb(0, 47, 60) 100%), url("${data.banner}")`,
          backgroundRepeat: "no-repeat",
        }}
      />
      <div className="mt-[2rem] lg:mt-0 absolute bottom-[4rem] px-[2rem]">
        <p className="text-white font-[700] lg:text-[2.8rem] text-[1.7rem]">
          {data?.title}
        </p>
        <p
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(data?.description),
          }}
          className="text-white font-[400] whitespace-pre-line leading-relaxed text-[1.2rem] lg:line-clamp-none line-clamp-3"
        />
      </div>
    </div>
  );
};

export default Model3;
