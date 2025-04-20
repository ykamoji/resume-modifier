import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {useReactToPrint} from "react-to-print";
import {useRef} from "react";
import Contact from "../CoverLetter/Contact/Contact.tsx";
import Label from "../CoverLetter/Label/Label.tsx";
import Content from "../CoverLetter/Content/Content.tsx";
import data from "../../data.json"
import Button from "../../UI/Button/Button.tsx";
import './CoverLetter.css'

const CoverLetter = () => {

    const printRef = useRef<HTMLDivElement>(null);

    const handlePrint = useReactToPrint({
        contentRef: printRef,
        documentTitle: "CoverLetter"
    });

    return (
        <>
            <Button variant={"outline-success"} type={"button"}
                    className={"float-end rounded-0 me-5 mt-5"}
                    onClick={handlePrint}>
                Print
            </Button>
            <Row className={"justify-content-center mt-4 mb-5"}>
                <Col ref={printRef} id={"coverLetter"} className={"shadow-sm bg-white"} lg={{span: 6}}>
                    <div id={"hline"} className={"float-end me-5 mt-3"}></div>
                    <Container id={"header"} className={"mb-5"}>
                        <Contact {...data.contact} />
                        <Label {...data.contact} />
                    </Container>
                    <Content content={data.content} />
                </Col>
            </Row>
        </>
    )
}

export default CoverLetter
