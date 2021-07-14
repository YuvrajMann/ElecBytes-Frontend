import React, { Component } from "react";
import { Table,Skeleton,Button } from "antd";
import { axiosInstance } from "../axiosInterceptor";
export default class AllUsersDisp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      loading: false,
      profileData: null,
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
      title: "User Id",
      dataIndex: "_id",
      key: "project_id",
    },
    {
        title: "Admin",
        dataIndex: "admin",
        key: "admin",
        render(data){

            if(data){
                return ('True')
            }
            else{
                return ('False')
            }
        }
      },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Firstname",
      dataIndex: "firstName",
      key: "firstname",
    },
    {
        title: "Latname",
        dataIndex: "lastName",
        key: "lastname",
    },
  ];
  getData() {
    this.setState({ ...this.state, loading: true });
    axiosInstance
      .get("/users/allUser")
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
        {this.state.loading ? (
          <Skeleton active={true}></Skeleton>
        ) : (
          <>
            <div className="dashboard_header">
              <h2>Admin Dashboard | Registered Users</h2>
              <div
                style={{
                  display: "flex",
                  alignContent: "center",
                  alignItems: "center",
                }}
              >
                <div
                  className="profile_disp"
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
