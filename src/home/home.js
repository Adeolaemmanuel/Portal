import React from 'react';
import '../index.css';
import './home.css';
import Nav from '../nav/nav';
import axios from "axios";
//import $ from "jquery";
import User from '../user/user';


class Home extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            logged: this.props['isLogged']['isLogged'],
            user: {}
        }
        this.log = this.log.bind(this)
    }

    log(e){
        this.setState(state=>({
            logged: true,
            user:e
        }))
    }

    render(){
        if(this.state.logged){
            return(
                <div>
                    <User user={this.state}/>
                </div>
            )
        }else{
            return(
                <div>
                    <Nav />
                    <Login log = {this.log} />
                </div>
            )
        }
    }
}

const Login = (props)=>{
    const url = 'https://portal-mee.netlify.app/'
    function log(e){
        e.preventDefault();
        var data = {
            id:e.target.elements.id.value,
            pass: e.target.elements.pass.value
        }
        axios.post(`${url}home`, data, {headers: {'contentType': "application/json"}}).then(data=>{
            if(data.data['logged'] === true){
                const user = {
                    id: data.data['id'],
                    user: data.data['user']
                }
                props.log(user)
            }
        }).catch(e=>{console.log(e);})
    }

    return (
        <div>
            <div className="w3-container">
                <div className="w3-row">
                    <div className="w3-col w3-hide-small m7 l7"><br /></div>
                    <div className="w3-rest">
                        <div className="w3-container topLog">
                            <form onSubmit = {log}>
                                <input type="text" className="w3-input w3-border w3-round" placeholder="Reg No:" id="id" />
                                <input type="password" className="w3-input w3-border w3-round w3-margin-top" placeholder="Password:" id="pass" />
                                <button className="w3-block w3-deep-orange w3-btn w3-margin-top w3-round">Login</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;