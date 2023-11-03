import React, { useState, useEffect }  from 'react'
import { useJwt } from "react-jwt";

function LogoutBtn() {
  const handleLogout = () => {
      // Logout : Remove token in local storage
      localStorage.removeItem('token');
      window.location.reload();
      };      
  return (
      <button onClick={handleLogout} className="btn btn-secondary">Logout</button>
  )
}

export default function Header() {

  const token = localStorage.getItem('token');
  const { decodedToken, isExpired } = useJwt(token);
  const [data, setData] = useState(decodedToken);
  
  console.log(token, decodedToken)

  useEffect(() => {
    if (decodedToken) {
      setData(decodedToken.username);
    } else {
      setData('Log in');
    }
  }, [decodedToken]);

  return (
    <nav className="navbar navbar-expand-sm bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">Book Hub</a>
        <div className=" navbar-collapse" id="navbarText">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link" aria-current="page" href="/">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/booklist">Book List</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/addbook">Add Book</a>
            </li>
          </ul>
          
          <span className="navbar navbar-expand-sm bg-light">
            {token && !isExpired ? (
              <div className="container-fluid">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <a className="nav-link" href="/">My Listing</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/">My Info</a>
                  </li>
                  <li className="nav-item">
                    <span className="nav-link"> Welcome, {data}</span>
                  </li>
                  <li className="nav-item">
                    <LogoutBtn />
                  </li>
                </ul>
              </div>
            ) : (
                <div className="container-fluid">
                  <ul className="navbar-nav">
                    <li className="nav-item">
                      <a className="nav-link" aria-current="page" href="/login">Log in</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="/signup">Sign up</a>
                    </li>
                  </ul>
                </div>
            )}
          </span>
        </div>  
      </div>
    </nav>
  )
}
