import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Component.css';
import { useJwt } from "react-jwt";

const token = localStorage.getItem('token');
const headers = {
    'Content-Type': 'application/json',
    'x-auth-token': token, // add token to the request
};

function formatDate(dateString) {
  const options = { month: '2-digit', day: '2-digit', year: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

export default function BookdetailCard() {
    
    const [data, setData] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [isUpdated, setIsupdated] = useState(true);

    const routeParams = useParams();
    const getApiUrl = `${process.env.REACT_APP_BACKEND_URL}/api/book/getBook/${routeParams.id}`;
    const updateApiUrl = `${process.env.REACT_APP_BACKEND_URL}/api/book/updateBook/${routeParams.id}`;
    const deleteApiUrl = `${process.env.REACT_APP_BACKEND_URL}/api/book/deleteBook/${routeParams.id}`;
    const navigate = useNavigate();
    const { decodedToken, isExpired } = useJwt(token);
    const [currentuser, setCurrentuser] = useState(decodedToken);
    console.log("Decoded Token is:",decodedToken, "and exipired?", isExpired)

    useEffect(() => {
        if (decodedToken) {
            setCurrentuser(decodedToken.username);
            } else {
            setCurrentuser('No User')
            }
        // Request a book from server
        axios.get(getApiUrl, { headers }) // Server API Endpoint
            .then((response) => {
            setData(response.data);
            console.log("response data is: ",response.data);
            })
            .catch((error) => {
            console.error('Error fetching books:', error);
            });
            setIsupdated(false)
        }, [decodedToken, getApiUrl, data.isAvailable, isUpdated]);

    const handleSoldClick = async (e) => {
        const soldData = {
            isAvailable: false
        }
        // Change isavailable to unavailable
        axios
         .post(updateApiUrl, soldData, { headers })
         .then((response) => {
            console.log('HTTP status code:', response.status);
            console.log('server response data:', response.data);
            console.log('server response header:', response.headers);
        
            // inform to client the results
            if (response.status === 200) {
                // if book successfully added 
                console.log('Status is changed to unavailable', response.data);
                alert('Status is changed to unavailable'); 
                setIsupdated(true);
            } else if (response.status === 401) {
                console.log('Only book owner can update book', response.data);
                alert('Only book owner can update book');
            } else if (response.status === 404) {
                console.log('Book Not Found', response.data);
                alert('Book Not Found');
            } else if (response.status === 500) {
                console.log('Invalid access', response.data);
                alert('Invalid access');
            }
        })
    }

    const handleTradeClick = async (e) => {
        const soldData = {
            isAvailable: true
        }
        // Change isavailable to available
        axios
         .post(updateApiUrl, soldData, { headers })
         .then((response) => {
            console.log('HTTP status code:', response.status);
            console.log('server response data:', response.data);
            console.log('server response header:', response.headers);
        
            // inform to client the results
            if (response.status === 200) {
                // if book successfully added 
                console.log('Status is changed to unavailable', response.data);
                alert('Status is changed to Available');
                setIsupdated(true);
            } else if (response.status === 401) {
                console.log('Only book owner can update book', response.data);
                alert('Only book owner can update book');
            } else if (response.status === 404) {
                console.log('Book Not Found', response.data);
                alert('Book Not Found');
            } else if (response.status === 500) {
                console.log('Invalid access', response.data);
                alert('Invalid access');
            }
        })
    }

    const handleBackClick = async () => {
        navigate('/booklist');
    }

    const handleDeleteClick = async () => {
        const soldData = {
            isAvailable: true
        }
        const shouldDelete = window.confirm('Are you sure to delete this book?');
        if (shouldDelete) {
            axios
         .post(deleteApiUrl, soldData, { headers })
         .then((response) => {
            console.log('HTTP status code:', response.status);
            console.log('server response data:', response.data);
            console.log('server response header:', response.headers);
        
            // inform to client the results
            if (response.status === 200) {
                // if book successfully added 
                console.log('The book has been deleted.', response.data);
                alert('The book has been deleted.'); 
            } else if (response.status === 401) {
                console.log('Only book owner can delete a book', response.data);
                alert('Only book owner can delete a book');
            } else if (response.status === 404) {
                console.log('Book Not Found', response.data);
                alert('Book Not Found');
            } else if (response.status === 500) {
                console.log('Invalid access', response.data);
                alert('Invalid access');
            }
        })
        navigate('/booklist');
        }
    }

    const handleEditClick = () => {
        setIsEditing(true);
      };

    const handleSaveClick = () => {
    // Send to server edited book information
 
        axios
         .post(updateApiUrl, updatedata, { headers })
         .then((response) => {
            console.log('HTTP status code:', response.status);
            console.log('server response data:', response.data);
            console.log('server response header:', response.headers);
        
            // inform to client the results
            // if sucess or fail 
            // 404 "Book not found"
            // 401 "Only book owner can update book"
            // 200 "book added"
            // 500 "Invalid access"
            if (response.status === 200) {
                // if book successfully added 
                console.log('Data has been sucessfully updated', response.data);
                alert('Data has been sucessfully updated');
                setIsupdated(true);
            } else if (response.status === 401) {
                console.log('Only book owner can update book', response.data);
                alert('Only book owner can update book');
            } else if (response.status === 404) {
                console.log('Book Not Found', response.data);
                alert('Book Not Found');
            } else if (response.status === 500) {
                console.log('Invalid access', response.data);
                alert('Invalid access');
            }
        })
        setIsEditing(false);
    };

    const handleCancelClick = () => {
        // Send to server edited book information
        // if sucess or fail 
            setIsEditing(false);
        };

    const [updatedata, setUpdatedata] = useState({
            "status": '',
            "title": '',
            "price": '',
            "context": '',
        });

    useEffect(() => {
        // After rendering, updatedata is set to data
        setUpdatedata({
            "status": data.status,
            "title": data.title,
            "price": data.price,
            "context": data.context,
        });
        }, [data]);

    const handleUpdateChange = (event) => {
        const { name, value } = event.target;
        setUpdatedata({
            ...updatedata,
            [name]: value,
            });
    };

    const getColor = () => {
        if (data.status === "exchange") {
            return 'text-success';
        } else if (data.status === "buying") {
            return 'text-primary';
        } else if (data.status === "selling") {
            return 'text-warning';
        } else {
            return 'text-secondary'
        }
    };
    
  return (
    <div className="card-detail">
        { isEditing ? (
            
            <div className="add-book-form ml-1 mr-1">
                <form className="form-container"> 

                <div className="form-group">
                    <label>Title:</label>
                    <input
                    className="form-control"
                    type="text"
                    name="title"
                    value={updatedata.title}
                    onChange={handleUpdateChange}
                    />
                </div>

                <div className="form-group mt-3">
                    <label htmlFor="exchangeType">Trading type</label>
                    <select 
                    className="form-control"
                    type="text" 
                    name="status"
                    value={updatedata.status}
                    onChange={handleUpdateChange}
                    >
                    
                    <option value="exchange">Exchange</option>
                    <option value="buying">Buying</option>
                    <option value="selling">Selling</option>
                    
                    </select>
                </div>
        
                <div className="form-group">
                    <label>Price:</label>
                    <input
                    className="form-control"
                    type="text"
                    name="price"
                    value={updatedata.price}
                    onChange={handleUpdateChange}
                    />
                </div>
        
                <div className="form-group">
                    <label>Context:</label>
                    <textarea
                    className="form-control"
                    name="context"
                    value={updatedata.context}
                    onChange={handleUpdateChange}
                    />
                </div>
        
                <button className="btn btn-success mt-3 mb-3 mr-1" onClick={handleSaveClick}>Save</button>
                <button className="btn btn-danger mt-3 mb-3 mr-1" onClick={handleCancelClick}>Cancel</button>
                </form>
            </div>
        ) : (
            <div>
            <div className="row">
        <div className="col-12 col-sm-6"><h2>{data.title}</h2></div>
        <div className="col-md-3 offset-md-">created at: {formatDate(data.createdAt)}</div>
        <div className="col-md-3 offset-md-6">updated at: {formatDate(data.updatedAt)}</div>
        </div>
            <p className='mt-3'><strong> Book Information </strong></p>
            <p className='mt-3'> Trade Status: 
                { data.isAvailable ? 
                    (
                        <span className="text-success"><strong> This Book is on sale </strong></span>
                    ) : (
                        <span className="text-danger"> <strong> This Book is sold out </strong></span>
                    )}
                
            </p>
            <p className='mt-3'> Trade Type: <span className={getColor()}><strong>{data.status ? data.status.toUpperCase() : ''}</strong></span></p>
            <p className='mt-3'>
            <span className='mr-5'> Seller: <strong>{data.owner}</strong> </span>
            <span> Price: <strong>${data.price}</strong> </span>
            </p>
            <p className='mt-3'> Context: {data.context} </p>
            <p className='mt-5'><strong> Information for testing </strong></p>
            <p> Bookid: {data._id} </p>
            <p> Availability: {data.isAvailable === true ? "true" : "false"} </p>
            <p> isOwner?: {currentuser === data.owner ? (
                <>
                    <span> true </span>
                    <div>
                    <button className="btn btn-primary mt-3 mb-3 mr-1" onClick={handleEditClick}>Edit</button>
                    { data.isAvailable ? (
                        <button className="btn btn-warning mt-3 mb-3 mr-1" onClick={handleSoldClick}>Change to Sold</button>
                    ):(
                        <button className="btn btn-success mt-3 mb-3 mr-1" onClick={handleTradeClick}>Change to Trade</button>
                    )}
                    <button className="btn btn-danger mt-3 mb-3 mr-1" onClick={handleDeleteClick}>Delete</button>
                    <button className="btn btn-secondary mt-3 mb-3 mr-1" onClick={handleBackClick}>Back to list</button>
                    </div>
                </>  
                ) : (
                <>
                    <span> false </span>
                    <div>
                    <button className="btn btn-secondary mt-3 mb-3 mr-1" onClick={handleBackClick}>Back to list</button>  
                    </div> 
                </>
                )}
            </p>
            </div>
            
        )}
        
    </div>
  )
}
