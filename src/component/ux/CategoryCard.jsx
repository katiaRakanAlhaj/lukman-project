import React from "react";

const CategoryCard = ({ label, isActive, onClick }) => {
  return (
    <button
      type="button"
      className={`w-auto h-[2.2rem] px-[1rem] rounded-full flex justify-center items-center text-[1.1rem] ${
        isActive ? "bg-negative text-white" : "bg-[#E7EDF3] text-primary"
      }`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default CategoryCard;