import React from 'react'

export default function Bookcard(props) {
    
    const books = props.books
    const getColor = () => {
        if (books.status === "exchange") {
            return 'text-success';
        } else if (books.status === "buying") {
            return 'text-primary';
        } else if (books.status === "selling") {
            return 'text-warning';
        } else {
            return 'text-secondary'
        }
    };

    function formatDate(dateString) {
        const options = { month: '2-digit', day: '2-digit', year: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
      }
    
    return (
        <div>
            <h3 className="no-link">{books.title} <span class="text-danger"> {books.isAvailable ? "":"(Sold)"}</span> </h3> 
            <p> 
            <span className={getColor()}><strong> [{books.status ? books.status.toUpperCase():''}] </strong> </span>
            <span className='ml-3'> Seller: <strong>{books.owner}</strong> </span>
            <span className='ml-3'> Price: <strong>${books.price}</strong> </span>
            <span className='ml-3'> Updated: {formatDate(books.updatedAt)}</span>
            </p>
        </div>
    )
}
