import Form from "react-bootstrap/Form";
import Button from "../Button/Button.tsx";
import {JSX, useEffect, useRef, useState} from "react";
import {ControlProps, TemplateStateProps} from "../../utils.ts";
import {Dropdown, OverlayTrigger, SplitButton, Tooltip} from "react-bootstrap";
import './Controls.css'
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";


const Controls:(props:ControlProps) => JSX.Element = props => {

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;

        const fileArray = Array.from(files);
        const results: TemplateStateProps[] = [];

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

    const selectedFile = props.templates.find(t => t.selected)!

    const selectedFileName = selectedFile.name.replace(".json", "")

    const [rename, setRename] = useState(false)
    const [newName, setNewName] = useState(selectedFileName)

    const renameRef = useRef<HTMLInputElement>(null);

    useEffect(()=>{
        setNewName(selectedFileName)
    },[selectedFileName])

    const handleFileDownload = () => {
        const json = JSON.stringify(selectedFile.data, null, 2); // pretty print
        const blob = new Blob([json], { type: "application/json" });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = newName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }


    return (
        <>
            <Form.Group className={"input-group-sm"} controlId={"formFileMultiple"}>
                <Form.Control type={"file"}
                              className={"rounded-0"}
                              onChange={handleFileUpload} multiple/>
            </Form.Group>
            <SplitButton
                id={'templateSelection'}
                variant={'primary'}
                className={"btn-group-sm mt-3"}
                title={selectedFileName}>
                <Dropdown.Item className={'small'}
                               onClick={() => props.onTemplateSelection(props.templates[0].name)}>
                    {props.templates[0].name}
                </Dropdown.Item>
                <Dropdown.Divider/>
                {props.templates.slice(1).map(({name}, index) =>
                    <Dropdown.Item key={index} className={'small'}
                                   onClick={() => props.onTemplateSelection(name)}
                                   active={selectedFile.name === name}>
                        {name.replace(".json", "")}</Dropdown.Item>
                )}
            </SplitButton>
            <Container className={"mt-5"}>
                <Row>
                    <Col sm={{span: 6}}>
                        <Form.Control type="text"
                                      className={"rounded-0"}
                                      size={"sm"}
                                      ref={renameRef}
                                      value={newName}
                                      onChange={(e)=>setNewName(e.currentTarget.value)}
                                      hidden={!rename}/>
                        <Button variant={"outline-danger"} type={"button"}
                                className={"rounded-0 btn-sm mt-2"}
                                hidden={!rename}
                                disabled={renameRef.current?.value.length == 0 || newName === selectedFileName}
                                onClick={()=>props.updateTemplateName(selectedFile.name, renameRef.current!.value)}>
                            Change
                        </Button>
                    </Col>
                    <Col sm={{span: 1}}>
                        <OverlayTrigger overlay={<Tooltip>Rename</Tooltip>}>
                            <Form.Check
                                className={"mt-2"}
                                type={"switch"}
                                id={"custom-switch"}
                                label={""}
                                checked={rename}
                                onChange={() => setRename(prevState => !prevState)}
                            />
                        </OverlayTrigger>
                    </Col>
                    <Col sm={{span: 2}} className={"pe-1"}>
                        <Button variant={"outline-success"} type={"button"}
                                className={"rounded-0 btn-sm float-end"}
                                onClick={props.print}>
                            Print
                        </Button>
                    </Col>
                    <Col sm={{span: 3}} className={"ps-0 ms-0"}>
                        <Button variant={"outline-primary"} type={"button"}
                                className={"rounded-0 btn-sm"}
                                onClick={() => handleFileDownload()}>
                            Download
                        </Button>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Controls