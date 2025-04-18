import {JSX} from "react";
import './Section.css'

const Section:(props) => JSX.Element = (props) => {

    return (
        <>
            <div className={"border-bottom border-2 border-black"}>
                <div className={"text-uppercase fw-bolder section_heading"}>{props.children}</div>
            </div>
        </>
    )
}

export default Section