import "react-calendar/dist/Calendar.css";
import "../css/Availability.css";
import { useState } from "react";
import Calendar from "react-calendar";

function Availability() {
  const [value, setValue] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null); // store clicked date

  const handleDateClick = (date) => {
    console.log("Date clicked:", date);
    setSelectedDate(date); // we will use this to show the form later
  };
  if (!selectedDate) {
    return (
      <div className="calendar">
        <Calendar
          onChange={setValue}
          value={value}
          onClickDay={handleDateClick}
        />
      </div>
    );
  }

  return (
    <div className="calendar">
      <h2>Availability for {selectedDate.toDateString()}</h2>

      <form className="availability-form">

        {[
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ].map((day) => (
          <label key={day} className="day-row">
            <input type="checkbox" />
            {day}
          </label>
        ))}

        <button type="submit">Save Availability</button>
      </form>
    </div>
  );
}

export default Availability;
