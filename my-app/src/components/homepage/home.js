import Navbar from "../Navbar/navbar";
import { Link } from "react-router-dom";
import React from "react";
import './home.css'

function Home() {
    return (
        <div className="home">
            <Navbar/>
            <div className="homeContent">
                <h2>Everything you need to navigate through Atlanta</h2>
                <div className="cards">
                    <Link to='/signup'><button className="button">Create An Account</button></Link>
                    <Link to='/planTrip'><button className="button">Plan A Trip</button></Link>
                    <Link to='/schedule'><button className="button">View Schedules</button></Link>
                </div>
            </div>
        </div>
    )
}
export default Home; 