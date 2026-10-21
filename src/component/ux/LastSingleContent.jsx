import React from "react";
import { Link, useParams } from "react-router-dom";
import formatDate from "./formatDate";
import { descriptionClasses } from "./descriptionClasses";

const LastSingleContent = ({ item, linkPrefix = "/Activity" }) => {
  const { lang } = useParams();

  if (!item) return null;

  return (
    <Link to={`/${lang}${linkPrefix}/${item.id}`}>
      <div className="flex flex-col">
        <img
          className="w-full h-[15rem] object-cover rounded-2xl cursor-pointer hover:opacity-90 transition-opacity"
          alt={item.title}
          src={item.banner}
        />

        <div className="flex justify-between gap-3">
          <h1 className="font-bold text-[#000000] text-[1.2rem] mt-4 line-clamp-2">
            {item.title}
          </h1>
          <p className="text-[#000000] whitespace-nowrap text-[1rem] mt-4">
            {formatDate(item.date)}
          </p>
        </div>

        <div
          className={`text-[#666666] text-lg mt-1 line-clamp-4`}
          dangerouslySetInnerHTML={{ __html: item.description }}
        />
      </div>
    </Link>
  );
};

export default LastSingleContent;
