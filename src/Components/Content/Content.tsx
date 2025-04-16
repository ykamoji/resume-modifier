import {FC} from "react";
import './Content.css'
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";

type ContentProps = {
    paragraphs:string[],
}
const Content:FC<ContentProps> = props => {

    return (
        <>
            <Container id={"content"} className={"ps-lg-5 pe-lg-5 ps-sm-5 pe-sm-5 pb-3"}>
                <Col className={"mb-3"}>Dear Hiring Manager</Col>
                {props.paragraphs.map((para, index) => <Col className={"mb-3"} key={index}>{para}</Col>)}
                <div className="col mb-1">
                    Yours truly,<br/>
                    Yash Kamoji
                </div>
            </Container>
        </>
    )
};

export default Content
