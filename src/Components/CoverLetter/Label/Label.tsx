import {JSX, useEffect, useRef, useState} from "react";
import './Label.css'
import CVEditor from '../CVEditor/CVEditor.tsx'

type LabelProps = {
    name:string,
    role:string
}
const Label:(props:LabelProps) => JSX.Element = props => {

    const [role, setRole] = useState(props.role)
    const [editorMode, setEditorMode] = useState(false)

    const contentRef= useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleDocumentClick = (e:MouseEvent) => {
            if(contentRef.current && !contentRef.current.contains(e.target as Node)) {
                setEditorMode(false)
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
        onContentChange: (update:{ [key: string]: string })=> {
            setRole(update.role)
        }
    }

    return (
        <>
            <div id={"label"} ref={contentRef} className={"container"}>
                <div id={"name"}>{props.name}</div>
                <div onDoubleClick={()=>setEditorMode(prevState => !prevState)}>
                    {!editorMode && <div id={"role"}>{role}</div>}
                    {editorMode && <CVEditor {...commonProps} id={"role"}>{role}</CVEditor>}
                </div>
            </div>
        </>
    )
};

export default Label
