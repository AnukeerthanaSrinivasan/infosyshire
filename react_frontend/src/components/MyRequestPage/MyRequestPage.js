// src/components/MyRequestPage/MyRequestPage.js

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './MyRequestPage.css';
import { Badge } from '../ui/button';
import '../ui/button.css';

const MyRequestPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [activeNav, setActiveNav] = useState('myRequests');
  const [searchQuery, setSearchQuery] = useState('');
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const navigate = useNavigate();
  const profileRef = useRef(null);

  // Close profile dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    alert(`Searching requests for: ${searchQuery}`);
  };

  // Sample request data
  const myRequests = [
    {
      id: 1,
      title: 'Need a plumber urgently',
      description: 'Looking for a plumber to fix a leaking kitchen sink today.',
      location: 'Brooklyn, NY',
      startDate: 'Sep 18, 2025',
      endDate: '4:00 PM',
      image: 'https://images.unsplash.com/photo-1560184897-ae75f4184934?auto=format&fit=crop&w=1470&q=80',
      status: 'Pending'
    },
    {
      id: 2,
      title: 'Grocery pickup',
      description: 'Need someone to pick up groceries from the store and deliver.',
      location: 'Queens, NY',
      startDate: 'Sep 20, 2025',
      endDate: '12:00 PM',
      image: 'https://images.unsplash.com/photo-1586201375754-45f6c9c182d0?auto=format&fit=crop&w=1470&q=80',
      status: 'Approved'
    }
  ];

  // Calendar state
  const [currentMonth, setCurrentMonth] = useState(selectedDate.getMonth());
  const [currentYear, setCurrentYear] = useState(selectedDate.getFullYear());

  const monthName = new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' });

  const generateCalendarDays = () => {
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();

    const days = [];

    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      days.push({ day: daysInPrevMonth - i, currentMonth: false, selected: false });
    }

    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        day: i,
        currentMonth: true,
        selected: i === selectedDate.getDate() &&
                  currentMonth === selectedDate.getMonth() &&
                  currentYear === selectedDate.getFullYear()
      });
    }

    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push({ day: i, currentMonth: false, selected: false });
    }

    return days;
  };

  const handlePrevMonth = () => {
    setCurrentMonth(prev => prev === 0 ? 11 : prev - 1);
    if (currentMonth === 0) setCurrentYear(y => y - 1);
  };

  const handleNextMonth = () => {
    setCurrentMonth(prev => prev === 11 ? 0 : prev + 1);
    if (currentMonth === 11) setCurrentYear(y => y + 1);
  };

  const handleDateSelect = (day, isCurrentMonth) => {
    if (isCurrentMonth) setSelectedDate(new Date(currentYear, currentMonth, day));
  };

  return (
    <div className="request-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="logo">Hire A Helper</div>
        <nav className="sidebar-nav">
          <ul>
            <li className={activeNav === 'feed' ? 'active' : ''} onClick={() => {setActiveNav('feed');navigate('/feed');}}>
              <span>Feed</span>
            </li>
            <li className={activeNav === 'myTasks' ? 'active' : ''} onClick={() => { setActiveNav('myTasks'); navigate('/my-tasks'); }}>
              <span>My Tasks</span>
            </li>
            <li className={activeNav === 'requests' ? 'active' : ''} onClick={() => {setActiveNav('requests'); navigate('/request'); }}><span>Requests</span></li>
            <li className={activeNav === 'myRequests' ? 'active' : ''} onClick={() => {setActiveNav('myRequests'); navigate('/my-request');}}><span>My Requests</span></li>
            <li className={activeNav === 'addTask' ? 'active' : ''} onClick={() => { setActiveNav('addTask'); navigate('/add-task'); }}>
              <span>Add Task</span>
            </li>
            <li className={activeNav === 'settings' ? 'active' : ''} onClick={() => setActiveNav('settings')}><span>Settings</span></li>
          </ul>
        </nav>

        {/* Calendar */}
        <div className="calendar-widget">
          <div className="calendar-header">
            <button className="prev-month" onClick={handlePrevMonth}>&lt;</button>
            <div className="current-month">{monthName} {currentYear}</div>
            <button className="next-month" onClick={handleNextMonth}>&gt;</button>
          </div>
          <div className="calendar-days">
            {['Su','Mo','Tu','We','Th','Fr','Sa'].map((d, i) => <div key={i} className="weekday">{d}</div>)}
            {generateCalendarDays().map((day, index) => (
              <div key={index} className={`day ${!day.currentMonth ? 'prev-month' : ''} ${day.selected ? 'selected' : ''}`} onClick={() => handleDateSelect(day.day, day.currentMonth)}>{day.day}</div>
            ))}
          </div>
        </div>
      </div>


      {/* Main Content */}
      <div className="main-content33">
        <div className="header33">
          <form className="search-bar33" onSubmit={handleSearchSubmit}>
            <button type="submit" className="search-icon22">🔍</button>
            <input
              type="text"
              placeholder="Search requests..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
          <div className="user-profile" ref={profileRef}>
            <div className="profile-container" onClick={() => setShowProfileMenu(!showProfileMenu)}>
              <div className="user-avatar">
                <img src="https://ui-avatars.com/api/?name=R&background=6c5ce7&color=fff" alt="User" />
              </div>
              <div className="user-info">
                <div className="user-name">requester</div>
                <div className="user-email">req@example.com</div>
              </div>
            </div>
            {showProfileMenu && (
              <div className="profile-dropdown">
                <ul>
                  <li>My Profile</li>
                  <li>Account Settings</li>
                  <li>Help Center</li>
                  <li onClick={() => alert('Logging out...')}>Logout</li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Add Request Button */}
        <div className="add-request-button-container">
          <button className="add-task-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M5 12h14"></path>
            </svg>
            Add New Request
          </button>
        </div>

        {/* Request Grid */}
        <div className="request-grid">
          {myRequests.map(req => (
            <div className="request-card" key={req.id}>
              <div className="request-image">
                <img src={req.image} alt={req.title} />
              </div>
              <h3 className="request-title">{req.title}</h3>
              <p className="request-description">{req.description}</p>
              <div className="request-details">
                <p className="request-location">📍 {req.location}</p>
                <p className="request-dates">📅 {req.startDate} • {req.endDate}</p>
              </div>
              <div className="request-status-container">
                <Badge variant={req.status.toLowerCase()}>{req.status}</Badge>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyRequestPage;
