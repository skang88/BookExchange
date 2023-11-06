import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function AddbookForm() {

    const [formData, setFormData] = useState({
        status: 'exchange', // initial value
        title: '',
        price: '',
        photo: '',
        context: '',
      });
    
      const [formErrors, setFormErrors] = useState({
        status: '',
        title: '',
        price: '',
        photo: '',
        context: '',
      });
    
      const navigate = useNavigate();
    
      const handleSubmit = (e) => {
        e.preventDefault();
      
        // 각 필드에 대한 유효성 검사 수행
        let hasErrors = false;
        const newFormErrors = { ...formErrors };
      
        if (formData.status.trim() === '') {
          newFormErrors.status = 'Status is required';
          hasErrors = true;
        } else {
          newFormErrors.status = '';
        }
    
        if (formData.title.trim() === '') {
          newFormErrors.title = 'Title is required';
          hasErrors = true;
        } else {
          newFormErrors.title = '';
        }
    
        if (formData.price.trim() === '') {
          newFormErrors.price = 'Price is required';
          hasErrors = true;
        } else if (isNaN(formData.price)) {
          newFormErrors.price = 'Price must be a number';
          hasErrors = true;
        } else {
          newFormErrors.price = '';
        }  
      
        if (formData.context.trim() === '') {
          newFormErrors.context = 'Description is required';
          hasErrors = true;
        } else {
          newFormErrors.context = '';
        }
      
        if (hasErrors) {
          setFormErrors(newFormErrors);
        } else {
          
          const token = localStorage.getItem('token'); // 토큰을 로컬 스토리지에서 가져옴
          const headers = {
            'Content-Type': 'application/json',
            'x-auth-token': token, // 토큰을 요청 헤더에 추가
          };

          const apiUrl = `${process.env.REACT_APP_BACKEND_URL}/api/book/addBook`;
    
          axios
            .post(apiUrl, formData, { headers })
            .then((response) => {
    
              // Check HTTP status code
              console.log('HTTP status code:', response.status);
    
              // Check server response data
              console.log('server response data:', response.data);
    
              // Check server response header
              console.log('server response header:', response.headers);
    
              // inform to client the results
              if (response.status === 201) {
                // if book successfully added 
                console.log('New book added:', response.data);
                alert('Book added successfully');
                navigate('/booklist');
              } else if (response.status === 401) {
                console.log('Database Error', response.data);
                alert('Database Error');
              }
            })
            .catch((error) => {
              console.error('Error adding book:', error);
              alert('Error adding book');
            });
        }
      };  
    
      const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
      };

  return (
    <div className="add-book-form ml-1 mr-1">
      <form onSubmit={handleSubmit} className="form-container"> 
        <div className="form-group mt-3">
          <label htmlFor="exchangeType">Trading type</label>
          <select 
            className="form-control"
            type="text" 
            name="status"
            value={formData.status}
            onChange={handleChange}>
            
            <option value="exchange">Exchange</option>
            <option value="buying">Buying</option>
            <option value="selling">Selling</option>
            
          </select>
          <span className="error-message">{formErrors.status}</span>
        </div>
        
        <div className="form-group">
          <label>Title:</label>
          <input
            className="form-control"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
          <span className="error-message">{formErrors.title}</span>
        </div>

        <div className="form-group">
          <label>Price:</label>
          <input
            className="form-control"
            type="text"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
          <span className="error-message">{formErrors.price}</span>
        </div>

        <div className="form-group">
          <label>Context:</label>
          <textarea
            className="form-control"
            name="context"
            value={formData.context}
            onChange={handleChange}
          />
          <span className="error-message">{formErrors.context}</span>
        </div>

        <button type="submit" className="btn btn-secondary">
          Add Book
        </button>
      </form>
    </div>
  )
}
