import {JSX} from "react";
import SectionHeading from "../../../UI/SectionHeading/SectionHeading.tsx";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ResumeEditor from "../ResumeEditor/ResumeEditor.tsx";
import './Experience.css'
import {ExperienceListProps} from "../../../utils.ts";

const Experience:(props:ExperienceListProps) => JSX.Element = ({experienceCommon, experience, edits, editorClick}) => {

    return (
        <>
            <SectionHeading>Professional Experience</SectionHeading>
            <div id={"experience"} className={"mt-1"}>
                {experience.map(({company, job, project, city, date, responsibilities, achievements}, index) =>
                    <div key={index} className={"edu_section mb-1"} onDoubleClick={()=>editorClick(index)}>
                        {!edits[index].editorMode &&
                            <Row className={"justify-content-between"}>
                                <Col sm={{span: 9}} className={"company text-start"}><span className={'fw-bold'}>{company}, {job}</span>, {city}</Col>
                                <Col sm={{span: 3}} className={"date fw-bold text-end"}>{date}</Col>
                            </Row>}
                        {edits[index].editorMode &&
                            <Row className={"justify-content-between"}>
                                <ResumeEditor {...experienceCommon} classAdditional={"col-3"} id={"company-" + index}>{company}</ResumeEditor>
                                <ResumeEditor {...experienceCommon} classAdditional={"col-4"} id={"job-" + index}>{job}</ResumeEditor>
                                <ResumeEditor {...experienceCommon} classAdditional={"col-2"} id={"city-" + index}>{city}</ResumeEditor>
                                <ResumeEditor {...experienceCommon} classAdditional={"col-3"} id={"date-" + index}>{date}</ResumeEditor>
                            </Row>}
                        <Row>
                            {!edits[index].editorMode && <Col sm={{span:3}} className={"date text-start text-decoration-underline"}>{project}</Col>}
                            {edits[index].editorMode  && <ResumeEditor {...experienceCommon} classAdditional={"col-4"} id={"project-"+index}>{project}</ResumeEditor>}
                        </Row>
                        <div className={"resp"}>
                            {/*<span className={"fw-bold"}>Responsibilities</span>*/}
                            {edits[index].editorMode && <ResumeEditor {...experienceCommon} type={"textarea"} rows={5} id={"responsibilities-"+index}>{responsibilities}</ResumeEditor>}
                            {!edits[index].editorMode && <ul className={"mb-0 ps-3"}>
                                {responsibilities
                                    .split('. ')
                                    .filter(rep => rep.trim() !== '')
                                    .map(rep => rep + '.')
                                    .map((rep, index) =>
                                            <li key={index}>{rep}</li>
                                )}
                            </ul>}
                        </div>
                        <div className={"achiev"}>
                            {/*<span className={"fw-bold"}>Achievements</span>*/}
                            {edits[index].editorMode && <ResumeEditor {...experienceCommon} type={"textarea"} rows={2} id={"achievements-"+index}>{achievements}</ResumeEditor>}
                            {!edits[index].editorMode && <ul className={"mb-0 ps-3"}>
                            {achievements
                                .split('. ')
                                .filter(ach => ach.trim() !== '')
                                .map(ach => ach + '.')
                                .map((ach, index) =>
                                    <li key={index}>{ach}</li>
                                )}
                            </ul>}
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default Experience