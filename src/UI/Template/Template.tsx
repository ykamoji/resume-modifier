import {JSX, useEffect, useRef, useState} from "react";
import {
    avoid_targets,
    resume_sections,
    coverLetter_sections,
    ResumeProp,
    TemplateProps,
    CoverLetterProps,
} from "../../utils.ts";
import Section from "../Section/Section.tsx";
import Container from "react-bootstrap/Container";


const Template:(props:TemplateProps) => JSX.Element = ({id, data, name, updateTemplates, toggleOrder}) => {

    const updateSection = (section:keyof ResumeProp | keyof CoverLetterProps,
                           data: ResumeProp[keyof ResumeProp] | CoverLetterProps[keyof CoverLetterProps]) => updateTemplates(name, section, data)

    const [editMode, setEditMode] =
        useState<Partial<Record<keyof ResumeProp | keyof CoverLetterProps, boolean >>>(() =>
        Object.fromEntries((id === 'resume' ? resume_sections : coverLetter_sections).map(section => [section, false]))
    );


    const openEditMode = (section:keyof ResumeProp | keyof CoverLetterProps) =>
        setEditMode(prev => ({ ...prev, [section]: !prev[section] }));

    const contentRef= useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleDocumentClick = (e:MouseEvent) => {
            const target = e.target as HTMLElement;
            const checkAnyInEditMode = Object.values(editMode).find(edit => edit)
            if(checkAnyInEditMode && contentRef.current && !contentRef.current.contains(e.target as Node)
                && avoid_targets.filter(avoid => target.className.includes(avoid)).length === 0) {
                setEditMode(prevState =>
                    Object.fromEntries(Object.keys(prevState).map(section => [section, false]))
                );
            }
        };

        document.addEventListener('click', handleDocumentClick);

        return () => {
            document.removeEventListener('click', handleDocumentClick);
        };
    }, [editMode]);

    if(id === 'resume'){
        const resumeData = data as ResumeProp
        return(
            <div ref={contentRef}>
                <Section id={id} section={"contact"} updateSection={updateSection} openEditMode={openEditMode} editMode={editMode.contact!} data={resumeData.contact} />
                <Section id={id} section={"education"} updateSection={updateSection} openEditMode={openEditMode} editMode={editMode.education!} data={resumeData.education} />
                <Section id={id} section={"summary"} updateSection={updateSection} openEditMode={openEditMode} editMode={editMode.summary!} data={resumeData.summary} />
                {toggleOrder &&
                    <>
                    <Section id={id} section={"experience"} updateSection={updateSection}  openEditMode={openEditMode} editMode={editMode.experience!} data={resumeData.experience} />
                    <Section id={id} section={"projects"} updateSection={updateSection} openEditMode={openEditMode} editMode={editMode.projects!} data={resumeData.projects} />
                    <Section id={id} section={"skills"}  updateSection={updateSection}  openEditMode={openEditMode} editMode={editMode.skills!} data={resumeData.skills} />
                    </>
                }
                {!toggleOrder &&
                    <>
                        <Section id={id} section={"skills"}  updateSection={updateSection}  openEditMode={openEditMode} editMode={editMode.skills!} data={resumeData.skills} />
                        <Section id={id} section={"projects"} updateSection={updateSection} openEditMode={openEditMode} editMode={editMode.projects!} data={resumeData.projects} />
                        <Section id={id} section={"experience"} updateSection={updateSection}  openEditMode={openEditMode} editMode={editMode.experience!} data={resumeData.experience} />
                    </>
                }
                <Section id={id} section={"recognitions"} updateSection={updateSection} openEditMode={openEditMode} editMode={editMode.recognitions!} data={resumeData.recognitions}  />
            </div>
        )
    }

    if(id === 'coverLetter') {
        const coverLetterData = data as CoverLetterProps;
        return (
            <div ref={contentRef}>
                <div id={"hline"} className={"float-end me-5 mt-3"}></div>
                <Container id={"header"} className={"mb-5"}>
                    <Section id={id} section={"contact"} editMode={editMode.contact!} openEditMode={openEditMode} data={coverLetterData.contact}  />
                </Container>
                <Section id={id} section={"content"} updateSection={updateSection} editMode={editMode.content!} openEditMode={openEditMode} data={coverLetterData.content}  />
            </div>
        )
    }

    return <></>
}

export default Template