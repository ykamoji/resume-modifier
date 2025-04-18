import {FC, useEffect, useRef, useState} from "react";
import './Contact.css'
import CVEditor from '../CVEditor/CVEditor.tsx'

type ContactProps = {
    addr:string,
    mobile:string,
    email:string
}

const allowedKeys = ['addr', 'mobile', 'email']

const Contact:FC<ContactProps> = props => {

    const [contact, setContact] = useState(
        Object.keys(props)
            .filter(prop_key => allowedKeys.includes(prop_key))
            .map(k => ({editorMode:false, label:k , value:props[k]}))
    )

    const contentRef= useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleDocumentClick = (e:MouseEvent) => {
            if(contentRef.current && !contentRef.current.contains(e.target as Node)) {
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
        onContentChange: (update:object)=> {
            const label = Object.keys(update)[0]
            const updates = contact.slice(0)
            updates.filter(c => c.label === label).forEach(c =>  c.value = update[label])
            setContact(updates)
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
