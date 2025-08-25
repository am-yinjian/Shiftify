import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/Navbar.jsx'
import './App.css'

import Home from "./pages/Home.jsx";
import Availability from "./pages/Availability.jsx";
// import ViewSchedules from "./pages/ViewSchedules.jsx";
// import CreateSchedule from "./pages/CreateSchedule.jsx";

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <NavBar />
      <main className="app-content">
        <Routes>
          <Route path="" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/availability" element={<Availability />} />
        </Routes>
      </main>

    </div>
  )
}

export default App
