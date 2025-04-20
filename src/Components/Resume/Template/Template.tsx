import Skill from "../Skill/Skill.tsx";
import Recognition from "../Recognition/Recognition.tsx";
import {JSX, useEffect, useRef, useState} from "react";
import {avoid_targets, resume_sections, ResumeProp, TemplateProps} from "../../../utils.ts";
import Section from "../Section/Section.tsx";


const Template:(props:TemplateProps) => JSX.Element = ({data, name, updateTemplates}) => {

    const updateSection = (section:keyof ResumeProp, data: ResumeProp[keyof ResumeProp]) => updateTemplates(name, section, data)

    const [editMode, setEditMode] = useState(() =>
        Object.fromEntries(resume_sections.map(section => [section, false])) as Record<keyof ResumeProp, boolean>
    );

    const openEditMode = (section:keyof ResumeProp) => setEditMode(prev => ({ ...prev, [section]: !prev[section] }));

    const contentRef= useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleDocumentClick = (e:MouseEvent) => {
            const target = e.target as HTMLElement;
            if(editMode && contentRef.current && !contentRef.current.contains(e.target as Node)
                && avoid_targets.filter(avoid => target.className.includes(avoid)).length === 0) {
                setEditMode(prevState =>
                    Object.fromEntries(Object.keys(prevState).map(section => [section, false])) as Record<keyof ResumeProp, boolean>
                );
            }
        };

        document.addEventListener('click', handleDocumentClick);

        return () => {
            document.removeEventListener('click', handleDocumentClick);
        };
    }, [editMode]);

    return(
        <div ref={contentRef}>
            <Section section={"contact"} openEditMode={openEditMode} editMode={editMode.contact} data={data.contact} />
            <Section section={"education"} openEditMode={openEditMode} editMode={editMode.education} data={data.education} />
            <Section section={"experience"} openEditMode={openEditMode} editMode={editMode.experience} data={data.experience} />
            <Section section={"projects"} updateSection={updateSection} openEditMode={openEditMode} editMode={editMode.projects} data={data.projects} />
            <Skill {...data.skills} />
            <Recognition recognitions={data.recognitions} />
        </div>
    )
}

export default Template