import React, { useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import {
  changeUsername,
  changePassword,
  changeUsernameErr,
  changePasswordErr,
} from '../store/actions/signInAction';
import GreetingModal from '../components/GreetingModal';

export default function LoginPage() {
  const username = useSelector((state) => state.signInReducer.username);
  const password = useSelector((state) => state.signInReducer.password);
  const usernameErr = useSelector((state) => state.signInReducer.usernameErr);
  const passwordErr = useSelector((state) => state.signInReducer.passwordErr);

  const [showModal, setShowModal] = useState(localStorage.getItem('jwt-token'));

  const dispatch = useDispatch();

  function handleUsernameChange(usr) {
    dispatch(changeUsername(usr));

    let err = 'Username must be a valid email address';
    if (!usr.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i))
      dispatch(changeUsernameErr(err));
    else dispatch(changeUsernameErr(''));
  }

  function handlePasswordChange(pass) {
    dispatch(changePassword(pass));

    let err = 'Password must be at least 4 characters long';
    if (pass.length < 4) dispatch(changePasswordErr(err));
    else dispatch(changePasswordErr(''));
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
