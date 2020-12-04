import React from 'react';
import '../index.css';
import './profile.css';
import Nav from '../nav/nav';
//import axios from 'axios'

class Profile extends React.Component{
    constructor(props){
        super(props)
        this.state = {

        }
    }

    render(){
        return(
            <div>
                <Nav />
            </div>
        )
    }
}

export default Profile;