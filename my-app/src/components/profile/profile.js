import './profile.css'
import Axios from 'axios'
import React from 'react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Navbar from '../Navbar/navbar';

function Profile() {

  const [userList, setuserList] = useState([]);

  const getUser = () => {
    Axios.get("http://localhost:3001/profile").then((response) => {
      console.log(response.data); // log the response data to the console
      setuserList([response.data]);
    });
  };

  return (
    <>
      <Navbar />
      <div className='profile'>
        <div className='user-profile'>
          <h1>Profile</h1>
          <button onClick={getUser}>Show User</button>
          {userList.map((val, key) => {
            return <div className='user' key={key}>
              <h3>First Name: {val.first_name}</h3>
              <h3>Last Name: {val.last_name}</h3>
              <h3>Email: {val.email}</h3>
              <h3>Phone: {val.phone}</h3>
              <h3>Password :{val.userpassword}</h3>
            </div>
          })}
        </div>
        <NavLink to="/editProfile">
          Edit Profile
        </NavLink>
      </div>
    </>
  );
}

export default Profile;
