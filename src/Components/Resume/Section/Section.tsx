import {JSX, useEffect, useState} from "react";
import {
    contact,
    ContactProps,
    EducationProp,
    ExperienceProp,
    ProjectProp,
    SectionProps,
    SkillPropsSimple,
    SkillsProps
} from "../../../utils.ts";
import Header from "../Header/Header.tsx";
import Education from "../Education/Education.tsx";
import Experience from "../Experience/Experience.tsx";
import Project from "../Project/Project.tsx";
import Skill from "../Skill/Skill.tsx";


const Section:(props:SectionProps) => JSX.Element = ({section, data, editMode, openEditMode, updateSection}) => {

    const contactData = data as ContactProps
    const skillData = data as SkillsProps

    const sectionContent = section === 'contact' ?
        contact.map(k => ({[k]:contactData[k as keyof ContactProps]})) as {label:keyof ContactProps, value:ContactProps[keyof ContactProps]}[]
        : section === 'education' ? data as EducationProp[] :
            section === 'experience' ? data as ExperienceProp[] :
                section === 'projects' ? data as ProjectProp[]
                    : Object.keys(skillData).map(k => ({[k]:skillData[k as keyof SkillsProps]})) as {label:keyof SkillsProps, value:SkillsProps[keyof SkillsProps]}[]


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

        }
    }

    const additionalCommon = {
        ...common,
        type:"textarea",
        addBtn:true,
        onContentAdd: (key: string | number)=> {
            const index = parseInt((key as string).split('-')[1])
            const projects = sectionContent as ProjectProp[]
            const duplicate: ProjectProp = { ...projects[index] };
            (Object.keys(duplicate) as (keyof ProjectProp)[]).forEach(k => duplicate[k] = k);
            const updated = [
                ...projects.slice(0, index+1),
                duplicate,
                ...projects.slice(index+1)
            ]
            setEdits(prev => [
                ...prev.slice(0, index),
                { editorMode: false},
                { editorMode: true },
                ...prev.slice(index+1),
            ]);
            updateSection!(section, updated)

        },
        closeBtn:true,
        onContentRemove: (key: string | number) => {
            const index = parseInt((key as string).split('-')[1])
            const projects = sectionContent as ProjectProp[]
            const updated = projects.filter((_,i)  => i!== index)
            setEdits(prev => [
                ...prev.slice(0, index),
                ...prev.slice(index+1),
            ]);
            updateSection!(section, updated)
        },
    }

    switch (section) {
        case 'contact':
            return <Header contactCommon={common} edits={edits} editorClick={editorClick} name={contactData.name} contacts={sectionContent as {label:keyof ContactProps, value:ContactProps[keyof ContactProps]}[]} />
        case 'education':
            return <Education educationCommon={common} edits={edits} editorClick={editorClick} education={sectionContent as EducationProp[]} />
        case 'experience':
            return <Experience experienceCommon={common} edits={edits} editorClick={editorClick} experience={sectionContent as ExperienceProp[]} />
        case 'projects':
            return <Project projectCommon={common} additionalCommon={additionalCommon} edits={edits} editorClick={editorClick} projects={sectionContent as ProjectProp[]}  />
        case 'skills':
            return <Skill skillCommon={common} edits={edits} editorClick={editorClick} skills={sectionContent as {label:keyof SkillsProps, value:SkillsProps[keyof SkillsProps]}[]} />
        default:
            return <></>
    }
}

export default Section