// import Container from 'react-bootstrap/Container';
import { JSX } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ResumeEditor from "../Resume/ResumeEditor.tsx";

const Resume:() => JSX.Element = () => {

    return (
        <>
            <Row className={"justify-content-center mt-4 "}>
                <Col lg={{span: 5}}>
                    <ResumeEditor />
                </Col>
                <Col id={"resume"} lg={{span: 6}} className={"shadow-sm bg-white pe-sm-5 p-3"}>
                </Col>
            </Row>
        </>
    )
};

export default Resume;