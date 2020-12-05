import React from 'react';
import '../index.css';
import './result.css';
import Nav from '../nav/nav';
//import axios from 'axios'
import { Cookies } from 'react-cookie'

class Result extends React.Component{
    constructor(props){
        super(props)
        const cookies = new Cookies()
        this.state = {
            user: cookies.get('user'),
            url: this.props['url'],
            users: ''
        }
    }

    render(){
        return(
            <div>
                <Nav user={this.state.user} />
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
                    <div className="w3-container">
                        <div className='w3-container w3-border'>
                            <div className='w3-row'>
                                <div className='w3-col s3 m4 l4'>
                                    {
                                        //space for user picture
                                    }
                                </div>
                                <div>
                                    {
                                        //space for name,Term,Class etc
                                    }
                                </div>
                            </div>
                        </div>
                        <table className='w3-table w3-padding w3-border'>
                            <thead>
                                <th>SUBJECT</th>
                                <th>GRADE</th>
                                <th>SCORE</th>
                            </thead>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}

export default Result;