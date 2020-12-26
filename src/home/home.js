import React from 'react';
import '../index.css';
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
        this.state = {
            logged: this.props['settings']['isLogged'],
            user: {},
            url: this.props['settings']['url']
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
        if(this.state.logged){
            return(
                <div>
                    <Redirect to='/user'>
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
    
    
    log(e){
        e.preventDefault();
        var data = {
            id:e.target.elements.id.value,
            pass: e.target.elements.pass.value
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
                <div className="w3-container">
                    <div className="w3-row">
                        <div className="w3-col w3-hide-small m7 l7"><br /></div>
                        <div className="w3-rest">
                            <div className="w3-container topLog">
                                <form onSubmit = {this.log}>
                                    <input type="text" className="w3-input w3-border w3-round" placeholder="Reg No:" id="id" required />
                                    <input type="password" className="w3-input w3-border w3-round w3-margin-top" placeholder="Password:" id="pass" required />
                                    <div className='w3-center'>
                                        <label>Remember Login</label>
                                        <input type='checkbox' />
                                    </div>
                                    <button className="w3-block w3-deep-orange w3-btn w3-margin-top w3-round">Login</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home;