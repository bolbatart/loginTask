import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GreetingModal from '../components/GreetingModal';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameErr, setUsernameErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');
  const [showModal, setShowModal] = useState(localStorage.getItem('jwt-token'));

  function handleUsernameChange(usr) {
    setUsername(usr);

    let err = 'Username must be a valid email address';
    if (!usr.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) setUsernameErr(err);
    else setUsernameErr('');
  }

  function handlePasswordChange(pass) {
    setPassword(pass);

    let err = 'Password must be at least 4 characters long';
    if (pass.length < 4) setPasswordErr(err);
    else setPasswordErr('');
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (username && password && !usernameErr && !passwordErr) {
      axios
        .post('http://localhost:5000/login', { username, password })
        .then((res) => {
          if (res.data.token) {
            localStorage.setItem('jwt-token', res.data.token);
            setShowModal(true);
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  }

  return (
    <div className="login-page">
      <div className="container">
        <div className="row align-items-center justify-content-center">
          {/* form */}
          <div className="login-form col-lg-7 col-md-9">
            <GreetingModal isOpen={showModal} />
            {/* header */}
            <div className="header">
              <p className="login-header-text">Login Form</p>
            </div>
            {/* header */}
            {/* content */}
            <div className="content">
              <form className="login-form" onSubmit={(e) => handleSubmit(e)}>
                <div className="form-group">
                  <div
                    className={
                      'form-input-container' +
                      (usernameErr ? ' error-input' : '')
                    }
                  >
                    <input
                      type="text"
                      className="login-input"
                      placeholder="Username"
                      name="username"
                      value={username}
                      onChange={(e) => handleUsernameChange(e.target.value)}
                    />
                    <i className="username-icon fa fa-user" />
                  </div>
                  <span className="form-error">{usernameErr}</span>
                </div>
                <div className="form-group">
                  <div
                    className={
                      'form-input-container' +
                      (passwordErr ? ' error-input' : '')
                    }
                  >
                    <input
                      type="password"
                      name="password"
                      className="login-input"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => handlePasswordChange(e.target.value)}
                    />
                    <i className="password-icon fa fa-lock"></i>
                  </div>
                  <span className="form-error">{passwordErr}</span>
                </div>

                <input type="submit" value="Sign In" className="signin-btn" />
                {/* </div> */}
              </form>
            </div>
            {/* content */}
          </div>
          {/* form */}
        </div>
      </div>
    </div>
  );
}
