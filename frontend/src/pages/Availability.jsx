import '../css/Availability.css'; 
import { useState } from "react";

function Availability() {
  const [name, setName] = useState('');
  const [availability, setAvailability] = useState({
    Monday: { available: false, start: '', end: '' },
    Tuesday: { available: false, start: '', end: '' },
    Wednesday: { available: false, start: '', end: '' },
    Thursday: { available: false, start: '', end: '' },
    Friday: { available: false, start: '', end: '' },
  });

  const handleChange = (day, field, value) => {
    setAvailability(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [field]: field === 'available' ? value : value
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can send 'name' and 'availability' to your backend here
    alert(`Name: ${name}\nAvailability: ${JSON.stringify(availability, null, 2)}`);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Name: <input 
            type="text" 
            value={name} 
            onChange={e => setName(e.target.value)} 
            required 
          />
        </label>
        <br /><br />
        {Object.keys(availability).map(day => (
          <div key={day}>
            <label>
              <input
                type="checkbox"
                checked={availability[day].available}
                onChange={e => handleChange(day, 'available', e.target.checked)}
              />
              {day}
            </label>
            {availability[day].available && (
              <>
                &nbsp;Start Time: 
                <input
                  type="time"
                  value={availability[day].start}
                  onChange={e => handleChange(day, 'start', e.target.value)}
                  required
                />
                &nbsp;End Time: 
                <input
                  type="time"
                  value={availability[day].end}
                  onChange={e => handleChange(day, 'end', e.target.value)}
                  required
                />
              </>
            )}
            <br />
          </div>
        ))}
        <br />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default Availability;