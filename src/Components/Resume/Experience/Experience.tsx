import {JSX, useEffect, useRef, useState} from "react";
import Section from "../../../UI/Section/Section.tsx";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ResumeEditor from "../ResumeEditor/ResumeEditor.tsx";
import './Experience.css'

type ExperienceProp = {
    company:string,
    job:string,
    project:string,
    city:string,
    date:string,
    responsibilities:string,
    achievements:string
}

type ExperienceListProps = {
    experience:ExperienceProp[]
}

const Experience:(props:ExperienceListProps) => JSX.Element = (props) => {

    const [experience, setExperience] = useState(props.experience.map(exp => ({...exp, editorMode:false})))

    const experienceRef= useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleDocumentClick = (e:MouseEvent) => {
            if(experienceRef.current && !experienceRef.current.contains(e.target as Node)) {
                experience.forEach((c) => c.editorMode = false)
                setExperience(experience)
            }
        };

        document.addEventListener('click', handleDocumentClick);

        return () => {
            document.removeEventListener('click', handleDocumentClick);
        };
    }, []);

    const editorClick = (index:number) => {
        const updates = experience.slice(0)
        updates[index].editorMode = !updates[index].editorMode
        setExperience(updates)
    }

    const commonProps = {
        type:"input",
        onContentChange: (update:{ [key: string | number]: string })=> {
            const key = Object.keys(update)[0]
            const [label, idx] = key.split('-')
            const index = parseInt(idx);
            const updates = [...experience]
            updates[index][label as keyof ExperienceProp] = update[key]
            setExperience(updates)
        }
    }

    const experienceProps = {...commonProps, type:"textarea", rows:5}

    return (
        <>
            <Section>Professional Experience</Section>
            <div id={"experience"} className={"mt-1"} ref={experienceRef}>
                {experience.map(({company, job, project, city, date, responsibilities, achievements, editorMode}, index) =>
                    <div key={index} className={"edu_section mb-1"} onDoubleClick={()=>editorClick(index)}>
                        <Row className={"justify-content-between"}>
                            {!editorMode && <Col sm={{span:9}} className={"company text-start"}><span className={'fw-bold'}>{company}, {job}</span>, {city}</Col>}
                            {editorMode  && <ResumeEditor {...commonProps} classAdditional={"col-3"} id={"company-"+index}>{company}</ResumeEditor>}
                            {editorMode  && <ResumeEditor {...commonProps} classAdditional={"col-3"} id={"job-"+index}>{job}</ResumeEditor>}
                            {editorMode  && <ResumeEditor {...commonProps} classAdditional={"col-3"} id={"city-"+index}>{city}</ResumeEditor>}
                            {!editorMode && <Col sm={{span:3}} className={"date fw-bold text-end"}>{date}</Col>}
                            {editorMode  && <ResumeEditor {...commonProps} classAdditional={"col-3"} id={"date-"+index}>{date}</ResumeEditor>}
                        </Row>
                        <Row>
                            {!editorMode && <Col sm={{span:3}} className={"date text-start text-decoration-underline"}>{project}</Col>}
                            {editorMode  && <ResumeEditor {...commonProps} classAdditional={"col-4"} id={"project-"+index}>{project}</ResumeEditor>}
                        </Row>
                        <div className={"resp"}>
                            {/*<span className={"fw-bold"}>Responsibilities</span>*/}
                            {editorMode && <ResumeEditor {...experienceProps} id={"responsibilities-"+index}>{responsibilities}</ResumeEditor>}
                            {!editorMode && <ul className={"mb-0 ps-3"}>
                                {responsibilities
                                    .split('. ')
                                    .filter(rep => rep.trim() !== '')
                                    .map(rep => rep + '.')
                                    .map((rep, index) =>
                                            <li key={index}>{rep}</li>
                                )}
                            </ul>}
                        </div>
                        <div className={"achiev"}>
                            {/*<span className={"fw-bold"}>Achievements</span>*/}
                            {editorMode && <ResumeEditor {...experienceProps} rows={2} id={"achievements-"+index}>{achievements}</ResumeEditor>}
                            {!editorMode && <ul className={"mb-0 ps-3"}>
                            {achievements
                                .split('. ')
                                .filter(ach => ach.trim() !== '')
                                .map(ach => ach + '.')
                                .map((ach, index) =>
                                    <li key={index}>{ach}</li>
                                )}
                            </ul>}
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default Experience