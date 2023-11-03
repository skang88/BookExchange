import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home'
import Booklist from './pages/Booklist';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Addbook from './pages/Addbook';

export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/booklist" element={<Booklist />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path='/addbook' element={<Addbook />} />

      </Routes>
    </BrowserRouter>
  );
}



