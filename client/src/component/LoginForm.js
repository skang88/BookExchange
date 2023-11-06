// client/src/components/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const apiUrl = `${process.env.REACT_APP_BACKEND_URL}/api/auth/login`;
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const data = await response.json();
      // store token
      localStorage.setItem('token', data.token);
      navigate('/');
      window.location.reload();
    } else if (response.status === 401) {
      alert('User name or Password is not match');
    } else if (response.status === 404) {
      alert('User not found');
    }
  };

  const handleSignup = async (e) => {
    navigate('/signup');
  }

  return (
    <div className='mt-3 mb-3'>
      <form>
        <div className="form-group">
          <label>User Name</label>
          <input
            className="form-control"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          /><p></p>
        </div>
        <div className="form-group">
        <label>Password</label>
          <input
            className="form-control"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          /><p></p>
          <button className="btn btn-primary mt-3 mb-3" onClick={handleSubmit}>Login</button> &nbsp;&nbsp;
          <button className="btn btn-primary mt-3 mb-3" onClick={handleSignup}>Signup</button>
        </div>
      </form>
    </div>
  );
};
