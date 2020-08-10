import React from 'react';

export default function LoginPage() {
  function validateUsername(username) {}

  return (
    <div className="login-page">
      <div className="container">
        <div className="row align-items-center justify-content-center">
          {/* form */}
          <div className="login-form col-lg-7 col-md-9">
            {/* header */}
            <div className="header">
              <p className="login-header-text">Login Form</p>
            </div>
            {/* header */}
            {/* content */}
            <div className="content">
              <div className="login-form">
                <div className="form-group">
                  <input
                    type="text"
                    className="login-input"
                    placeholder="Username"
                  />
                  <i className="username-icon fa fa-user" />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="login-input"
                    placeholder="Password"
                  />
                  <i class="password-icon fa fa-lock"></i>
                </div>
                <button className="signin-btn">Sign In</button>
              </div>
            </div>
            {/* content */}
          </div>
          {/* form */}
        </div>
      </div>
    </div>
  );
}
