import React from 'react';
import '../index.css';
import './nav.css';
import { Link } from "react-router-dom";
import { Cookies } from 'react-cookie'
import logout from '../assets/img/logout.svg'

class Nav extends React.Component{
    constructor(props){
        super(props)
        const cookies = new Cookies();
        this.state = {
            user: cookies.get('user')
        }
    }

    render(){
        if(this.state.user === 'Admin'){
            return (
                <Admin  />
            )
        }else if(this.state.user === 'Student'){
            return (
                <Student user={this.state.user} />
            )
        }else if(this.state.user === 'Teacher'){
            return (
                <Teacher />
            )
        }else{
            return(
                <Welcome />
            )
        }
    }
}
class Welcome extends React.Component {
    constructor(props){
        super(props)
        const cookies = new Cookies();
        this.state = {
            id: cookies.get('id')
        }
    }


    render() {
        return(
            <div>
                <nav className="w3-bar w3-deep-orange w3-padding">
                    <div className="w3-bar-item">
                        <b>PORTAL</b>
                    </div>
                </nav>
            </div>
        )
    }
}


class Admin extends React.Component {
    constructor(props){
        super(props)
        const cookies = new Cookies();
        this.state = {
            user: cookies.get('user')
        }
        this.logout = this.logout.bind(this)
    }

    cookies = new Cookies();
    logout(){
        this.cookies.remove('rem')
        this.cookies.remove('id')
        this.cookies.remove('user')
        this.cookies.remove('password')
        window.location.assign('/')
    }


    render() {
        return(
            <div>
                <nav className="w3-bar w3-deep-orange">
                    <Link to='/user' className='w3-bar-item w3-margin-top w3-bold' style={{textDecoration:'none'}}>HOME</Link>
                    <div className='w3-right'>
                        <p className='w3-bar-item'>
                            {this.state.user}
                        </p>
                        <img className='w3-bar-item' src={logout} alt={logout} onClick={this.logout} style={{width: '100%', height: '50px'}} />
                    </div>
                </nav>
            </div>
        )
    }
}


class Student extends React.Component {
    constructor(props){
        super(props)
        const cookies = new Cookies();
        this.state = {
            user: cookies.get('user')
        }
        this.logout = this.logout.bind(this)
    }

    cookies = new Cookies();
    logout(){
        this.cookies.remove('rem')
        this.cookies.remove('id')
        this.cookies.remove('user')
        this.cookies.remove('password')
        window.location.assign('/')
    }


    render() {
        return(
            <div>
                <nav className="w3-bar w3-deep-orange">
                    <Link to='/user' className='w3-bar-item w3-margin-top w3-bold' style={{textDecoration:'none'}}>HOME</Link>
                    <div className='w3-right'>
                        <p className='w3-bar-item'>
                            {this.state.user}
                        </p>
                        <img className='w3-bar-item' src={logout} alt={logout} onClick={this.logout} style={{width: '100%', height: '50px'}} />
                    </div>
                </nav>
            </div>
        )
    }
}

class Teacher extends React.Component {
    constructor(props){
        super(props)
        const cookies = new Cookies();
        this.state = {
            user: cookies.get('user')
        }
        this.logout = this.logout.bind(this)
    }

    cookies = new Cookies();
    logout(){
        this.cookies.remove('rem')
        this.cookies.remove('id')
        this.cookies.remove('user')
        this.cookies.remove('password')
        window.location.assign('/')
    }


    render() {
        return(
            <div>
                <nav className="w3-bar w3-deep-orange">
                    <Link to='/user' className='w3-bar-item w3-margin-top w3-bold' style={{textDecoration:'none'}}>HOME</Link>
                    <div className='w3-right'>
                        <p className='w3-bar-item'>
                            {this.state.user}
                        </p>
                        <img className='w3-bar-item w3-text-white' src={logout} alt={logout} onClick={this.logout} style={{width: '70px', height: '70px'}} />
                    </div>
                </nav>
            </div>
        )
    }
}

export default Nav;