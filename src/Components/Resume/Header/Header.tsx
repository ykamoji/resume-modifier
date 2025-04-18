import {JSX, useEffect, useRef, useState} from "react";
import './Header.css'
import ResumeEditor from "../ResumeEditor/ResumeEditor";

type HeaderProps = {
    name:string,
    shortAddr:string,
    mobile:string,
    email:string,
    linkedIn:string,
    website:string,
}

const basic = ['mobile', 'email', 'shortAddr']

const links = ['linkedIn', 'website']

const contact = [...basic, ...links]

const Header:(props:HeaderProps) => JSX.Element = props => {

    const [header, setHeader] = useState(Object.keys(props)
        .filter(propKey => contact.includes(propKey))
        .map(k => ({editorMode:false, label:k , value:props[k]})))

    const contentRef= useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleDocumentClick = (e:MouseEvent) => {
            if(contentRef.current && !contentRef.current.contains(e.target as Node)) {
                header.forEach((c) => c.editorMode = false)
                setHeader(header)
            }
        };

        document.addEventListener('click', handleDocumentClick);

        return () => {
            document.removeEventListener('click', handleDocumentClick);
        };
    }, []);

    const editorClick = (key:string) => {
        const updates = header.slice(0)
        updates.filter(c => c.label === key).forEach(c =>  c.editorMode = !c.editorMode)
        setHeader(updates)
    }

    const commonProps = {
        type:"input",
        onContentChange: (update:object)=> {
            const label = Object.keys(update)[0]
            const updates = header.slice(0)
            updates.filter(c => c.label === label).forEach(c =>  c.value = update[label])
            setHeader(updates)
        }
    }

    const ordered_props = contact.map(k => header.find(d => d.label === k))

    return(
        <>
            <div className={"text-center text-uppercase fs-4 fw-semibold"}>{props.name}</div>
            <div id={"resume_header"} ref={contentRef}  className={"d-flex gap-2 justify-content-center"}>
                {ordered_props.map(({editorMode, label, value}, index) =>
                    <div key={index} onDoubleClick={()=>editorClick(label)}>
                        {!editorMode && <div className={"contact pe-2 " + (index < 4 ? "border-end border-dark border-1" : "")}>
                            {links.includes(label) ?
                                <a href={value} target={"_blank"} className={"link-primary link-offset-2"}>
                                {value.replace("https://","").replace("www.","")}</a> : value}
                        </div>}
                        {editorMode && <ResumeEditor {...commonProps} id={label}>{value}</ResumeEditor>}
                    </div>
                )}
            </div>
        </>
    )
}

export default Header