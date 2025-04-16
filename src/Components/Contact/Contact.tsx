import {FC} from "react";
import './Contact.css'

type ContactProps = {
    addr:string,
    mobile:string,
    email:string
}
const Contact:FC<ContactProps> = props => {

    return (
        <>
        <div id={"contact"}>
            <div id={"addr"} className={"mb-1"}>
                {props.addr}
            </div>
            <a href={"tel:+1" + props.mobile}
               className={"link-dark link-offset-2 link-underline-opacity-0 link-opacity-50-hover"}>+1 {props.mobile} </a>
            <a href={"mailto" + props.email}
               className={"link-dark link-offset-2 link-underline-opacity-0 link-opacity-50-hover"}>{props.email}</a>
            </div>
        </>
    )
};

export default Contact
