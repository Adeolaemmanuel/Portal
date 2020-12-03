import React from 'react';
import '../index.css';
import './user.css';
import Nav from '../nav/nav';
import dashboard from './img/dashboard.svg';
import profile from './img/profile-user.svg';
import result from './img/result.svg';
import { Link } from "react-router-dom";

class User extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            settings: this.props
        }
    }

    render(){
        if(true){
            return(
                <div>
                    <Nav />
                    <Students />
                </div>
            )
        }
    }
}

const Students = ()=>{
    return (
        <div>
            <div className="w3-container w3-margin-right top">
                <div className="w3-row">
                    <Link to="/dashboard">
                        <div className="w3-col s6 m4 l4 w3-padding">
                            <div className="w3-card w3-padding w3-center w3-round">
                                <img src={dashboard} alt="dashboard" className="svg" />
                                <h4><b>Dashboard</b></h4>
                            </div>
                        </div>
                    </Link>
                    <div className="w3-col s6 m4 l4 w3-padding">
                        <div className="w3-card w3-padding w3-center w3-round">
                            <img src={result} alt="result" className="svg" />
                            <h4><b>Result</b></h4>
                        </div>
                    </div>
                    <div className="w3-col s6 m4 l4 w3-padding">
                        <div className="w3-card w3-padding w3-center w3-round">
                            <img src={profile} alt="profile" className="svg" />
                            <h4><b>Profile</b></h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default User;