import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home'
import BookList from './pages/BookList';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Addbook from './pages/Addbook';
import Bookdetail from './pages/Bookdetail';
import Mybooks from './pages/Mybooks';
import Searchbooks from './pages/Searchbooks';
import Myinfo from './pages/Myinfo';

export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/booklist" element={<BookList />} />
        <Route path="/bookdetail/:id" element={<Bookdetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path='/addbook' element={<Addbook />} />
        <Route path='/mybooks' element={<Mybooks />} />
        <Route path='/searchbooks' element={<Searchbooks />} />
        <Route path='/myinfo' element={<Myinfo />} />
      </Routes> 
    </BrowserRouter>
  );
}



