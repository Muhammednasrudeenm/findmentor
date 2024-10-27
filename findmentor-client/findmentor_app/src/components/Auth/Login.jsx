import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/auth';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/login', { email, password });
      localStorage.setItem('token', res.data.token);
      if (res.data.user.role === 'mentee') navigate('/mentee/dashboard');
      else if (res.data.user.role === 'mentor') navigate('/mentor/dashboard');
      else if (res.data.user.role === 'admin') navigate('/admin');
    } catch (err) {
      alert('Login failed: ' + err.response.data.message);
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
            background: linear-gradient(to right, #f0f2f5, #dfe4ea);
            padding: 20px;
          }

          .auth-form {
            background: white;
            padding: 2rem;
            border-radius: 10px;
            box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
            width: 350px;
            text-align: center;
          }

          .auth-form h2 {
            margin-bottom: 1.5rem;
            font-family: 'Arial', sans-serif;
            color: #333;
            font-size: 1.8rem;
          }

          .input-field {
            width: 100%;
            padding: 0.75rem;
            margin: 0.5rem 0;
            border: 1px solid #ced4da;
            border-radius: 5px;
            font-size: 1rem;
            transition: border-color 0.3s;
          }

          .input-field:focus {
            border-color: #007bff;
            outline: none;
          }

          .submit-button,
          .signup-button {
            width: 100%;
            padding: 0.75rem;
            border: none;
            border-radius: 5px;
            font-size: 1rem;
            cursor: pointer;
            transition: background-color 0.3s;
          }

          .submit-button {
            background-color: #007bff;
            color: white;
            margin-top: 1rem;
          }

          .submit-button:hover {
            background-color: #0056b3;
          }

          .signup-button {
            background-color: transparent;
            color: #007bff;
            border: 2px solid #007bff;
            margin-top: 0.5rem;
          }

          .signup-button:hover {
            background-color: #007bff;
            color: white;
          }

          .divider {
            margin: 1rem 0;
            font-size: 0.9rem;
            color: #777;
          }
        `}
      </style>
      <div className="auth-form">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            className="input-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="input-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="submit-button">Login</button>
        </form>
        <div className="divider">or</div>
        <button
          className="signup-button"
          onClick={() => navigate('/Signup')}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}

export default Login;
