import React from 'react';
import '../index.css';
import './dashboard.css';
import Nav from '../nav/nav';
//import { Link } from "react-router-dom";


class Dashboard extends React.Component{
    constructor(props){
        super(props)
        this.state = {}
    }

    render(){
        return(
            <div>
                <Nav />
                <div className="w3-container">
                    <div className="w3-row">
                        <div className="w3-col s12 m4 l4">
                            <User />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const User = ()=>{


    return(
        <div>
            <div className="w3-container">
                <p>Name</p>
            </div>
        </div>
    )
}

export default Dashboard;