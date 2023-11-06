import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Layout from '../component/Layout'
import './BookList.css';
import Booklist from '../component/Booklist';

export default function Searchbooks() {

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  
  // http://192.168.0.8:4000/api/book/searchBooks?owner=a  
  // const apiUrl = `${process.env.REACT_APP_BACKEND_URL}/api/book/getBooks`;

  const [data, setData] = useState([]);
  const [query, setQuery] = useState(searchParams);

  useEffect(() => {
    if (searchParams) {
        setQuery(searchParams.search)
    } else {
        setQuery('')
    }

    const apiUrl = `${process.env.REACT_APP_BACKEND_URL}/api/book/searchBooks?${query}`;

    // Request books from server
    if (query) {
      axios.get(apiUrl) // Server API Endpoint
      .then((response) => {
        setData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error fetching books:', error);
      });
    }},[query, searchParams]);

  return (
    <Layout>
      { data.length !== 0 ? (
        <div>
        <p>
          <Booklist data={data}/>
        </p>
      </div>
      ):(
        <div>
          No Books are found
        </div>
       )
      }
    </Layout>
  )
}
