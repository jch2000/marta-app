import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Signup from './components/signup/signup';
import Login from './components/login/login'
import Home from './components/homepage/home';
import planTrip from './components/planTrip/planTrip'

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path='/' element ={<Home />}/>
      <Route path='/Home' element ={<Home />}/>
      <Route path='/Signup' element ={<Signup />}/>
      <Route path='/Login' element ={<Login />}/>
      <Route path='/planTrip' element ={<planTrip />}/>
    </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
