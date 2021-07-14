import React, { Component } from "react";
import { Form, Input, Button, message } from "antd";
import { axiosInstance } from "../axiosInterceptor";
export default class SignUp extends Component {
    constructor(props){
        super(props);
        this.state={
            btnLoading:false,

        }
    }

  render() {
    return (
      <div className="login_cred_wrapper">
        <h2>SignUp</h2>

        <Form
          onFinish={(e) => {
            console.log(e);
            this.setState({
                ...this.state,btnLoading:true
            })
            axiosInstance.post('/users/signup',{...e}).then((res)=>{
                message.success('Suceessfully signed Up');
                this.setState({
                    ...this.state,btnLoading:false
                })
                this.props.history.push('/');
            })
            .catch((err)=>{
                this.setState({
                    ...this.state,btnLoading:false
                })
                message.warn('Nopt able to signup try changing username or password')
            })
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
            label="Firstname"
            name="firstname"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Lastname"
            name="lastname"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              xs: { span: 24, offset: 0 },
              sm: { span: 16, offset: 8 },
            }}
          >
            <Button
              type="primary"
              htmlType="submit"
              loading={this.state.btnLoading}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}
