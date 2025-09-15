import '../css/Availability.css'; 
import { useState } from "react";

function Availability() {
  const weekdays = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];

  // initialize availability with pre-calculated dates
  const [availability, setAvailability] = useState(
    weekdays.reduce((acc, day) => {
      acc[day] = {
        available: false, 
        start: '', 
        end: '', 
        date: getNextDateOfWeek(day).toISOString().split("T")[0] // store as YYYY-MM-DD
      };
      return acc;
    }, {})
  );

  const [name, setName] = useState('');

  const handleChange = (day, field, value) => {
    setAvailability(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [field]: value
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // filter only available days
    const selectedShifts = Object.entries(availability)
      .filter(([_, info]) => info.available)
      .map(([day, info]) => ({
        startTime: new Date(`${info.date}T${info.start}`),
        endTime: new Date(`${info.date}T${info.end}`),
        notes: `${day} shift`
      }));

    const payload = {
      worker: name,
      shifts: selectedShifts
    };

    try {
      const res = await fetch("/api/shifts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (data.success) {
        alert("Shifts saved successfully!");
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (err) {
      console.error("Error submitting shifts:", err);
    }
  };

  return (
    <div className="availability-container">
      <h2>Weekly Availability</h2>
      <form onSubmit={handleSubmit}>
        <div className="name-field">
          <label>
            Name:{" "}
            <input 
              type="text" 
              value={name} 
              onChange={e => setName(e.target.value)} 
              required 
            />
          </label>
        </div>

        <br />

        {Object.keys(availability).map(day => (
          <div className="availability-day" key={day}>
            <label>
              <input
                type="checkbox"
                checked={availability[day].available}
                onChange={e => handleChange(day, 'available', e.target.checked)}
              />
              {day} <span className="date-pill">{formatDate(availability[day].date)}</span>
            </label>

            {availability[day].available && (
              <div className="time-fields">
                <label>
                  Start Time:
                  <input
                    type="time"
                    value={availability[day].start}
                    onChange={e => handleChange(day, 'start', e.target.value)}
                    required
                  />
                </label>
                <label>
                  End Time:
                  <input
                    type="time"
                    value={availability[day].end}
                    onChange={e => handleChange(day, 'end', e.target.value)}
                    required
                  />
                </label>
              </div>
            )}
          </div>
        ))}

        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

// helper outside the component
function getNextDateOfWeek(dayOfWeek) {
  const today = new Date();
  const todayDay = today.getDay(); // Sunday=0
  const targetDay = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'].indexOf(dayOfWeek);

  let diff = (targetDay - todayDay + 7) % 7;
  if (diff === 0) diff = 7; // ensure future, not today

  const nextDate = new Date(today);
  nextDate.setDate(today.getDate() + diff);
  return nextDate;
}

// format date for display
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, {
    weekday: "short", // Mon
    month: "short",   // Sep
    day: "numeric"    // 15
  });
}

export default Availability;
