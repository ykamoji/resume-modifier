import {JSX, useEffect, useRef, useState} from "react";
import './Contact.css'
import CVEditor from '../CVEditor/CVEditor.tsx'
import {ContactProps} from "../../../utils.ts";

const allowedKeys = ['addr', 'mobile', 'email'] as const

const Contact:(props:ContactProps) => JSX.Element = props =>{

    const [contact, setContact] = useState(
        allowedKeys.map(k => ({editorMode:false, label:k , value:props[k]}))
    )

    const contentRef= useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleDocumentClick = (e:MouseEvent) => {
            if(contentRef.current && e.target && !contentRef.current.contains(e.target as Node)) {
                contact.forEach((c) => c.editorMode = false)
                setContact(contact)
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
        onContentChange: (update: { [key: string]: string })=> {
            const label = Object.keys(update)[0]
            const value = update[label] ?? '';
            setContact(prev => prev.map(c => c.label === label ? { ...c, value } : c));
        }
    }

    const editorClick = (key:string) => {
        const updates = contact.slice(0)
        updates.filter(c => c.label === key).forEach(c =>  c.editorMode = !c.editorMode)
        setContact(updates)
    }

    return (
        <>
            <div id={"contact"} ref={contentRef}>
                {
                    contact.map(({editorMode, label, value}, index) => <div key={index}
                                                                            onDoubleClick={() => editorClick(label)}>
                            {!editorMode &&
                                <div id={label}
                                     className={"link-dark link-offset-2 link-underline-opacity-0 link-opacity-50-hover mb-1"}>
                                    {value}</div>}
                            {editorMode && <CVEditor {...commonProps} id={label}>{value}</CVEditor>}
                        </div>
                    )
                }
            </div>
        </>
    )
};

export default Contact
