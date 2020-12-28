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
            id: cookies.get('id'),
            chat: [],
        }
        this.accordion = this.accordion.bind(this)
        this.tab = this.tab.bind(this)
        this.sendChat = this.sendChat.bind(this)
        this.replyChat = this.replyChat.bind(this)
    }

    componentDidMount(){
        this.getChat()
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
                chat.Chat= [{mesage: data[x].value, sender: this.state.id}]
            }
            console.log(chat)
            db.collection('Admin').doc('Chats').collection(data[0]['value']).doc('chat').set({messages: firebase.firestore.FieldValue.arrayUnion(chat)})
        }
        
    }

    replyChat(e,id){
        e.preventDefault()
        let data = $('#reply').serializeArray()
        let chat = {}
        for(let x=0; x<data.length; x++){
            if(data[x].name === 'Topic'){
                chat.Topic= data[x].value
            }
            if(data[x].name === 'Chat'){
                chat.Chat = {mesage: data[x].value, sender: this.state.id}
                db.collection('Admin').doc('Chats').collection(this.state.id).doc('chat').get().then(Chats=>{
                    if(Chats.exists){
                        let chats = Chats.data().messages
                        chats[id]['Chat'].push(chat.Chat)
                        //console.log(chats[id])
                        db.collection('Admin').doc('Chats').collection(data[2].value).doc('chat').update({messages: firebase.firestore.FieldValue.arrayUnion(chats[id])})
    
                    }
                })
            }
        }


    getChat(){
        db.collection('Admin').doc('user').get().then(id=>{
            if(id.exists){
                let ids = id.data().id;
                for(let x=0; x<ids.length; x++){
                    db.collection('Admin').doc('Chats').collection(ids[x]).doc('chat').get()
                    .then(Chat=>{
                        if(Chat.exists){
                            let chat = Chat.data().messages
                            this.setState({chat: chat})
                            console.log(chat)
                        }
                    })
                }
            }
        })
    }

    render(){
        if(window.matchMedia("(max-width: 767px)").matches){
            return(
                <div className='w3-row'>
                    <div className='w3-col s6 w3-btn w3-deep-orange' onClick={(e)=>this.tab('chats','send')}>Chat</div>
                    <div className='w3-col s6 w3-btn w3-deep-orange' onClick={(e)=>this.tab('send','chats')}>Start Chat</div>
                    <div className='w3-col s12 m6 l6' id='chats'>
                        <div className='w3-col s12 m6 l6' id='chats'>
                            {
                                this.state.chat.map((arr, ind)=>{
                                    return(
                                        <div className='w3-margin-top'>
                                            <button onClick={(e)=>{this.accordion(e,ind)}} className="w3-btn w3-block w3-deep-orange" style={{marginTop: '50px'}}>{arr['Topic']}</button>
                                            <div id={ind} className="w3-hide w3-padding">
                                                <span className={this.state.id === arr['sender'] ? 'w3-right w3-round w3-padding w3-deep-orange' :'w3-left w3-round w3-padding w3-deep-orange'}>{arr['Chat']}</span>
                                                <form id='reply' className='w3-margin-top' onSubmit={this.replyChat}>
                                                    <input type='text' className='w3-border w3-input w3-margin-top' name='Chat' placeholder='Reply...' />
                                                    <input type='hidden' value={arr['Topic']} name='Topic' />
                                                    <input type='hidden' value={arr['sender']} name='sender' />
                                                    <div className='w3-center w3-margin-top'>
                                                        <button className='w3-btn w3-deep-orange'>Send</button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    )
                                })
                            }
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
            id: cookies.get('id'),
            chat: [],
        }
        this.accordion = this.accordion.bind(this)
        this.tab = this.tab.bind(this)
        this.sendChat = this.sendChat.bind(this)
        this.replyChat = this.replyChat.bind(this)
    }

    componentDidMount(){
        this.getChat()
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
                chat.Chat= [{mesage: data[x].value, sender: this.state.id}]
            }
            db.collection('Admin').doc('Chats').collection(this.state.id).doc('chat').set({messages: firebase.firestore.FieldValue.arrayUnion(chat)})
        }
        //console.log(data)
    }

    replyChat(e,id){
        e.preventDefault()
        let data = $('#reply').serializeArray()
        let chat = {}
        for(let x=0; x<data.length; x++){
            if(data[x].name === 'Topic'){
                chat.Topic= data[x].value
            }
            if(data[x].name === 'Chat'){
                chat.Chat = {mesage: data[x].value, sender: this.state.id}
                db.collection('Admin').doc('Chats').collection(this.state.id).doc('chat').get().then(Chats=>{
                    if(Chats.exists){
                        let chats = Chats.data().messages
                        chats[id]['Chat'].push(chat.Chat)
                        //console.log(chats[id])
                        db.collection('Admin').doc('Chats').collection(this.state.id).doc('chat').update({messages: firebase.firestore.FieldValue.arrayUnion(chats[id])})
    
                    }
                })
            }
        }
        //console.log(data)
    }

    getChat(){
        db.collection('Admin').doc('Chats').collection(this.state.id).doc('chat').get()
        .then(Chat=>{
            this.setState({chat: Chat.data().messages})
            console.log(Chat.data().messages)
        })

    }

    render(){
        if(window.matchMedia("(max-width: 767px)").matches){
            return(
                <div className='w3-row'>
                    <div className='w3-col s6 w3-btn w3-deep-orange' onClick={(e)=>this.tab('chats','send')}>Chat</div>
                    <div className='w3-col s6 w3-btn w3-deep-orange' onClick={(e)=>this.tab('send','chats')}>Start Chat</div>
                    <div className='w3-col s12 m6 l6' id='chats'>
                        {
                            this.state.chat.map((arr, ind)=>{
                                return(
                                    <div className='w3-margin-top'>
                                        <button onClick={(e)=>{this.accordion(e,ind)}} className="w3-btn w3-block w3-deep-orange" style={{marginTop: '50px'}}>{arr['Topic']}</button>
                                        <div id={ind} className="w3-hide w3-padding">
                                            <span className={this.state.id === arr['Chat'].map((ar, inn)=>{return ar[inn]}) ? 'w3-right w3-round w3-padding w3-deep-orange' :'w3-left w3-round w3-padding w3-deep-orange'}>{arr['Chat'].map((ar,inn)=>{return ar['mesage'][inn]})}</span>
                                            <form id='reply' className='w3-margin-top' onSubmit={(e)=>{this.replyChat(e,ind)}}>
                                                <input type='text' className='w3-border w3-input w3-margin-top' name='Chat' placeholder='Reply...' />
                                                <input type='hidden' value={arr['Topic']} name='Topic' />
                                                <div className='w3-center w3-margin-top'>
                                                    <button className='w3-btn w3-deep-orange'>Send</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className='w3-col s12 m6 l6' id='send' style={{display: 'none'}}>
                        <div className='w3-container w3-margin-top'>
                            <form id='chat' onSubmit={this.sendChat}>
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

class Teacher extends Component{
    constructor(props){
        super(props)
        const cookies = new Cookies()
        this.state = {
            user: cookies.get('user'),
        }

    }
}
