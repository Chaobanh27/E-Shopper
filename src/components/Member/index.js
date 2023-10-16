import React from "react";
import Register from "./Register";
import Login from "./Login";

function index() {
  return (
    <div>
      <section id="form">
        <div className="container">
          <div className="row">
            <div className="col-sm-4 col-sm-offset-1">
              <div className="login-form">
                <h2>Login to your account</h2>
                <Login/>
              </div>
            </div>
            <div className="col-sm-1">
              <h2 className="or">OR</h2>
            </div>
            <div className="col-sm-4">
              <div className="signup-form">
                <h2>New User Signup!</h2>
                <Register />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default index;
