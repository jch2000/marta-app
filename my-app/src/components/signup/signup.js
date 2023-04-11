import './signup.css'
import Axios from 'axios'
import React from 'react';
import { useState} from 'react';
import Navbar from '../Navbar/navbar';

function Signup() {
    const [firstnameReg, setfirstnameeReg] = useState("");
    const [lastnameReg, setlastnameeReg] = useState("");
    const [emailReg, setemailReg] = useState("");
    const [phoneReg, setphoneReg] = useState("");
    const [passwordReg, setPasswordReg] = useState("");
    

    const handleSubmit = (e) => {
        e.preventDefault();
        Axios.post("http://localhost:3001/signup", {
            first_name: firstnameReg,
            last_name: lastnameReg,
            email: emailReg,
            phone: phoneReg,
            password:passwordReg
        }).then((response)=> {
            console.log(response);
        });
    };
    
    return (
        <>
            <Navbar/>
            <div className='Signup'>
                <div className='"registration"'>
                    <h1>Registration</h1>
                    <label>First Name</label>
                    <input 
                        type='text'
                        onChange={(e)=> {
                            setfirstnameeReg(e.target.value)}}/><br/>
                    <label>Last Name</label>
                    <input type='text'
                            onChange={(e)=> {
                                setlastnameeReg(e.target.value)}}/><br/>
                    <label>Email</label>
                    <input type='text'
                            onChange={(e)=>{
                                setemailReg(e.target.value)}}/><br/>
                    <label>Phone</label>
                    <input type='text'
                            onChange={(e)=>{
                                setphoneReg(e.target.value)}}/><br/>
                    <label>Password</label>
                    <input type='text'
                            onChange={(e)=>{
                                setPasswordReg(e.target.value)}}/><br/>
                    <button onClick={handleSubmit}>Register</button>
                </div>
            </div>
        </>
    );
}

export default Signup