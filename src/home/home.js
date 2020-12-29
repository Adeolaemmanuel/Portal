import React from 'react';
import './home.css';
import Nav from '../nav/nav';
import { db } from '../database'
//import $ from "jquery";
import User from '../user/user';
import { Redirect } from "react-router-dom";
import { Cookies } from 'react-cookie'



class Home extends React.Component{
    constructor(props){
        super(props)
        const cookie =  new Cookies()
        this.state = {
            logged: this.props['settings']['isLogged'],
            user: {},
            id: cookie.get('id'),
            rem: cookie.get('rem')
        }
        this.log = this.log.bind(this)
    }

    log(e){
        const cookie =  new Cookies()
        console.log(e);
        cookie.set('id', e['id'], '/')
        cookie.set('password', e['password'], '/')
        cookie.set('user', e['user'], '/')
        cookie.set('logged', true, '/')
        this.setState(state=>({
            logged: true,
            user:e
        }))
    }

    render(){
        if(this.state.logged || this.state.rem){
            return(
                <div>
                    <Redirect to='/User'>
                        <User url={this.state.url} />
                    </Redirect>
                </div>
            )
        }else{
            return(
                <div>
                    <Nav user={'portal'} />
                    <Login log = {this.log} url={this.state.url} />
                </div>
            )
        }
    }
}

class Login extends React.Component{
    constructor(props) {
        super(props);
        this.state= {}
        this.log = this.log.bind(this)
    }

    cookie =  new Cookies()
    
    
    log(e){
        e.preventDefault();
        var data = {
            id: e.target.elements.id.value,
            pass: e.target.elements.pass.value,
            rem: e.target.elements.remember.checked,
        }

        if(data.rem){
            this.cookie.set('rem', data.rem)
        }

        db.collection('Users').doc(data.id).get().then(user=>{
            if(user.exists){
                if(data.id === user.data().regNo && data.pass === user.data().password){
                    data['user'] = user.data().user
                    this.props.log(data)
                    //console.log(data);
                }
            }
        }).catch(e=>{console.log(e);})
    }

    render(){
        return (
            <div>
                <div className="w3-row">
                    <div className="w3-col w3-hide-small s12 m8 l8"><br /></div>
                    <div className="w3-rest w3-padding">
                        <div className="topLog">
                            <form onSubmit = {this.log}>
                                <input type="text" className="w3-input w3-border w3-round" placeholder="Reg No:" id="id" required />
                                <input type="password" className="w3-input w3-border w3-round w3-margin-top" placeholder="Password:" id="pass" required />
                                <div className='w3-center'>
                                    <input className=' w3-padding w3-margin-top' id='remember' type='checkbox' />
                                    <label className='w3-half w3-padding' htmlFor='remember'>Remember Login</label>
                                </div>
                                <button className="w3-block w3-deep-orange w3-btn w3-margin-top w3-round">Login</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home;