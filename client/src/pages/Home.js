import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../component/Layout'
import { useNavigate } from 'react-router-dom';

function Searchbar() {
  const navigate = useNavigate();
  const [bookTitle, setBooktitle] = useState('');
  const handleSearch = (event) => {
    event.preventDefault();

    // http://192.168.0.8:4000/api/book/searchBooks?title=data
    navigate(`/searchbooks?title=${bookTitle}`)
  }
  return(
    <div>
      <form className="d-flex p-2">
        <input className="form-control mr-sm-1 " type="search" placeholder="Search" aria-label="Search"
                value={bookTitle} onChange={(e) => setBooktitle(e.target.value)}></input>
        <button className="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={handleSearch}>Search</button>  
      </form>
    </div>
  )
}

export default function Home() {
  const [data, setData] = useState('');
  const apiUrl = `${process.env.REACT_APP_BACKEND_URL}/api/book/countBooks`
  useEffect(() => {
      axios.get(apiUrl) // Server API Endpoint
        .then((response) => {
          setData(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.error('Error fetching books:', error);
        });
  },[data, apiUrl]);


  return (
    <Layout>
      
      <div className="container-xl text-center mb-5">
        <h1 className="mt-4"> Welcome to Book Hub</h1>
        <div>
          <p className='d-flex align-items-start'>   
            <span className='mr-1'><strong>{data}</strong></span>  
            <span>books are available</span>
          </p>
        </div>
        <div>
          <Searchbar />
        </div>
      </div>
    </Layout>
  )
}
