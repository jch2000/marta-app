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
        let table = document.getElementById("stationReturn");
        table.innerHTML = "<div class='loader'></div>"
        // table.innerHTML = "<h3 id='resultHeadText'></h3><table id='theTable'><tr><th id='stationName'></th></tr><tr id='times'></tr></table>"
        await Axios.post("http://localhost:3001/schedule", {
            stationInput: stationInput,
            lineInput: lineInput,
            dirInput: dirInput,
            
        }).then((response)=> {
            console.log("got the response\n", response);
            const json = JSON.parse(JSON.stringify(response));
            // console.log(json)
            // console.log(json["data"])
            let pos = json["data"]["pos"];
            let times = json["data"]["res"];
            let arr = [];
            table.innerHTML = "<h3 id='resultHeadText'></h3><table id='theTable'><tr><th id='stationName'></th></tr><tr id='times'></tr></table>";
            let headText = document.getElementById('resultHeadText');
            headText.innerText = `Here are the train times for ${stationInput} station on the ${dirInput} ${lineInput} line:`;
            let tableStationName = document.getElementById('stationName');
            tableStationName.innerText = stationInput;
            let tableRow = document.getElementById('theTable');

            for (let i = 0; i < times.length; i++) {
                arr[i] = times[i][pos];
                let hours = parseInt(times[i][pos].slice(0,2));
                var suffix = hours >= 12 ? "PM":"AM";
                hours = ((hours + 11) % 12 + 1);
                tableRow.innerHTML += "<tr><td>"+ hours.toString() + times[i][pos].slice(2) + " " + suffix + "</td></tr>";
            }

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
                        <select id="stations" name="stations" onClick={(e)=>{
                                setstationInput(e.target.value)}}>
                            <option hidden disabled selected value>select a station</option>
                            <option value="H.E. Holmes">H.E. Holmes</option>
                            <option value="West Lake">West Lake</option>
                            <option value="Ashby">Ashby</option>
                            <option value="Vine City">Vine City</option>
                            <option value="GWCC/Mercedes-Benz Stadium">GWCC/CNN Center</option>
                            <option value="Five Points">Five Points</option>
                            <option value="Georgia State">Georgia State</option>
                            <option value="King Memorial">King Memorial</option>
                            <option value="Inman Park/Reynoldstown">Inman Park/Reynoldstown</option>
                            <option value="Candler Park">Edgewood/Candler Park</option>
                            <option value="East Lake">East Lake</option>
                            <option value="Decatur">Decatur</option>
                            <option value="Avondale">Avondale</option>
                            <option value="Kensington">Kensington</option>
                            <option value="Indian Creek">Indian Creek</option>
                        </select>

                        <span style={{marginRight: 1 + 'vw'}}></span>
                        <label>Pick a line: </label>
                        <select id="line" name="line" onClick={(e)=>{
                                setlineInput(e.target.value)}}>
                            <option hidden disabled selected value>select a line</option>
                            <option value="blue">Blue Line</option>
                            <option value="green">Green Line</option>
                            <option value="red">Red Line</option>
                            <option value="gold">Gold Line</option>
                        </select>

                        <span style={{marginRight: 1 + 'vw'}}></span>
                        <label>Pick a direction: </label>
                        <select id="dir" name="dir" onClick={(e)=>{
                                setdirInput(e.target.value)}}>
                            <option hidden disabled selected value>select a direction</option>
                            <option value="e">Eastbound</option>
                            <option value="w">Westbound</option>
                            <option value="n">Northbound</option>
                            <option value="s">Southbound</option>
                        </select>
                        <button className="submit" type="submit" onClick={handleSubmit}>Search</button>
                        {/* <button type="submit" className="submitForSearch"><i className="fa fa-search"></i></button> */}
                    </div>
                    
                    <div id="stationReturn" className='returnSchedule'>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Schedule