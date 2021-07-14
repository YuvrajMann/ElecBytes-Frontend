import React, { Component, createRef } from "react";
import { Table, Skeleton, Button, Modal, Form, Input, message } from "antd";
import { axiosInstance } from "../axiosInterceptor";

export default class NormalDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: null,
      profileData: null,
      isModalVisible: false,
      formLoading:false,
    };
    this.getData = this.getData.bind(this);
    this.getUserInfo = this.getUserInfo.bind(this);
    this.formRef = createRef();
  }

  getUserInfo() {
    this.setState({ ...this.state, loading: true });
    axiosInstance
      .get("/users")
      .then((resp) => {
        this.setState({
          ...this.state,
          loading: false,
          profileData: resp.data,
        });
      })
      .catch((err) => {
        this.setState({ ...this.state, loading: false });
      });
  }
  getData() {
    this.setState({ ...this.state, loading: true });
    axiosInstance
      .get("/projects/usersProject")
      .then((resp) => {
        this.setState({ ...this.state, loading: false, data: resp.data });
      })
      .catch((err) => {
        this.setState({ ...this.state, loading: false });
      });
  }
  columns = [
    {
      title: "Project Id",
      dataIndex: "_id",
      key: "project_id",
    },
    {
      title: "Name",
      dataIndex: "project_name",
      key: "name",
    },
    {
      title: "Stage",
      dataIndex: "stage",
      key: "stage",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
  ];
  componentDidMount() {
    this.getData();
    this.getUserInfo();
  }
  render() {
    console.log(this.formRef);
    return (
      <div className="dash_board_wrapper">
        {this.state.loading ? (
          <Skeleton active={true}></Skeleton>
        ) : (
          <>
            <Modal
              visible={this.state.isModalVisible}
              footer={[]}
              onCancel={() => {
                this.setState({
                  ...this.state,
                  isModalVisible: !this.state.isModalVisible,
                });
              }}
            >
                <h2>Update Profile</h2>
              <Form
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                ref={this.formRef}
                onFinish={(e) => {
                  console.log(e);
                  this.setState({
                      ...this.state,formLoading:true
                  });
                  axiosInstance.post('/users/changeInfo',{...e}).then((resp)=>{
                    this.setState({
                        ...this.state,formLoading:false,isModalVisible:false
                    },()=>{
                        this.getUserInfo();
                    });
                    message.success('Details Updated Successfully');
                  })
                  .catch((err)=>{
                      message.warning('Some error occured');
                    this.setState({
                        ...this.state,formLoading:false
                    });
                  })
                }}
              >
                <Form.Item label="email" name="email">
                  <Input></Input>
                </Form.Item>
                <Form.Item label="firstname" name="firstname">
                  <Input></Input>
                </Form.Item>
                <Form.Item label="lastname" name="lastname">
                  <Input></Input>
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
                    loading={this.state.formLoading}
                  >
                    Apply Changes
                  </Button>
                </Form.Item>
              </Form>
            </Modal>
            <div className="dashboard_header">
              <h2>Normal Dashboard</h2>
              <div
                style={{
                  display: "flex",
                  alignContent: "center",
                  alignItems: "center",
                }}
              >
                <div
                  className="profile_disp"
                  onClick={() => {
                    this.setState(
                      {
                        ...this.state,
                        isModalVisible: !this.state.isModalVisible,
                      },
                      () => {
                          let resp=this.state.profileData;
                          console.log(resp);
                        this.formRef.current.setFieldsValue({
                          email: resp.email,
                          firstname: resp.firstName,
                          lastname: resp.lastName,
                        });
                      }
                    );
                  }}
                >
                  {this.state.profileData
                    ? this.state.profileData.username
                    : ""}
                </div>
                <Button
                  onClick={() => {
                    this.props.toggleLoggedIn();
                    delete localStorage.token;
                  }}
                >
                  Logout
                </Button>
              </div>
            </div>
            <div className="table_wrapper">
              <Table dataSource={this.state.data} columns={this.columns} />
            </div>
          </>
        )}
      </div>
    );
  }
}
