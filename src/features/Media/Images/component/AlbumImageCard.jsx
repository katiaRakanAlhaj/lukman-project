import formatDate from "../../../../component/ux/formatDate";
import {
  MapPinIcon,
  CalendarIcon,
  HomeIcon,
} from "../component/Icons";
import BrokenImageIcon from "./BrokenImageIcon";

const AlbumImageCard = ({ img, onClick, innerRef }) => {
  return (
    <div
      ref={innerRef}
      onClick={onClick}
      className="group rounded-2xl h-[28rem] relative overflow-hidden bg-white shadow-lg transition-all duration-300 flex flex-col border border-gray-100 cursor-pointer"
    >
      <div className="relative w-full flex-1 min-h-[15rem] overflow-hidden bg-[#1a2235] flex items-center justify-center p-2">
        <BrokenImageIcon />
        <img
          src={img.image}
          alt={img.location || img.address}
          loading="lazy"
          className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="p-4 flex flex-col gap-2 bg-white shrink-0">
        {img.location && (
          <div className="flex items-start gap-2">
            <MapPinIcon className="w-4 h-4 mt-0.5 flex-shrink-0 text-negative" />
            <p className="text-sm font-semibold text-gray-800 line-clamp-1">
              {img.location}
            </p>
          </div>
        )}
        {img.address && (
          <div className="flex items-start gap-2">
            <HomeIcon className="w-4 h-4 mt-0.5 flex-shrink-0 text-gray-500" />
            <p className="text-sm text-[#333333] line-clamp-2">{img.address}</p>
          </div>
        )}
        {img.date && (
          <div className="flex items-center gap-2 mt-auto pt-2">
            <CalendarIcon className="w-4 h-4 flex-shrink-0 text-gray-400" />
            <p className="text-xs text-gray-500">{formatDate(img.date)}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AlbumImageCard;