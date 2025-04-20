import Form from "react-bootstrap/Form";
import Button from "../Button/Button.tsx";
import {JSX} from "react";
import {ControlProps, ResumeStateProps} from "../../utils.ts";
import {Dropdown, SplitButton} from "react-bootstrap";
import './Controls.css'


const Controls:(props:ControlProps) => JSX.Element = props => {

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;

        const fileArray = Array.from(files);
        const results: ResumeStateProps[] = [];

        fileArray.forEach((file, _) => {
            const reader = new FileReader();
            reader.onload = (event) => {
                try {
                    const content = event.target?.result as string;
                    const parsed = JSON.parse(content);
                    results.push({ name: file.name,  data: parsed, selected: false });

                    if (results.length === fileArray.length) {
                        props.uploadTemplates(results);
                    }
                } catch {
                    console.error(`Failed to parse ${file.name}`);
                }
            };

            reader.readAsText(file);
        });
    };

    return (
        <>
            <Form.Group className={"input-group-sm"} controlId={"formFileMultiple"}>
                <Form.Control type={"file"} className={"rounded-0"} onChange={handleFileUpload} multiple/>
            </Form.Group>
            {props.templates &&
                <SplitButton
                    id={'templateSelection'}
                    variant={'primary'}
                    className={"btn-group-sm mt-3"}
                    title={props.templates.find(t => t.selected)!.name.replace(".json","")}
                >
                    <Dropdown.Item className={'small'} onClick={() => props.onTemplateSelection(props.templates[0].name)}>
                        {props.templates[0].name}
                    </Dropdown.Item>
                    <Dropdown.Divider/>
                    {props.templates.slice(1).map(({name}, index) =>
                            <Dropdown.Item key={index} className={'small'}
                                           onClick={() => props.onTemplateSelection(name)}>
                                {name.replace(".json","")}</Dropdown.Item>
                    )}
                </SplitButton>
            }
            <Button variant={"outline-success"} type={"button"}
                    className={"float-end rounded-0 me-5 mt-5"}
                    onClick={props.print}>
                Print
            </Button>
            <Button variant={"outline-primary"} type={"button"}
                    className={"float-end rounded-0 me-1 mt-5"}
                    onClick={()=>{}}>
                Save
            </Button>
        </>
    )
}

export default Controls