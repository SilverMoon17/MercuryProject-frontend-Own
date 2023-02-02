import Container from 'react-bootstrap/Container';
import {Link} from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import logo from '../../resources/logo(white).svg';
import './AppHeader.css';

function AppHeader()  {
    return (
        <Navbar expand="lg" className="navbar__menu">
            <Container>
                <Link to="/" className="logo"><img src={logo} width="180" height="32" 
                className="d-flex align-center" alt="Mercury Project logo"/> 
                THE MERCURY PROJECT
                </Link>
                {/* <Navbar.Brand className="white__text d-flex align-center">THE MERCURY PROJECT</Navbar.Brand> */}
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Link to="/projects" className="nav-link">Projects</Link>
                    <Link to="/ideas" className="nav-link">Ideas</Link>
                    <Link to="/store" className="nav-link">Store</Link>
                </Nav>
                <Nav className="mr-auto">
                    <Link to="/projects" className="nav-link">Log in</Link>
                    <Link to="/projects" className="nav-link">Sign up</Link>
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default AppHeader;