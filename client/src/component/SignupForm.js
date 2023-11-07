import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function SignupForm() {

    const [formData, setFormData] = useState({
        email: '',
        username: '',
        password: '', 
        confirmPassword: ''
      });
    
    const [formErrors, setFormErrors] = useState({
      email: '',
      username: '',
      password: '', 
      confirmPassword: ''
    });
  
    const navigate = useNavigate();
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log(formData)
      
      // Check for each fields
      let hasErrors = false;
      const newFormErrors = { ...formErrors };
    
      if (formData.email.trim() === '') {
        newFormErrors.email = 'Email is required';
        hasErrors = true;
      } else {
        newFormErrors.email = '';
      }
  
      if (formData.username.trim() === '') {
        newFormErrors.username = 'Username is required';
        hasErrors = true;
      } else {
        newFormErrors.username = '';
      }
  
      if (formData.password.trim() === '') {
        newFormErrors.password = 'Password is required';
        hasErrors = true;
      } else {
        newFormErrors.password = '';
      }
  
      if (formData.confirmPassword.trim() === '') {
        newFormErrors.confirmPassword = 'Confirm Password is required';
        hasErrors = true;
      } else {
        newFormErrors.confirmPassword = '';
      }
    
      if (hasErrors) {
        setFormErrors(newFormErrors);
      } else {
        const apiUrl = `${process.env.REACT_APP_BACKEND_URL}/api/auth/signup`;
        
        axios
          .post(apiUrl, formData)
          .then((response) => {
            console.log('New User added:', response.data);
            setFormData({
              email: '',
              username: '',
              password: ''
            });
    
            // Success message
            alert('User added successfully');
            navigate('/login');
            
          })
          .catch((error) => {
            console.error('Error adding User:', error);
            alert(`Error adding User\n${error}`);
          });
      }
    };  
    
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };

      
  return (
    <div className="add-user-form ml-1 mr-1 mt-3 mb-3">
        <form onSubmit={handleSubmit} className="form-container">
          <div className="form-group">
            <label>Email</label>
            <input
              className="form-control"
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <span className="error-message">{formErrors.email}</span>
          </div><p></p>

          <div className="form-group">
            <label>User Name</label>
            <input
              className="form-control"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
            <span className="error-message">{formErrors.username}</span>
          </div><p></p>

          <div className="form-group">
            <label>Password</label>
            <input
              className="form-control"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <span className="error-message">{formErrors.password}</span>
          </div><p></p>

          <div className="form-group">
            <label>Comfirm Password</label>
            <input
              className="form-control"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            <span className="error-message">{formErrors.confirmPassword}</span>
          </div><p></p>

          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
        </form>
      </div>
  )
}
