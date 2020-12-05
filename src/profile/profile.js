import React from 'react';
import '../index.css';
import './profile.css';
import Nav from '../nav/nav';
import axios from 'axios'
import $ from 'jquery'
import { Cookies } from 'react-cookie'

class Profile extends React.Component{
    constructor(props){
        super(props)
        const cookies = new Cookies()
        this.state = {
            user: cookies.get('user'),
            url: this.props['url'],
            id: cookies.get('id'),
        }
    }

    courseFrom(e){
        e.preventDefault()
        let data = $('#course').serializeArray()
        axios.post(`${this.state.url['url']}courseForm`, data, {headers: {'contentType': "application/json"}}).then(res=>{

        })
    }

    render(){
        if(this.state.user === 'Admin'){
            return(
                <div>
                    <Nav user={this.state.user} />
                    <Admin />
                </div>
            )
        }else if(this.state.user === 'Student'){
            return(
                <div>
                    <Nav user={this.state.user} />
                    <Student user={this.state} />
                </div>
            )
        }else if (this.state.user === 'Teacher'){
            return(
                <div>
                    <Nav user={this.state.user} />
                </div>
            )
        }
    }
}

const Admin = ()=>{
    return (
        <div className='w3-row'>
            <div className='w3-container'>
                <div className='w3-col s12 m6 l6'>
                    <h1 className='w3-center'>Search for User</h1>
                    <div className='w3-row'>
                        <form>
                            <div className='w3-half'>
                                <input type='search' placeholder='Reg number' className='w3-input w3-border w3-round' />
                            </div>
                            <div className='w3-half'>
                                <button className='w3-btn w3-block w3-deep-orange w3-round'>Search</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

const Student = (props)=>{
    console.log(props);
    return (
        <div className='w3-row'>
            <div className='w3-container'>
                <div className='w3-col s12 m5 l5 w3-padding'>
                    <h1 className='w3-center'>PROFILE</h1>
                    <table className='w3-table-all'>
                        <tr>
                            <td><b>Reg No</b></td>
                            <td className='w3-right'>{props['user']['id']}</td>
                        </tr>
                        <tr>
                            <td><b>User</b></td>
                            <td className='w3-right'>{props['user']['user']}</td>
                        </tr>
                    </table>
                </div>
                <div className='w3-rest w3-padding'>
                    <h1 className='w3-center'>UPDATE PROFILE</h1>
                    <form>
                        <div className='w3-row'>
                            <div className='w3-half w3-padding'>
                                <input type="text" placeholder='First Name' className='w3-input w3-border w3-round' />   
                            </div>
                            <div className='w3-half w3-padding'>
                                <input type="text" placeholder='Last Name' className='w3-input w3-border w3-round' />   
                            </div>
                        </div>
                        <div className='w3-row'>
                            <div className='w3-half w3-padding'>
                                <input type="text" placeholder='Sponsor Name' className='w3-input w3-border w3-round' />   
                            </div>
                            <div className='w3-half w3-padding'>
                                <input type="email" placeholder='Email' className='w3-input w3-border w3-round' />   
                            </div>
                        </div>
                        <div className='w3-row'>
                            <div className='w3-half w3-padding'>
                                <select className='w3-input w3-border'>
                                    <option value='male'>Male</option>
                                    <option value='female'>Female</option>
                                </select>   
                            </div>
                            <div className='w3-half w3-padding'>
                                <input type="date" placeholder='DOB' className='w3-input w3-border w3-round' />   
                            </div>
                        </div>
                        <button className='w3-btn w3-margin-bottom w3-margin-top w3-round w3-block w3-deep-orange'>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Profile;