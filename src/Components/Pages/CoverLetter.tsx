import {JSX, useState, useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux';
import { addCoverLetterTemplates } from "../../store/profile.ts";
import {RootState} from "../../store";
import Layout from "./Layout.tsx";
import {TemplateStateProps} from "../../utils.ts";
import data from "../../coverletter.json";
import './CoverLetter.css'

const CoverLetter:() => JSX.Element = () => {

    const [templates, setTemplates] = useState<TemplateStateProps[]>([{
        name:'Default',
        selected:true,
        data:data
    }])

    const dispatch = useDispatch();

    const { coverLetterTemplates  } = useSelector((state: RootState) => state.profile);

    useEffect(() => {

        if(templates.length > 0 && ( coverLetterTemplates.length < templates.length ||
            coverLetterTemplates.find(t => t.selected)!.name !== templates.find(t => t.selected)!.name)){
            // console.log('store')
            dispatch(addCoverLetterTemplates(templates));
        }

        if(coverLetterTemplates.length > 0 && coverLetterTemplates.length > templates.length){
            // console.log('restore')
            setTemplates(coverLetterTemplates)
        }

    }, [templates, coverLetterTemplates, dispatch]);

    return <Layout templates={templates} setTemplates={setTemplates}  id={"coverLetter"}/>
}

export default CoverLetter
