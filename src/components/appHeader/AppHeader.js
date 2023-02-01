import { Component } from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import logo from '../../resources/logo(white).svg';
import './AppHeader.css';

class AppHeader extends Component {
    render() {
        return (
            <Navbar expand="lg" className="navbar__menu">
                <Container>
                    <Navbar.Brand href="#home"><img src={logo} width="180" height="32" 
                    className="d-flex align-center logo" alt="Mercury Project logo"/>
                    </Navbar.Brand>
                    <Navbar.Brand href="#home" className="white__text d-flex align-center">THE MERCURY PROJECT</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="#home" className="white__text">Projects</Nav.Link>
                        <Nav.Link href="#link" className="white__text">Ideas</Nav.Link>
                        <Nav.Link href="#link" className="white__text">Store</Nav.Link>
                    </Nav>
                    <Nav className="mr-auto">
                        <Nav.Link className="white__text">Log in</Nav.Link>
                        <Nav.Link className="white__text">Sign up</Nav.Link>
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        )
    }
}

export default AppHeader;