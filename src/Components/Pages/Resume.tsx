import {JSX} from 'react';
import DEFAULT from "../../resume.json"
import Layout from "./Layout.tsx";
import './Resume.css'

const Resume:() => JSX.Element = () => {

    return <Layout data={DEFAULT} id={"resume"} />
};

export default Resume;