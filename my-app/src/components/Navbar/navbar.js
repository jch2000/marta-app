import { Link } from "react-router-dom";
import './navbar.css'

const Navbar = () => {
    return(
        <div>
            <div id="topStrip"></div>

            <div class="navigation">

                <div class="pageTitle"><h1>MARTA+</h1></div>

                <ul>
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
                    <Link to='/planTrip'>Plan a Trip</Link>
                </li>
                </ul>
            </div>
        </div>
    )
}

export default Navbar; 