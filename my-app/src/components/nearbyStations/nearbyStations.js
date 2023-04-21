import './nearbyStations.css'
import Navbar from '../Navbar/navbar';
import { useState } from 'react';
import Axios from 'axios';

function FindNearestStation() {
    const successCallback = (position) => {
        let lat = position.coords.latitude;
        let lng = position.coords.longitude;

        const handleSubmit = async () => {
            await Axios.post("/nearestStation", {
                lat: lat,
                lng: lng,
            }).then ((response)=> {
                const ele = document.getElementById('nearest');
                ele.innerText = `Your nearest MARTA station is ${response.data[0].station_name} which is ${parseFloat(response.data[0].distance).toFixed(2)} miles away!`;
            });
        }
        handleSubmit();
    }

    const errorCallback = (error) => {
        console.log(error);
    }

    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
}

function NearbyStations() {
    const [miles, setMilesInput] = useState("");
    const [lat, setLatInput] = useState("");
    const [lng, setLngInput] = useState("");
    console.log(parseFloat(miles), parseFloat(lat), parseFloat(lng));

    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            alert("Geolocation not provided.");
        }
    }

    function showPosition(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        setLatInput(latitude);
        setLngInput(longitude);
        document.getElementById("lat").value = latitude;
        document.getElementById("lng").value = longitude;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await Axios.post("/nearbyStationCount", {
            miles: miles,
            lat: lat,
            lng: lng,
        }).then((response)=> {
            const ele = document.getElementById('nearbyCount');
            ele.innerText = `There are ${response.data[0].count} MARTA stations within ${miles} miles of ${lat}, ${lng}`;
        });
    }

    return (
        <div id="nearbyStations">
            <Navbar/>
            <FindNearestStation/>
            <h1>Nearby Stations</h1>
            <div id='nearest'></div>
            <form>  
            <button id='coordsButton' onClick={getLocation}>Get Location</button>              
                <label htmlFor="lat">Latitude</label>
                <input id='lat' type="text" required onChange={(e) => { 
                    setLatInput(e.target.value);
                }}/>
                <label htmlFor="lng">Longitude</label>
                <input id='lng' type="text" required onChange={(e) => { 
                    setLngInput(e.target.value);
                }}/>
                <label htmlFor="miles">Miles</label>
                <input id='miles' type="text" required onChange={(e) => { 
                    setMilesInput(e.target.value);
                }}/>
                <br></br>
                <button className="submit" type="submit" onClick={handleSubmit}>Search</button>
            </form>
            <div id='nearbyCount'></div>
        </div>
    );
}

export default NearbyStations;