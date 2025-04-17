import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Contact from "../Contact/Contact.tsx";
import Label from "../Label/Label.tsx";
import Content from "../Content/Content.tsx";
import data from "../../../public/data.json"
import Button from "../../UI/Button/Button.tsx";
import exportPDF from "../../utils.ts";

const CoverLetter = () => {

    return (
        <>
            <Button variant={"outline-success"} type={"button"}
                    className={"float-end rounded-0 me-5 mt-5"}
                    onClick={()=> exportPDF("coverLetter")}>
                Download
            </Button>
            <Row className={"justify-content-center mt-4 "}>
                <Col id={"coverLetter"} className={"shadow-sm bg-white pe-sm-5 p-3"}
                     lg={{span: 6}}>
                    <div id={"hline"} className={"float-end me-5"}></div>
                    <Container id={"header"} className={"mb-5 ps-lg-5 pe-lg-5 ps-sm-5 pe-sm-5"}>
                        <Contact {...data.contact} />
                        <Label {...data.label} />
                    </Container>
                    <Content content={data.content} />
                </Col>
            </Row>
        </>
    )
}

export default CoverLetter
