import React from 'react';
import '../index.css';
import './result.css';
import Nav from '../nav/nav';
//import axios from 'axios'

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
                <div className='w3-container'>
                <h2 className='w3-center w3-padding'>Search for student Result</h2>
                    <div className='w3-row'>
                        <div className="w3-col s12 m3 l3 w3-padding">
                            <input className='w3-input w3-border w3-round' type='text' id='id' placeholder="Input Reg" />
                        </div>
                        <div className="w3-col m3 l3 w3-padding">
                            <input className='w3-input w3-border w3-round' type="text" id='class' placeholder="Class" />
                        </div>
                        <div className="w3-col s12 m3 l3 w3-padding">
                            <input className='w3-input w3-border w3-round' type='text' id='term' placeholder="Term" />
                        </div>
                        <div className="w3-col s12 m3 l3 w3-padding">
                            <button className='w3-btn w3-deep-orange w3-round w3-block'>Search</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Result;