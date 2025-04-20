import {JSX, useEffect, useRef, useState} from "react";
import SectionHeading from "../../../UI/SectionHeading/SectionHeading.tsx";
import ResumeEditor from "../ResumeEditor/ResumeEditor.tsx";
import './Recognition.css'
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {RecognitionProp} from "../../../utils.ts";


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
        onContentChange: (update:{ [key: string | number]: string })=> {
            const key = Object.keys(update)[0]
            const [label, idx] = key.split('-')
            const index = parseInt(idx);
            const updates = [...recognition]
            updates[index][label as keyof ({name:string, date:string})] = update[key]
            setRecognition(updates)
        }
    }

    return (
        <>
            <SectionHeading>Recognition</SectionHeading>
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
                                <ResumeEditor {...commonProps} classAdditional={'col-6'} id={"name-"+index}>{name}</ResumeEditor>
                                <ResumeEditor {...commonProps} classAdditional={'col-1'} id={"date"+index}>{date}</ResumeEditor>
                            </>
                        }
                    </div>
                )}
            </div>
        </>
    )
}

export default Recognition