import {JSX, useEffect, useRef, useState} from "react";
import Section from "../../../UI/Section/Section.tsx";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ResumeEditor from "../ResumeEditor/ResumeEditor.tsx";
import './Project.css'
import Container from "react-bootstrap/Container";

type ProjectProp = {
    name: string,
    advisors?: string,
    link: string,
    code: string,
    date: string,
    place: string,
    description: string
}

type ProjectListProps = {
    projects:ProjectProp[]
}

const avoid_targets = [
    'add_content',
    'remove_content'
]

const Project:(props:ProjectListProps) => JSX.Element = (props) => {

    const [project, setProject] = useState(props.projects.map(proj => ({...proj, editorMode:false})))

    const projectRef= useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleDocumentClick = (e:MouseEvent) => {
            const target = e.target as HTMLElement;
            if(projectRef.current && !projectRef.current.contains(target)
                && avoid_targets.filter(avoid => target.className.includes(avoid)).length === 0) {
                const updates = project.slice(0)
                updates.forEach((c) => c.editorMode = false)
                setProject(updates)
            }
        };

        document.addEventListener('click', handleDocumentClick);

        return () => {
            document.removeEventListener('click', handleDocumentClick);
        };
    }, [project]);

    const editorClick = (index:number) => {
        const updates = [...project]
        updates[index].editorMode = !updates[index].editorMode
        setProject(updates)
    }

    const commonProps = {
        type:"input",
        onContentChange: (update:{ [key: string | number]: string })=> {
            const key = Object.keys(update)[0]
            const [label, idx] = key.split('-')
            const index = parseInt(idx);
            const updates = [...project]
            updates[index][label as keyof ProjectProp] = update[key]
            setProject(updates)
        }
    }

    const projectProps = {...commonProps,
        type:"textarea",
        rows:3,
        addBtn:true,
        onContentAdd: (key: string | number)=> {
            const index = parseInt((key as string).split('-')[1])
            const updated = [
                ...project.slice(0, index+1),
                { name: "name", advisors: "advisors", link: "link", code: "code", date: "date", place: "place", description: "description", editorMode: true },
                ...project.slice(index+1)
            ]
            updated[index].editorMode = false
            setProject(updated)
        },
        closeBtn:true,
        onContentRemove: (key: number | string) => {
            const index = parseInt((key as string).split('-')[1])
            setProject(project.filter((_, i) => i !== index));
        },
    }

    return (
        <>
            <Section>Projects</Section>
            <div id={"experience"} className={"mt-1"} ref={projectRef}>
                {project.map(({name, advisors, code, link, date, place, description, editorMode}, index) =>
                    <div key={index} className={"proj_section mb-1"} onDoubleClick={()=>editorClick(index)}>
                        <Row className={"justify-content-between"}>
                            {!editorMode &&
                                <Col sm={{span: 9}} className={"company text-start"}>
                                    <a className={'link-dark link-underline-dark link-offset-1'} href={link} target={"_blank"}>
                                        <span className={'fw-bold'}>{name}</span></a>
                                    <span className={'ms-1 fst-italic'}>[{code}]</span>
                                    {advisors && <span className={'ms-1 text-body-tertiary'}>({"Advisors: " + advisors})</span> }
                                </Col>}
                            {editorMode &&
                                <>
                                    <ResumeEditor {...commonProps} id={"link-"+index} >{link}</ResumeEditor>
                                    <ResumeEditor {...commonProps} id={"name-"+index} >{name}</ResumeEditor>
                                    {advisors && <ResumeEditor {...commonProps} id={"advisors-"+index} >{advisors}</ResumeEditor>}
                                    <ResumeEditor {...commonProps} id={"code-"+index} >{code}</ResumeEditor>
                                </>
                                }
                            {!editorMode && <Col sm={{span:3}} className={"date fw-bold text-end"}>{place+', '+date}</Col>}
                            {editorMode  && <ResumeEditor {...commonProps} classAdditional={"col-2"} id={"pace-"+index}>{place}</ResumeEditor>}
                            {editorMode  && <ResumeEditor {...commonProps} classAdditional={"col-2"} id={"date-"+index}>{date}</ResumeEditor>}
                        </Row>
                        <Row>
                            {!editorMode && <Container>{description}</Container>}
                            {editorMode  && <ResumeEditor {...projectProps} id={"description-"+index}>{description}</ResumeEditor>}
                        </Row>
                    </div>
                )}
            </div>
        </>
    )
}

export default Project