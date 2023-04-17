import './schedule.css'
import Axios from 'axios'
import React from 'react';
import { useState} from 'react';
import Navbar from '../Navbar/navbar';

function Schedule() {
    const [stationInput, setstationInput] = useState("");
    const [lineInput, setlineInput] = useState("");
    const [dirInput, setdirInput] = useState("");
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        await Axios.post("http://localhost:3001/schedule", {
            stationInput: stationInput,
            lineInput: lineInput,
            dirInput: dirInput,
            
        }).then((response)=> {
            console.log(response);
        });
    };

    return (
        <>
        
            <Navbar/>
            <div className='Schedule'>
                <div className='search'>
                    <h3>Schedule by Station</h3>
                    <div className="entry">
                        <label>Pick a station: </label>
                        <select id="stations" name="stations" onChange={(e)=>{
                                setstationInput(e.target.value)}}>
                            <option value="H.E. Holmes" defaultValue={"H.E. Holmes"}>H.E. Holmes</option>
                            <option value="West Lake">West Lake</option>
                            <option value="Ashby">Ashby</option>
                            <option value="Vine City">Vine City</option>
                        </select>
                        <span style={{marginRight: 1 + 'vw'}}></span>
                        <label>Pick a line: </label>
                        <select id="line" name="line" onChange={(e)=>{
                                setlineInput(e.target.value)}}>
                            <option value="blue" defaultValue={"blue"}>Blue Line</option>
                            <option value="green">Green Line</option>
                            <option value="red">Red Line</option>
                            <option value="gold">Gold Line</option>
                        </select>
                        <span style={{marginRight: 1 + 'vw'}}></span>
                        <label>Pick a direction: </label>
                        <select id="dir" name="dir" onChange={(e)=>{
                                setdirInput(e.target.value)}}>
                            <option value="e" defaultValue={"e"}>Eastbound</option>
                            <option value="w">Westbound</option>
                            <option value="n">Northbound</option>
                            <option value="s">Southbound</option>
                        </select>
                        <button className="submit" type="submit" onClick={handleSubmit}>Search</button>
                        {/* <button type="submit" className="submitForSearch"><i className="fa fa-search"></i></button> */}
                    </div>

                </div>
            </div>
        </>
    );
}

export default Schedule