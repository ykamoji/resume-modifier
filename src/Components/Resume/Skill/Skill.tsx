import {JSX, useEffect, useRef, useState} from "react";
import Section from "../../../UI/Section/Section.tsx";
import ResumeEditor from "../ResumeEditor/ResumeEditor.tsx";
import './Skill.css'

type SkillsProp = {
    languages:string[],
    databases:string[],
    aws:string[],
    framework:string[],
    others:string[],
    certificates:{name:string, link:string }[]
}

const Skill:(props:SkillsProp) => JSX.Element = (props) => {

    const [skill, setSkill] = useState(({...props, editorMode:false}))

    const skillRef= useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleDocumentClick = (e:MouseEvent) => {
            if(skillRef.current && !skillRef.current.contains(e.target as Node)) {
                setSkill(prevState => ({...prevState, editorMode: false}))
            }
        };

        document.addEventListener('click', handleDocumentClick);

        return () => {
            document.removeEventListener('click', handleDocumentClick);
        };
    }, []);

    const editorClick = () => {
        setSkill(prevState => ({...prevState, editorMode: !prevState.editorMode}))
    }

    const commonProps = {
        type:"input",
        onContentChange: (update:object)=> {
            const key = Object.keys(update)[0]
            setSkill(prevState => ({...prevState, [key]: update[key]}))
        }
    }

    return (
        <>
            <Section>Technical Skills</Section>
            <div id={"skill"} className={"mt-1"} ref={skillRef} onDoubleClick={() => editorClick()}>
                {!skill.editorMode && <>
                <span className={"fw-bold"}>Languages: </span> {skill.languages}<br/>
                <span className={"fw-bold"}>Databases: </span> {skill.databases}<br/>
                <span className={"fw-bold"}>AWS services: </span> {skill.aws}<br/>
                <span className={"fw-bold"}>Frameworks: </span> {skill.framework}<br/>
                <span className={"fw-bold"}>ML: </span> {skill.others}<br/>
                <span className={"fw-bold"}>Certificates: </span>
                {skill.certificates.map((certs, index) =>
                    <span key={index} >
                        {(index > 0 ? ', ': '' )}
                        <a href={certs.link} className={"link-dark link-underline-dark link-underline-opacity-25 me-1"}
                           target={"_blank"}>{certs.name}</a>
                    </span>
                    )}
                </>}
                {skill.editorMode && <>
                    <ResumeEditor {...commonProps} id={"languages"}>{skill.languages}</ResumeEditor>
                    <ResumeEditor {...commonProps} id={"databases"}>{skill.databases}</ResumeEditor>
                    <ResumeEditor {...commonProps} id={"aws"}>{skill.aws}</ResumeEditor>
                    <ResumeEditor {...commonProps} id={"framework"}>{skill.framework}</ResumeEditor>
                    <ResumeEditor {...commonProps} id={"others"}>{skill.others}</ResumeEditor>
                </>
                }
            </div>
        </>
    )
}

export default Skill