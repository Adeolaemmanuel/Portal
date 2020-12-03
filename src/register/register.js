import React from 'react';
import '../index.css';
import './register.css';
import Nav from '../nav/nav';
import axios from 'axios'

class Register extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            user: []
        }
    }

    componentDidMount(){
        let url = 'http://localhost:1996/'
        axios.get(`${url}getUsers`).then(users=>{
            this.setState({
                user: users.data['users']
            })
        })
    }

    render(){
        return(
            <div>
                <Nav />
                <div className='w3-row'>
                    <div className='w3-container'>
                        <div className='w3-col s12 m6 l6 w3-center w3-padding top'>
                            <form className='w3-padding'>
                                <input type="text" className="w3-input w3-border w3-round" placeholder="Reg No:" id="id" style={{width: '400px'}} />
                                <select className='w3-input w3-border w3-round w3-margin-top' id='user' style={{width: '400px'}}>
                                    <option value='Student'>Student</option>
                                    <option value='Teacher'>Teacher</option>
                                </select>
                                <input type="password" className="w3-input w3-border w3-round w3-margin-top" placeholder="password:" id="pass" style={{width: '400px'}} />
                                <button className="w3-block w3-deep-orange w3-btn w3-margin-top w3-round" style={{width: '400px'}}>Register</button>
                            </form>
                        </div>
                        <div className='w3-col s12 m6 l6 w3-center w3-padding'>
                            <div className='w3-margin-top'>
                                <input className='w3-input w3-border w3-round' type="search" placeholder="Search user" />
                            </div>
                            <div className='w3-container'>
                                <ul className='w3-ul w3-card-4 w3-margin-top w3-padding'>
                                    {
                                        this.state.user.map((arr,ind)=>{
                                            <ul key={ind}>{ind['user']}</ul>
                                        })
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}



export default Register;