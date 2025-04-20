import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from "react-router-dom";


const Header = () => {

    return(
        <>
            <Navbar bg="dark" data-bs-theme="dark" className={"sticky-top"}>
                <Container>
                    <Navbar.Brand as={NavLink} to='/'>Resume Modifier</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link as={NavLink} to='/home'>Home</Nav.Link>
                        <Nav.Link as={NavLink} to='/resume'>Resume</Nav.Link>
                        <Nav.Link as={NavLink} to='/coverLetter'>CV</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </>
    )
}

export default Header