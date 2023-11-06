import React from 'react';
import Layout from '../component/Layout'
import LoginForm from '../component/LoginForm';
import BookdetailCard from '../component/BookdetailCard';
import './BookList.css';

const token = localStorage.getItem('token');

export default function Bookdetail() {

  return (
    <Layout>
      {token ? (
        <BookdetailCard />
      ) : (
        <LoginForm className='mt-3 mb-3'/>
      )}
    </Layout>
  )
}
