import React, { useState, useEffect } from 'react';
import { useJwt } from "react-jwt";
import axios from 'axios';
import Layout from '../component/Layout'
import './BookList.css';
import Booklist from '../component/Booklist';
import LoginForm from '../component/LoginForm';

export default function Mybooks() {

  const token = localStorage.getItem('token');
  const { decodedToken, isExpired } = useJwt(token);
  const [data, setData] = useState([]);
  const [user, setUser] = useState('');
    
  // http://192.168.0.8:4000/api/book/searchBooks?owner=a  
  // const apiUrl = `${process.env.REACT_APP_BACKEND_URL}/api/book/getBooks`;

  useEffect(() => {
    // define username
    if (decodedToken) {
      setUser(decodedToken.username || '');
    }

    const apiUrl = `${process.env.REACT_APP_BACKEND_URL}/api/book/searchBooks?owner=${user}`;

    // Request books from server
    if (user !== '') {
      axios.get(apiUrl) // Server API Endpoint
      .then((response) => {
        setData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error fetching books:', error);
      });
    }}, [decodedToken, user]);

  return (
    <Layout>
      { !isExpired ? (
        <div>
        <p>
          <Booklist data={data}/>
        </p>
      </div>
      ):(
        <div>
          <LoginForm className='mt-3 mb-3'/>
        </div>
       )
      }
    </Layout>
  )
}
