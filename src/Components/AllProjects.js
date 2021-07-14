import React, { Component } from "react";
import { Table, Skeleton, Button, Modal, Input,Form, message } from "antd";
import { axiosInstance } from "../axiosInterceptor";
export default class AllUsersDisp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      loading: false,
      profileData: null,
      isModalVisible: false,
      btnLoading:false,
    };
    this.getData = this.getData.bind(this);
    this.getUserInfo = this.getUserInfo.bind(this);
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
      title: "Owner",
      dataIndex: "owner",
      key: "owner",
      render(owner) {
        return owner.username;
      },
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
  getData() {
    this.setState({ ...this.state, loading: true });
    axiosInstance
      .get("/projects/admin/allProjects")
      .then((resp) => {
        this.setState({ ...this.state, loading: false, data: resp.data });
      })
      .catch((err) => {
        this.setState({ ...this.state, loading: false });
      });
  }
  componentDidMount() {
    this.getData();
    this.getUserInfo();
  }

  render() {
    console.log(this.state);
    return (
      <div className="dash_board_wrapper">
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
          <h2>Create a new Project</h2>
          <Form
            onFinish={(e) => {
              console.log(e);
              this.setState({...this.state,btnLoading:true});
              axiosInstance.post(`/projects/createProject/${e.owner}`,{
                  ...e
              }).then((res)=>{
                message.success('Project Created Successfully!');
                this.setState({
                    ...this.state,isModalVisible:false,btnLoading:false,
                },()=>{
                    this.getData();
                })
              })
              .catch((err)=>{
                  message.warning('Some error occured');
                this.setState({...this.state,btnLoading:false});
              })
            }}
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
          >
            <Form.Item
              label="Owner Id"
              name="owner"
              rules={[{ required: true, message: "Please input owner Id!" }]}
            >
              <Input></Input>
            </Form.Item>
            <Form.Item
              label="Project Name"
              name="project_name"
              rules={[{ required: true, message: "Please input name!" }]}
            >
              <Input></Input>
            </Form.Item>
            <Form.Item
              label="Stage"
              name="stage"
              rules={[{ required: true, message: "Please input stage!" }]}
            >
              <Input></Input>
            </Form.Item>
            <Form.Item label="Project Description" name="description">
              <Input.TextArea></Input.TextArea>
            </Form.Item>
            <Form.Item
            wrapperCol={{
              xs: { span: 24, offset: 0 },
              sm: { span: 16, offset: 8 },
            }}
          >
            <Button type="primary" htmlType="submit" loading={this.state.btnLoading}>
              Create
            </Button>
          </Form.Item>
          </Form>
        </Modal>
        {this.state.loading ? (
          <Skeleton active={true}></Skeleton>
        ) : (
          <>
            <div className="dashboard_header">
              <h2>Admin Dashboard | Projects</h2>
              <div
                style={{
                  display: "flex",
                  alignContent: "center",
                  alignItems: "center",
                }}
              >
                <div className="profile_disp">
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
            <div>
              <Button
                style={{ marginLeft: "60px", marginBottom: "30px" }}
                onClick={() => {
                  this.setState({
                    ...this.state,
                    isModalVisible: !this.state.isModalVisible,
                  });
                }}
              >
                Add New Project
              </Button>
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
