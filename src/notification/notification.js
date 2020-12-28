import React, { Component } from 'react'
import Nav from '../nav/nav'
import { db, firebase } from '../database'
import { Cookies } from 'react-cookie'
import $ from 'jquery'
//import folder from '../assets/img/folder.svg'

export default class Notification extends Component {
    constructor(props) {
        super(props);
        const cookies = new Cookies();
        this.state = {
            id: cookies.get('id'),
            user: cookies.get('user'),
            notifications: [],
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
    constructor(props) {
        super(props);
        const cookies = new Cookies();
        this.state = {
            users: cookies.get('users'),
            id : cookies.get('id'),
            notifications: [],
        }
        this.tab = this.tab.bind(this)
        this.createNotification = this.createNotification.bind(this)
        this.accordion = this.accordion.bind(this)
    }
    
    componentDidMount(){
        this.getNotifications()
    }

    tab(show='create',hide='created'){
        if(show){
            //console.log(show)
            document.getElementById(show).style.display = 'block'
            document.getElementById(hide).style.display = 'none'
        }
    }

    createNotification(e){
        e.preventDefault()
        let data = $('#notification').serializeArray()
        console.log(data)
        let Not = {}
        db.collection('Admin').doc('Notifications').get().then(not=>{
            if(not.exists){
                let notifications = not.data().not
                for(let x=0; x<notifications.length; x++){
                    if(notifications[x].name === 'Title'){
                        Not.Title = notifications[x].value
                    }
                    if(notifications[x].name === 'Subject'){
                        Not.Subject= notifications[x].value
                    }
                    if(notifications[x].name === 'Message'){
                        Not.Message= notifications[x].value
                    }
                    
                }
                db.collection('Admin').doc('Notifications').update({not: firebase.firestore.FieldValue.arrayUnion(Not)}).then(()=>{alert('Sent to database')})
            }else{
                db.collection('Admin').doc('Notifications').set({not: firebase.firestore.FieldValue.arrayUnion(Not)}).then(()=>{alert('Sent to database')})
            }
        })
    }

    getNotifications(){
        db.collection('Admin').doc('Notifications').get().then(not=>{
            if(not.exists){
                let notifications = not.data().not
                this.setState({notifications: notifications})
            }
        })
    }

    accordion(e, ind){
        var x = document.getElementById(ind);
        if (x.className.indexOf("w3-show") === -1) {
            x.className += " w3-show";
        } else {
            x.className = x.className.replace(" w3-show", "");
        }
    }

    render() {
        if(window.matchMedia("(max-width: 767px)").matches){
            return (
                <div>
                    <div className='w3-row'>
                        <div className='w3-col s6 w3-btn w3-deep-orange' onClick={(e)=>this.tab('create','created')}>Create Notification</div>
                        <div className='w3-col s6 w3-btn w3-deep-orange' onClick={(e)=>this.tab('created','create')}>Notifications</div>
                        <div id='create' className='w3-padding w3-margin-top'>
                            <form id='notification' onSubmit={this.createNotification}>
                                <div className='w3-col s6 w3-padding'>
                                    <input type='text' placeholder='Title' className='w3-input w3-border' name='Title' />
                                </div>
                                <div className='w3-col s6 w3-padding'>
                                    <input type='text' placeholder='Subject' className='w3-input w3-border' name='Subject' />
                                </div>
                                <textarea placeholder='Message...' className='w3-input w3-border w3-padding' name='Message'></textarea>
                                <div className='w3-center w3-margin-top'>
                                    <button className='w3-btn w3-deep-orange w3-round'>Send</button>
                                </div>
                            </form>
                        </div>
                        <div id='created' className='w3-margin-top' style={{display: 'none'}}>
                            {
                                this.state.notifications.map((arr, ind)=>{
                                    return(
                                        <div className='w3-margin-top'>
                                            <button onClick={(e)=>{this.accordion(e,ind)}} className="w3-btn w3-block w3-deep-orange" style={{marginTop: '50px'}}>{arr['Title']}</button>
                                            <div id={ind} className="w3-hide w3-border w3-padding">
                                                <p>{arr['Subject']}</p>
                                                <div className='w3-padding'>{arr['Message']}</div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            )
        }else{
            return (
                <div>
                    <div className='w3-row'>
                        <div className='w3-half'>
                            <div className='w3-center w3-margin-top'>
                                <span className='w3-padding w3-deep-orange'>Create Notifications</span>
                            </div>
                            <form className='w3-padding w3-margin-top'  id='notification' onSubmit={this.createNotification}>
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
                        <div className='w3-half'>
                            <div className='w3-center w3-margin-top'>
                                <span className='w3-padding w3-deep-orange'>Notifications</span>
                            </div>
                            <div id='created' className='w3-margin-top'>
                                {
                                    this.state.notifications.map((arr, ind)=>{
                                        return(
                                            <div className='w3-margin-top'>
                                                <button onClick={(e)=>{this.accordion(e,ind)}} className="w3-btn w3-block w3-deep-orange" style={{marginTop: '50px'}}>{arr['Title']}</button>
                                                <div id={ind} className="w3-hide w3-border w3-padding">
                                                    <p>{arr['Subject']}</p>
                                                    <div className='w3-padding'>{arr['Message']}</div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
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