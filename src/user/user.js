import React from 'react';
import '../index.css';
import './user.css';
import Nav from '../nav/nav';
import dashboard from './img/dashboard.svg';
import profile from './img/profile-user.svg';
import result from './img/result.svg';
import register from './img/stamped.svg';
import upload from './img/upload.svg';
import { Link } from "react-router-dom";
import { Cookies } from 'react-cookie'

class User extends React.Component{
    constructor(props){
        super(props)
        const cookie = new Cookies()
        this.state = {
            id: cookie.get('id'),
            user: cookie.get('user'),
            password: cookie.get('password'),
            url: this.props['url']
        }
    }

    render(){
        if(this.state.user === 'Student'){
            return(
                <div>
                    <Nav />
                    <Student />
                </div>
            )
        }else if(this.state.user === 'Admin'){
            return(
                <div>
                    <Nav />
                    <Admin />
                </div>
            )
        }else if(this.state.user === 'Teacher'){
            return(
                <div>
                    <Nav />
                    <Teacher />
                </div>
            )
        }
    }
}

class Student extends React.Component{

    render(){
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
                        <Link to="/result">
                            <div className="w3-col s6 m4 l4 w3-padding">
                                <div className="w3-card w3-padding w3-center w3-round">
                                    <img src={result} alt="result" className="svg" />
                                    <h4><b>Result</b></h4>
                                </div>
                            </div>
                        </Link>
                        <Link to='/profile'>
                            <div className="w3-col s6 m4 l4 w3-padding">
                                <div className="w3-card w3-padding w3-center w3-round">
                                    <img src={profile} alt="profile" className="svg" />
                                    <h4><b>Profile</b></h4>
                                </div>
                            </div>
                        </Link>
                        <Link to='/register'>
                            <div className="w3-col s6 m4 l4 w3-padding">
                                <div className="w3-card w3-padding w3-center w3-round">
                                    <img src={register} alt="register" className="svg" />
                                    <h4><b>Register</b></h4>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <p></p>
                </div>
            </div>
        )
    }
}

class Teacher extends React.Component{
    render(){
        return(
            <div>
    
            </div>
        )
    }
}

class Admin extends React.Component{
    render(){
        return(
            <div>
                <div className="w3-container w3-margin-right top">
                    <div className="w3-row">
                        <Link to="/register">
                            <div className="w3-col s6 m4 l4 w3-padding">
                                <div className="w3-card w3-padding w3-center w3-round">
                                    <img src={register} alt="register" className="svg" />
                                    <h4><b>Register</b></h4>
                                </div>
                            </div>
                        </Link>
                        <Link to="/result">
                            <div className="w3-col s6 m4 l4 w3-padding">
                                <div className="w3-card w3-padding w3-center w3-round">
                                    <img src={result} alt="result" className="svg" />
                                    <h4><b>Result</b></h4>
                                </div>
                            </div>
                        </Link>
                        <Link to='/profile'>
                            <div className="w3-col s6 m4 l4 w3-padding">
                                <div className="w3-card w3-padding w3-center w3-round">
                                    <img src={profile} alt="profile" className="svg" />
                                    <h4><b>Profile</b></h4>
                                </div>
                            </div>
                        </Link>
                        <Link to='/upload'>
                            <div className="w3-col s6 m4 l4 w3-padding">
                                <div className="w3-card w3-padding w3-center w3-round">
                                    <img src={upload} alt="upload" className="svg" />
                                    <h4><b>Upload</b></h4>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <p></p>
                </div>
            </div>
        )
    }
}

export default User;