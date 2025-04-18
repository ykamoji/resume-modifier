import {JSX, useRef} from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from "../../UI/Button/Button.tsx";
import { useReactToPrint } from 'react-to-print';
import Header from "../Resume/Header/Header.tsx";
import {contact, label, education, experience, projects, skills, recognitions} from "../../data.json"
import Education from "../Resume/Education/Education";
import Experience from "../Resume/Experience/Experience.tsx";
import './Resume.css'
import Project from "../Resume/Project/Project.tsx";
import Skill from "../Resume/Skill/Skill.tsx";
import Recognition from "../Resume/Recognition/Recognition.tsx";


const Resume:() => JSX.Element = () => {

    const printRef = useRef<HTMLDivElement>(null);

    const handlePrint = useReactToPrint({
        contentRef: printRef,
        documentTitle: "Resume"
    });

    return (
        <>
        <Button variant={"outline-success"} type={"button"}
                className={"float-end rounded-0 me-5 mt-5"}
                onClick={handlePrint}>
            Print
        </Button>
            <Row className={"justify-content-center mt-4"}>
                <Col ref={printRef} id={"resume"} lg={{span: 7}} className={"shadow-sm bg-white p-2"}>
                    <Header {...contact} {...label} />
                    <Education education={education}/>
                    <Experience experience={experience} />
                    <Project projects={projects} />
                    <Skill {...skills} />
                    <Recognition recognitions={recognitions} />
                </Col>
            </Row>
        </>
    )
};

export default Resume;