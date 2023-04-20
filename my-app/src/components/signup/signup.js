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
  const [signupStatus, setSignupStatus] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3001/signup", {
      first_name: firstnameReg,
      last_name: lastnameReg,
      email: emailReg,
      phone: phoneReg,
      password: passwordReg
    }).then((response) => {
      if (response.data.message) {
        setSignupStatus(response.data.message);
      } else {
        setSignupStatus("Successfully registered!");
      }
    });
  };

  return (
    <>
      <Navbar/>
      <div className='signupBody'>
        <h1>Registration</h1>
        <div className='signup'>
          <form>
          <div className='labelInput'>
          <label>First Name</label>
          <input
            type='text'
            onChange={(e) => {
              setfirstnameeReg(e.target.value)
            }} />
            </div>
            <div className='labelInput'>
          <label>Last Name</label>
          <input type='text'
            onChange={(e) => {
              setlastnameeReg(e.target.value)
            }} />
            </div>
            <div className='labelInput'>
          <label>Email</label>
          <input type='text'
            onChange={(e) => {
              setemailReg(e.target.value)
            }} />

            </div>
            <div className='labelInput'>
          <label>Phone</label>
          <input type='text'
            onChange={(e) => {
              setphoneReg(e.target.value)
            }} /></div>
          <div className='labelInput'>
          <label>Password</label>
          <input type='password'
            onChange={(e) => {
              setPasswordReg(e.target.value)
            }} />
          </div>

          <button onClick={handleSubmit}>Register</button>
          </form>
        </div>
        <p>{signupStatus}</p>
      </div>
    </>
  );
}

export default Signup;
