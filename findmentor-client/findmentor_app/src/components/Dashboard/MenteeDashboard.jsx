import React, { useState, useEffect } from 'react';
import axios from '../../api/gig';

function MenteeDashboard() {
  const [gigs, setGigs] = useState([]);
  const [gig, setGig] = useState({
    title: '',
    description: '',
    qualification: '',
    availableTime: '',
    modeOfCommunication: '',
    mentorshipDuration: '',
  });

  useEffect(() => {
    fetchGigs();
  }, []);

  const fetchGigs = async () => {
    const res = await axios.get('http://localhost:5000/api/gigs/gigs');
    setGigs(res.data);
  };

  const handleChange = (e) => {
    setGig({ ...gig, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/gigs/gigs', gig);
      alert('Gig created successfully');
      fetchGigs(); // Refresh the gig list after creating a new one
      setGig({
        title: '',
        description: '',
        qualification: '',
        availableTime: '',
        modeOfCommunication: '',
        mentorshipDuration: '',
      });
    } catch (error) {
      alert('Error creating gig: ' + error.message);
      console.log(gig);
    }
  };

  return (
    <div className="dashboard">
      <style>{`
        .dashboard {
          max-width: 900px;
          margin: 0 auto;
          padding: 30px;
          background-color: #f5f8fa;
          border-radius: 12px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
          font-family: Arial, sans-serif;
        }
        
        h2 {
          font-size: 2rem;
          color: #333;
          text-align: center;
          margin-bottom: 20px;
        }

        form {
          display: flex;
          flex-direction: column;
          gap: 15px;
          background-color: #ffffff;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          margin-bottom: 30px;
        }

        input, textarea, select {
          padding: 12px;
          border: 1px solid #ddd;
          border-radius: 6px;
          font-size: 1rem;
          transition: border-color 0.3s;
        }

        input:focus, textarea:focus, select:focus {
          border-color: #007bff;
        }

        button {
          padding: 12px;
          background-color: #007bff;
          color: #ffffff;
          font-weight: bold;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        button:hover {
          background-color: #0056b3;
        }

        .gig-list {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 20px;
        }

        .gig-card {
          background-color: #ffffff;
          border-radius: 10px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .gig-title {
          font-size: 1.2rem;
          font-weight: bold;
          color: #007bff;
        }

        .gig-details p {
          margin: 0;
          font-size: 0.9rem;
          color: #555;
        }

        .gig-details p span {
          font-weight: bold;
        }

        .no-gigs {
          text-align: center;
          font-size: 1.1rem;
          color: #888;
        }
      `}</style>

      <h2>Mentee Dashboard</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Gig Title"
          value={gig.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Gig Description"
          value={gig.description}
          onChange={handleChange}
          required
        ></textarea>
        <input
          type="text"
          name="qualification"
          placeholder="Your Qualification"
          value={gig.qualification}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="availableTime"
          placeholder="Time Available for Mentorship (e.g., Weekdays 6-8 PM)"
          value={gig.availableTime}
          onChange={handleChange}
          required
        />
        <select name="modeOfCommunication" value={gig.modeOfCommunication} onChange={handleChange} required>
          <option value="">Preferred Mode of Communication</option>
          <option value="video call">Video Call</option>
          <option value="phone call">Phone Call</option>
          <option value="text chat">Text Chat</option>
        </select>
        <input
          type="text"
          name="mentorshipDuration"
          placeholder="Expected Duration of Mentorship (e.g., 1 month)"
          value={gig.mentorshipDuration}
          onChange={handleChange}
          required
        />
        <button type="submit">Create Gig</button>
      </form>

      <h3>Your Gigs</h3>
      {gigs.length > 0 ? (
        <div className="gig-list">
          {gigs.map((gig) => (
            <div key={gig._id} className="gig-card">
              <span className="gig-title">{gig.title}</span>
              <div className="gig-details">
                <p><span>Description:</span> {gig.description}</p>
                <p><span>Qualification:</span> {gig.qualification}</p>
                <p><span>Available Time:</span> {gig.availableTime}</p>
                <p><span>Communication Mode:</span> {gig.modeOfCommunication}</p>
                <p><span>Mentorship Duration:</span> {gig.mentorshipDuration}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-gigs">No gigs available</p>
      )}
    </div>
  );
}

export default MenteeDashboard;
