import React from 'react';
import '../index.css';
import './result.css';
import Nav from '../nav/nav';
import axios from 'axios'

class Result extends React.Component{
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

export default Result;