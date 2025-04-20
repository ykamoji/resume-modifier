import {JSX, useRef, useState} from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useReactToPrint } from 'react-to-print';
import DEFAULT from "../../data.json"
import Controls from "../Resume/Controls/Controls.tsx";
import {ResumeProp, ResumeStateProps} from "../../utils.ts";
import Template from "../Resume/Template/Template.tsx";
import './Resume.css'

const Resume:() => JSX.Element = () => {

    const [templates, setTemplates] = useState<ResumeStateProps[]>([{
        name:'Default',
        selected:true,
        data:DEFAULT
    }])

    const onTemplateSelection = (name:string) => {
        const updates = [...templates]
        updates.forEach(t=> t.name === name ? t.selected=true : t.selected=false)
        setTemplates(updates)
    }

    const printRef = useRef<HTMLDivElement>(null);

    const handlePrint = useReactToPrint({
        contentRef: printRef,
        documentTitle: "Resume"
    });

    const uploadTemplates = (files:ResumeStateProps[]) => {
        setTemplates(prevState => [...prevState, ...files])
    }

    const updateTemplates = (name:string, section:keyof ResumeProp, data: ResumeProp[keyof ResumeProp]) => {
        setTemplates(prevState =>
            prevState.map(t => {
                if (t.name === name) {
                    return {
                        ...t,
                        data: {
                            ...t.data,
                            [section]: data
                        }
                    };
                }
                return t;
            })
        );
    }

    const selectedTemplate = templates.find(t => t.selected)!

    return (
        <>
            <Row className={"justify-content-center mt-4 mb-5"}>
                <Col id={"controls"} lg={{span: 3}} className={"position-fixed start-0 ms-5"} style={{top:"40%"}} >
                    <Controls templates={templates} print={handlePrint} uploadTemplates={uploadTemplates} onTemplateSelection={onTemplateSelection}/>
                </Col>
                    <Col ref={printRef} id={"resume"} lg={{span: 7, offset:3}} className={"shadow-sm bg-white"}>
                   <Template {...selectedTemplate} updateTemplates={updateTemplates} />
                </Col>
            </Row>
        </>
    )
};

export default Resume;