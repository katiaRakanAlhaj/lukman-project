import i18next from "i18next";
const ResumeSkills = ({ SkillsData }) => {
  // Safely access the skills array (works with both { data: [...] } and raw array)
  const skills = Array.isArray(SkillsData)
    ? SkillsData
    : SkillsData?.data || [];

  if (!skills.length) return null;

  return (
    <div className="mt-[3.5rem]">
      <h1 className="text-[1.8rem] font-bold text-primary mb-2">
        {i18next.t("resumePage.skills")}
      </h1>

      <div className="grid lg:grid-cols-5 md:grid-cols-2 lg:gap-y-[1.5rem] gap-y-[2rem] gap-x-[1.5rem]">
        {skills.map((skill) => (
          <div
            key={skill.id}
            className="w-full h-[6rem] rounded-2xl flex items-center gap-x-4 px-4"
            style={{ boxShadow: "rgba(0, 0, 0, 0.25) 0px 0px 4px 0px" }}
          >
            <img
              className="w-[2.5rem] h-[3rem] object-contain"
              src={skill.image}
              alt={skill.name}
            />
            <p className="text-[#333333] text-[1.2rem] mt-2">{skill.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResumeSkills;
