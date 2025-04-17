import {FC, useEffect, useRef, useState} from "react";
import './Contact.css'
import CVEditor from '../CoverLetter/CVEditor'

type ContactProps = {
    addr:string,
    mobile:string,
    email:string
}
const Contact:FC<ContactProps> = props => {

    const [contact, setContact] = useState(props)
    const [editorMode, setEditorMode] = useState({
        addr:false,
        mobile:false,
        email:false
    })

    const contentRef= useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleDocumentClick = (e:MouseEvent) => {
            if(contentRef.current && !contentRef.current.contains(e.target as Node)) {
                Object.keys(editorMode).forEach((k) => editorMode[k] = false)
                setEditorMode(editorMode)
            }
        };

        document.addEventListener('click', handleDocumentClick);

        return () => {
            document.removeEventListener('click', handleDocumentClick);
        };
    }, []);

    const commonProps = {
        addBtn:false,
        closeBtn:false,
        onContentChange: (update:object)=> {
            setContact(prev => ({...prev,...update}))
        }
    }

    return (
        <>
            <div id={"contact"} ref={contentRef}>
                <div onDoubleClick={()=> setEditorMode(prev=> ({...prev, addr:!prev.addr}))}>
                    {!editorMode.addr &&
                        <div id={"addr"} className={"link-dark link-offset-2 link-underline-opacity-0 link-opacity-50-hover mb-1"}>
                            {contact.addr}</div>}
                    {editorMode.addr && <CVEditor {...commonProps} id={"addr"}>{contact.addr}</CVEditor>}
                </div>
                <div onDoubleClick={()=> setEditorMode(prev=> ({...prev, mobile:!prev.mobile}))}>
                    {!editorMode.mobile &&
                        <div id={"mobile"} className={"link-dark link-offset-2 link-underline-opacity-0 link-opacity-50-hover mb-1"}>
                        +1 {contact.mobile} </div>}
                    {editorMode.mobile && <CVEditor {...commonProps} id={"mobile"}>{contact.mobile}</CVEditor>}
                </div>
                <div onDoubleClick={()=> setEditorMode(prev=> ({...prev, email:!prev.email}))}>
                    {!editorMode.email &&
                        <div id={"email"} className={"link-dark link-offset-2 link-underline-opacity-0 link-opacity-50-hover"}>
                        {contact.email}</div>}
                    {editorMode.email && <CVEditor {...commonProps} id={"email"}>{contact.email}</CVEditor>}
                </div>
            </div>
        </>
    )
};

export default Contact
