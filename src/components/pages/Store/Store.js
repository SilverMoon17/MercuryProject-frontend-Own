import Merch from "./MerchContainer/merch";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";

function Store() {
    const role = localStorage.getItem("role") || sessionStorage.getItem("role");
    const [scrollPosition, setScrollPosition] = useState(0);
    const [isDisabled, setDisabled] = useState("hidden");
    const handleScroll = () => {
        const position = window.pageYOffset;      
        if(position > 500 && position < 1300 && role === "Admin") {
            setDisabled("visible")
        } else {
            setDisabled("hidden")
        }
        setScrollPosition(position);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    return (
        <>
            <Link to='/productCreating' className={isDisabled}><Button variant="custom-button button-absolute" size="lg" style={{color: "#fff"}}>Create new product</Button></Link>
            <Merch />
        </>
    )
}

export default Store;