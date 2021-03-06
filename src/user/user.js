import React from 'react';
import './user.css';
import Nav from '../nav/nav';
import { FaUserPlus } from "react-icons/fa";
import cbt from '../assets/img/online-test.svg';
import settings from '../assets/img/settings.svg';
import { VscBellDot } from "react-icons/vsc";
import { Link } from "react-router-dom";
import { Cookies } from 'react-cookie'
import { FcManager,FcComboChart,FcViewDetails,FcFaq,FcUpload } from "react-icons/fc";


class User extends React.Component{
    constructor(props){
        super(props)
        const cookie = new Cookies()
        this.state = {
            id: cookie.get('id'),
            user: cookie.get('user'),
            password: cookie.get('password'),
            isLogged: this.props['isLogged']
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
                <div className="w3-container w3-margin-right w3-margin-top">
                    <div className="w3-row">
                        <Link to="/Dashboard">
                            <div className="w3-col s6 m4 l4 w3-padding">
                                <div className="w3-card w3-padding w3-center w3-round">
                                    <FcComboChart alt="dashboard" className="svg" />
                                    <h5><b>Dashboard</b></h5>
                                </div>
                            </div>
                        </Link>
                        <Link to="/Result">
                            <div className="w3-col s6 m4 l4 w3-padding">
                                <div className="w3-card w3-padding w3-center w3-round">
                                    <FcViewDetails alt="result" className="svg" />
                                    <h5><b>Result</b></h5>
                                </div>
                            </div>
                        </Link>
                        <Link to='/Profile'>
                            <div className="w3-col s6 m4 l4 w3-padding">
                                <div className="w3-card w3-padding w3-center w3-round">
                                    <FcManager className="svg" />
                                    <h5><b>Profile</b></h5>
                                </div>
                            </div>
                        </Link>
                        <Link to='Register'>
                            <div className="w3-col s6 m4 l4 w3-padding">
                                <div className="w3-card w3-padding w3-center w3-round">
                                    <FaUserPlus className="svg" />
                                    <h5><b>Register</b></h5>
                                </div>
                            </div>
                        </Link>
                        <Link to='/CBT'>
                            <div className="w3-col s6 m4 l4 w3-padding">
                                <div className="w3-card w3-padding w3-center w3-round">
                                    <img src={cbt} alt="profile" className="svg" />
                                    <h5><b>CBT</b></h5>
                                </div>
                            </div>
                        </Link>
                        <Link to='/Chat'>
                            <div className="w3-col s6 m4 l4 w3-padding">
                                <div className="w3-card w3-padding w3-center w3-round">
                                    <FcFaq alt="profile" className="svg" />
                                    <h5><b>Chat</b></h5>
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
            <div className='w3-row w3-margin-top'>
                <Link to="/Result">
                    <div className="w3-col s6 m4 l4 w3-padding">
                        <div className="w3-card w3-padding w3-center w3-round">
                            <FcViewDetails alt="result" className="svg" />
                            <h5><b>Result</b></h5>
                        </div>
                    </div>
                </Link>
                <Link to='/Upload'>
                    <div className="w3-col s6 m4 l4 w3-padding">
                        <div className="w3-card w3-padding w3-center w3-round">
                            <FcUpload className="svg" />
                            <h5><b>Upload</b></h5>
                        </div>
                    </div>
                </Link>
                <Link to='/Profile'>
                    <div className="w3-col s6 m4 l4 w3-padding">
                        <div className="w3-card w3-padding w3-center w3-round">
                            <FcManager alt="profile" className="svg" />
                            <h5><b>Profile</b></h5>
                        </div>
                    </div>
                </Link>
                <Link to='/CBT'>
                    <div className="w3-col s6 m4 l4 w3-padding">
                        <div className="w3-card w3-padding w3-center w3-round">
                            <img src={cbt} alt="profile" className="svg" />
                            <h5><b>CBT</b></h5>
                        </div>
                    </div>
                </Link>
                <Link to='/Chat'>
                    <div className="w3-col s6 m4 l4 w3-padding">
                        <div className="w3-card w3-padding w3-center w3-round">
                            <FcFaq alt="profile" className="svg" />
                            <h5><b>Chat</b></h5>
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
                <div className="w3-container w3-margin-right w3-margin-top">
                    <div className="w3-row">
                        <Link to="/Register">
                            <div className="w3-col s6 m4 l4 w3-padding">
                                <div className="w3-card w3-padding w3-center w3-round">
                                    <FaUserPlus className="svg" />
                                    <h5><b>Register</b></h5>
                                </div>
                            </div>
                        </Link>
                        <Link to="/Result">
                            <div className="w3-col s6 m4 l4 w3-padding">
                                <div className="w3-card w3-padding w3-center w3-round">
                                    <FcViewDetails alt="result" className="svg" />
                                    <h5><b>Result</b></h5>
                                </div>
                            </div>
                        </Link>
                        <Link to='/Profile'>
                            <div className="w3-col s6 m4 l4 w3-padding">
                                <div className="w3-card w3-padding w3-center w3-round">
                                    <FcManager alt="profile" className="svg" />
                                    <h5><b>Profile</b></h5>
                                </div>
                            </div>
                        </Link>
                        <Link to='/Upload'>
                            <div className="w3-col s6 m4 l4 w3-padding">
                                <div className="w3-card w3-padding w3-center w3-round">
                                    <FcUpload className="svg" />
                                    <h5><b>Upload</b></h5>
                                </div>
                            </div>
                        </Link>
                        <Link to='/CBT'>
                            <div className="w3-col s6 m4 l4 w3-padding">
                                <div className="w3-card w3-padding w3-center w3-round">
                                    <img src={cbt} alt="profile" className="svg" />
                                    <h5><b>CBT</b></h5>
                                </div>
                            </div>
                        </Link>
                        <Link to='/Notification'>
                            <div className="w3-col s6 m4 l4 w3-padding">
                                <div className="w3-card w3-padding w3-center w3-round">
                                    <VscBellDot  className="svg" />
                                    <h5><b>Notifications</b></h5>
                                </div>
                            </div>
                        </Link>
                        <Link to='/Chat'>
                            <div className="w3-col s6 m4 l4 w3-padding">
                                <div className="w3-card w3-padding w3-center w3-round">
                                    <FcFaq alt="profile" className="svg" />
                                    <h5><b>Chat</b></h5>
                                </div>
                            </div>
                        </Link>
                        <Link to='/Settings'>
                            <div className="w3-col s6 m4 l4 w3-padding">
                                <div className="w3-card w3-padding w3-center w3-round">
                                    <img src={settings} alt="profile" className="svg" />
                                    <h5><b>Settings</b></h5>
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