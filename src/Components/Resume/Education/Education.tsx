import {JSX, useEffect, useRef, useState} from "react";
import Section from "../../../UI/Section/Section.tsx";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ResumeEditor from "../ResumeEditor/ResumeEditor.tsx";
import './Education.css'

type EducationProp = {
    name:string,
    degree:string,
    gpa:string,
    city:string,
    date:string,
    courses:string
}

type EducationListProps = {
    education:EducationProp[]
}

const Education:(props:EducationListProps) => JSX.Element = (props) => {

    const [education, setEducation] = useState(props.education.map(edu => ({...edu, editorMode:false})))

    const educationRef= useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleDocumentClick = (e:MouseEvent) => {
            if(educationRef.current && !educationRef.current.contains(e.target as Node)) {
                education.forEach((c) => c.editorMode = false)
                setEducation(education)
            }
        };

        document.addEventListener('click', handleDocumentClick);

        return () => {
            document.removeEventListener('click', handleDocumentClick);
        };
    }, []);

    const editorClick = (index:number) => {
        const updates = education.slice(0)
        updates[index].editorMode = !updates[index].editorMode
        setEducation(updates)
    }

    const commonProps = {
        type:"input",
        onContentChange: (update:{ [key: string | number]: string })=> {
            const key = Object.keys(update)[0]
            const [label, idx] = key.split('-')
            const index = parseInt(idx);
            const updates = [...education]
            updates[index][label as keyof (EducationProp)] = update[key]
            setEducation(updates)
        }
    }

    return (
        <>
            <Section>Education</Section>
            <div id={"education"} className={"mb-1"} ref={educationRef}>
                {education.map(({name, degree, gpa, city, date, courses, editorMode}, index) =>
                    <div key={index} className={"edu_section " + (index === 0 ? "mb-2" : "") } onDoubleClick={()=>editorClick(index)}>
                        <Row className={"justify-content-between"}>
                            {!editorMode && <Col sm={{span:9}} className={"name fw-bold text-start"}>{name}, {city}</Col>}
                            {editorMode  && <ResumeEditor {...commonProps} classAdditional={"col-4"} id={"name-"+index}>{name +', '+ city}</ResumeEditor>}
                            {!editorMode && <Col sm={{span:3}} className={"date fw-bold text-end"}>{date}</Col>}
                            {editorMode  && <ResumeEditor {...commonProps} classAdditional={"col-2"} id={"date-"+index}>{date}</ResumeEditor>}
                        </Row>
                        <Row className={"justify-content-between"}>
                            {!editorMode && <Col sm={{span:10}} className={"name text-start"}>{degree}</Col>}
                            {editorMode  && <ResumeEditor {...commonProps} classAdditional={"col-6"} id={"degree-"+index}>{degree}</ResumeEditor>}
                            {!editorMode && <Col sm={{span:2}} className={"date text-end"}>GPA: {gpa}</Col>}
                            {editorMode  && <ResumeEditor {...commonProps} classAdditional={"col-2"} id={"gpa-"+index}>{"GPA: " + gpa}</ResumeEditor>}
                        </Row>
                        {!editorMode && courses ?
                            <div className={"courses"}><u>Relevant Coursework</u>&nbsp;&nbsp;{courses}</div> :<></>}
                        {editorMode && courses ?
                            <>
                            <u>Relevant Coursework</u>&nbsp;&nbsp;
                                <ResumeEditor {...commonProps} classAdditional={"col-12"} id={"courses-"+index}>{courses}</ResumeEditor></>
                            :<></>}
                    </div>
                )}
            </div>
        </>
    )
}

export default Education