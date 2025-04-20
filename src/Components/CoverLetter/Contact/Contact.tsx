import {JSX} from "react";
import './Contact.css'
import CVEditor from '../CVEditor/CVEditor.tsx'
import {CoverLetterContactProps} from "../../../utils.ts";
import Container from "react-bootstrap/Container";


const Contact:(props:CoverLetterContactProps) => JSX.Element = ({contacts, contactCommon, editorClick, edits}) =>{


    console.log(contacts)


    return (
        <>
        <div id={"contact"}>
            {contacts.map((data, index) => {
                const label = Object.keys(data)[0]
                const value = Object.values(data)[0]!
                return (
                    <div key={index} onDoubleClick={() => editorClick(index)}>
                        {!edits[index].editorMode && <div id={label}>{value} </div>}
                        {edits[index].editorMode && <CVEditor {...contactCommon} id={label}>{value}</CVEditor>}
                    </div>
                )
            })}
        </div>
            <Container id={"label"}>
                {/*<div id={"name"}>Yash</div>*/}
                {/*<div onDoubleClick={()=>editorClick(0)}>*/}
                {/*    {!editorMode && <div id={"role"}>{role}</div>}*/}
                {/*    {editorMode && <CVEditor {...contactCommon} id={"role"}>{role}</CVEditor>}*/}
                {/*</div>*/}
            </Container>
        </>

    )
};

export default Contact
