import {FC} from "react";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import './CVEditor.css'
import Button from "../../UI/Button/Button.tsx";
import exportPDF from "../../utils.ts";

type CVProps = {
    role:string;
    onRoleUpdate: (newText: string) => void;
    content: string[];
    onContentAdd: () => void;
    onContentChange: (idx:number, newText: string) => void;
    onContentRemove: (index: number) => void;
}

const download = async () => {

    await exportPDF("coverLetter")
}

const CVEditor:FC<CVProps> = props => {

    return (
        <>
            <div className={"p-3 pt-0"}>
                <div id={"paragraph-box"}>
                    <div className={"d-flex mb-2"}>
                        <FloatingLabel label={"Role"} className={"flex-grow-1"}>
                            <Form.Control
                                placeholder={""}
                                className={"rounded-0"}
                                value={props.role}
                                onChange={(e) => props.onRoleUpdate(e.target.value)}
                            />
                        </FloatingLabel>
                        <Button className={"float-end rounded-0 btn-sm ms-2 h-25 align-self-end p-1"}
                                style={{opacity:0}}
                                type={"button"}
                        >X</Button>
                    </div>
                    {props.content.map((para, idx) =>
                        <div key={'label' + idx} className={"d-flex mb-2"}>
                            <FloatingLabel label={"Paragraph " + (idx + 1)} className={"flex-grow-1"}>
                                <Form.Control
                                    id={`para-${idx}`}
                                    as={"textarea"}
                                    placeholder={""}
                                    className={"rounded-0"}
                                    style={{height:'130px'}}
                                    onChange={(e) => props.onContentChange(idx, e.target.value)}
                                    value={para}
                                />
                            </FloatingLabel>
                            <Button variant={"outline-danger"}
                                    className={"float-end rounded-0 btn-sm ms-2 h-25 align-self-end p-1"}
                                    type={"button"}
                                    onClick={()=> props.onContentRemove(idx)}
                            >X</Button>
                        </div>)
                    }
                </div>
                <br/>
                <Button variant={"outline-primary"} className={"rounded-0 float-end"} type={"button"} onClick={props.onContentAdd}>Add</Button>
                <br/><br/>
                <Button variant={"outline-success"} type={"button"} className={"float-end rounded-0"} onClick={download}>Download</Button>
            </div>
        </>
    )
};

export default CVEditor
