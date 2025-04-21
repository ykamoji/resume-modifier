import {JSX} from "react";
import './Content.css'
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Editor from '../../../UI/Editor/Editor.tsx'
import {ContentProps} from "../../../utils.ts";

const Content:(props:ContentProps) => JSX.Element = ({contentCommon, contents, edits, editorClick}) => {


    return (
        <>
            <Container id={"content"} >
                <Col className={"mb-3"}>Dear Hiring Manager</Col>
                {contents.map((content, index) =>
                    <div key={index} onDoubleClick={()=>editorClick(index)}>
                        {!edits[index].editorMode && <Col className={"mb-3 paragraphs"}>{content}</Col>}
                        {edits[index].editorMode && <Editor {...contentCommon} id={'para-'+index}>{content}</Editor> }
                    </div> )
                }
                <Col className="mb-1">
                    Yours truly,<br/>
                    Yash Kamoji
                </Col>
            </Container>
        </>
    )
};

export default Content
