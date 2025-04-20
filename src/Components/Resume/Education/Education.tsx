import {JSX} from "react";
import SectionHeading from "../../../UI/SectionHeading/SectionHeading.tsx";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ResumeEditor from "../ResumeEditor/ResumeEditor.tsx";
import './Education.css'
import {EducationListProps} from "../../../utils.ts";

const Education:(props:EducationListProps) => JSX.Element = ({education, editorClick, edits, educationCommon}) => {

    return (
        <>
            <SectionHeading>Education</SectionHeading>
            <div id={"education"} className={"mb-1"}>
                {education.map(({name, degree, gpa, city, date, courses}, index) =>
                    <div key={index} className={"edu_section " + (index === 0 ? "mb-2" : "") } onDoubleClick={()=>editorClick(index)}>
                        {!edits[index].editorMode && <>
                            <Row className={"justify-content-between"}>
                                <Col sm={{span: 9}} className={"name fw-bold text-start"}>{name}, {city}</Col>
                                <Col sm={{span: 3}} className={"date fw-bold text-end"}>{date}</Col>
                            </Row>
                            <Row className={"justify-content-between"}>
                                <Col sm={{span: 10}} className={"name text-start"}>{degree}</Col>
                                <Col sm={{span: 2}} className={"date text-end"}>GPA: {gpa}</Col>
                            </Row>
                            {courses && <div className={"courses"}><u>Relevant Coursework</u>&nbsp;&nbsp;{courses}</div>}
                        </>}
                        {edits[index].editorMode && <>
                            <Row className={"justify-content-between"}>
                                <ResumeEditor {...educationCommon} classAdditional={"col-4"} id={"name-"+index}>{name}</ResumeEditor>
                                <ResumeEditor {...educationCommon} classAdditional={"col-4"} id={"city-"+index}>{city}</ResumeEditor>
                                <ResumeEditor {...educationCommon} classAdditional={"col-2"} id={"date-"+index}>{date}</ResumeEditor>
                            </Row>
                            <Row className={"justify-content-between"}>
                                <ResumeEditor {...educationCommon} classAdditional={"col-6"} id={"degree-"+index}>{degree}</ResumeEditor>
                                <ResumeEditor {...educationCommon} classAdditional={"col-2"} id={"gpa-"+index}>{gpa}</ResumeEditor>
                            </Row>
                            <u>Relevant Coursework</u>&nbsp;&nbsp;
                            <ResumeEditor {...educationCommon} classAdditional={"col-12"} id={"courses-"+index}>{courses}</ResumeEditor>
                            </>
                        }
                    </div>
                )}
            </div>
        </>
    )
}

export default Education