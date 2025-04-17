import {JSX, MouseEvent} from "react";
import { Button as BsButton } from 'react-bootstrap';
import './Button.css'

type buttonProp = {
    children?: React.ReactNode,
    variant?:string
    onClick?:(e:MouseEvent) => void,
    type:"button" | "submit" | "reset" | undefined,
    style?:object,
    className?:string,
    id?:string
}
const Button: (props:buttonProp) => JSX.Element = props => <BsButton {...props}>{props.children}</BsButton>;


export default Button;