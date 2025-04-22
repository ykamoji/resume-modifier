import {JSX} from "react";
import SectionHeading from "../../../UI/SectionHeading/SectionHeading.tsx";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Editor from "../../../UI/Editor/Editor.tsx";
import './Experience.css'
import {ExperienceListProps} from "../../../utils.ts";

const Experience:(props:ExperienceListProps) => JSX.Element = ({experienceCommon, experience, edits, editorClick}) => {

    return (
        <>
            <SectionHeading>Professional Experience</SectionHeading>
            <div id={"experience"} className={"mb-2"}>
                {experience.map(({company, job, project, city, date, responsibilities, achievements}, index) =>
                    <div key={index} className={"edu_section mb-1"} onDoubleClick={()=>editorClick(index)}>
                        {!edits[index].editorMode &&
                            <Row className={"justify-content-between"}>
                                <Col sm={{span: 9}} className={"company text-start"}><span className={'fw-bold'}>{company}, {job}</span>, {city}</Col>
                                <Col sm={{span: 3}} className={"date fw-bold text-end dates"}>{date}</Col>
                            </Row>}
                        {edits[index].editorMode &&
                            <Row className={"justify-content-between"}>
                                <Editor {...experienceCommon} classAdditional={"col-3"} id={"company-" + index}>{company}</Editor>
                                <Editor {...experienceCommon} classAdditional={"col-4"} id={"job-" + index}>{job}</Editor>
                                <Editor {...experienceCommon} classAdditional={"col-2"} id={"city-" + index}>{city}</Editor>
                                <Editor {...experienceCommon} classAdditional={"col-3"} id={"date-" + index}>{date}</Editor>
                            </Row>}
                        <Row>
                            {!edits[index].editorMode && <Col sm={{span:3}} className={"text-start text-decoration-underline"}>{project}</Col>}
                            {edits[index].editorMode  && <Editor {...experienceCommon} classAdditional={"col-4"} id={"project-"+index}>{project}</Editor>}
                        </Row>
                        <div className={"resp"}>
                            {/*<span className={"fw-bold"}>Responsibilities</span>*/}
                            {edits[index].editorMode && <Editor {...experienceCommon} type={"textarea"} rows={5} id={"responsibilities-"+index}>{responsibilities}</Editor>}
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
                            {edits[index].editorMode && <Editor {...experienceCommon} type={"textarea"} rows={2} id={"achievements-"+index}>{achievements}</Editor>}
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