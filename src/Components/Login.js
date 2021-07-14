import React, { Component } from "react";
import { Button } from "antd";
import "../App.css";
import { Link } from "react-router-dom";

export default class Login extends Component {
  render() {
    return (
      <div className="login_level1">
        <h1>Select User Type</h1>
        <div className="opts_btn">
          <Link to="/login">
            <Button
              onClick={() => {
                this.props.setUserType("admin");
              }}
            >
              Admin User
            </Button>
          </Link>
          <Link to="/login">
            <Button
              onClick={() => {
                this.props.setUserType("normal");
              }}
            >
              Normal User
            </Button>
            
          </Link>
        </div>
        <h2 style={{marginTop:'20px'}}>OR</h2>
        <div className="opts_btn">
          <Link to="/signup">
          <Button type="primary" >
              Signup
            </Button>
          </Link>
       
            </div>
      </div>
    );
  }
}
