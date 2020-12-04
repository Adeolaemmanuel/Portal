import React from 'react';
import '../index.css';
import './nav.css';
import { Link } from "react-router-dom";

class Nav extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            isLogged: this.props['log'],
            name: this.props['user']['user']
        }
    }

    render(){
        if(this.state.name === "Student"){
            return (
                <Student name={this.state.name} />
            )
        }else if(this.state.name === "Admin"){
            return (
                <Admin name={this.state.name} />
            )
        }else if(this.state.name === "Teacher"){
            return (
                <Teacher name={this.state.name} />
            )
        }else{
            return(
                <div>
                    <Welcome />
                </div>
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

const Student = (props)=>{
    return(
        <div>
            <nav className="w3-bar w3-deep-orange w3-padding">
                <div className="w3-bar-item">
                    <b>
                        <Link to='/user'>{props.name}</Link>
                    </b>
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
                        <Link to='/user'>{props.name}</Link>
                    </b>
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
                        <Link to='/user'>{props.name}</Link>
                    </b>
                </div>
            </nav>
        </div>
    )
}

export default Nav;