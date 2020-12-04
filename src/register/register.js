import React from 'react';
import '../index.css';
import './register.css';
import Nav from '../nav/nav';
import axios from 'axios'

class Register extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            user: [],
            search : '',
            url: this.props['url']
        }
        console.log(this.state);
        this.search = this.search.bind(this)
        this.register = this.register.bind(this)
    }
    

    componentDidMount(){
        let url = this.state.url
        let data 
        axios.get(`${url}getUsers`).then(users=>{
            data = users.data['users']
        })
        setTimeout(() => {
            this.setState({
                user: data
            })  
        }, 2500);
    }

    register(e){
        e.preventDefault();
        var data = {
            id:e.target.elements.idR.value,
            user:e.target.elements.userR.value,
            pass: e.target.elements.passR.value
        }
        
        const url = 'http://localhost:1996/'
        axios.post(`${url}register`, data, {headers: {'contentType': "application/json"}}).then(data=>{
            if(data.data['logged'] === true){
                
            }
        }).catch(e=>{console.log(e);})
    }

    search(e){
        e.preventDefault();
        console.log(e.target.value);
        console.log(this.state);
        this.state.user.filter((arr)=>{
            if(arr['_id'] === e.target.value){
                this.setState(state=>({
                    search : arr
                }))
                document.getElementById('searchDisplay').classList.remove('w3-hide')
            }
            return
        })
    }

    render(){
        return(
            <div>
                <Nav />
                <div className='w3-row'>
                    <div className='w3-container'>
                        <div className='w3-col s12 m6 l6 w3-center w3-padding top'>
                            <h3 className='w3-center'>Register Student / Teacher</h3>
                            <form className='w3-padding w3-mobile w3-margin-top' onSubmit={this.register}>
                                <input type="text" className="w3-input w3-border w3-round" placeholder="Reg No:" id="idR" />
                                <select className='w3-input w3-border w3-round w3-margin-top' id='userR' >
                                    <option disabled selected>User</option>
                                    <option value='Student'>Student</option>
                                    <option value='Teacher'>Teacher</option>
                                </select>
                                <input type="password" className="w3-input w3-border w3-round w3-margin-top" placeholder="password:" id="passR"  />
                                <button className="w3-block w3-deep-orange w3-btn w3-margin-top w3-round" >Register</button>
                            </form>
                        </div>
                        <div className='w3-col s12 m6 l6 w3-center w3-padding'>
                            <div className='w3-margin-top'>
                                <input className='w3-input w3-border w3-round' type="search" placeholder="Search user" id='search' onChange={this.search} />
                                <div id="searchDisplay" className="w3-border w3-hide">
                                    <div className="w3-row w3-padding">
                                        <div className="w3-col s4 m4 l4">{this.state.search['_id']}</div>
                                        <div className="w3-col s4 m4 l4">{this.state.search['user']}</div>
                                        <div className="w3-col s4 m4 l4">{this.state.search['password']}</div>
                                    </div>
                                </div>
                            </div>
                            <div className='w3-container' style={{marginTop: '50px'}}>
                                <ul className='w3-ul w3-margin-top w3-container'>
                                <div className="w3-row">
                                    <div className="w3-col s4 m4 l4"><b>REG NO</b></div>
                                    <div className="w3-col s4 m4 l4"><b>USER</b></div>
                                    <div className="w3-col s4 m4 l4"><b>PASSWORD</b></div>
                                </div>
                                    {
                                        this.state.user.map((arr,ind)=>{
                                            return (
                                                <div style={{overflow: 'auto'}}>
                                                    <li className="w3-card w3-margin-top w3-padding" key={ind}>
                                                        <div className="w3-row">
                                                            <div className="w3-col s4 m4 l4" key={arr['_id']}>{arr['_id']}</div>
                                                            <div className="w3-col s4 m4 l4" key={arr['user']}>{arr['user']}</div>
                                                            <div className="w3-col s4 m4 l4" key={arr['password']}>{arr['password']}</div>
                                                        </div>
                                                    </li>
                                                </div>
                                            )
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