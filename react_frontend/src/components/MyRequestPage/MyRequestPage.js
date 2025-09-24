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
  const [selectedTasks, setSelectedTasks] = useState([]);

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
    // Implement search functionality
  };

  // Sample request data with updated status values
  const myRequests = [
    {
      id: 'TASK-8782',
      title: 'You can\'t compress the program without quantifying the open-source SSD pixel!',
      description: 'Need urgent help with system compression and pixel quantification.',
      location: 'Brooklyn, NY',
      startDate: 'Sep 18, 2025',
      endDate: '4:00 PM',
      status: 'pending'
    },
    {
      id: 'TASK-7878',
      title: 'Try to calculate the EXE feed, maybe it will index the multi-byte pixel!',
      description: 'Looking for technical assistance with EXE feed calculation.',
      location: 'Queens, NY',
      startDate: 'Sep 20, 2025',
      endDate: '12:00 PM',
      status: 'approved'
    },
    {
      id: 'TASK-7839',
      title: 'We need to bypass the neural TCP card!',
      description: 'Urgent neural network bypass assistance required.',
      location: 'Manhattan, NY',
      startDate: 'Sep 22, 2025',
      endDate: '10:00 AM',
      status: 'rejected'
    },
    {
      id: 'TASK-5562',
      title: 'The SAS interface is down, bypass the open-source pixel so we can back up the PNG bandwidth!',
      description: 'System interface repair and backup assistance needed.',
      location: 'Bronx, NY',
      startDate: 'Sep 25, 2025',
      endDate: '2:00 PM',
      status: 'pending'
    },
    {
      id: 'TASK-8686',
      title: 'I\'ll parse the wireless SSL protocol, that should drive the API panel!',
      description: 'Network protocol parsing and API configuration help.',
      location: 'Staten Island, NY',
      startDate: 'Sep 26, 2025',
      endDate: '3:30 PM',
      status: 'approved'
    },
    {
      id: 'TASK-1280',
      title: 'Use the digital TLS panel, then you can transmit the haptic system!',
      description: 'Digital panel configuration and haptic system transmission.',
      location: 'Long Island, NY',
      startDate: 'Sep 27, 2025',
      endDate: '11:00 AM',
      status: 'approved'
    },
    {
      id: 'TASK-7262',
      title: 'The UTF8 application is down, parse the neural bandwidth so we can back up the PNG firewall!',
      description: 'Application recovery and firewall backup assistance.',
      location: 'Brooklyn, NY',
      startDate: 'Sep 28, 2025',
      endDate: '1:00 PM',
      status: 'rejected'
    },
    {
      id: 'TASK-1138',
      title: 'Generating the driver won\'t do anything, we need to quantify the 1080p SMTP bandwidth!',
      description: 'Driver generation and SMTP bandwidth optimization.',
      location: 'Queens, NY',
      startDate: 'Sep 29, 2025',
      endDate: '4:15 PM',
      status: 'pending'
    },
    {
      id: 'TASK-7184',
      title: 'We need to program the back-end THX pixel!',
      description: 'Back-end programming and pixel manipulation assistance.',
      location: 'Manhattan, NY',
      startDate: 'Sep 30, 2025',
      endDate: '9:30 AM',
      status: 'approved'
    },
    {
      id: 'TASK-5160',
      title: 'Calculating the bus won\'t do anything, we need to navigate the back-end JSON protocol!',
      description: 'Bus calculation and JSON protocol navigation help.',
      location: 'Bronx, NY',
      startDate: 'Oct 1, 2025',
      endDate: '2:45 PM',
      status: 'pending'
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

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'approved': return '#10B981';
      case 'pending': return '#F59E0B';
      case 'rejected': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const handleTaskSelect = (taskId) => {
    setSelectedTasks(prev => 
      prev.includes(taskId) 
        ? prev.filter(id => id !== taskId)
        : [...prev, taskId]
    );
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedTasks(myRequests.map(req => req.id));
    } else {
      setSelectedTasks([]);
    }
  };

  // Filter requests based on search
  const filteredRequests = myRequests.filter(req => {
    const q = searchQuery.toLowerCase();
    return (
      req.title.toLowerCase().includes(q) ||
      req.description.toLowerCase().includes(q) ||
      req.location.toLowerCase().includes(q) ||
      req.id.toLowerCase().includes(q)
    );
  });

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
      <div className="main-content">
        <div className="content-header">
          <div className="header-left">
            <h1>My Requests</h1>
            <p className="subtitle">Helps to track the request you have sent.</p>
          </div>
          <div className="header-right">
            <div className="search-container">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="search-input"
              />
              <span className="search-icon">🔍</span>
            </div>
            <div className="user-profile" ref={profileRef}>
              <div className="profile-container" onClick={() => setShowProfileMenu(!showProfileMenu)}>
                <div className="user-avatar">
                  <img src="https://ui-avatars.com/api/?name=Sharon&background=6c5ce7&color=fff" alt="Sharon" />
                </div>
                <div className="user-info">
                  <div className="user-name">sharon</div>
                  <div className="user-email">req@example.com</div>
                </div>
                <svg className="dropdown-arrow" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <polyline points="6,9 12,15 18,9"></polyline>
                </svg>
              </div>
              {showProfileMenu && (
                <div className="profile-dropdown">
                  <ul>
                    <li><span>👤</span>My Profile</li>
                    <li><span>⚙️</span>Account Settings</li>
                    <li><span>❓</span>Help Center</li>
                    <li onClick={() => alert('Logging out...')}><span>🚪</span>Logout</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="requests-table">
          <div className="table-header">
            <div className="header-cell checkbox-cell">
              <input 
                type="checkbox" 
                onChange={handleSelectAll}
                checked={selectedTasks.length === myRequests.length}
              />
            </div>
            <div className="header-cell">Tasks</div>
            <div className="header-cell title-cell">Title</div>
            <div className="header-cell status-cell">Status</div>
          </div>

          <div className="table-body">
            {filteredRequests.length === 0 && (
              <div className="empty-state">
                <p>No requests found</p>
              </div>
            )}
            
            {filteredRequests.map((req) => (
              <div className="table-row" key={req.id}>
                <div className="cell checkbox-cell">
                  <input 
                    type="checkbox" 
                    checked={selectedTasks.includes(req.id)}
                    onChange={() => handleTaskSelect(req.id)}
                  />
                </div>
                <div className="cell task-id-cell">
                  <span className="task-id">{req.id}</span>
                </div>
                <div className="cell title-cell">
                  <div className="task-title">
                    {req.title}
                  </div>
                </div>
                <div className="cell status-cell">
                  <span 
                    className="status-badge" 
                    style={{ 
                      backgroundColor: getStatusColor(req.status),
                      color: 'white'
                    }}
                  >
                    ⚪ {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyRequestPage;