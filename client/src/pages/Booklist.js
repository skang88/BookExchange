import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './BookList.css';
import Layout from '../component/Layout'
import Bookcard from '../component/Bookcard';


export default function BookList() {
    const [data, setData] = useState([]);
    const [selectedBookId, setSelectedBookId] = useState(null);

    const handleBookClick = (bookId) => {
      setSelectedBookId(bookId);
      console.log("Selected book is ", selectedBookId)
    };

    const apiUrl = `${process.env.REACT_APP_BACKEND_URL}/api/book/getBooks`;
    
    // data 상태가 변경될 때 GET 요청을 보내는 useEffect
    useEffect(() => {
      if(data.length === 0){
        axios.get(apiUrl) // Server API Endpoint
          .then((response) => {
            setData(response.data);
            console.log(response.data);
          })
          .catch((error) => {
            console.error('Error fetching books:', error);
          });
        }
    },[data.length, apiUrl]);
 

  return (
    <Layout>
    <div className="card-container no-link">
      <p className='ml-3'> <strong>{data.length}</strong> Books are available. </p>
      
      {data.map((book) => (
        <div key = {book._id} className='card-content'>  
          <Link to={`/bookdetail/${book._id}`} onBookClick={handleBookClick} className="nav-link">
            <Bookcard books = {book} />
          </Link>
        </div>  
      ))}
      
    </div>
    </Layout>
  )
}
