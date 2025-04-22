import {JSX} from "react";
import SectionHeading from "../../../UI/SectionHeading/SectionHeading.tsx";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Editor from "../../../UI/Editor/Editor.tsx";
import './Project.css'
import Container from "react-bootstrap/Container";
import {ProjectListProps} from "../../../utils.ts";


const Project:(props:ProjectListProps) => JSX.Element = ({projectCommon, additionalCommon, projects, edits, editorClick}) => {

    return (
        <>
            <SectionHeading>Projects</SectionHeading>
            <div id={"experience"} className={"mb-2"}>
                {projects.map(({name, advisors, code, link, date, place, description}, index) =>
                    <div key={index} className={"proj_section mb-1"} onDoubleClick={()=>editorClick(index)}>
                        <Row className={"justify-content-between"}>
                            {!edits[index].editorMode &&
                                <Col sm={{span: 9}} className={"company text-start"}>
                                    <a className={'link-dark link-underline-dark link-offset-1'} href={link} target={"_blank"}>
                                        <span className={'fw-bold'}>{name}</span></a>
                                    <span className={'ms-1 fst-italic'}>[{code}]</span>
                                    {advisors && <span className={'ms-1 text-body-tertiary'}>({"Advisors: " + advisors})</span> }
                                </Col>}
                            {edits[index].editorMode &&
                                <>
                                    <Editor {...projectCommon} id={"link-"+index} >{link}</Editor>
                                    <Editor {...projectCommon} id={"name-"+index} >{name}</Editor>
                                    {advisors && <Editor {...projectCommon} id={"advisors-"+index} >{advisors}</Editor>}
                                    <Editor {...projectCommon} id={"code-"+index} >{code}</Editor>
                                </>
                                }
                            {!edits[index].editorMode && <Col sm={{span:3}} className={"date fw-bold text-end .dates"}>{place+', '+date}</Col>}
                            {edits[index].editorMode  && <Editor {...projectCommon} classAdditional={"col-2"} id={"pace-"+index}>{place}</Editor>}
                            {edits[index].editorMode  && <Editor {...projectCommon} classAdditional={"col-2"} id={"date-"+index}>{date}</Editor>}
                        </Row>
                        <Row>
                            {!edits[index].editorMode && <Container>{description}</Container>}
                            {edits[index].editorMode  && <Editor {...additionalCommon} rows={4} id={"description-"+index}>{description}</Editor>}
                        </Row>
                    </div>
                )}
            </div>
        </>
    )
}

export default Project