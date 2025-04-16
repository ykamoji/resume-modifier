import Container from 'react-bootstrap/Container';
import { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Contact from "../Contact/Contact.tsx";
import Label from "../Label/Label.tsx";
import Content from "../Content/Content.tsx";
import CVEditor from "../CoverLetter/CVEditor.tsx";
import paragraphs from "../../../public/paragraphs.json"

type ContactType = {
    addr: string;
    mobile: string;
    email: string;
};

const CoverLetter = () => {

    const [content, setContent] = useState(paragraphs);
    const [role, setRole] = useState("Software developer")
    const [contact, ] = useState<ContactType>( {
        addr : "119 Brittany Manor Dr, Apt H, Amherst, Massachusetts, United States, 01002",
        mobile : "(413) 406-4727",
        email: "yashkamoji@yahoo.com"
    })

    const label = {
        name:"Yash Kamoji",
        role:role
    }

    const updateContent = (index: number, newValue: string) => {
        const updated = [...content];
        updated[index] = newValue;
        setContent(updated);
    };

    const removeContent = (index: number) => {
        setContent(content.filter((_, i) => i !== index));
    };

    const addContent = () => {
        const updated = [...content];
        updated.push("")
        setContent(updated)
    }

    return (
        <>
            <Row className={"justify-content-center mt-4 "}>
                <Col lg={{span: 5}}>
                    <CVEditor content={content}
                              role={role}
                              onRoleUpdate={setRole}
                              onContentAdd={addContent}
                              onContentChange={updateContent}
                              onContentRemove={removeContent}>

                    </CVEditor>
                </Col>
                <Col id={"coverLetter"} className={"shadow-sm bg-white pe-sm-5 p-3"}
                     lg={{span: 6}}>
                    <div id={"hline"} className={"float-end me-5"}></div>
                    <Container id={"header"} className={"mb-5 ps-lg-5 pe-lg-5 ps-sm-5 pe-sm-5"}>
                        <Contact {...contact} />
                        <Label {...label} />
                    </Container>
                    <Content paragraphs={content} />
                </Col>
            </Row>
        </>
    )
}

export default CoverLetter
