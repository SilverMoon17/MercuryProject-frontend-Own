import {Link} from 'react-router-dom';

export default function AuthButtons() {
    return(
        <div className="d-flex">
            <Link to="/login" className="nav-link">Log in</Link>
            <Link to="/register" className="nav-link">Sign up</Link>
        </div> 
    )
}