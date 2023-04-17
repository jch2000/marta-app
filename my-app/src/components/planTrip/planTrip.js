import './planTrip.css'
import Navbar from '../Navbar/navbar';
import Axios from 'axios';

function FindNearestStation() {    
        const successCallback = (position) => {
        let userLat = position.coords.latitude;
        let userLng = position.coords.longitude;

        const handleSubmit = async () => {
            await Axios.post("/nearestStation", {
                userLat: userLat, 
                userLng: userLng,
            }).then ((response)=> {
                if (response) {
                    const ele = document.getElementById('nearestStation');
                    ele.textContent = `Your nearest MARTA station is ${response.data[0].station_name} and is ${parseFloat(response.data[0].distance).toFixed(2)} miles away!`;
                }
            });
        }
        handleSubmit();
    }
    const errorCallback = (error) => {
        console.log(error);
    }

    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
}

function PlanTrip() {
    return (
        <div className="planTrip">
            <Navbar/>
            <h1>Plan a Trip</h1>
            <FindNearestStation/>
            <div id='nearestStation'></div>
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
