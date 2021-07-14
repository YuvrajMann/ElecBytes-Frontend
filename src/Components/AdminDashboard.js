import React, { Component } from 'react'
import {Button} from 'antd'; 
import {Link} from 'react-router-dom';
export default class AdminDashboard extends Component {
    render() {
        return (
            <div className="admin_wrapper">
                <h2>
                Select which data you want to access
                </h2>
                
                <div className="admin_opts">
                    <Link to="/allUsers"><Button>Registered Users</Button></Link>
                    <Link to="/allProjects"><Button>All Projects</Button></Link> 
                </div>
            </div>
        )
    }
}
