import '../css/Home.css'; 

import { useState } from "react";
import { Link } from 'react-router-dom';



function Home() {
  return (
    <div className='home-container'> 
      <h1>Welcome to Shiftify</h1>
      <p>Your go-to app for managing employee shifts and availability.</p>

      <h1>Who are we?</h1>
      <p> Shiftify is an attempt to solve a shift scheduling website. Here we want employees to upload their availability to the submit avialability tab.
        After that is done, they should also be able to view their schedule in the view schedule tab. 
        The create schedule tab is for the manager to create a schedule based on the availability of the employees. Eventually we want to power this with a llm api.
        We would like to include a notes tab so we can prompt this llm and get a schedule based on the prefrences of the employees.
        We will compare multiple llms to evalaute which one is most cost effecttive and provides best outputs.
      </p>
      <div className='button-group'>
        <Link to="/availability" className="home-button">Set Availability</Link>
        <Link to="/create-schedule" className="home-button">Create Schedule</Link>
        <Link to="/view-schedule" className="home-button">View Schedule</Link>
      </div>
    </div>

  );
}

export default Home;