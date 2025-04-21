import {JSX, useEffect, useState} from "react";
import {
    resumeContact,
    ContactProps,
    EducationProp,
    ExperienceProp,
    ProjectProp,
    SectionProps,
    SkillPropsSimple,
    SkillsProps, coverLetterContact,
} from "../../utils.ts";

import CoverLetterContact from "../../Components/CoverLetter/Contact/Contact.tsx";
import Content from "../../Components/CoverLetter/Content/Content.tsx";

import ResumeContact from "../../Components/Resume/Contact/Contact.tsx";
import Education from "../../Components/Resume/Education/Education.tsx";
import Experience from "../../Components/Resume/Experience/Experience.tsx";
import Project from "../../Components/Resume/Project/Project.tsx";
import Skill from "../../Components/Resume/Skill/Skill.tsx";
import Recognition from "../../Components/Resume/Recognition/Recognition.tsx";



const Section:(props:SectionProps) => JSX.Element = ({id, section, data, editMode, openEditMode, updateSection}) => {


    const contactData = data as ContactProps
    const skillData = data as SkillsProps

    const sectionContent = id === 'resume' ?
        (section === 'contact' ? resumeContact.map(k => ({[k]:contactData[k as keyof ContactProps]})) as {label:keyof ContactProps, value:ContactProps[keyof ContactProps]}[] :
            section === 'education' ? data as EducationProp[] :
                section === 'experience' ? data as ExperienceProp[] :
                    section === 'projects' ? data as ProjectProp[] :
                        section === 'skills' ? Object.keys(skillData).map(k => ({[k]:skillData[k as keyof SkillsProps]})) as {label:keyof SkillsProps, value:SkillsProps[keyof SkillsProps]}[] :
                            data as {name:string, date:string}[]) :
        ( section === 'contact' ? coverLetterContact.map(k => ({[k]:contactData[k as keyof ContactProps]})) as {label:keyof ContactProps, value:ContactProps[keyof ContactProps]}[] :
                data as string[]);

    const [edits, setEdits] = useState<{ editorMode: boolean }[]>(sectionContent.map(() => ({editorMode:false})))

    useEffect(() => {

        if(edits.filter(e => e.editorMode).length > 0){
            if(!editMode){
                setEdits(prevState => prevState.map(() => ({editorMode:false})))
            }
        }
    }, [editMode, edits]);

    const editorClick = (index:number) => {

        if(edits.filter(e  => e.editorMode).length == 0 && !editMode){
            openEditMode(section)
        }

        setEdits(prevState =>
            prevState.map((item, i) =>
                i === index && !item.editorMode ? ({editorMode: !item.editorMode }) : item)
        );
    }

    const common = {
        type:"input",
        onContentChange: (update:{ [key: string | number]: string })=> {
            const key = Object.keys(update)[0]
            const [label, idx] = key.split('-')
            const index = parseInt(idx);

            if(section === 'contact'){
                const key = Object.keys(update)[0] as keyof ContactProps
                contactData[key] = update[key]
            }
            else if(section === 'education'){
                (sectionContent as EducationProp[])[index][label as keyof EducationProp] = update[key]
            }
            else if(section === 'experience'){
                (sectionContent as ExperienceProp[])[index][label as keyof ExperienceProp] = update[key]
            }
            else if(section === 'projects'){
                (sectionContent as ProjectProp[])[index][label as keyof ProjectProp] = update[key]
            }
            else if(section === 'skills'){
                const key = Object.keys(update)[0] as keyof SkillPropsSimple
                skillData[key] = update[key]
            }
            else if(section === 'recognitions'){
                (sectionContent as {name:string, date:string}[])[index][label as keyof {name:string, date:string}] = update[key]
            }
            else if(section === 'content'){
                (sectionContent as string[])[index] = update[key]
            }

        }
    }

    const additionalCommon = {
        ...common,
        type:"textarea",
        addBtn:true,
        onContentAdd: (key: string | number)=> {
            const index = parseInt((key as string).split("-")[1]);

            if (section === "projects") {
                const projectData = sectionContent as ProjectProp[];
                const duplicate = { ...projectData[index] };
                (Object.keys(duplicate) as (keyof ProjectProp)[]).forEach((k) => duplicate[k] = k as never);
                const modified = [
                    ...projectData.slice(0, index + 1),
                    duplicate,
                    ...projectData.slice(index + 1),
                ];
                updateSection!(section, modified)
            }
            else if (section === "recognitions") {
                const recognitionData = sectionContent as {name:string, date:string}[];
                const duplicate = { ...recognitionData[index] };
                (Object.keys(duplicate) as (keyof {name:string, date:string})[]).forEach((k) => duplicate[k] = k as never);
                const modified = [
                    ...recognitionData.slice(0, index + 1),
                    duplicate,
                    ...recognitionData.slice(index + 1),
                ];
                updateSection!(section, modified)
            }
            else if (section === "content") {
                const contentData = sectionContent as string[]
                const modified = [
                    ...contentData.slice(0, index+1),
                    'Add your text...',
                    ...contentData.slice(index+1)
                ]
                updateSection!(section, modified)
            }

            setEdits((prev) => [
                ...prev.slice(0, index),
                { editorMode: false },
                { editorMode: true },
                ...prev.slice(index + 1),
            ]);

        },
        closeBtn:true,
        onContentRemove: (key: string | number) => {
            const index = parseInt((key as string).split('-')[1]);

            if (section === "projects") {
                const modified = (sectionContent as ProjectProp[]).filter((_, i) => i !== index);
                updateSection!(section, modified)
            }
            else if (section === "recognitions") {
                const modified = ( sectionContent as { name: string; date: string }[]).filter((_, i) => i !== index);
                updateSection!(section, modified)
            }
            else if (section === "content") {
                const modified = (sectionContent as string[]).filter((_, i) => i !== index);
                updateSection!(section, modified)
            }

            setEdits(prev => [
                ...prev.slice(0, index),
                ...prev.slice(index + 1),
            ]);
        },
    }

    const recognitionCommon = {
        ...additionalCommon,
        type:"input"
    }


    switch (id){
        case "resume": {
            switch (section) {
                case 'contact':
                    return <ResumeContact contactCommon={common} edits={edits} editorClick={editorClick}
                                    name={contactData.name} contacts={sectionContent as { label: keyof ContactProps, value: ContactProps[keyof ContactProps] }[]}/>
                case 'education':
                    return <Education educationCommon={common} edits={edits} editorClick={editorClick}
                                      education={sectionContent as EducationProp[]}/>
                case 'experience':
                    return <Experience experienceCommon={common} edits={edits} editorClick={editorClick}
                                       experience={sectionContent as ExperienceProp[]}/>
                case 'projects':
                    return <Project projectCommon={common} additionalCommon={additionalCommon} edits={edits}
                                    editorClick={editorClick} projects={sectionContent as ProjectProp[]}/>
                case 'skills':
                    return <Skill skillCommon={common} edits={edits} editorClick={editorClick}
                                  skills={sectionContent as {
                                      label: keyof SkillsProps,
                                      value: SkillsProps[keyof SkillsProps]
                                  }[]}/>
                case 'recognitions':
                    return <Recognition recognitionCommon={common} additionalCommon={recognitionCommon} edits={edits}
                                        editorClick={editorClick}
                                        recognitions={sectionContent as { name: string, date: string }[]}/>
                default:
                    return <></>
            }
        }
        case "coverLetter": {
            switch (section) {
                case "contact": {
                    const coverLetterData  = sectionContent as {label: keyof ContactProps, value: ContactProps[keyof ContactProps]}[] ;
                    return <CoverLetterContact contactCommon={common} edits={edits} editorClick={editorClick} contacts={coverLetterData}  />
                }
                case "content": {
                    const conventData  = sectionContent as string[];
                    return <Content contentCommon={additionalCommon} edits={edits} editorClick={editorClick} contents={conventData}/>
                }
                default: return <></>
            }
        }
        default: return <></>
    }
}

export default Section