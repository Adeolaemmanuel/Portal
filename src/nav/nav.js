import React from 'react';
import '../index.css';
import './nav.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

class Nav extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            isLogged: this.props.isLogged
        }
    }

    render(){
        if(this.state){
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

export default Nav;