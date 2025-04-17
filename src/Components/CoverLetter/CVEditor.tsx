import {JSX} from "react";
import Form from 'react-bootstrap/Form';
import './CVEditor.css'
import Button from "../../UI/Button/Button.tsx";

type CVProps = {
    id:string,
    rows?:number,
    addBtn:boolean,
    onContentAdd?: (index?: number) => void;
    onContentChange: (updates: object) => void;
    closeBtn:boolean,
    onContentRemove?: (index?: number) => void
}
const CVEditor:(props:CVProps) => JSX.Element = props => {

    return (
        <>
            <div className={"paragraph-box pb-1"}>
                <div className={"d-flex gap-1 mb-2"}>
                        <Form.Control
                            as="textarea"
                            placeholder={""}
                            className={"rounded-0"}
                            cols={100}
                            rows={props.rows}
                            onChange={(e) => props.onContentChange({[props.id]:e.target.value})}
                            value={props.children}
                        />
                    {props.addBtn && <Button variant={"outline-primary"} className={"rounded-0 btn-sm  h-25 align-self-end"} type={"button"}
                                             onClick={()=>props.onContentAdd(props.id)}>Add</Button>}
                    {props.closeBtn && <Button variant={"outline-danger"}
                                               className={"float-end rounded-0 btn-sm ms-2 h-25 align-self-end p-1"}
                                               type={"button"}
                                               onClick={()=>props.onContentRemove(props.id)}
                    >X</Button>}
                </div>

            </div>
        </>
    )
};

export default CVEditor
