import React, { useState }  from 'react'
import Bookcard from './Bookcard'
import { Link } from 'react-router-dom';

export default function Booklist(props) {

  const [selectedBookId, setSelectedBookId] = useState(null);

  const handleBookClick = (bookId) => {
    setSelectedBookId(bookId);
    console.log("Selected book is ", selectedBookId)
  };

  return (
    <div className="card-container no-link">
      <p className='ml-3'> <strong>{props.data.length}</strong> Books are available. </p>
      {props.data.map((book) => (
        <div key = {book._id} className='card-content'>  
          <Link to={`/bookdetail/${book._id}`} onBookClick={handleBookClick} className="nav-link">
            <Bookcard books = {book} />
          </Link>
        </div>  
      ))}
    </div>
  )
}
