import React, { useEffect, useState } from 'react'
import Layout from '../component/Layout'
import axios from 'axios';

const token = localStorage.getItem('token');
const headers = {
    'Content-Type': 'application/json',
    'x-auth-token': token, // add token to the request
};

export default function Myinfo() {

    const [data, setData] = useState([]);
    const getApiUrl = `${process.env.REACT_APP_BACKEND_URL}/api/auth/getUserInfo`;

    useEffect(() => {
        if (data.length === 0){
            console.log("Empty", data)
            axios.get(getApiUrl, { headers }) // Server API Endpoint
            .then((response) => {
            setData(response.data);
            console.log("response data is: ",response.data);
            })
            .catch((error) => {
            console.error('Error fetching books:', error);
            });
        } else {
            console.log("Not Empty", data)
        }
    })

    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })
    const [formUpdateData, setFormUpdateData] = useState({
        email: '',
        password: '',
    })

    useEffect(() => {
        setFormData({
            email: data.email
        })
    },[data])

    useEffect(() => {
        setFormUpdateData({
            email: data.email
        })
    },[data])

    const [formErrors, setFormErrors] = useState({
        email: '',
        password: '',
    })

    const handleSaveClick = (e) => {
        e.preventDefault();
        let hasErrors = false;
        const newFormErrors = {...formErrors};

        if (formData.email.trim() === ''){
            newFormErrors.email = 'Email is required';
            hasErrors = true
        } else {
            newFormErrors.email = '';
        }

        if (formData.password === ''){
            newFormErrors.password = 'Password is required';
            hasErrors = true
        } else {
            newFormErrors.password = ''
        }

        if (hasErrors) {
            setFormErrors(newFormErrors);
        } else {
            // data submit to server
            setIsEditing(false);
        }    
    };

    const handleUpdateChange = (e) => {
        const { name, value } = e.target;
        setFormUpdateData({
          ...formUpdateData,
          [name]: value,
        });
      };

    const handleEditClick = () => {
        setIsEditing(true);
        };

    const handleCancelClick = () => {
        setIsEditing(false);
        setFormUpdateData({
            email: data.email
        })
        };



    return (
    <Layout>
        <div><h4>My Information</h4></div>
        <div className='ml-1 mr-1 mt-3 mb-3'>
            { isEditing ? (
                <>
                    <label> User Name </label>
                    <input className='form-control' type="text" name="username" 
                            value={formUpdateData.username} disabled></input>
                    <label className='mt-3'> Email </label>
                    <input className='form-control' type="text" name="email" 
                            value={formUpdateData.email} onChange={handleUpdateChange} disabled={!isEditing}></input>
                </>
            ):(
                <>
                    <label> User Name </label>
                    <input className='form-control' type="text" name="username" 
                            value={data.username} disabled></input>
                    <label className='mt-3'> Email </label>
                    <input className='form-control' type="text" name="email" 
                            value={formData.email} onChange={handleUpdateChange} disabled={!isEditing}></input>
                </>
            )}
            
            { isEditing ? (
                <>
                <label className='mt-3'> Password </label>
                <input className='form-control' type="password" name="username" required></input>
                </>
            ) : ("") }
        </div>
        { isEditing ? (
            <>
            <button className="btn btn-warning mt-3 mb-3 mr-3 ml-1" onClick={handleCancelClick}>Cancel</button>
            <button className="btn btn-success mt-3 mb-3 mr-3 ml-1" onClick={handleSaveClick}>Save</button>
            </> 

        ):(
            <>
            <button className="btn btn-primary mt-3 mb-3 mr-3 ml-1" onClick={handleEditClick}>Edit</button>
            <button className="btn btn-primary mt-3 mb-3"> Change password</button>
            </>
        )}
        
        
        

    </Layout>
    )
}
