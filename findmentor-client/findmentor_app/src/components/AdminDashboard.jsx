import React, { useEffect, useState } from 'react';
import axios from '../api/auth';

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get('http://localhost:5000/api/auth/admin/users');
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users:", err);
      setError('Failed to fetch users. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const approveUser = async (userId) => {
    console.log("Approving user with ID:", userId); // Log the user ID
    try {
      const response = await axios.put(`http://localhost:5000/api/auth/admin/users/${userId}/approve`);
      // Update the users state to reflect the approval
      setUsers((prevUsers) => 
        prevUsers.map((user) => 
          user._id === userId ? { ...user, isVerified: true } : user
        )
      );
      console.log("User approved:", response.data.user); // Log the approved user data
    } catch (err) {
      console.error("Error approving user:", err);
      setError('Failed to approve user. Please try again later.');
    }
  };
  

  const rejectUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:5000/api/auth/admin/users/${userId}`);
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
      console.log("User rejected");
    } catch (err) {
      console.error("Error rejecting user:", err);
      setError('Failed to reject user. Please try again later.');
    }
  };

  const pendingUsers = users.filter(user => !user.isVerified);
  const approvedUsers = users.filter(user => user.isVerified);
  

  return (
    <div className="dashboard">
      <style>
        {`
          .dashboard {
            padding: 2rem;
            background-color: #f8f9fa;
            border-radius: 8px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          }

          h2 {
            text-align: center;
            color: #333;
          }

          h3 {
            color: #007bff;
            margin-top: 1.5rem;
          }

          .error {
            color: red;
            text-align: center;
          }

          ul {
            list-style-type: none;
            padding: 0;
          }

          li {
            background: white;
            margin: 0.5rem 0;
            padding: 1rem;
            border: 1px solid #ced4da;
            border-radius: 4px;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }

          button {
            padding: 0.5rem 1rem;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            transition: background-color 0.3s;
          }

          button:hover {
            background-color: #0056b3;
            color: white;
          }

          button:disabled {
            background-color: #ccc;
            cursor: not-allowed;
          }
        `}
      </style>
      <h2>Admin Dashboard</h2>
      {loading ? (
        <p>Loading users...</p>
      ) : (
        <>
          <h3>Pending User Approvals</h3>
          {error && <p className="error">{error}</p>}
          <ul>
            {pendingUsers.map((user) => (
              <li key={user._id}>
                {user.name} ({user.email}) - Role: {user.role}
                <div>
                  <button onClick={() => approveUser(user._id)}>Approve</button>
                  <button onClick={() => rejectUser(user._id)}>Reject</button>
                </div>
              </li>
            ))}
          </ul>

          <h3>Approved Users</h3>
          <ul>
            {approvedUsers.map((user) => (
              <li key={user._id}>
                {user.name} ({user.email}) - Role: {user.role}
              </li>
            ))}
          </ul>

          
        </>
      )}
    </div>
  );
}

export default AdminDashboard;
