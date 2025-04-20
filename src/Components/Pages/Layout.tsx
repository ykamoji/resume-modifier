import {JSX, useRef, useState} from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useReactToPrint } from 'react-to-print';
import Controls from "../../UI/Controls/Controls.tsx";
import {CoverLetterProps, LayoutProps, ResumeProp, ResumeStateProps} from "../../utils.ts";
import Template from "../../UI/Template/Template";
import './Resume.css'


const  Layout:(props:LayoutProps) => JSX.Element = ({data, id}) => {

    const [templates, setTemplates] = useState<ResumeStateProps[]>([{
        name:'Default',
        selected:true,
        data:data
    }])

    const onTemplateSelection = (name:string) => {
        const updates = [...templates]
        updates.forEach(t=> t.name === name ? t.selected=true : t.selected=false)
        setTemplates(updates)
    }

    const printRef = useRef<HTMLDivElement>(null);

    const handlePrint = useReactToPrint({
        contentRef: printRef,
        documentTitle: id
    });

    const uploadTemplates = (files:ResumeStateProps[]) => {
        setTemplates(prevState => [...prevState, ...files])
    }

    const updateTemplates = (name:string, section:keyof ResumeProp | keyof CoverLetterProps, data: ResumeProp[keyof ResumeProp] | CoverLetterProps[keyof CoverLetterProps]) => {
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
                <Col ref={printRef} id={id} lg={{span: 7, offset:3}} className={"shadow-sm bg-white"}>
                    <Template id={id} {...selectedTemplate} updateTemplates={updateTemplates} />
                </Col>
            </Row>
        </>
    )
};

export default Layout;