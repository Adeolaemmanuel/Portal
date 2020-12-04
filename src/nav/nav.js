import React from 'react';
import '../index.css';
import './nav.css';
import { Link } from "react-router-dom";

class Nav extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            isLogged: this.props['log'],
            name: ''
        }
        console.log(this.state);
    }

    render(){
        if(this.state.isLogged){
            return (
                <User  />
            )
        }else{
            return (
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

const User = (props)=>{
    return(
        <div>
            <nav className="w3-bar w3-deep-orange w3-padding">
                <div className="w3-bar-item">
                    <b>
                        <Link to='/user'>PORTAL</Link>
                    </b>
                </div>
            </nav>
        </div>
    )
}

export default Nav;