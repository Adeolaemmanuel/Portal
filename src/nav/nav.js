import React from 'react';
import '../index.css';
import './nav.css';
import { Link } from "react-router-dom";

class Nav extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            user: this.props['user']
        }
        console.log(this.state);
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

const Welcome = ()=>{
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

const Admin = (props)=>{
    return(
        <div>
            <nav className="w3-bar w3-deep-orange w3-padding">
                <div className="w3-bar-item">
                    <b>
                        <Link to='/user'>HOME</Link>
                    </b>
                </div>
            </nav>
            <div className='w3-right'>
                    <p className='w3-bar-item'>
                        {props['user']['user']}
                    </p>
                </div>
        </div>
    )
}

const Student = (props)=>{
    return(
        <div>
            <nav className="w3-bar w3-deep-orange w3-padding">
                <div className="w3-bar-item">
                    <b>
                        <Link to='/user' style={{textDecoration:'none'}}>HOME</Link>
                    </b>
                </div>
                <div className='w3-right'>
                    <p className='w3-bar-item'>
                        {props['user']['user']}
                    </p>
                </div>
            </nav>
        </div>
    )
}

const Teacher = (props)=>{
    return(
        <div>
            <nav className="w3-bar w3-deep-orange w3-padding">
                <div className="w3-bar-item">
                    <b>
                        <Link to='/user'>HOME</Link>
                    </b>
                </div>
                <div className='w3-right'>
                    <p className='w3-bar-item'>
                        {props['user']['user']}
                    </p>
                </div>
            </nav>
        </div>
    )
}

export default Nav;