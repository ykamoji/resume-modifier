import {JSX, useRef} from 'react';
import Col from 'react-bootstrap/Col';
import { useReactToPrint } from 'react-to-print';
import Controls from "../../UI/Controls/Controls.tsx";
import {CoverLetterProps, LayoutProps, ResumeProp, TemplateStateProps} from "../../utils.ts";
import Template from "../../UI/Template/Template";
import './Resume.css'
import Container from "react-bootstrap/Container";


const Layout:(props:LayoutProps) => JSX.Element = ({templates, setTemplates, id}) => {

    const onTemplateSelection = (name:string) => {
        if(templates.find(t => t.selected)!.name !== name){
            setTemplates(prevState =>
                prevState.map(t => t.name === name ? {...t, selected:true} : {...t, selected:false}))
        }
    }

    const printRef = useRef<HTMLDivElement>(null);

    const handlePrint = useReactToPrint({
        contentRef: printRef,
        documentTitle: id
    });

    const uploadTemplates = (files:TemplateStateProps[]) => {
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

    const updateTemplateName = (oldName:string, newName:string) => {
        if(newName && newName.length > 0){
            setTemplates(prevState =>
                prevState.map(t => t.name === oldName ? {...t, name:newName} : {...t})
            )
        }
    }

    const selectedTemplate = templates.find(t => t.selected)!

    return (
        <>
            <Container className={"mt-4 mb-5"}>
                <Col id={"controls"} lg={{span: 3}} className={"start-0 ms-lg-5"}>
                    <Controls templates={templates}
                              print={handlePrint}
                              uploadTemplates={uploadTemplates}
                              onTemplateSelection={onTemplateSelection}
                              updateTemplateName={updateTemplateName}
                    />
                </Col>
                <Col ref={printRef} id={id} lg={{span: 8, offset:3}} className={"shadow-sm bg-white"}>
                    <Template id={id} {...selectedTemplate} updateTemplates={updateTemplates} />
                </Col>
            </Container>
        </>
    )
};

export default Layout;