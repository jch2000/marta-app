import Navbar from "../Navbar/navbar";
import { Link } from "react-router-dom";
import React from "react";
import './home.css'

function Home() {
    return (
        <div className="home">
            <Navbar/>
            <div class="homeContent">
                <h2>Everything you need to navigate through Atlanta</h2>
                <div class="cards">
                    <Link to='/signup'><button class="button">Create An Account</button></Link>
                    <Link to='/planTrip'><button class="button">Plan A Trip</button></Link>
                </div>
            </div>
        </div>
    )
}
export default Home; 