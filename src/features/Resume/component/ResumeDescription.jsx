import DOMPurify from "dompurify";
import i18next from "i18next";
const ResumeDescription = ({ ProfissionalExperiencesData }) => {
  // Safely access the data array
  const experiences = ProfissionalExperiencesData?.data || [];
  console.log("experiences", experiences);
  if (!experiences.length) return null;

  // We render the first item (the professional experience entry)
  const experience = experiences[0];

  return (
    <div className="flex flex-col space-y-3">
      <h1 className="font-bold text-primary text-[1.8rem] mt-[1.3rem]">
        {i18next.t("lukman_title")}
      </h1>

      <div className="flex flex-col space-y-2">
        <p className="text-secondary text-[1.2rem] font-bold">
          {experience.title}
        </p>

        {experience.description && (
          <p
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(experience.description),
            }}
            className="text-secondary flex text-justify text-[1.2rem] leading-[2.5rem] whitespace-pre-line"
          />
        )}
      </div>
    </div>
  );
};

export default ResumeDescription;
