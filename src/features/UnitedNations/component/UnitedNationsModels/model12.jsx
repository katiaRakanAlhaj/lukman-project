import { useState } from "react";
import DOMPurify from "dompurify";
const Model12 = ({ data }) => {
  const [activeTab, setActiveTab] = useState(0);
  if (!data) return null;
  const tabs = data.content || [];
  const activeItem = tabs[activeTab];
  return (
    <div>
      <h1 className="font-bold text-secondary text-[1.5rem]">{data.title}</h1>

      <div className="w-full h-auto mt-[1rem] rounded-2xl bg-white px-[1rem] py-[1.5rem]">
        {/* Tabs */}
        <div className="flex scrollbar-hide gap-x-[4rem] border-b border-b-[#C4C4C4] px-[3rem]">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`text-[1rem] ${
                activeTab === index
                  ? "text-negative font-bold border-b-2 border-negative"
                  : "text-[#959595]"
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>

        {/* Content */}
        {activeItem && (
          <div className="space-y-2 mt-4 px-4">
            <h1 className="text-[1.2rem] text-black font-bold">
              {activeItem.title}
            </h1>
            <p
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(activeItem.description),
              }}
              className="text-[1rem] text-black leading-relaxed whitespace-pre-line flex text-justify"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Model12;
