import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import {
  changeUsername,
  changePassword,
  changeUsernameErr,
  changePasswordErr,
} from '../store/actions/signInAction';
import CongratulationsModal from './CongratulationsModal';
import { useHistory } from 'react-router-dom';

export default function LoginForm() {
  const dispatch = useDispatch();
  const history = useHistory();

  const username = useSelector((state) => state.signInReducer.username);
  const password = useSelector((state) => state.signInReducer.password);
  const usernameErr = useSelector((state) => state.signInReducer.usernameErr);
  const passwordErr = useSelector((state) => state.signInReducer.passwordErr);

  const [showModal, setShowModal] = useState(localStorage.getItem('jwt-token'));
  const [wrongCredentialsErr, setWrongCredentialsErr] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:5000/')
      .then((res) => {})
      .catch((err) => {
        history.push('/internal-server-error');
      });
  }, []);

  function handleUsernameChange(usr) {
    dispatch(changeUsername(usr));

    let err = 'Username must be a valid email address';
    if (!usr.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i))
      dispatch(changeUsernameErr(err));
    else dispatch(changeUsernameErr(''));
  }

  function handlePasswordChange(pass) {
    dispatch(changePassword(pass));
    setWrongCredentialsErr('');

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
          if (err.response.status) {
            setWrongCredentialsErr('Wrong email or password');
          }
        });
    }
  }

  return (
    <div className="login-form">
      <div className="container">
        <div className="row">
          <div className="col col-12">
            <CongratulationsModal isOpen={showModal} />
            <div className="login-header">
              <span>Login Form</span>
            </div>
            <div className="login-content">
              <form onSubmit={(e) => handleSubmit(e)}>
                <div className="form-group">
                  <div
                    className={
                      'form-group-input' +
                      (usernameErr ? ' form-group-err' : '')
                    }
                  >
                    <input
                      type="text"
                      placeholder="Username"
                      name="username"
                      value={username}
                      onChange={(e) => handleUsernameChange(e.target.value)}
                    />
                    <i className="username-icon fa fa-user" />
                  </div>
                  <span>{usernameErr}</span>
                </div>
                <div className="form-group">
                  <div
                    className={
                      'form-group-input' +
                      (passwordErr ? ' form-group-err' : '')
                    }
                  >
                    <input
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => handlePasswordChange(e.target.value)}
                    />
                    <i className="password-icon fa fa-lock"></i>
                  </div>
                  <span>{passwordErr ? passwordErr : wrongCredentialsErr}</span>
                </div>
                <input className="signin-btn" type="submit" value="Sign In" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
