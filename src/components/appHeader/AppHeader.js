import Container from 'react-bootstrap/Container';
import {Link} from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import AuthButtons from './AuthButtons';


import logo from '../../resources/logo(white).svg';
import './AppHeader.css';

function AppHeader()  {

    const auth = (localStorage.getItem("token") && localStorage.getItem("username")) || 
                (sessionStorage.getItem("token") && sessionStorage.getItem("username")) ? 
                <Link to="/" className="nav-link">{localStorage.getItem("username") || sessionStorage.getItem("username")}</Link>
                :
                <AuthButtons />
    

    return (
        <Navbar expand="lg" className="navbar__menu" fixed='top'>
            <Container>
                <Link to="/" className="logo"><img src={logo} width="180" height="32" 
                className="d-flex align-center" alt="Mercury Project logo"/> 
                THE MERCURY PROJECT
                </Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Link to="/projects" className="nav-link">Projects</Link>
                    <Link to="/ideas" className="nav-link">Ideas</Link>
                    <Link to="/store" className="nav-link">Store</Link>
                    {/* <Link to="/pageCreating" className="nav-link">PageCreating</Link>
                    <Link to="/Panel" className="nav-link">Panel</Link> */}
                </Nav>
                <Nav className="mr-auto">
                    {auth}
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default AppHeader;