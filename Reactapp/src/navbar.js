// NavBar.js
import React from 'react';
import { Link } from 'react-router-dom'; // This assumes you are using react-router for navigation

const NavBar = () => {
  return (
  
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" style={{ color: "red", fontFamily: "sans-serif" }} to="/">TrapStar Financial</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <Link className="nav-link" style={{ color: "blue", fontFamily: "monospace" }} to="/">Home</Link>
              <Link className="nav-link" style={{ color: "blue", fontFamily: "monospace" }} to="/expenses">Expenses</Link>
              <Link className="nav-link" style={{ color: "blue", fontFamily: "monospace" }} to="/goals">Goals</Link>
              <Link className="nav-link" style={{ color: "blue", fontFamily: "monospace" }} to="/investments">Investments</Link>
              <Link className="nav-link" style={{ color: "blue", fontFamily: "monospace" }} to="/assistant">Assistant</Link>
             
              
            </div>

          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
