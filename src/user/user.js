import React from 'react';
import '../index.css';
import './user.css';
import Nav from '../nav/nav';
import dashboard from '../assets/img/dashboard.svg';
import profile from '../assets/img/profile-user.svg';
import result from '../assets/img/result.svg';
import register from '../assets/img/stamped.svg';
import upload from '../assets/img/upload.svg';
import cbt from '../assets/img/online-test.svg';
import settings from '../assets/img/settings.svg';
import not from '../assets/img/not.svg';
import chat from '../assets/img/chat.svg';
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
                        <Link to='/ctb'>
                            <div className="w3-col s6 m4 l4 w3-padding">
                                <div className="w3-card w3-padding w3-center w3-round">
                                    <img src={cbt} alt="profile" className="svg" />
                                    <h4><b>CBT</b></h4>
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
            <div className='w3-row top'>
                <Link to="/result">
                    <div className="w3-col s6 m4 l4 w3-padding">
                        <div className="w3-card w3-padding w3-center w3-round">
                            <img src={result} alt="result" className="svg" />
                            <h4><b>Result</b></h4>
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
                <Link to='/profile'>
                    <div className="w3-col s6 m4 l4 w3-padding">
                        <div className="w3-card w3-padding w3-center w3-round">
                            <img src={profile} alt="profile" className="svg" />
                            <h4><b>Profile</b></h4>
                        </div>
                    </div>
                </Link>
                <Link to='/ctb'>
                    <div className="w3-col s6 m4 l4 w3-padding">
                        <div className="w3-card w3-padding w3-center w3-round">
                            <img src={cbt} alt="profile" className="svg" />
                            <h4><b>CBT</b></h4>
                        </div>
                    </div>
                </Link>
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
                        <Link to='/cbt'>
                            <div className="w3-col s6 m4 l4 w3-padding">
                                <div className="w3-card w3-padding w3-center w3-round">
                                    <img src={cbt} alt="profile" className="svg" />
                                    <h4><b>CBT</b></h4>
                                </div>
                            </div>
                        </Link>
                        <Link to='/not'>
                            <div className="w3-col s6 m4 l4 w3-padding">
                                <div className="w3-card w3-padding w3-center w3-round">
                                    <img src={not} alt="profile" className="svg" />
                                    <h4><b>Notifications</b></h4>
                                </div>
                            </div>
                        </Link>
                        <Link to='/ctb'>
                            <div className="w3-col s6 m4 l4 w3-padding">
                                <div className="w3-card w3-padding w3-center w3-round">
                                    <img src={chat} alt="profile" className="svg" />
                                    <h4><b>Chat</b></h4>
                                </div>
                            </div>
                        </Link>
                        <Link to='/settings'>
                            <div className="w3-col s6 m4 l4 w3-padding">
                                <div className="w3-card w3-padding w3-center w3-round">
                                    <img src={settings} alt="profile" className="svg" />
                                    <h4><b>Settings</b></h4>
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