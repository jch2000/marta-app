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
        await Axios.post("http://localhost:3001/schedule", {
            stationInput: stationInput,
            lineInput: lineInput,
            dirInput: dirInput,
            
        }).then((response)=> {
            console.log("got the response\n", response);
            const json = JSON.parse(JSON.stringify(response));
            let pos = json["data"]["pos"];
            let times = json["data"]["res"];
            let arr = [];
            table.innerHTML = "<h3 id='resultHeadText'></h3><table id='theTable'><tr><th id='stationName'></th></tr><tr id='times'></tr></table>";
            let headText = document.getElementById('resultHeadText');
            headText.innerText = `Here are the train times for ${stationInput} station on the ${dirInput.toUpperCase()} ${lineInput.charAt(0).toUpperCase() + lineInput.slice(1)} line:`;
            let tableStationName = document.getElementById('stationName');
            tableStationName.innerText = stationInput;
            let tableRow = document.getElementById('theTable');

            for (let i = 0; i < times.length; i++) {
                arr[i] = times[i][pos];
                let hours = parseInt(times[i][pos].slice(0,2));
                var suffix = hours >= 12 ? "PM":"AM";
                hours = ((hours + 11) % 12 + 1);
                tableRow.innerHTML += "<tr><td>"+ hours.toString() + times[i][pos].slice(2, -3) + " " + suffix + "</td></tr>";
            }

        });
    };


    const handleSubmitLine = async (e) => {
        e.preventDefault();
        let table = document.getElementById("stationReturn");
        table.innerHTML = "<div class='loader'></div>"
        await Axios.post("http://localhost:3001/schedule", {
            lineInput: lineInput,
            dirInput: dirInput,
            
        }).then((response)=> {
            console.log("got the response\n", response);

            const json = JSON.parse(JSON.stringify(response));
            let st = json["data"]["st"].split(",");
            let name = JSON.parse(JSON.stringify(json["data"]["q2"]));
            let times = JSON.parse(JSON.stringify(json["data"]["q1"]));
            let arr = [];

            table.innerHTML = "<h3 id='resultHeadText'></h3><table><tbody id='lineTable'></tbody></table>";

            let headText = document.getElementById('resultHeadText');
            headText.innerText = `Here are the train times for the ${dirInput.toUpperCase()} ${lineInput.charAt(0).toUpperCase() + lineInput.slice(1)} line:`;
            
            let tableRow = document.getElementById('lineTable');
            
            arr.push([]);
            for (let j = 0; j < st.length; j++) {
                let curr_station = name[0][st[j].trim()];
                arr[0].push("<th className='stationName'>" + curr_station + "</th>");    
            }

            for (let i = 0; i < times.length; i++) {
                arr.push([]);
                for (let k = 0; k < st.length; k++) {
                    let hours = parseInt(times[i][st[k].trim()].slice(0,2));
                    var suffix = hours >= 12 ? "PM":"AM";
                    hours = ((hours + 11) % 12 + 1);
                    arr[i+1].push("<td>"+ hours.toString() + times[i][st[k].trim()].slice(2, -3) + " " + suffix + "</td>");
                }
            }

            for (let l = 0; l < times.length; l++) {
                tableRow.innerHTML += "<tr>" + arr[l].toString().replaceAll(",", "") + "</tr>";
            }

            console.log(arr)

        });
    };
    return (
        <>
        
            <Navbar/>
            <div className='Schedule'>
                <div className='search'>
                    <div className="cards">
                        <button value="station" onClick={(e)=>{document.getElementById("lineSearch").style.display ="none";document.getElementById("stationSearch").style.display ="flex";document.getElementById("stationSearch").style.flexDirection ="column";}} className="button forSchedule">Schedule by Station</button>
                        <button value="line" onClick={(e)=>{document.getElementById("stationSearch").style.display ="none";document.getElementById("lineSearch").style.display ="flex";document.getElementById("lineSearch").style.flexDirection ="column";}} className="button forSchedule">Schedule by Line</button>
                    </div>
                    <div style={{display: "none"}} id='stationSearch'>
                        <h3>Schedule by Station</h3>
                        <div className="entry">

                            <label>Pick a station: </label>
                            <select id="stations" name="stations" onClick={(e)=>{
                                    setstationInput(e.target.value)}}>
                                <option hidden disabled selected value>select a station</option>
                                <option value="Airport">Airport</option>
                                <option value="Arts Center">Arts Center</option>
                                <option value="Ashby">Ashby</option>
                                <option value="Avondale">Avondale</option>
                                <option value="Bankhead">Bankhead</option>
                                <option value="Brookhaven">Brookhaven</option>
                                <option value="Buckhead">Buckhead</option>
                                <option value="Candler Park">Edgewood/Candler Park</option>
                                <option value="Chamblee">Chamblee</option>
                                <option value="Civic Center">Civic Center</option>
                                <option value="College Park">College Park</option>
                                <option value="Decatur">Decatur</option>
                                <option value="Doraville">Doraville</option>
                                <option value="Dunwoody">Dunwoody</option>
                                <option value="East Lake">East Lake</option>
                                <option value="East Point">East Point</option>
                                <option value="Five Points">Five Points</option>
                                <option value="GWCC/Mercedes-Benz Stadium">GWCC/CNN Center</option>
                                <option value="Garnett">Garnett</option>
                                <option value="Georgia State">Georgia State</option>
                                <option value="H.E. Holmes">H.E. Holmes</option>
                                <option value="Indian Creek">Indian Creek</option>
                                <option value="Inman Park/Reynoldstown">Inman Park/Reynoldstown</option>
                                <option value="Kensington">Kensington</option>
                                <option value="King Memorial">King Memorial</option>
                                <option value="Lakewood">Lakewood</option>
                                <option value="Lenox">Lenox</option>
                                <option value="Lindbergh Center">Lindbergh Center</option>
                                <option value="Medical Center">Medical Center</option>
                                <option value="Midtown">Midtown</option>
                                <option value="North Avenue">North Avenue</option>
                                <option value="North Springs">North Springs</option>
                                <option value="Oakland City">Oakland City</option>
                                <option value="Peachtree Center">Peachtree Center</option>
                                <option value="Sandy Springs">Sandy Springs</option>
                                <option value="Vine City">Vine City</option>
                                <option value="West End">West End</option>
                                <option value="West Lake">West Lake</option>
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
                        </div>
                    </div>
                    
                    <div style={{display: "none"}} id='lineSearch'>
                        <h3>Schedule by Line</h3>
                        <div className="entry">

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
                            <button className="submit" type="submit" onClick={handleSubmitLine}>Search</button>
                        </div>
                    </div>
                    
                    <div id="stationReturn" className='returnSchedule'>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Schedule