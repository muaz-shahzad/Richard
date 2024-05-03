import React from 'react';
import NavBar from './navbar'; // Ensure the file name matches exactly, including case
import './App.css';
import {
  BrowserRouter,
  Routes, // Just Use Routes instead of "Switch"
  Route,
  Navigate,
  Outlet

} from "react-router-dom";
import Expenses from './Expenses';
import Goal from './Goal';
import Investment from './Investment';
import Home from './Home';
import Assistant from './Assistant';

function App() {
  return (
    <div className="App d-flex flex-column min-vh-100">
      <NavBar /> {/* NavBar component */}
      {/* Routing */}
      <Routes>
        <Route path="/" exact element={<Home/>} />
        <Route path="/expenses" exact element={<Expenses/>} />
        <Route path="/goals" exact element={<Goal/>} />
        <Route path="/investments" exact element={<Investment/>} />
        <Route path="/assistant" exact element={<Assistant/>} />
        


      </Routes>

     
    </div>
  )
}

export default App;
