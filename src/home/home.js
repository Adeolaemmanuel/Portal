import React from 'react';
import '../index.css';
import './home.css';
import Nav from '../nav/nav';
import { Link } from "react-router-dom";
import axios from "axios";
import User from '../user/user';




class Home extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            logged: this.props['isLogged']['isLogged'],
        }
        this.log = this.log.bind(this)
    }

    log(){
        this.setState(state=>{
            return {logged : true}
        })
    }

    render(){
        if(this.state.logged){
            return(
                <div>
                    <User />
                </div>
            )
        }else{
            return(
                <div>
                    <Nav />
                    <Login log={this.log} />
                </div>
            )
        }
    }
}

const Login = (props)=>{
    function log(e){
        e.preventDefault();
        var id = document.getElementById('id')
        var pass = document.getElementById('pass')
        axios.post('http://localhost:1996/login', {id: id.value, pass: pass.value}, {headers:{ "Content-Type" : "application/json", 'Access-Control-Allow-Origin': '*' }}).then(data=>{
            if(data === true){
                props.log()
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
                            <form>
                                <input type="text" className="w3-input w3-border w3-round" placeholder="Reg No:" id="id" />
                                <input type="pssword" className="w3-input w3-border w3-round w3-margin-top" placeholder="Password:" id="pass" />
                                <button className="w3-block w3-deep-orange w3-btn w3-margin-top w3-round" onClick={log}>Login</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;