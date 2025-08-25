import '../css/navBar.css'; 
import { Link } from 'react-router-dom';

function NavBar() {
  return (
      <nav className="navBar">

        <Link to="/home" className="homeBtn">Home</Link>
        <Link to="/view_schedules" className="viewButton">View Schedules</Link>
        <Link to="/availability" className="submit_availbility_btn">Submit Availability</Link>
        <Link to="/create_schedule" className="createScheduleBtn">Create Schedule</Link>
      </nav>
  );
}

export default NavBar;