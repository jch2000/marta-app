import './login.css';
import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Navbar from '../Navbar/navbar';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Login() {
  const [email, setemail] = useState(''); 
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [LoginStatus, setLoginStatus] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setemail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLoginClick = () => {
    setIsLoading(true);
    Axios.post("http://localhost:3001/login", {
      email: email,
      password: password,
    }).then((response) => {
      if (response.data.message) {
        setLoginStatus(response.data.message);
        setIsLoading(false);
      } else {
        localStorage.setItem('email', response.data.email);
        localStorage.setItem('id', response.data.customer_id);
        navigate('/profile');
      }
    });
  };



  return (
    <>
      <Navbar />
      <div className="Login">
        <div className="auth-form-container">
          <h1>Login</h1>
          <form>
            <label htmlFor="email">Email Address</label>
            <input
              value={email}
              type="text"
              id="email"
              name="email"
              placeholder="youremail@gmail.com"
              onChange={handleEmailChange}
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="********"
              id="password"
              name="password"
              onChange={handlePasswordChange}
            />
            <button onClick={handleLoginClick}><Link to='/home'></Link>Login</button>
          </form>

          <p>
            No Account yet?{' '}
            <NavLink to="/Signup">
              Sign up
            </NavLink>
          </p>
        </div>
        <h2>{LoginStatus}</h2>
      </div>
    </>
  );
}

export default Login;
