import '../css/Availability.css';
import { useState } from "react";

function Availability() {
  const [selectedWeekStart, setSelectedWeekStart] = useState(null); // first day of chosen week
  const [name, setName] = useState('');
  const weekdays = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
  const [availability, setAvailability] = useState({});

  const handleWeekSelect = (date) => {
    // normalize to Monday of that week
    const chosen = new Date(date);
    const day = chosen.getDay(); // Sun=0
    const mondayOffset = (day === 0 ? -6 : 1 - day); 
    const monday = new Date(chosen);
    monday.setDate(chosen.getDate() + mondayOffset);

    setSelectedWeekStart(monday);

    // initialize availability for that week
    const newAvail = {};
    weekdays.forEach((dayName, i) => {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      newAvail[dayName] = {
        available: false,
        start: '',
        end: '',
        date: toLocalYMD(d)
      };
    });
    setAvailability(newAvail);
  };

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
      if (data.success) alert("Shifts saved successfully!");
      else alert(`Error: ${data.message}`);
    } catch (err) {
      console.error("Error submitting shifts:", err);
    }
  };

  return (
    <div className="availability-container">
      <h2>Weekly Availability</h2>

      {!selectedWeekStart && (
        <MonthCalendar onWeekSelect={handleWeekSelect} />
      )}

      {selectedWeekStart && (
        <form onSubmit={handleSubmit}>
          <div className="form-header">
            <button
              type="button"
              className="back-button"
              onClick={() => setSelectedWeekStart(null)}
            >
              ← Change Week
            </button>
          </div>

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
              <div className="day-header">
                <span className="date-pill">{formatDate(availability[day].date)}</span>
              </div>

              <div className="day-options">
                <label className="available-checkbox">
                  <input
                    type="checkbox"
                    checked={availability[day].available}
                    onChange={e => handleChange(day, 'available', e.target.checked)}
                  />
                  <span>Available</span>
                </label>
              </div>

              {availability[day].available && (
                <div className="time-fields">
                  <label>
                    Start:
                    <input
                      type="time"
                      value={availability[day].start}
                      onChange={e => handleChange(day, 'start', e.target.value)}
                      required
                    />
                  </label>
                  <label>
                    End:
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
      )}
    </div>
  );
}

/** Month Calendar Component **/
function MonthCalendar({ onWeekSelect }) {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const firstDay = new Date(currentYear, currentMonth, 1);
  const lastDay = new Date(currentYear, currentMonth + 1, 0);

  const days = [];
  for (let d = new Date(firstDay); d <= lastDay; d.setDate(d.getDate() + 1)) {
    days.push(new Date(d));
  }

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  return (
    <div className="month-calendar">
      <div className="calendar-header">
        <button onClick={handlePrevMonth}>&lt;</button>
        <h3>
          {new Date(currentYear, currentMonth).toLocaleDateString(undefined, {
            month: "long",
            year: "numeric"
          })}
        </h3>
        <button onClick={handleNextMonth}>&gt;</button>
      </div>
      <div className="calendar-grid">
        {days.map((d, i) => (
          <button
            key={i}
            className="calendar-day"
            onClick={() => onWeekSelect(d)}
          >
            {d.getDate()}
          </button>
        ))}
      </div>
      <p className="calendar-instructions">
        Select any day in the week you want to set availability for.
      </p>
    </div>
  );
}

/** Helpers **/

function toLocalYMD(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function parseLocalYMD(ymd) {
  const [y, m, d] = ymd.split('-').map(Number);
  return new Date(y, m - 1, d);
}

function formatDate(ymd) {
  const date = parseLocalYMD(ymd);
  return date.toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric"
  });
}

export default Availability;
