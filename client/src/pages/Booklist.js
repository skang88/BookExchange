import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './BookList.css';
import Layout from '../component/Layout'

// Card Component
function Card({ books }) {
    return (
      <div>
        <h2 className="no-link">{books.title}</h2>
        <p> Status: {books.status}, &nbsp;&nbsp;
            Seller: {books.owner}, &nbsp;&nbsp;
            Price: ${books.price}</p>
        <p> book_id: {books._id} </p>
      </div>
    );
  }

export default function Booklist() {
    const [books, setBooks] = useState([]);
    const apiUrl = `${process.env.REACT_APP_BACKEND_URL}/api/book/getBooks`;

    useEffect(() => {
        // 서버에서 책 데이터를 가져오는 요청
        axios.get(apiUrl) // Server API Endpoint
          .then((response) => {
            setBooks(response.data);
            console.log(response.data);
          })
          .catch((error) => {
            console.error('Error fetching books:', error);
          });
      }, [apiUrl]);

  return (
    <Layout>
    <div className="card-container no-link">
      
      {books.map((book) => (
        <div key = {book._id} className='card-content'>  
          <Link to='/bookdetail' className="nav-link">
            <Card books = {book} />
          </Link>
        </div>  
      ))}
      
    </div>
    </Layout>
  )
}
