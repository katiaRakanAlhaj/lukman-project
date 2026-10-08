import i18next from "i18next";
import DOMPurify from "dompurify";
import click from "../../../assets/images/click.svg";
const LinksGrid = ({ LinksData }) => {
  const links = LinksData?.data || [];

  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-[2rem] mt-[2.5rem]">
      {links.map((link) => (
        <div
          key={link.id}
          className="w-full h-[18rem] rounded-3xl border border-gray-200 relative"
        >
          <a
            href={link.website}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute w-full flex justify-center gap-x-2 items-center bottom-0 h-[3.6rem] rounded-b-3xl bg-negative"
          >
            <button className="absolute w-full flex justify-center gap-x-2 items-center bottom-0 h-[3.6rem] rounded-b-3xl bg-negative cursor-pointer">
              <p className="text-white font-bold text-[1.1rem] mt-[0.2rem]">
                {i18next.t("Links.click_button")}
              </p>
              <img
                src={click}
                className={`w-[1.5rem] ${i18next.language == "en" ? "rotate-90" : ""}`}
                alt="click svg"
              />
            </button>
          </a>
          <div className="px-[1.8rem] py-[1rem] flex flex-col space-y-4">
            <img
              className="w-[3.5rem] h-[3rem] object-contain"
              src={link.image}
              alt={link.title}
            />
            <h1 className="font-bold text-[#000000] text-[1.2rem]">
              {link.title}
            </h1>
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(link.description),
              }}
              className="text-[#000000] text-[1.2rem] line-clamp-3 whitespace-pre-line"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default LinksGrid;
