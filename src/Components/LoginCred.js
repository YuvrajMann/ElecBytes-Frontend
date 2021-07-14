import React, { Component } from "react";
import { Button, Form, Input,message } from "antd";
import "../App.css";
import  axios  from "axios";
import { axiosInstance } from "../axiosInterceptor";
export default class LoginCred extends Component {
    constructor(props){
        super(props);
        this.state={
            btnLoading:false,
        }
        this.handleLogin=this.handleLogin.bind(this);
    }
  handleLogin(username, password) {
      this.setState(
        {
          ...this.state,
          btnLoading: true,
        },
        () => {
          axios
            .post("http://localhost:3000/users/login", {
              username: username,
              password: password,
            })
            .then((res) => {
              this.setState({
                ...this.state,
                btnLoading: false,
              });
              const newToken = res.data.token;
              axiosInstance.interceptors.request.use((config) => {
                const auth = `Bearer ${newToken}`;

                config.headers.Authorization = `Bearer ${newToken}`;
                return config;
              });
              localStorage.setItem("token", newToken);
              this.props.history.push('/');
              this.props.toggleLoggedIn();
          
              message.success("Successfully logged in");
            })
            .catch((err) => {
              this.setState({
                ...this.state,
                btnLoading: false,
              });
              console.log(err);
            });
        }
      );
  }
  render() {
    return (
      <div className="login_cred_wrapper">
        <h2>Login</h2>

        <Form
          onFinish={(e) => {
            this.handleLogin(e.username,e.password);
          }}
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input></Input>
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              xs: { span: 24, offset: 0 },
              sm: { span: 16, offset: 8 },
            }}
          >
            <Button type="primary" htmlType="submit" loading={this.state.btnLoading}>
              Submit
            </Button>
          </Form.Item>
        </Form>
       
      </div>
    );
  }
}
