import './breezecard.css';
import React, { useState } from 'react';
import Axios from 'axios';
import Navbar from '../Navbar/navbar';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';

function BreezeCard() {
    const [cardNumber, setCardNumber] = useState('');
    const [tripCount, setTripCount] = useState('');
    const [balance, setBalance] = useState('');

    const handleCheckBalance = async (event) => {

        event.preventDefault();
        console.log('handleCheckBalance called');
        console.log('cardNumber:', cardNumber);

        await Axios.get('/breezecard/checkbalance', { params: { cardNumber: cardNumber } }).then((response) => {
            console.log('response:', response);
            if (!response.data.message) {
            setBalance(`Current balance on card ${cardNumber} is $${response.data.balance}`);
            } else {
            setBalance(response.data.message);
            }
        });
    };
    const handlePurchase = async (event) => {
        event.preventDefault();
        console.log('handlePurchase called');
        console.log('cardNumber:', cardNumber);
        console.log('tripCount:', tripCount);
        const userEmail = localStorage.getItem('email');

        if (!userEmail) {
            console.log('userEmail not found');
            return;
        }
        await Axios.post('/breezecard/purchase', {
            cardNumber: cardNumber,
            tripCount: tripCount,
            userEmail: userEmail
        }).then((response) => {
            console.log('response:', response);
            if (!response.data.message) {
                setBalance(`Purchased ${tripCount} trips on card ${cardNumber}. New balance is ${response.data.balance}`);
            } else {
                setBalance(response.data.message);
            }
        });
    };
    
    const handleTripCountChange = (event) => {
        setTripCount(event.target.value);
    };

    return (
        <>
        <Navbar />
        <div className="BreezeCard">
            <div className="breezecard-form-container">
                <h1>Breeze Card</h1>
                <form>
                    <label htmlFor="cardNumber">Card Number</label>
                    <input
                    value={cardNumber}
                    type="text"
                    id="cardNumber"
                    name="cardNumber"
                    placeholder="Enter Breeze Card Number"
                    onChange={(e) => {
                    setCardNumber(e.target.value);
                    }}
                    />

                    <label htmlFor="tripCount">Number of Trips to Purchase</label>
                    <select name="tripCount" id="tripCount" value={tripCount} onChange={handleTripCountChange}>
                    <option value="">Choose an amount</option>
                    <option value="1">1 trip</option>
                    <option value="5">5 trips</option>
                    <option value="10">10 trips</option>
                    <option value="20">20 trips</option>
                    </select>

                    <button type="submit" onClick={handleCheckBalance}>Check Balance</button>

                    <button type="submit" onClick={handlePurchase}>Purchase</button>
                </form>
                <h2>{balance}</h2>
            </div>
        </div>
        </>
    );
}
export default BreezeCard