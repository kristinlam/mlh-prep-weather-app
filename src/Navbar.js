import React from 'react';
import App from './App';
import './Navbar.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import FlightAPI from './FlightAPI';
import logo from './mlh-prep.png';

function Navbar() {
  return (
    <Router>
      <div>
        <nav>
          <div>
            <Link to="/">
              <img className="logo" src={logo} alt="MLH Prep Logo" />
            </Link>
          </div>
          <div className="nav__right">
            <Link to="/day-planner">Day Planner</Link>
            <Link to="/trip-planner">Trip Planner</Link>
            <Link to="/climate-change">Climate Change</Link>
          </div>
        </nav>
        <Routes>
          <Route exact path="/" element={<App />} />
          <Route path="/climate-change" element={<App />} />
          <Route path="/trip-planner" element={<FlightAPI />} />
          <Route path="/about-us" element={<App />} />
        </Routes>
      </div>
    </Router>
  );
}

export default Navbar;
