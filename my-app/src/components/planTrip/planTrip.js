import './planTrip.css'
import Navbar from '../Navbar/navbar';
import { createFilterOptions } from '@mui/material';

function FindNearestStation() {
    const successCallback = (position) => {
        let user_lat = position.coords.latitude;
        let user_lng = position.coords.longitude;

        /* need to insert lng & lat into Station

        result = db.query(SELECT Name, MAX((3959 * acos(cos(radians(user_lat)) * cos(radians(lat)) * cos( radians(lng) - radians(user_lng)) + sin(radians(37)) * sin( radians(lat))))) AS distance 
        FROM Station;)
        */
    };
    const errorCallback = (error) => {
        console.log(error);
    };
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
}

function PlanTrip() {
    return (
        <div className="planTrip">
            <Navbar/>
            <h1>Plan a Trip</h1>
            <FindNearestStation/>

            <form>
                <label for="startStation">Start Station</label>
                <select name="startStation" id="startStation">
                    <option value="a">a</option>
                    <option value="b">b</option>
                </select>
                <label for="endStation">End Station</label>
                <select name="endStation" id="endStation">
                    <option value="a">a</option>
                    <option value="b">b</option>
                </select>
                <input type="submit" value="Submit"></input>
            </form>
        </div>
    )
}
export default PlanTrip; 
