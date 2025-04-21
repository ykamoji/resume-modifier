import {JSX} from "react";
import './Contact.css'
import Editor from '../../../UI/Editor/Editor.tsx'
import {CoverLetterContactProps} from "../../../utils.ts";
import Container from "react-bootstrap/Container";


const Contact:(props:CoverLetterContactProps) => JSX.Element = ({contacts, contactCommon, editorClick, edits}) =>{

    const name = Object.values(contacts[3])[0]!
    const role = Object.values(contacts[4])[0]!

    return (
        <>
        <div id={"contact"}>
            {contacts.slice(0,3).map((data, index) => {
                const label = Object.keys(data)[0]
                const value = Object.values(data)[0]!
                return (
                    <div key={index} onDoubleClick={() => editorClick(index)}>
                        {!edits[index].editorMode && <div id={label}>{value} </div>}
                        {edits[index].editorMode && <Editor {...contactCommon} id={label}>{value}</Editor>}
                    </div>
                )
            })}
        </div>
            <Container id={"label"}>
                <div id={"name"}>{name}</div>
                <div onDoubleClick={()=>editorClick(4)}>
                    {!edits[4].editorMode && <div id={"role"}>{role}</div>}
                    {edits[4].editorMode && <Editor {...contactCommon} classAdditional={"col-6"} id={"role"}>{role}</Editor>}
                </div>
            </Container>
        </>

    )
};

export default Contact
