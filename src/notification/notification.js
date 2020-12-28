import React, { Component } from 'react'
import Nav from '../nav/nav'
import { Cookies } from 'react-cookie'

export default class Notification extends Component {
    constructor(props) {
        super(props);
        const cookies = new Cookies();
        this.state = {
            id: cookies.get('id'),
            user: cookies.get('user')
        }
    }
    
    render(){
        if(this.state.user === 'Student'){
            return(
                <div>
                    <Nav />
                    <Student />
                </div>
            )
        }else if(this.state.user === 'Admin'){
            return(
                <div>
                    <Nav />
                    <Admin />
                </div>
            )
        }else if(this.state.user === 'Teacher'){
            return(
                <div>
                    <Nav />
                    <Teacher />
                </div>
            )
        }
    }
}

class Admin extends Component {
    render() {
        return (
            <div>
                <div className='w3-row'>
                    <div className='w3-half'>
                        <div className='w3-center w3-margin-top'>
                            <span className='w3-padding w3-deep-orange'>Send Notifications</span>
                        </div>
                        <form className='w3-padding w3-margin-top'>
                            <div className='w3-half w3-padding'>
                                <input type='text' placeholder='Title' className='w3-input w3-border' name='Title' />
                            </div>
                            <div className='w3-half w3-padding'>
                                <input type='text' placeholder='Subject' className='w3-input w3-border' name='Subject' />
                            </div>
                            <textarea placeholder='Message...' className='w3-input w3-border w3-padding' name='Message'></textarea>
                            <div className='w3-center w3-margin-top'>
                                <button className='w3-btn w3-deep-orange w3-round'>Send</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

class Student extends Component {
    render() {
        return (
            <div>
                
            </div>
        )
    }
}

class Teacher extends Component {
    render() {
        return (
            <div>
                
            </div>
        )
    }
}