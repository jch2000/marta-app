import { Link } from "react-router-dom";
import './navbar.css'

const Navbar = () => {
    return(
        <div>
            <div id="topStrip"></div>

            <div className="navigation">

                <div className="pageTitle"><h1>MARTA+</h1></div>

                <ul>
                <li>
                    <Link to='/Home'>Home</Link>
                </li>
                <li>
                    <Link to='/Login'>Login</Link>
                </li>
                {/* maybe not needed since signup is linked on login */}
                {/* <li>
                    <Link to='/Signup'>Signup</Link>
                </li> */}
                <li>
                    <Link to='/planTrip'>Plan a Trip</Link>
                </li>
                <li>
                    <Link to='/schedule'>Schedule</Link>
                </li>
                <li>
                    <Link to ='/profile'>Profile</Link>
                </li>
                </ul>
            </div>
        </div>
    )
}

export default Navbar; 