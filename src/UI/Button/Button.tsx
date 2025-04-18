import {JSX} from "react";
import { Button as BsButton } from 'react-bootstrap';
import './Button.css'

type buttonProp = {
    children?: React.ReactNode,
    variant?:string
    type:"button" | "submit" | "reset" | undefined,
    style?:object,
    className?:string,
    id?:string
}
const Button: (props:buttonProp) => JSX.Element = props => <BsButton {...props}>{props.children}</BsButton>;


export default Button;