import '../css/Home.css'; 
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

function Home() {
  const [stats, setStats] = useState({
    totalSchedules: 0,
    totalShifts: 0,
    activeEmployees: 0,
    upcomingShifts: 0
  });

  useEffect(() => {
    // Fetch dashboard stats
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch('http://localhost:5002/api/schedules');
      const data = await response.json();
      
      if (data.success) {
        const schedules = data.data || [];
        const totalShifts = schedules.reduce((acc, schedule) => acc + (schedule.shifts?.length || 0), 0);
        const activeEmployees = new Set();
        schedules.forEach(schedule => {
          schedule.shifts?.forEach(shift => {
            shift.worker?.forEach(worker => activeEmployees.add(worker._id));
          });
        });

        setStats({
          totalSchedules: schedules.length,
          totalShifts: totalShifts,
          activeEmployees: activeEmployees.size,
          upcomingShifts: totalShifts // Simplified for demo
        });
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
      // Set demo stats
      setStats({
        totalSchedules: 2,
        totalShifts: 5,
        activeEmployees: 3,
        upcomingShifts: 8
      });
    }
  };

  return (
    <div className='home-container'>
      {/* Dashboard Header */}
      <section className="dashboard-header">
        <div className="header-content">
          <h1 className="dashboard-title">Dashboard</h1>
          <p className="dashboard-subtitle">Welcome back! Here's what's happening with your schedules.</p>
        </div>
        <div className="current-time">
          <div className="time-display">
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </div>
          <div className="time-clock">
            {new Date().toLocaleTimeString('en-US', { 
              hour: '2-digit', 
              minute: '2-digit',
              hour12: true 
            })}
          </div>
        </div>
      </section>

      {/* Dashboard Stats */}
      <section className="stats-section">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">📅</div>
            <div className="stat-content">
              <h3>{stats.totalSchedules}</h3>
              <p>Active Schedules</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">⏰</div>
            <div className="stat-content">
              <h3>{stats.totalShifts}</h3>
              <p>Total Shifts</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">👥</div>
            <div className="stat-content">
              <h3>{stats.activeEmployees}</h3>
              <p>Active Employees</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🔔</div>
            <div className="stat-content">
              <h3>{stats.upcomingShifts}</h3>
              <p>Upcoming Shifts</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="actions-section">
        <h2 className="section-title">Quick Actions</h2>
        <div className="actions-grid">
          <Link to="/availability" className="action-card availability-card">
            <div className="action-icon">📝</div>
            <h3>Submit Availability</h3>
            <p>Update your available working hours</p>
            <div className="action-arrow">→</div>
          </Link>
          
          <Link to="/create_schedule" className="action-card create-card">
            <div className="action-icon">⚡</div>
            <h3>Create Schedule</h3>
            <p>Generate new schedules for your team</p>
            <div className="action-arrow">→</div>
          </Link>
          
          <Link to="/view_schedules" className="action-card view-card">
            <div className="action-icon">👀</div>
            <h3>View Schedules</h3>
            <p>Check current and upcoming schedules</p>
            <div className="action-arrow">→</div>
          </Link>
        </div>
      </section>

      {/* Recent Activity */}
      <section className="activity-section">
        <h2 className="section-title">Recent Activity</h2>
        <div className="activity-list">
          <div className="activity-item">
            <div className="activity-icon">📅</div>
            <div className="activity-content">
              <h4>New Schedule Created</h4>
              <p>Weekly schedule for January 15-21, 2024</p>
              <span className="activity-time">2 hours ago</span>
            </div>
          </div>
          <div className="activity-item">
            <div className="activity-icon">👤</div>
            <div className="activity-content">
              <h4>Employee Availability Updated</h4>
              <p>John Doe updated their availability</p>
              <span className="activity-time">4 hours ago</span>
            </div>
          </div>
          <div className="activity-item">
            <div className="activity-icon">⏰</div>
            <div className="activity-content">
              <h4>Shift Assignment</h4>
              <p>Morning shift assigned to Jane Smith</p>
              <span className="activity-time">1 day ago</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;