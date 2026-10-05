const UnitedNationCategories = ({ unitedNationCategoryData, activeId, onSelect }) => {
  if (!unitedNationCategoryData?.data) return null;

  return (
    <div className="w-full h-auto bg-white rounded-2xl py-[1rem] px-[2rem]">
      <p className="text-[#333333] font-bold text-[1.2rem] p-2">الأقسام</p>
      <div className="w-full h-[0.01rem] bg-[#C4C4C4] mt-[1rem]"></div>
      <div className="-mx-[2rem]">
        {unitedNationCategoryData.data.map((category, index) => {
          const isActive = category.id === activeId;
          return (
            <div
              key={category.id}
              onClick={() => onSelect(category.id)}
              className={`flex items-center gap-x-[1rem] cursor-pointer p-4 transition-colors ${
                isActive ? "bg-[#CEECF4]" : "hover:bg-gray-50"
              }`}
              style={{
                marginTop: index === 0 ? "1rem" : "0.4rem",
                paddingLeft: "calc(2.5rem)",
                paddingRight: "calc(2.5rem)",
              }}
            >
              <img
                className="w-[1.5rem] h-[1.5rem] object-cover"
                alt={category.name}
                src={category.image}
                style={{
                  filter: isActive
                    ? "invert(44%) sepia(88%) saturate(427%) hue-rotate(156deg) brightness(90%) contrast(90%)"
                    : "none",
                }}
              />
              <p className={`text-[1.2rem] mt-1 ${isActive ? "text-[#099EC8]" : "text-[#002F3C]"}`}>
                {category.name}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UnitedNationCategories;