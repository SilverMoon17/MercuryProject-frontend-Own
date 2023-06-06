import Container from 'react-bootstrap/Container';
import {Link} from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AuthButtons from './AuthButtons';


import logo from '../../resources/logo(white).svg';
import cart_icon from '../../resources/cart-fill.svg'
import './AppHeader.css';



function AppHeader()  {
    
    const [isLogged, setIsLogged] = useState(false);
    const authState = useSelector(state => state.isLogged)
    const role = localStorage.getItem("role") || sessionStorage.getItem("role")
    const dispatch = useDispatch();

    useEffect(() => {
        setIsLogged(authState)
    }, [authState])

    function logOut() {
        dispatch({type: "AuthState", payload: false})
        dispatch({type: "RoleState", payload: ""})
        dispatch({type: "IdState", payload: ""})
        if(localStorage.getItem("id") && localStorage.getItem("username") && localStorage.getItem("token"))
        {
            localStorage.removeItem("id")
            localStorage.removeItem("username")
            localStorage.removeItem("token")
        }
        if(sessionStorage.getItem("id") && sessionStorage.getItem("username") && sessionStorage.getItem("token"))
        {
            sessionStorage.removeItem("id")
            sessionStorage.removeItem("username")
            sessionStorage.removeItem("token")
        }
        window.location.replace("/");
    }

    const auth = localStorage.getItem("token") ||sessionStorage.getItem("token") ? 
                <div className="d-flex align-items-center">
                    <Link to="/cart"><img src={cart_icon} alt="cart_icon" /></Link>
                    <Link to={role === "Admin" || "Developer" ? '/adminPanel' : `/profile/${localStorage.getItem("id") || sessionStorage.getItem("id")}`} className="nav-link">{localStorage.getItem("username") || sessionStorage.getItem("username")}</Link>
                    <button onClick={() => {logOut()}} className="nav-link log-out">Log out</button>
                </div>
                :
                <AuthButtons/>
    

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
                    <Link to="/ideas/approved" className="nav-link">Ideas</Link>
                    <Link to="/store" className="nav-link">Store</Link>
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