import i18next from 'i18next';
import React from 'react';

const ResumeLanguages = ({ LanguagesData }) => {
  // Safely access the languages array
  const languages = LanguagesData?.data || [];

  if (!languages.length) return null;

  return (
    <div className="mt-[3.5rem]">
      <h1 className="text-[1.8rem] font-bold text-primary mb-2">{i18next.t("resumePage.Lang")}</h1>

      <div className="grid grid-cols-4 gap-6">
        <div className="lg:col-span-4 col-span-full grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
          {languages.map((language) => (
            <div
              key={language.id}
              className="w-full rounded-lg flex justify-start items-center gap-x-4 px-4 h-[5rem]"
              style={{ boxShadow: 'rgba(0, 0, 0, 0.25) 0px 0px 4px 0px' }}
            >
              <img
                className="w-12 h-9"
                src={language.image}
                alt={language.name}
              />
              <p className="text-[#333333] text-[1.1rem]">{language.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResumeLanguages;