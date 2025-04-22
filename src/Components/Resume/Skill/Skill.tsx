import {JSX} from "react";
import SectionHeading from "../../../UI/SectionHeading/SectionHeading.tsx";
import Editor from "../../../UI/Editor/Editor.tsx";
import {SkillListProps} from "../../../utils.ts";
import './Skill.css'

const Skill:(props:SkillListProps) => JSX.Element = ({skillCommon, skills, edits, editorClick}) => {
    return (
        <>
            <SectionHeading>Technical Skills</SectionHeading>
            <div id={"skill"} className={"mb-2"} >
                {skills.map((data, index) => {
                    const label = Object.keys(data)[0]
                    const value = Object.values(data)[0]
                    if(label === 'certificates') {
                        const certificates = (value as { name: string, link: string }[])
                        return (
                            <div key={index}>
                                <span className={"fw-bold"}>Certificates: </span>
                                {certificates.map(({link, name}, i) =>
                                    <span key={i}>
                                        {(i > 0 ? ', ' : '')}
                                        <a href={link}
                                           className={"link-dark link-underline-dark link-underline-opacity-25 me-1"}
                                           target={"_blank"}>{name}</a>
                                    </span>
                                )}
                            </div>
                        )}

                    return (
                        <div key={index} onDoubleClick={() => editorClick(index)}>
                            {!edits[index].editorMode && <><span className={"fw-bold text-capitalize"}>{label}: </span> {value}</>}
                            {edits[index].editorMode && <Editor {...skillCommon} id={label}>{value as string}</Editor>}
                        </div>
                    )}
                )}
            </div>
        </>
    )
}

export default Skill