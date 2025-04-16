import {FC} from "react";
import './Label.css'

type LabelProps = {
    name?:string,
    role?:string
}
const Label:FC<LabelProps> = props => {

    return (
        <>
            <div id={"label"} className={"container"}>
                <div id={"name"}>{props.name}</div>
                <div id={"role"}>{props.role}</div>
            </div>
        </>
    )
};

export default Label
