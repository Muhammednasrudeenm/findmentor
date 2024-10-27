import React, { useState, useEffect } from 'react';
import axios from '../../api/gig';

function MentorDashboard() {
  const [gigs, setGigs] = useState([]);

  useEffect(() => {
    fetchGigs();
  }, []);

  const fetchGigs = async () => {
    try {
      const res = await axios.get('/gigs');
      setGigs(res.data);
    } catch (err) {
      console.error("Error fetching gigs:", err);
      alert("Failed to load gigs");
    }
  };

  const sendRequest = async (gigId) => {
    const mentorId = localStorage.getItem('userId');
    const mentorName = localStorage.getItem('userName'); // Assuming mentor's name is stored in local storage

    try {
      await axios.put(`/gigs/${gigId}/SendRequest`, { mentorId, mentorName });
      alert('Request sent!');
    } catch (err) {
      console.error("Error sending request:", err);
      alert("Failed to send request");
    }
  };

  return (
    <div className="mentor-dashboard">
      <style>{`
        .mentor-dashboard {
          max-width: 1200px;
          margin: 0 auto;
          padding: 40px 20px;
          background-color: #f9fafb;
          font-family: Arial, sans-serif;
        }

        .dashboard-title {
          font-size: 2rem;
          text-align: center;
          color: #333;
          margin-bottom: 20px;
          font-weight: bold;
        }

        .gig-card-container {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
          justify-content: center;
        }

        .gig-card {
          background-color: #ffffff;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          padding: 20px;
          width: 300px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .gig-card-header h3 {
          font-size: 1.5rem;
          color: #007bff;
          margin: 0;
        }

        .gig-card-body p {
          font-size: 0.9rem;
          color: #555;
          line-height: 1.5;
        }

        .send-request-btn {
          margin-top: 10px;
          padding: 12px;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 5px;
          font-size: 1rem;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .send-request-btn:hover {
          background-color: #0056b3;
        }

        .no-gigs-message {
          text-align: center;
          font-size: 1.2rem;
          color: #666;
        }
      `}</style>

      <h2 className="dashboard-title">Mentor Dashboard</h2>
      {gigs.length > 0 ? (
        <div className="gig-card-container">
          {gigs.map((gig) => (
            <div key={gig._id} className="gig-card">
              <div className="gig-card-header">
                <h3>{gig.title}</h3>
              </div>
              <div className="gig-card-body">
                <p><strong>Description:</strong> {gig.description}</p>
                <p><strong>Qualification:</strong> {gig.qualification}</p>
                <p><strong>Available Time:</strong> {gig.availableTime}</p>
                <p><strong>Preferred Subjects:</strong> {gig.preferredSubjects}</p>
              </div>
              <button className="send-request-btn" onClick={() => sendRequest(gig._id)}>
                Send Request
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-gigs-message">No gigs available</p>
      )}
    </div>
  );
}

export default MentorDashboard;
