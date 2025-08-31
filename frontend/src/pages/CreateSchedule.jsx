import '../css/Create.css'; 
import { useState } from "react";
import { Link } from 'react-router-dom';

function CreateSchedule() {
  const [scheduleData, setScheduleData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:5002/api/schedules');
      const json = await response.json();
      setScheduleData(json.data);
      console.log("Schedule data:", json.data);
    } catch (error) {
      console.error("Error fetching schedule data:", error);
    }
  };

  return (
    <div className='home-container'>
      <button onClick={fetchData}>Generate Schedule</button>

      {/* Show fetched data just for testing */}
      <pre>{JSON.stringify(scheduleData, null, 2)}</pre>
    </div>
  );
}

export default CreateSchedule;
