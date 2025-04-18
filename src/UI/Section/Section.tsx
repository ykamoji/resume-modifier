import {JSX, ReactNode} from "react";
import './Section.css'

type SectionProp = {
    children:ReactNode
}

const Section:(props:SectionProp) => JSX.Element = (props) => {

    return (
        <>
            <div className={"border-bottom border-2 border-black"}>
                <div className={"text-uppercase fw-bolder section_heading"}>{props.children}</div>
            </div>
        </>
    )
}

export default Section