import {JSX} from "react";
import Form from "react-bootstrap/Form";
import Button from "../../../UI/Button/Button.tsx";
import './ResumeEditor.css'

type ResumeProps = {
    id:string | number,
    rows?:number,
    type: string,
    addBtn?:boolean,
    children: string,
    classAdditional?:string | undefined,
    onContentAdd?: (index: string | number) => void;
    onContentChange: (update: { [key: string | number]: string }) => void;
    closeBtn?:boolean,
    onContentRemove?: (index: number | string) => void
}

const ResumeEditor:(props:ResumeProps) => JSX.Element = props => {

    return (
        <>
            <div className={"resume-box pb-1 "+ (props.classAdditional ?? "")}>
                <div className={ props.type === 'input' ? "" : "d-flex flex-column gap-1 mb-2"}>
                    {
                        props.type === 'textarea' ?
                            <Form.Control
                                as="textarea"
                                placeholder={""}
                                className={"rounded-0 p-0"}
                                cols={100}
                                rows={props.rows}
                                onChange={(e) => props.onContentChange({[props.id]: e.target.value})}
                                value={props.children ?? ""}/>
                            :
                            <Form.Control
                                as="input"
                                placeholder={""}
                                className={"rounded-0 p-0"}
                                onChange={(e) => props.onContentChange({[props.id]: e.target.value})}
                                value={props.children ?? ""} />
                    }
                    { props.addBtn || props.closeBtn ?
                    <div>
                        {props.addBtn &&
                            <Button variant={"outline-primary"} className={"rounded-0 btn-sm h-25 add_content"}
                                    type={"button"}
                                    onClick={() => props.onContentAdd!(props.id)}>Add</Button>}
                        {props.closeBtn && <Button variant={"outline-danger"}
                                                   className={"float-end rounded-0 btn-sm ms-2 h-25 p-1 remove_content"}
                                                   type={"button"}
                                                   onClick={() => props.onContentRemove!(props.id)}
                        >X</Button>}
                    </div> : <></>
                    }
                </div>
            </div>
        </>
    )
}

export default ResumeEditor