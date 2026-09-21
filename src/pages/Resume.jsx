import ResumeDescription from "../features/Resume/component/ResumeDescription";
import ResumeGrid from "../features/Resume/component/ResumeGrid";
import ResumeLanguages from "../features/Resume/component/ResumeLanguages";
import ResumePositions from "../features/Resume/component/ResumePositions";
import ResumeSkills from "../features/Resume/component/ResumeSkills";

const Resume = ()=> {
    return(
        <div>
            <ResumeGrid/>
            <ResumeDescription/>
            <ResumePositions/>
            <ResumeLanguages/>
            <ResumeSkills/>
        </div>
    )
}
export default Resume;