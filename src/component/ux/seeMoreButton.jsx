import loadMore from "../../assets/images/loadMore.svg";
import i18next from "i18next";
const SeeMoreButton = ({ onClick }) => {
  return (
    <div className="flex justify-center mt-[3rem]">
      <button
        style={{ boxShadow: "rgba(0, 0, 0, 0.25) 0px 5px 4px 0px;" }}
        onClick={onClick}
        className="flex items-center justify-center text-white gap-x-[0.5rem] w-[18rem] h-[3.5rem] bg-negative rounded-t-xl cursor-pointer"
      >
        <p className="text-[1.1rem] text-white font-bold">
          {i18next.t("load_more")}
        </p>
        <img className="w-[1.5rem]" src={loadMore} />
      </button>
    </div>
  );
};

export default SeeMoreButton;
