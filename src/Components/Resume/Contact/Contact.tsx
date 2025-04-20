import {JSX} from "react";
import ResumeEditor from "../ResumeEditor/ResumeEditor";
import {ResumeContactProps, links} from "../../../utils.ts";
import './Contact.css'


const Contact:(props:ResumeContactProps) => JSX.Element = ({name, edits, contacts, contactCommon, editorClick}) => {

    return (
        <>
            <div className={"text-center text-uppercase fs-4 fw-semibold"}>{name}</div>
            <div id={"resume_contact"} className={"d-flex gap-2 justify-content-center"}>
                {contacts.map((data, index) => {
                        const label = Object.keys(data)[0]
                        const value= Object.values(data)[0]!
                        return (
                            <div key={index} onDoubleClick={() => editorClick(index)}>
                                {!edits[index].editorMode &&
                                    <div className={"contact pe-2 " + (index < 4 ? "border-end border-dark border-1" : "")}>
                                        {links.includes(label as typeof links[number]) ?
                                            <a href={value} target={"_blank"} className={"link-primary link-offset-2"}>
                                                {value.replace("https://", "").replace("www.", "")}</a> : value}
                                    </div>}
                                {edits[index].editorMode &&
                                    <ResumeEditor {...contactCommon} id={label}>{value}</ResumeEditor>}
                            </div>
                        )
                    }
                )}
            </div>
        </>
    )
}

export default Contact