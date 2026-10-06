import { useState } from "react";
import DOMPurify from "dompurify";

const Model14 = ({ data }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div>
      <h1 className="font-bold text-secondary text-[1.5rem]">{data.title}</h1>
      <div className="mt-4 flex flex-col gap-4">
        {data.content?.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className="w-full bg-white rounded-xl border border-gray-300 overflow-hidden transition-all duration-300"
            >
              {/* Header */}
              <div
                className="w-full min-h-[3.5rem] flex justify-between items-center px-[1rem] py-2 cursor-pointer"
                onClick={() => toggleAccordion(index)}
              >
                <h2
                  className={`text-[1.1rem] font-bold transition-colors duration-300 ${
                    isOpen ? "text-[#099EC8]" : "text-[#333333]"
                  }`}
                >
                  {item.title}
                </h2>
                <div
                  className={`text-[2rem] text-primary transition-transform duration-300 ${
                    isOpen ? "rotate-90" : "rotate-0"
                  }`}
                >
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 24 24"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="m14 7-5 5 5 5V7z"></path>
                    <path fill="none" d="M24 0v24H0V0h24z"></path>
                  </svg>
                </div>
              </div>

              {/* Content inside same box */}
              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  isOpen ? "max-h-[3000px] opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-[1rem] pb-[1rem]">
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full rounded-lg mb-4"
                    />
                  )}
                  {item.description && (
                    <p
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(item.description),
                      }}
                      className="text-[#333333] text-[1rem] leading-relaxed whitespace-pre-line"
                    />
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Model14;
