import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/Navbar.jsx'
import './App.css'

import Home from "./pages/Home.jsx";
import Availability from "./pages/Availability.jsx";
import CreateSchedule from "./pages/CreateSchedule.jsx";
// import ViewSchedules from "./pages/ViewSchedules.jsx";


function App() {
  return (
    <div>
      <NavBar />
      <main className="app-content">
        <Routes>
          <Route path="" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/availability" element={<Availability />} />
          <Route path="/create_schedule" element={<CreateSchedule />} />
        </Routes>
      </main>

    </div>
  )
}

export default App
