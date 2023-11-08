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
    }, [data, getApiUrl]);

    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState([]);
    console.log("data is", data)
    const [formUpdateData, setFormUpdateData] = useState([]);

    useEffect(() => {
        setFormData(data)
    },[data])
    
    useEffect(() => {
        setFormUpdateData(formData,[formData])
    },[formData])

    const updateApiUrl = `${process.env.REACT_APP_BACKEND_URL}/api/auth/updateUserinfo`;
    const handleSaveClick = (e) => {
        axios.post(updateApiUrl, formUpdateData, { headers })
        .then((response) => {
            console.log('HTTP status code:', response.status);
            console.log('server response data:', response.data);
            console.log('server response header:', response.headers);
            
            if (response.status === 200) {
                // if book successfully added 
                console.log('Data has been sucessfully updated', response.data);
                alert(`Response Satus Code: ${response.status}. \nData has been sucessfully updated`);
                setIsEditing(false);
                setFormData(response.data)
            }
        })
        .catch((error) => {
            alert(`Error: ${error.response.status}.\n${error.response.data.message}`);
            });
        }

    const handleUpdateChange = (e) => {
        const { name, value } = e.target;
        setFormUpdateData({
          ...formUpdateData,
          [name]: value,
        });
    };

    const handleEditClick = () => {
        setIsEditing(true);
        setFormUpdateData(formData)
    };

    const handleCancelClick = () => {
        setIsEditing(false);
        setIsPasswordEditing(false);
    };

    const [isPasswordEditing, setIsPasswordEditing] = useState(false);

    const handleChangePasswordClick = () => {
        setIsPasswordEditing(true);
    };

    const updatePasswordApiUrl = `${process.env.REACT_APP_BACKEND_URL}/api/auth/updateUserPassword`;
    const handleChangePasswordSaveClick = () => {
        if (formUpdateData.newPassword === formUpdateData.newConfirmPassword) {
            axios.post(updatePasswordApiUrl, formUpdateData, { headers })
            .then((response) => {
                console.log('HTTP status code:', response.status);
                console.log('server response data:', response.data);
                console.log('server response header:', response.headers);
                
                if (response.status === 200) {
                    // if book successfully added 
                    console.log('Password has been sucessfully updated', response.data);
                    alert(`Response Satus Code from server: ${response.status}. \nPassword has been sucessfully updated`);
                    setIsPasswordEditing(false);
                }
            })
            .catch((error) => {
                alert(`Error: ${error.response.status}.\n${error.response.data.message}`);
                });
        } else {
            alert("New Password and Confirm Password are not mached")
        }
        setIsPasswordEditing(true);
    };

    console.log("form data is", formData)
    console.log("formUpdateData", formUpdateData)


    return (
    <Layout>
        <div className='mt-3'><h4>My Information</h4></div>
        <div className='ml-1 mr-1 mt-3 mb-3'>
            { isEditing ? (
                <>
                    <label> User Name </label>
                    <input className='form-control' type="text" name="username" 
                            value={formData.username} disabled></input>
                    <label className='mt-3'> Email </label>
                    <input className='form-control' type="text" name="email" 
                            value={formUpdateData.email} onChange={handleUpdateChange} disabled={!isEditing}></input>
                    <label className='mt-3'> Password </label>
                    <input className='form-control' type="password" name="password" onChange={handleUpdateChange} required></input>
                </>
            ):(
                <>
                { isPasswordEditing ? (
                        <>
                        <label> User Name </label>
                        <input className='form-control' type="text" name="username" 
                                value={data.username} disabled></input>
                        <label className='mt-3'> Email </label>
                        <input className='form-control' type="text" name="email" 
                                value={formData.email} onChange={handleUpdateChange} disabled={!isEditing}></input>
                        <label className='mt-3'> Password </label>
                        <input className='form-control' type="password" name="password" onChange={handleUpdateChange} required></input>
                        <label className='mt-3'> New Password </label>
                        <input className='form-control' type="password" name="newPassword" onChange={handleUpdateChange} required></input>
                        <label className='mt-3'> Confirm Password </label>
                        <input className='form-control' type="password" name="newConfirmPassword" onChange={handleUpdateChange} required></input>
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
                    )
                }
                </>           
            )}
        </div>
            { isEditing ? (
                <>
                <button className="btn btn-success mt-3 mb-3 mr-2 ml-2" onClick={handleSaveClick}>Save</button>
                <button className="btn btn-warning mt-3 mb-3 mr-2 ml-2" onClick={handleCancelClick}>Cancel</button>
                </> 
            ):(
                <>
                { isPasswordEditing ? (
                    <>
                    <button className="btn btn-success mt-3 mb-3 mr-2 ml-2" onClick={handleChangePasswordSaveClick}> Save</button>
                    <button className="btn btn-warning mt-3 mb-3 mr-2 ml-2" onClick={handleCancelClick}>Cancel</button>
                    </>
                ) : (
                    <>
                    <button className="btn btn-primary mt-3 mb-3 mr-3 ml-1" onClick={handleEditClick}>Edit Information</button>
                    <button className="btn btn-primary mt-3 mb-3" onClick={handleChangePasswordClick}> Change password</button>
                    </>
                )}
                </>
            )}
    </Layout>
    )
}
