import emptyData from "../../assets/images/emptyData.svg";
const EmptyState = ({ message, imageSrc = emptyData, className = "" }) => {
  return (
    <div
      className={`text-center flex flex-col items-center justify-center py-8 ${className}`}
    >
      <img
        className="w-[24rem] h-[24rem] object-contain"
        src={imageSrc}
        alt="no results"
      />
      {message && (
        <p className="text-[1.3rem] text-negative font-bold">{message}</p>
      )}
    </div>
  );
};

export default EmptyState;