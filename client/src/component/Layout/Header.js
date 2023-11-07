import React, { useState, useEffect }  from 'react'
import { useJwt } from "react-jwt";
import { useNavigate } from 'react-router-dom';

function LogoutBtn() {
  const navigate = useNavigate();
  const handleLogout = () => {
      // Logout : Remove token in local storage
      localStorage.removeItem('token');
      navigate('/');
      window.location.reload();
      };      
  return (
      <button onClick={handleLogout} className="btn btn-secondary">Logout</button>
  )
}

function LoginBtn() {
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate('/login');
  };
  return (
      <button onClick={handleLogin} className="btn btn-secondary">Login</button>
  )
}

function SignupBtn() {
  const navigate = useNavigate();
  const handleSignup = () => {
    navigate('/signup');
  };
  return (
      <button onClick={handleSignup} className="btn btn-secondary">Sign Up</button>
  )
}

const token = localStorage.getItem('token');

export default function Header() {

  const { decodedToken, isExpired } = useJwt(token);
  const [data, setData] = useState(decodedToken);
  
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
        <a className="navbar-brand" href="/"><strong>Book Hub</strong></a>
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
                    <a className="nav-link" href="/mybooks">My Listing</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/myinfo">My Info</a>
                  </li>
                  <li className="nav-item">
                    <span className="nav-link mr-3"> Welcome, {data}</span>
                  </li>
                  <li className="nav-item">
                    <LogoutBtn />
                  </li>
                </ul>
              </div>
            ) : (
                <div className="container-fluid">
                  <ul className="navbar-nav">
                    <li className="nav-item mr-3">
                      <LoginBtn />
                    </li>
                    <li className="nav-item">
                      <SignupBtn />
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
