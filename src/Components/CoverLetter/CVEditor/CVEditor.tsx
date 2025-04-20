import {JSX} from "react";
import Form from 'react-bootstrap/Form';
import './CVEditor.css'
import Button from "../../../UI/Button/Button.tsx";

type CVProps = {
    id:string | number,
    rows?:number,
    addBtn?:boolean,
    children:string,
    onContentAdd?: (index: number | string) => void;
    onContentChange: (updates: { [key: string | number]: string }) => void;
    closeBtn?:boolean,
    onContentRemove?: (index: number | string) => void
}
const CVEditor:(props:CVProps) => JSX.Element = props => {

    return (
        <>
            <div className={"paragraph-box pb-1"}>
                <div className={"d-flex flex-column gap-1 mb-2"}>
                        <Form.Control
                            as="textarea"
                            placeholder={""}
                            className={"rounded-0 border-0 p-0"}
                            cols={100}
                            rows={props.rows}
                            onBlur={(e) => props.onContentChange({[props.id]:e.target.value})}
                            defaultValue={props.children}
                        />
                    { props.addBtn || props.closeBtn ?
                    <div>
                        {props.addBtn && <Button variant={"outline-primary"} className={"rounded-0 btn-sm h-25 add_content"} type={"button"}
                                                 onClick={()=>props.onContentAdd!(props.id)}>Add</Button>}
                        {props.closeBtn && <Button variant={"outline-danger"}
                                                   className={"float-end rounded-0 btn-sm ms-2 h-25 p-1 remove_content"}
                                                   type={"button"}
                                                   onClick={()=>props.onContentRemove!(props.id)}
                        >X</Button>}
                    </div> : <></>
                    }
                </div>
            </div>
        </>
    )
};

export default CVEditor
