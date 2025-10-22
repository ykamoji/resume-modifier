import {SummaryListProp} from "../../../utils.ts";
import {JSX} from "react";
import SectionHeading from "../../../UI/SectionHeading/SectionHeading.tsx";
import './Summary.css'
import Editor from "../../../UI/Editor/Editor.tsx";

const Summary:(props:SummaryListProp) => JSX.Element = ({summary, edits, summaryCommon, editorClick}) => {

    return(
        <>
            <SectionHeading>Professional Summary</SectionHeading>
            <div id={"summary"} className={"mb-2"}>
                <div onDoubleClick={() => editorClick(0)}>
                    {!edits[0].editorMode && summary[0].description}
                    {edits[0].editorMode && <Editor {...summaryCommon} type={"textarea"} rows={6} id={'description'}>{summary[0].description}</Editor>}
                </div>
            </div>
        </>
    )
};

export default Summary;