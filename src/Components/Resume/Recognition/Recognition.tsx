import {JSX} from "react";
import SectionHeading from "../../../UI/SectionHeading/SectionHeading.tsx";
import ResumeEditor from "../ResumeEditor/ResumeEditor.tsx";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {RecognitionProp} from "../../../utils.ts";
import './Recognition.css'


const Recognition:(props:RecognitionProp) => JSX.Element = ({recognitionCommon, recognitions, edits, additionalCommon, editorClick}) => {

    return (
        <>
            <SectionHeading>Recognition</SectionHeading>
            <div id={"recognition"} className={"mt-1"} >
                {recognitions.map(({name, date}, index) =>
                    <div key={index} onDoubleClick={() => editorClick(index)}>
                        {!edits[index].editorMode &&
                            <Row>
                                <Col className={"text-start award"}>{name}</Col>
                                <Col className={"text-end fw-bold date"}>{date}</Col>
                            </Row>
                        }
                        {edits[index].editorMode &&
                            <>
                                <ResumeEditor {...recognitionCommon} classAdditional={'col-6'} id={"name-"+index}>{name}</ResumeEditor>
                                <ResumeEditor {...additionalCommon} classAdditional={'col-6'} id={"date-"+index}>{date}</ResumeEditor>
                            </>
                        }
                    </div>
                )}
            </div>
        </>
    )
}

export default Recognition