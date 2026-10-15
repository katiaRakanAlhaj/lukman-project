import React from "react";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import date from "../../assets/images/date.svg";
import formatDate from "./formatDate";

const ContentCard = ({
  id,
  banner,
  title,
  date: cardDate,
  description,
  to, // optional custom link (e.g. station route)
  readMoreKey = "Card.readMore", // translation key override
  linkPrefix = "/Article", // default: article route
}) => {
  const { t } = useTranslation();
  const { lang } = useParams();

  const linkTo = to || `/${lang}${linkPrefix}/${id}`;

  return (
    <Link to={linkTo}>
      <div
        className="h-[28rem] w-full object-cover relative rounded-3xl"
        style={{ boxShadow: "rgba(0, 0, 0, 0.25) 0px 0px 4px 0px" }}
      >
        <img
          className="w-full h-[13rem] object-cover rounded-t-3xl"
          src={banner}
          alt={title}
        />

        <div className="mt-[1rem] px-[1rem]">
          <h1 className="text-[1.2rem] font-bold text-secondary line-clamp-2">
            {title}
          </h1>

          <div className="flex gap-x-2 mt-2 items-center">
            <img src={date} alt="date" />
            <p className="text-secondary text-[0.9em]">
              {formatDate(cardDate)}
            </p>
          </div>

          <div
            className="text-[1rem] text-[#666666] mt-1 line-clamp-3 whitespace-pre-line"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </div>

        <button className="w-full h-[2.5em] right-0 bg-negative rounded-b-3xl text-white font-bold text-[1.1em] flex items-center justify-center cursor-pointer absolute bottom-0 hover:bg-red-700 transition-colors">
          {t(readMoreKey)}
        </button>
      </div>
    </Link>
  );
};

export default ContentCard;
