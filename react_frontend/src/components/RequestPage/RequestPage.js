import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function RequestPage() {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState('requests');
  const [searchQuery, setSearchQuery] = useState('');
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem('token');

  // Fetch requests from backend
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        setLoading(true);
        const res = await axios.get('http://localhost:5000/api/requests/requests', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRequests(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch requests. Please login again.');
        setLoading(false);
      }
    };
    fetchRequests();
  }, [token]);

  // Handle Accept/Decline
  const handleStatusChange = async (requestId, newStatus) => {
    try {
      await axios.post(
        'http://localhost:5000/api/accept', // or your update endpoint
        { requestId, status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // Update local state
      setRequests(prev =>
        prev.map(r => (r._id === requestId ? { ...r, status: newStatus } : r))
      );
    } catch (err) {
      console.error(err);
      alert('Failed to update status');
    }
  };

  // Filter requests based on search
  const filteredRequests = requests.filter(req => {
    const q = searchQuery.toLowerCase();
    return (
      req.task?.title?.toLowerCase().includes(q) ||
      req.task?.description?.toLowerCase().includes(q) ||
      req.task?.location?.toLowerCase().includes(q)
    );
  });

  if (loading) return <div>Loading requests...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="request-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="logo">Hire A Helper</div>
        <nav className="sidebar-nav">
          <ul>
            <li className={activeNav === 'feed' ? 'active' : ''} onClick={() => { setActiveNav('feed'); navigate('/feed'); }}>Feed</li>
            <li className={activeNav === 'myTasks' ? 'active' : ''} onClick={() => { setActiveNav('myTasks'); navigate('/my-tasks'); }}>My Tasks</li>
            <li className={activeNav === 'requests' ? 'active' : ''} onClick={() => { setActiveNav('requests'); navigate('/request'); }}>Requests</li>
            <li className={activeNav === 'myRequests' ? 'active' : ''} onClick={() => { setActiveNav('myRequests'); navigate('/my-request'); }}>My Requests</li>
            <li className={activeNav === 'addTask' ? 'active' : ''} onClick={() => { setActiveNav('addTask'); navigate('/add-task'); }}>Add Task</li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="main-content1">
        <div className="header">
          <h2>Incoming Requests</h2>
          <form onSubmit={e => e.preventDefault()}>
            <input
              type="text"
              placeholder="Search requests..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </form>
        </div>

        <div className="request-grid">
          {filteredRequests.length === 0 && <p>No requests found</p>}
          {filteredRequests.map(req => (
            <div className="request-card" key={req._id}>
              <h3>{req.task?.title}</h3>
              <p>{req.task?.description}</p>
              <p>Location: {req.task?.location}</p>
              <p>Status: {req.status}</p>

              {req.status === 'pending' && (
                <div className="actions">
                  <button onClick={() => handleStatusChange(req._id, 'accepted')} style={{ backgroundColor: 'green', color: 'white' }}>Accept</button>
                  <button onClick={() => handleStatusChange(req._id, 'declined')} style={{ backgroundColor: 'red', color: 'white' }}>Decline</button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RequestPage;
