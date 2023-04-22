import './planTrip.css'
import Navbar from '../Navbar/navbar';
import { useState} from 'react';
import Axios from 'axios';

function routeInfo(response, start, destination) {
    let lineIds = [];
    let stationIndices = [];
    let stationNames = [];
    const tupleLen = (Object.values(response.data[0])).length;

    for (let i = 0; i < response.data.length; i++) {
        let data = Object.values(response.data[i])
        let indices = [];
        let names = [];
        let startSeen = false;

        for (let j = 1; j < tupleLen; j++) {
            let currStation = data[j];

            if (currStation === start) {
                startSeen = true;
            }

            if (startSeen == true) {
                indices.push(''.concat('st_', j));
                names.push(currStation);
            }

            if (currStation === destination) {
                if (startSeen == false)
                    break;
                else {
                    stationIndices.push(indices);
                    stationNames = names;
                    lineIds.push(data[0]);
                    break;
                }
            }
        }
    }
    return {lineIds, stationIndices, stationNames};
}

async function fastestRoute(rInfo, start, destination, time) {
    let index = 0;
    let fastestRoutes = [];
    const handleSubmit = async () => {
        const response = await Axios.post("/fastestRoute", {
            rInfo: rInfo,
            start: start,
            destination: destination,
            time: time,
            index: index,
        });
        fastestRoutes.push(response.data[0]);
    }

    if (rInfo.lineIds.length == 1) {
        await handleSubmit();
        return fastestRoutes[0];
    } else if (rInfo.lineIds.length == 2) {
        await handleSubmit();
        index = 1;
        await handleSubmit();
        console.log(fastestRoutes);

        let route1 = fastestRoutes[0];
        let route2 = fastestRoutes[1];
        let route1Keys = Object.keys(route1);
        let route2Keys = Object.keys(route2);

        if (route1[route1Keys[3]] < route2[route2Keys[3]])
            return route1;
        return route2;
    }
}


function PlanTrip() {
    const [start, setStartInput] = useState("");
    const [destination, setDestinationInput] = useState("");
    const [time, setTimeInput] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        await Axios.post("/possibleRoutes", {
            start: start,
            destination: destination,
            time: time,
        }).then((response)=> {
            let rInfo = routeInfo(response, start, destination);
            console.log(rInfo);

            fastestRoute(rInfo, start, destination, time).then((fastest) => {
                let fastestKeys = Object.keys(fastest);
                
                const ele = document.getElementById('route');
                let p = document.createElement('p');
                ele.appendChild(p);
                ele.innerText = `Get on ${fastest[fastestKeys[1]]} train heading ${fastest[fastestKeys[2]]}`;

                let ul = document.createElement('ul');
                for(let i = 3; i < fastest.length; i++) {
                    let li = document.createElement('li');
                    li.appendChild(document.createTextNode(fastest[fastestKeys[i]]));
                    ul.appendChild(li);
                }
                ele.appendChild(ul);
            });
        });
    }

    return (
        <div className='planTrip' id="planTrip">
            <Navbar/>
            <div className='planTripBody'>
                <h1>Plan a Trip</h1>
                <form>
                    <div className='labelInput'> 
                    <label for="startStation">Start Station</label>

                    <select id="stations" name="stations" required onClick={(e) => {
                                    setStartInput(e.target.value)}}>
                        <option value="Airport">Airport</option>
                        <option value="Arts Center">Arts Center</option>
                        <option value="Ashby">Ashby</option>
                        <option value="Avondale">Avondale</option>
                        <option value="Bankhead">Bankhead</option>
                        <option value="Brookhaven">Brookhaven</option>
                        <option value="Buckhead">Buckhead</option>
                        <option value="Candler Park">Candler Park</option>
                        <option value="Chamblee">Chamblee</option>
                        <option value="Civic Center">Civic Center</option>
                        <option value="College Park">College Park</option>
                        <option value="Decatur">Decatur</option>
                        <option value="Doraville">Doraville</option>
                        <option value="Dunwoody">Dunwoody</option>
                        <option value="East Lake">East Lake</option>
                        <option value="East Point">East Point</option>
                        <option value="Five Points">Five Points</option>
                        <option value="Garnett">Garnett</option>
                        <option value="Georgia State">Georgia State</option>
                        <option value="GWCC/Mercedes-Benz Stadium">GWCC/Mercedes-Benz Stadium</option>
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
                    </div>
                    <div className='labelInput'>
                    <label for="endStation">End Station</label>
                    <select id="stations" name="stations" required onClick={(e) => {
                                    setDestinationInput(e.target.value)}}>
                        <option value="Airport">Airport</option>
                        <option value="Arts Center">Arts Center</option>
                        <option value="Ashby">Ashby</option>
                        <option value="Avondale">Avondale</option>
                        <option value="Bankhead">Bankhead</option>
                        <option value="Brookhaven">Brookhaven</option>
                        <option value="Buckhead">Buckhead</option>
                        <option value="Candler Park">Candler Park</option>
                        <option value="Chamblee">Chamblee</option>
                        <option value="Civic Center">Civic Center</option>
                        <option value="College Park">College Park</option>
                        <option value="Decatur">Decatur</option>
                        <option value="Doraville">Doraville</option>
                        <option value="Dunwoody">Dunwoody</option>
                        <option value="East Lake">East Lake</option>
                        <option value="East Point">East Point</option>
                        <option value="Five Points">Five Points</option>
                        <option value="Garnett">Garnett</option>
                        <option value="Georgia State">Georgia State</option>
                        <option value="GWCC/Mercedes-Benz Stadium">GWCC/Mercedes-Benz Stadium</option>
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
                    </div>
                    
                    <div className='labelInput'>
                    <label for="time">Time (hh:mm:ss)</label>
                    <input id='time' type="text" required onChange={(e) => { 
                        setTimeInput(e.target.value);}}/> 
                    </div>
                    
                    <button className="submit" type="submit" onClick={handleSubmit}>Search</button>
                </form>
                <div id='route'></div>

            </div>
            
        </div>
    );
}

export default PlanTrip; 
