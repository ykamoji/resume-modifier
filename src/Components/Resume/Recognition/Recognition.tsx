import {JSX} from "react";
import SectionHeading from "../../../UI/SectionHeading/SectionHeading.tsx";
import Editor from "../../../UI/Editor/Editor.tsx";
import {RecognitionProp} from "../../../utils.ts";
import './Recognition.css'


const Recognition:(props:RecognitionProp) => JSX.Element = ({recognitionCommon, recognitions, edits, additionalCommon, editorClick}) => {

    const anyEdit = edits.find(e => e.editorMode)

    return (
        <>
            <SectionHeading>Recognition</SectionHeading>
            <div id={"recognition"} className={anyEdit ? "": "d-flex gap-1"} >
                {recognitions.map(({name, date}, index) =>
                    <div key={index} onDoubleClick={() => editorClick(index)}>
                        {!edits[index].editorMode && <><span className={"name"}>{name}</span> <span className={"date"}>({date})</span>{index != recognitions.length - 1 ? "," : ""}</>}
                        {edits[index].editorMode &&
                            <>
                                <Editor {...recognitionCommon} classAdditional={'col-6'} id={"name-"+index}>{name}</Editor>
                                <Editor {...additionalCommon} classAdditional={'col-6'} id={"date-"+index}>{date}</Editor>
                            </>
                        }
                    </div>
                )}
            </div>
        </>
    )
}

export default Recognition