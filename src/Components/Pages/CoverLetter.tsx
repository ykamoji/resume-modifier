import DEFAULT from "../../coverletter.json";
import Layout from "./Layout.tsx";
import './CoverLetter.css'
import {JSX} from "react";

const CoverLetter:() => JSX.Element = () => {

    return <Layout data={DEFAULT} id={"coverLetter"}/>
}

export default CoverLetter
