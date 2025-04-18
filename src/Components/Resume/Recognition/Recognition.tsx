import {JSX, useEffect, useRef, useState} from "react";
import Section from "../../../UI/Section/Section.tsx";
import ResumeEditor from "../ResumeEditor/ResumeEditor.tsx";
import './Recognition.css'
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

type RecognitionProp = {
    recognitions:{name:string, date:string}[]
}

const Recognition:(props:RecognitionProp) => JSX.Element = (props) => {

    const [recognition, setRecognition] = useState(props.recognitions.map(rec => ({...rec, editorMode:false})))

    const recognitionRef= useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleDocumentClick = (e:MouseEvent) => {
            if(recognitionRef.current && !recognitionRef.current.contains(e.target as Node)) {
                const updates = recognition.slice(0)
                updates.forEach((c) => c.editorMode = false)
                setRecognition(updates)
            }
        };

        document.addEventListener('click', handleDocumentClick);

        return () => {
            document.removeEventListener('click', handleDocumentClick);
        };
    }, []);

    const editorClick = (index:number) => {
        const updates = recognition.slice(0)
        updates[index].editorMode = !updates[index].editorMode
        setRecognition(updates)
    }

    const commonProps = {
        type:"input",
        onContentChange: (update:object)=> {
            const key = Object.keys(update)[0]
            const index = key.split('-')[1]
            const label = key.split('-')[0]
            const updates = recognition.slice(0)
            updates[index][label] = update[key]
            setRecognition(updates)
        }
    }

    return (
        <>
            <Section>Recognition</Section>
            <div id={"recognition"} className={"mt-1"} ref={recognitionRef}>
                {recognition.map(({name, date, editorMode}, index) =>
                    <div key={index} onDoubleClick={() => editorClick(index)}>
                        {!editorMode &&
                            <Row>
                                <Col className={"text-start award"}>{name}</Col>
                                <Col className={"text-end fw-bold date"}>{date}</Col>
                            </Row>
                        }
                        {editorMode &&
                            <>
                                <ResumeEditor {...commonProps} classAdditional={'col-3'} id={"name"} className={"text-start"}>{name}</ResumeEditor>
                                <ResumeEditor {...commonProps} classAdditional={'col-1'} id={"date"} className={"text-end fw-bold"}>{date}</ResumeEditor>
                            </>
                        }
                    </div>
                )}
            </div>
        </>
    )
}

export default Recognition