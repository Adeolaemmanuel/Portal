import React, { Component } from 'react'
import { Cookies } from 'react-cookie'
import Nav from '../nav/nav';
//import { db } from '../database'
import $ from 'jquery'
import { db, firebase } from '../database';

export default class Chat extends Component{
    constructor(props){
        super(props)
        const cookies = new Cookies()
        this.state = {
            user: cookies.get('user'),
        }

    }


    render(){
        if(this.state.user === "Admin"){
            return (
                <div>
                    <Nav user={this.state.user} />
                    <Admin url={this.state.url} />
                </div>
            )
        }else if(this.state.user === 'Student'){
            return(
                <div>
                    <Nav user={this.state.user} />
                    <Student data={this.state} />
                </div>
            )
        }else if(this.state.user === 'Teacher'){
            return(
                <div>
                    <Nav user={this.state.user} />
                    <Teacher data={this.state} />
                </div>
            )
        }
    }
}


class Admin extends Component{
    constructor(props){
        super(props)
        const cookies = new Cookies()
        this.state = {
            user: cookies.get('user'),
        }
        this.accordion = this.accordion.bind(this)
        this.tab = this.tab.bind(this)
        this.sendChat = this.sendChat.bind(this)
    }

    accordion(e, ind){
        var x = document.getElementById(ind);
        if (x.className.indexOf("w3-show") === -1) {
            x.className += " w3-show";
        } else {
            x.className = x.className.replace(" w3-show", "");
        }
    }

    tab(show='chats',hide='send'){
        if(show){
            //console.log(show)
            document.getElementById(show).style.display = 'block'
            document.getElementById(hide).style.display = 'none'
        }
    }

    sendChat(e){
        e.preventDefault()
        let data = $('#chat').serializeArray()
        let chat = {}
        for(let x=0; x<data.length; x++){
            if(data[x].name === 'Topic'){
                chat.Topic= data[x].value
            }
            if(data[x].name === 'Chat'){
                chat.Chat= data[x].value
            }
            db.collection('Admin').doc('Chats').collection(data['Reg']).doc('chat').set({mesages: firebase.firestore.FieldValue.arrayUnion(chat)})
        }
        console.log(data)
    }

    render(){
        if(window.matchMedia("(max-width: 767px)").matches){
            return(
                <div className='w3-row'>
                    <div className='w3-col s6 w3-btn w3-deep-orange' onClick={(e)=>this.tab('chats','send')}>Chat</div>
                    <div className='w3-col s6 w3-btn w3-deep-orange' onClick={(e)=>this.tab('send','chats')}>Start Chat</div>
                    <div className='w3-col s12 m6 l6' id='chats'>
                        <div className='w3-center w3-margin-top'>
                            <span className='w3-padding w3-deep-orange'>Chat</span>
                        </div>
                    </div>
                    <div className='w3-col s12 m6 l6' id='send' style={{display: 'none'}}>
                        <div className='w3-container w3-margin-top'>
                            <form id='chat' onSubmit={this.sendChat}>
                                <div className='w3-col s12 m6 l6 w3-padding'>
                                    <input className='w3-border w3-input' placeholder='Reg No' name='Reg' />
                                </div>
                                <div className='w3-col s12 m6 l6 w3-padding'>
                                    <input className='w3-border w3-input' placeholder='Topic' name='Topic' />
                                </div>
                                <div className='w3-margin-top'>
                                    <input className='w3-border w3-input' placeholder='Chat' name='Chat' />
                                </div>
                                <div className='w3-center w3-margin-top'>
                                    <button className='w3-btn w3-deep-orange w3-round'>Send</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )
        }else{
            return(
                <div className='w3-row'>
                    <div className='w3-col s12 m6 l6'>
                        <div className='w3-center w3-margin-top'>
                            <span className='w3-padding w3-deep-orange'>Chat</span>
                        </div>
                    </div>
                    <div className='w3-col s12 m6 l6'>
                        <div className='w3-center w3-margin-top'>
                            <span className='w3-padding w3-deep-orange'>Start Chat</span>
                        </div>
                        <div className='w3-container w3-margin-top'>
                            <form>
                                <div className='w3-col s12 m6 l6 w3-padding'>
                                    <input className='w3-border w3-input' placeholder='Reg No' name='Reg' />
                                </div>
                                <div className='w3-col s12 m6 l6 w3-padding'>
                                    <input className='w3-border w3-input' placeholder='Topic' name='Topic' />
                                </div>
                                <div className='w3-margin-top'>
                                    <input className='w3-border w3-input' placeholder='Reg No' name='Chat' />
                                </div>
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
    
}

class Student extends Component{
    constructor(props){
        super(props)
        const cookies = new Cookies()
        this.state = {
            user: cookies.get('user'),
        }

    }
}

class Teacher extends Component{
    constructor(props){
        super(props)
        const cookies = new Cookies()
        this.state = {
            user: cookies.get('user'),
        }

    }
}
