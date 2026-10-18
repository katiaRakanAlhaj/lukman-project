import { HelmetProvider } from "react-helmet-async";
import Loader from "../component/loader/loader";
import ScrollToTop from "../component/scrollToTop/ScrollToTop";
import { useFetchHomePage } from "../features/home/hook/useFetchHome";
import ResumeDescription from "../features/Resume/component/ResumeDescription";
import ResumeGrid from "../features/Resume/component/ResumeGrid";
import ResumeLanguages from "../features/Resume/component/ResumeLanguages";
import ResumePage from "../features/Resume/component/ResumePage";
import ResumePositions from "../features/Resume/component/ResumePositions";
import ResumeSkills from "../features/Resume/component/ResumeSkills";
import { useFetchDegrees } from "../features/Resume/hook/useFetchDegrees";
import { useFetchLanguages } from "../features/Resume/hook/useFetchLanguages";
import { useFetchPositions } from "../features/Resume/hook/useFetchPostions";
import { useFetchProfissionalExperiences } from "../features/Resume/hook/useFetchProfissionalExperiences";
import { useFetchResumePage } from "../features/Resume/hook/usefetchResumePage";
import { useFetchSkills } from "../features/Resume/hook/useFetchSkills";
import MetaHelmet from "../component/metaHelmet/metaHelmet";
import ErrorMessageNetwork from "../component/errorMessage/errorMessage";
import ResumeExtraTabs from "../features/Resume/component/ResumeExtraTabs";
import { useFetchExtraTabs } from "../features/Resume/hook/useFetchExtraTabs";

const Resume = () => {
  const {
    data: resumePageData,
    isLoading: resumePageDataLoading,
    error: resumePageDataError,
  } = useFetchResumePage();
  const {
    data: homePageData,
    isLoading: homePageDataLoading,
    error: homePageDataError,
  } = useFetchHomePage();
  const {
    data: degreesData,
    isLoading: degreesDataLoading,
    error: degreesDataError,
  } = useFetchDegrees();
  const {
    data: ProfissionalExperiencesData,
    isLoading: ProfissionalExperiencesDataLoading,
    error: ProfissionalExperiencesDataError,
  } = useFetchProfissionalExperiences();
  const {
    data: LanguagesData,
    isLoading: LanguagesDataLoading,
    error: LanguagesDataError,
  } = useFetchLanguages();
  const {
    data: SkillsData,
    isLoading: SkillsDataLoading,
    error: SkillsDataError,
  } = useFetchSkills();
    const {
    data: ExtraTabsData,
    isLoading: ExtraTabsDataLoading,
    error: ExtraTabsDataError,
  } = useFetchExtraTabs();
  const {
    data: PositionsData,
    isLoading: PositionsDataLoading,
    error: PositionsDataError,
  } = useFetchPositions();
  const combinedLoading =
    resumePageDataLoading ||
    homePageDataLoading ||
    degreesDataLoading ||
    ProfissionalExperiencesDataLoading ||
    LanguagesDataLoading ||
    ExtraTabsDataLoading ||
    PositionsDataLoading;
  const combinedError =
    resumePageDataError ||
    homePageDataError ||
    degreesDataError ||
    ProfissionalExperiencesDataError ||
    LanguagesDataError ||
    ExtraTabsDataError ||
    PositionsDataError;
  if (combinedError) {
    return <ErrorMessageNetwork />;
  }
  if (combinedLoading) {
    return <Loader />;
  }
  return (
    <div>
      <ScrollToTop />
      <HelmetProvider>
        <MetaHelmet
          title={resumePageData?.data?.meta_title}
          description={resumePageData?.data?.meta_description}
        />
        <div className="container4 mx-auto">
          <ResumePage resumePageData={resumePageData} />
          <ResumeGrid homePageData={homePageData} degreesData={degreesData} />
          <ResumeDescription
            ProfissionalExperiencesData={ProfissionalExperiencesData}
          />
          <ResumePositions PositionsData={PositionsData} />
          <ResumeLanguages LanguagesData={LanguagesData} />
          <ResumeSkills SkillsData={SkillsData} />
          <ResumeExtraTabs ExtraTabsData={ExtraTabsData} />
        </div>
      </HelmetProvider>
    </div>
  );
};
export default Resume;
