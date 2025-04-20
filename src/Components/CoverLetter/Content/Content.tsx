import {useEffect, useState, useRef, JSX} from "react";
import './Content.css'
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import CVEditor from "../CVEditor/CVEditor.tsx"
import {avoid_targets, ContentProps} from "../../../utils.ts";

const Content:(props:ContentProps) => JSX.Element = props => {

    const [control, setControl] = useState(() =>
        [...Array(props.content.length).keys()].map(k => ({
            editorMode: false,
            content: props.content[k]
        }))
    );

    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleDocumentClick = (e:MouseEvent) => {

            const target = e.target as HTMLElement;

            if (contentRef.current && !contentRef.current.contains(target)
                && avoid_targets.filter(avoid => target.className.includes(avoid)).length === 0) {
                const updates = control.slice(0)
                updates.forEach(c => c.editorMode = false)
                setControl(updates)
            }
        };

        document.addEventListener('click', handleDocumentClick);

        return () => {
            document.removeEventListener('click', handleDocumentClick);
        };
    }, [control]);

    const commonProps = {
        addBtn:true,
        onContentAdd: (index: string | number)=> {
            index = index as number
            const updated = [
                ...control.slice(0, index+1),
                { editorMode: true, content: 'Add your text...'},
                ...control.slice(index+1)
            ]
            updated[index].editorMode = false
            setControl(updated)
        },
        onContentChange: (updates: { [key: string | number]: string }) => {
            const updated = [...control];
            const index = Number(Object.keys(updates)[0]);
            updated[index].content = updates[index];
            setControl(updated)
        },
        closeBtn:true,
        onContentRemove: (index: string | number) => {
            setControl(control.filter((_, i) => i !== index));
        },
        rows:6
    }

    const editorClick = (index:number)=> {
        const updated = control.slice(0);
        updated[index].editorMode = !updated[index].editorMode
        setControl(updated)
    }

    return (
        <>
            <Container id={"content"} ref={contentRef} className={"ps-lg-5 pe-lg-5 ps-sm-5 pe-sm-5 pb-3"}>
                <Col className={"mb-3"}>Dear Hiring Manager</Col>
                {control.map(({editorMode, content}, index) =>
                    <div key={index} onDoubleClick={()=>editorClick(index)}>
                        {!editorMode && <Col className={"mb-3"}>{content}</Col>}
                        {editorMode && <CVEditor {...commonProps} id={index}>{content}</CVEditor> }
                    </div> )
                }
                <div className="col mb-1">
                    Yours truly,<br/>
                    Yash Kamoji
                </div>
            </Container>
        </>
    )
};

export default Content
