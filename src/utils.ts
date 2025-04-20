export type ContactProps = {
    name:string,
    role:string
    addr:string,
    mobile:string,
    email:string,
    shortAddr?:string,
    linkedIn?: string,
    website?: string,
}

export type ContentProps = {
    content:string[],
}

export type HeaderProps = {
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
    aws:string,
    framework:string,
    others:string,
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
    experience:ExperienceProp[],
    projects:ProjectProp[],
    skills:SkillsProps,
    recognitions:{name:string, date:string}[]
}

export type ResumeStateProps = {
    name:string,
    selected:boolean,
    data:ResumeProp
}

export type TemplateProps = {
    name:string,
    data:ResumeProp,
    updateTemplates: (name: string, section: keyof ResumeProp, data: ResumeProp[keyof ResumeProp]) => void
}


export type SectionProps = {
    section: keyof ResumeProp,
    data: ResumeProp[keyof ResumeProp]
    editMode:boolean,
    openEditMode:(section:keyof ResumeProp)=>void,
    updateSection?:(section:keyof ResumeProp, data: ResumeProp[keyof ResumeProp]) => void,
}

export type ControlProps = {
    print:() => void
    templates: ResumeStateProps[],
    onTemplateSelection:  (name:string) => void,
    uploadTemplates: (files: ResumeStateProps[]) => void
}

export const basic = ['mobile', 'email', 'shortAddr'] as const
export const links = ['linkedIn', 'website'] as const
export const contact = [...basic, ...links] as const

export const resume_sections: (keyof ResumeProp)[] = [
    "contact", "education", "experience", "projects", "skills", "recognitions"
];