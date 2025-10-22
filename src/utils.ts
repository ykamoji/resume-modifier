export type ContactProps = {
    name:string,
    role?:string
    addr:string,
    mobile:string,
    email:string,
    shortAddr?:string,
    linkedIn?: string,
    website?: string,
}

export type ContentProps = {
    edits:{editorMode:boolean}[] ,
    editorClick: (index:number) => void,
    contents: string[],
    contentCommon:{
        type:string, addBtn:boolean, closeBtn:boolean,
        onContentAdd: (key: string | number) => void,
        onContentRemove: (key: string | number) => void,
        onContentChange: (update:{ [key: string]: string })=>void
    }
}

export type CoverLetterProps = {
    contact: ContactProps,
    content: string[],
}

export type CoverLetterContactProps = {
    edits:{editorMode:boolean}[] ,
    editorClick: (index:number) => void,
    contacts: {label: keyof ContactProps, value: ContactProps[keyof ContactProps]}[],
    contactCommon:{type:string, onContentChange: (update:{ [key: string | number]: string })=>void}
}


export type ResumeContactProps = {
    edits:{editorMode:boolean}[] ,
    editorClick: (index:number) => void,
    contacts:{label:keyof ContactProps, value:ContactProps[keyof ContactProps]}[],
    name:string,
    contactCommon:{type:string, onContentChange: (update:{ [key: string | number]: string })=>void}
}

export type EducationProp = {
    name:string,
    degree:string,
    gpa:string,
    city:string,
    date:string,
    courses:string
}

export type EducationListProps = {
    edits:{editorMode:boolean}[],
    editorClick: (index:number) => void,
    education:EducationProp[],
    educationCommon:{type:string, onContentChange: (update:{ [key: string | number]: string })=>void}
}

export type SummaryProp = {
    description:string
}

export type SummaryListProp = {
    edits:{editorMode:boolean}[],
    summaryCommon:{type:string, onContentChange: (update:{ [key: string | number]: string })=>void},
    editorClick: (index:number) => void,
    summary:SummaryProp[]
}

export type ExperienceProp = {
    company:string,
    job:string,
    project:string,
    city:string,
    date:string,
    responsibilities:string,
    achievements:string
}

export type ExperienceListProps = {
    edits:{editorMode:boolean}[],
    editorClick: (index:number) => void,
    experience:ExperienceProp[],
    experienceCommon:{type:string, onContentChange: (update:{ [key: string | number]: string })=>void}
}

export type ProjectProp = {
    name: string,
    advisors?: string,
    link: string,
    code: string,
    date: string,
    place: string,
    description: string
}

export type ProjectListProps = {
    edits:{editorMode:boolean}[],
    editorClick: (index:number) => void,
    projects:ProjectProp[],
    projectCommon:{type:string, onContentChange: (update:{ [key: string | number]: string })=>void},
    additionalCommon:{
        type:string, addBtn:boolean, closeBtn:boolean,
        onContentAdd: (key: string | number) => void,
        onContentRemove: (key: string | number) => void,
        onContentChange: (update:{ [key: string]: string })=>void
    }
}

export const avoid_targets = [
    'add_content',
    'remove_content'
]

export type SkillPropsSimple = {
    languages:string,
    databases:string,
    "mL Frameworks":string,
    "data Engineering & MLOps":string,
}

export type SkillsProps = SkillPropsSimple & {
    certificates:{name:string, link:string }[]
}

export type SkillListProps = {
    edits:{editorMode:boolean}[] ,
    editorClick: (index:number) => void,
    skills:{label:keyof SkillsProps, value:SkillsProps[keyof SkillsProps]}[],
    skillCommon:{type:string, onContentChange: (update:{ [key: string | number]: string })=>void}
}


export type RecognitionProp = {
    edits:{editorMode:boolean}[] ,
    editorClick: (index:number) => void,
    recognitions:{name:string, date:string}[]
    recognitionCommon:{type:string, onContentChange: (update:{ [key: string | number]: string })=>void},
    additionalCommon:{
        type:string, addBtn:boolean, closeBtn:boolean,
        onContentAdd: (key: string | number) => void,
        onContentRemove: (key: string | number) => void,
        onContentChange: (update:{ [key: string]: string })=>void
    }
}

export type ResumeProp = {
    contact:ContactProps,
    education:EducationProp[],
    summary:SummaryProp[],
    experience:ExperienceProp[],
    projects:ProjectProp[],
    skills:SkillsProps,
    recognitions:{name:string, date:string}[]
}

export type TemplateStateProps = {
    name:string,
    selected:boolean,
    data:ResumeProp | CoverLetterProps
}

export type TemplateProps = {
    id: "resume" | "coverLetter",
    toggleOrder:boolean,
    name:string,
    data: ResumeProp | CoverLetterProps
    updateTemplates: (name: string,
                      section: keyof ResumeProp | keyof CoverLetterProps,
                      data: ResumeProp[keyof ResumeProp] | CoverLetterProps[keyof CoverLetterProps]) => void
}


export type SectionProps = {
    id:"resume" | "coverLetter",
    section: keyof ResumeProp | keyof CoverLetterProps,
    data: ResumeProp[keyof ResumeProp] | CoverLetterProps[keyof CoverLetterProps]
    editMode:boolean,
    openEditMode:(section:keyof ResumeProp | keyof CoverLetterProps)=>void,
    updateSection?:(section:keyof ResumeProp | keyof CoverLetterProps,
                    data: ResumeProp[keyof ResumeProp] | CoverLetterProps[keyof CoverLetterProps]) => void,
}

export type ControlProps = {
    print:() => void
    id:"resume" | "coverLetter",
    toggleOrder: boolean,
    setToggleOrder:()=>void,
    templates: TemplateStateProps[],
    onTemplateSelection:  (name:string) => void,
    uploadTemplates: (files: TemplateStateProps[]) => void
    updateTemplateName: (oldName:string, newName:string) => void
}

export type LayoutProps = {
    templates: TemplateStateProps[],
    setTemplates: (value: (((prevState: TemplateStateProps[]) => TemplateStateProps[]) | TemplateStateProps[])) => void,
    id: "resume" | "coverLetter",

}

export type ProfileState = {
    resumeTemplates: TemplateStateProps[];
    coverLetterTemplates: TemplateStateProps[];
};


export const basic = ['mobile', 'email', 'shortAddr'] as const
export const links = ['linkedIn', 'website'] as const
export const resumeContact = [...basic, ...links] as const

export const coverLetterContact = ['addr', 'mobile', 'email', 'name', 'role'] as const

export const resume_sections: (keyof ResumeProp)[] = [
    "contact", "education", "summary" ,"experience", "projects", "skills", "recognitions"
];

export const coverLetter_sections: (keyof CoverLetterProps)[] = [
    "contact", "content"
];