import {JSX, ReactNode} from "react";
import './SectionHeading.css'

type SectionProp = {
    children:ReactNode
}

const SectionHeading:(props:SectionProp) => JSX.Element = (props) => {


    const heading = (props.children as string).split(' ')

    const capitalized_text = heading.map((word, index) => {

        const [first, ...rest] = word.split('')

        return(<span key={index}><span className={"fs-6"}>{first}</span>{rest}&nbsp;</span>)
    })

    return (
        <>
            <div className={"border-bottom border-1 border-black text-uppercase fw-bold section_heading"}>
               {capitalized_text}
            </div>
        </>
    )
}

export default SectionHeading