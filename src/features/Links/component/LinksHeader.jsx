import DOMPurify from "dompurify";

const LinksHeader = ({ LinksDataPage }) => {
  const { banner, title, description } = LinksDataPage?.data || {};

  return (
    <div className="lg:mt-[3rem]">
      <div className="w-full relative flex items-center justify-center text-center lg:h-[27rem] h-[20rem]">
        <div
          className="absolute lg:rounded-3xl w-full h-full bg-cover -z-10 transition-all duration-700"
          style={{
            backgroundImage: `linear-gradient(90deg, rgba(0, 47, 60, 0.7) 0%, rgba(0, 75, 95, 0.7) 49.69%, rgba(0, 109, 139, 0.7) 90.18%, rgba(0, 127, 162, 0.7) 100%), url("${banner}")`,
            backgroundRepeat: "no-repeat",
          }}
        />
        <div className="mt-[2rem] lg:mt-0 w-[60%]">
          <p className="text-white font-[700] text-[2.8rem]">{title}</p>
          <div
            className="text-white font-[400] text-[1.2rem] lg:line-clamp-none line-clamp-3 px-[2rem]"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(description),
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default LinksHeader;
