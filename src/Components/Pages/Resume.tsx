import {JSX, useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addResumeTemplates } from "../../store/profile.ts";
import {RootState} from "../../store";
import Layout from "./Layout.tsx";
import {TemplateStateProps} from "../../utils.ts";
import data from "../../resume.json"
import './Resume.css'

const Resume:() => JSX.Element = () => {

    const [templates, setTemplates] = useState<TemplateStateProps[]>([{
        name:'Default',
        selected:true,
        data:data
    }])

    const dispatch = useDispatch();

    const { resumeTemplates  } = useSelector((state: RootState) => state.profile);

    useEffect(() => {

        if(templates.length > 0 && ( resumeTemplates.length < templates.length ||
            resumeTemplates.find(t => t.selected)!.name !== templates.find(t => t.selected)!.name)){
            // console.log('store')
            dispatch(addResumeTemplates(templates));
        }

        if(resumeTemplates.length > 0 && resumeTemplates.length > templates.length){
            // console.log('restore')
            setTemplates(resumeTemplates)
        }

    }, [templates, resumeTemplates, dispatch]);



    return <Layout templates={templates} setTemplates={setTemplates} id={"resume"} />
};

export default Resume;