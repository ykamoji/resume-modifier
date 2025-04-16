import React, { FC, MouseEvent } from "react";
import { Button as BsButton } from 'react-bootstrap';
import './Button.css'

type buttonProp = {
    variant?:string
    children: React.ReactNode,
    onClick?:(e:MouseEvent) => void,
    type:"button" | "submit" | "reset" | undefined,
    style?:{},
    className?:string,
    id?:string
}
const Button:FC<buttonProp> = props => <BsButton {...props}>{props.children}</BsButton>;


export default Button;