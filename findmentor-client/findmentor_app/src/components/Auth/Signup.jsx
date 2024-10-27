import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/auth';

function Signup() {
  const [user, setUser] = useState({ name: '', email: '', password: '', role: 'mentee' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/signup', user);
      alert('Registration successful. Await admin approval.');
      navigate('/');
    } catch (err) {
      alert('Error: ' + err.response.data.message);
    }
  };

  return (
    <div className="auth-form-container">
      <style>
        {`
          .auth-form-container {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            background: linear-gradient(to right, #f8f9fa, #e9ecef);
          }

          .auth-form {
            background: white;
            padding: 2rem;
            border-radius: 8px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
            width: 300px;
            text-align: center;
          }

          .auth-form h2 {
            margin-bottom: 1.5rem;
            font-family: 'Arial', sans-serif;
            color: #333;
          }

          .input-field {
            width: 100%;
            padding: 0.75rem;
            margin: 0.5rem 0;
            border: 1px solid #ced4da;
            border-radius: 4px;
            font-size: 1rem;
            transition: border-color 0.3s;
          }

          .input-field:focus {
            border-color: #007bff;
            outline: none;
          }

          .submit-button {
            width: 100%;
            padding: 0.75rem;
            background-color: #007bff;
            border: none;
            border-radius: 4px;
            color: white;
            font-size: 1rem;
            cursor: pointer;
            transition: background-color 0.3s;
          }

          .submit-button:hover {
            background-color: #0056b3;
          }

          select {
            width: 100%;
            padding: 0.75rem;
            margin: 0.5rem 0;
            border: 1px solid #ced4da;
            border-radius: 4px;
            font-size: 1rem;
            background-color: white;
            cursor: pointer;
          }
        `}
      </style>
      <div className="auth-form">
        <h2>Signup</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            className="input-field"
            placeholder="Name"
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            className="input-field"
            placeholder="Email"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            className="input-field"
            placeholder="Password"
            onChange={handleChange}
            required
          />
          <select name="role" onChange={handleChange}>
            <option value="mentee">Mentee</option>
            <option value="mentor">Mentor</option>
          </select>
          <button type="submit" className="submit-button">Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
