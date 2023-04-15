import { Link } from "react-router-dom";
import './navbar.css'

const Navbar = () => {
    return(
        <ul className="navbar">
            <li>
                <Link to='/Home'>Home</Link>
            </li>
            <li>
                <Link to='/Login'>Login</Link>
            </li>
            <li>
                <Link to='/Signup'>Signup</Link>
            </li>
            <li>
                <Link to='/Test'>Test</Link>
            </li>
        </ul>
    )
}

export default Navbar; 