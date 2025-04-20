import {JSX, useEffect, useRef, useState} from "react";
import './Label.css'
import CVEditor from '../CVEditor/CVEditor.tsx'
import {ContactProps} from "../../../utils.ts";
import Container from "react-bootstrap/Container";

const Label:(props:ContactProps) => JSX.Element = props => {

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
            <Container id={"label"} ref={contentRef}>
                <div id={"name"}>{props.name}</div>
                <div onDoubleClick={()=>setEditorMode(prevState => !prevState)}>
                    {!editorMode && <div id={"role"}>{role}</div>}
                    {editorMode && <CVEditor {...commonProps} id={"role"}>{role}</CVEditor>}
                </div>
            </Container>
        </>
    )
};

export default Label
