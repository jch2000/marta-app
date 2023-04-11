import './login.css'
import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import Navbar from '../Navbar/navbar';

function Login() {
    const [email, setemail] = useState(""); 
    const [password, setPassword] = useState("");

    const [LoginStatus, setLoginStatus] = useState("");
    
    const handleSubmit = () => {
        Axios.post("http://localhost:3001/login", {
            email: email, 
            password: password,
        }).then ((response)=> {
            if(!response.data.message){
                setLoginStatus(response.data.message);
            }else{
                setLoginStatus(response.data[0].message);
            }
        });
    };

    useEffect(()=> {
        Axios.get("http://localhost:3001/login").then((response)=>{
            if(response.data.loggedIn ===true){
                setLoginStatus(response.data.user[0].email)
            }
        });
    });


    return (
        <>
            <Navbar/>
            <div className='Login'>
                <div className="auth-form-container">
                    <h1>Login</h1>
                    <form>
                        <label htmlFor='email'>Email Address</label>
                        <input
                            value={email}
                            type="text"
                            id="email"
                            name='email'
                            placeholder="youremail@gmail.com"
                            onChange={(e) => {
                                setemail(e.target.value);
                            } } />
                        <label htmlFor='password'>Password</label>
                        <input
                            type="password"
                            placeholder="********"
                            id='password'
                            name='password'
                            onChange={(e) => {
                                setPassword(e.target.value);
                            } } />
                        <button type="submit" onClick={handleSubmit}>Login</button>
                    </form>

                    <p>
                        No Account yet? {' '}
                        <NavLink to ="/Signup">
                        Sign up
                        </NavLink>
                    </p>
                </div>
                <h2>{LoginStatus}</h2>
            </div>
        </>
    );
}

export default Login