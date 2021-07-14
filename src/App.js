import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "./Components/Login";
import LoginCred from "./Components/LoginCred";
import NormalDashboard from "./Components/NormalDashboard";
import AdminDashboard from "./Components/AdminDashboard";
import AllUsersDisp from "./Components/AllUsersDisp";
import AllProjects from './Components/AllProjects.js';
import SignUp from './Components/SignUp.js';
import {axiosInstance} from './axiosInterceptor';
import { Skeleton } from "antd";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_type: null,
      isLoggedIn: false,
    };
    this.setUserType = this.setUserType.bind(this);
    this.toggleLoggedIn = this.toggleLoggedIn.bind(this);
  }
  toggleLoggedIn() {
    this.setState({
      ...this.state,
      isLoggedIn: !this.state.isLoggedIn,
    });
  }
  setUserType(type) {
    this.setState({
      ...this.state,
      user_type: type,
    });
    localStorage.setItem("user_type",type);
  }
  componentDidMount(){
    let token=localStorage.getItem('token');
    let user_type=localStorage.getItem('user_type');
    
    if(token){
      axiosInstance.interceptors.request.use((config) => {
        const auth = `Bearer ${token}`;

        config.headers.Authorization = `Bearer ${token}`;
        return config;
      });
      this.setState({
        ...this.state,
        isLoggedIn:true,
      },()=>{
        if(user_type){
          this.setUserType(user_type);
        }
      });
    }
    console.log(this.state);
   
  }
  render() {
    console.log(this.state);
    if (!this.state.isLoggedIn) {
      return (
        <Router>
          <Switch>
            <Route
              path="/"
              exact
              history={this.props.history}
              render={(props) => (
                <Login
                  user_type={this.state.user_type}
                  history={props.history}
                  setUserType={this.setUserType}
                ></Login>
              )}
            ></Route>
            <Route
              path="/login"
              history={this.props.history}
              exact
              render={(props) => (
                <LoginCred
                  history={props.history}
                  toggleLoggedIn={this.toggleLoggedIn}
                ></LoginCred>
              )}
            ></Route>
            <Route
              path="/signup"
              exact
              history={this.props.history}
              render={(props) => (
                <SignUp
                  history={props.history}
                  toggleLoggedIn={this.toggleLoggedIn}
                ></SignUp>
              )}
            ></Route>
            
          </Switch>
        </Router>
      );
    } else {
      if(this.state.user_type=="normal"){
        return (
          <Router>
          <Switch>
            <Route
              path="/"
              render={(props) => (
                <NormalDashboard history={props.history}  toggleLoggedIn={this.toggleLoggedIn}></NormalDashboard>
              )}
              exact
            ></Route>
          </Switch>
          </Router>
        );
      }
      else if(this.state.user_type=="admin"){
        return (
            <Router>
            <Switch>
              <Route
                path="/"
                render={(props) => (
                  <AdminDashboard history={props.history}  toggleLoggedIn={this.toggleLoggedIn}></AdminDashboard>
                )}
                exact
              ></Route>
               <Route
                path="/allUsers"
                render={(props) => (
                  <AllUsersDisp history={props.history}  toggleLoggedIn={this.toggleLoggedIn}></AllUsersDisp>
                )}
                exact
              ></Route>
              <Route
                path="/allProjects"
                render={(props) => (
                  <AllProjects history={props.history}  toggleLoggedIn={this.toggleLoggedIn}></AllProjects>
                )}
                exact
              ></Route>
            </Switch>
            </Router>
          );
      }
      else{
        return(
          <Skeleton active={true}></Skeleton>
        )
      }
    }
  }
}
