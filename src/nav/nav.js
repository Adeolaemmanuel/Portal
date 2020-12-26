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
                <Link to='/user' className='w3-bold w3-bar-item' style={{textDecoration:'none'}}>HOME</Link>
                <div className='w3-right'>
                    <p className='w3-bar-item'>
                        {props['user']}
                    </p>
                </div>
            </nav>
        </div>
    )
}

const Student = (props)=>{
    return(
        <div>
            <nav className="w3-bar w3-deep-orange w3-padding">
                <Link to='/user' className='w3-bold w3-bar-item' style={{textDecoration:'none'}}>HOME</Link>
                <div className='w3-right'>
                    <p className='w3-bar-item'>
                        {props['user']}
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
                <Link to='/user' className='w3-bold w3-bar-item' style={{textDecoration:'none'}}>HOME</Link>
                <div className='w3-right'>
                    <p className='w3-bar-item'>
                        {props['user']}
                    </p>
                </div>
            </nav>
        </div>
    )
}

export default Nav;