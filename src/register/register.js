import React from 'react';
import '../index.css';
import './register.css';
import Nav from '../nav/nav';
import axios from 'axios'
import { Cookies } from 'react-cookie'
import $ from 'jquery'

class Register extends React.Component{
    constructor(props){
        super(props)
        const cookies = new Cookies()
        this.state = {
            user: cookies.get('user'),
            url: this.props['url'],
            users: ''
        }
        console.log(this.state);
    }
    

    componentDidMount(){
        let url = this.state.url
        let data 
        axios.get(`${url}getUsers`).then(users=>{
            data = users.data['users']
        })
        setTimeout(() => {
            this.setState({
                users: data
            })  
        }, 2500);
    }

    


    render(){
        if(this.state.user === "Admin"){
            return (
                <div>
                    <Nav user={this.state.user} />
                    <Admin data={this.state} />
                </div>
            )
        }else if(this.state.user === 'Student'){
            return(
                <div>
                    <Nav user={this.state.user} />
                    <Student data={this.state} />
                </div>
            )
        }
    }
}

const Admin = (props)=>{
    var Data = {
        user: props['data']['users'],
        search : [],
        url: props['data']['url'],
        password: 'password',
        btn: {color: 'w3-green', text:'Show'}
    }

    function passwordToggle(){
        if(Data.password === 'password'){
            Data.password = 'text'
            Data.btn = {color:'w3-red', text:'w3-hide'}
        }else{
            Data.password = 'password'
            Data.btn = {color: 'w3-green', text:'Show'}
        }
    }

    function register(e){
        e.preventDefault();
        var data = {
            id:e.target.elements.idR.value,
            user:e.target.elements.userR.value,
            pass: e.target.elements.passR.value,
        }

        axios.post(`${Data.url}register`, data, {headers: {'contentType': "application/json"}}).then(data=>{
            if(data.data['message'] === 'success'){
                
            }
        }).catch(e=>{console.log(e);})
    }

    function search(e){
        e.preventDefault();
        Data.user.filter((arr)=>{
            if(arr['_id'] === e.target.value || arr['user'] === e.target.value || arr['password'] === e.target.value){
                Data.search = [...arr]
                document.getElementById('searchDisplay').classList.remove('w3-hide')
            }else if(e.target.value === ''){
                document.getElementById('searchDisplay').classList.add('w3-hide')
            }
            return arr
        })
    }

    return(
        <div>
            <Nav />
            <div className='w3-row'>
                <div className='w3-container'>
                    <div className='w3-col s12 m6 l6 w3-center w3-padding top'>
                        <h3 className='w3-center'>Register Student / Teacher</h3>
                        <form className='w3-padding w3-mobile w3-margin-top' onSubmit={register}>
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
                            <input className='w3-input w3-border w3-round' type="search" placeholder="Search user" id='search' onChange={search} />
                            <div id="searchDisplay" className="w3-border w3-hide">
                                {
                                    Data.search.map(arr=>{
                                        return (
                                            <div className="w3-row w3-padding">
                                                <div className="w3-col s4 m4 l4">{arr['_id']}</div>
                                                <div className="w3-col s4 m4 l4">{arr['user']}</div>
                                                <div className="w3-col s4 m4 l4">{arr['password']}</div>
                                            </div>
                                        )
                                    })
                                }
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
                                    Data.user.map((arr,ind)=>{
                                        return (
                                            <div style={{overflow: 'auto'}}>
                                                <li className="w3-card w3-margin-top w3-padding" key={ind}>
                                                    <div className="w3-row">
                                                        <div className="w3-col s4 m4 l4" key={arr['_id']}>{arr['_id']}</div>
                                                        <div className="w3-col s4 m4 l4" key={arr['user']}>{arr['user']}</div>
                                                        <div className="w3-col s4 m4 l4" key={arr['password']}>
                                                            <div className='w3-row'>
                                                                <div className='w3-half'>
                                                                    <input type={this.state.password} value={arr['password']} />
                                                                </div>
                                                                <button className={`w3-half w3-padding${Data.btn.color}`} onClick={passwordToggle}>{Data.btn.text}</button>
                                                            </div>
                                                        </div>
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

const Student = (props)=>{
    let state = {
        class: ['JS1','JS2','JS3','SS1','SS2','SS3'],
        term: ['1st Term','2nd Term'],
        dapertment: ['Science','Art','Cormmercial'],
        subject: ['Mathematics','English','Physics','Chemistry','French','Youruba','Bussiness Studies','Computer Science','Basic Technology','Home Economics','CRS','PHE','Acgricultural Science','Applied Arts','Civic Education','Basic Science','Futher Mathematics','Biology','Commerce','History','Goverment','Geography','Literature','Humanities','History'],
        url: props['data']['url'],
    }

    function courseFrom(e){
        e.preventDefault()
        let data = $('#course').serializeArray()
        axios.post(`${state.url['url']}courseForm`, data, {headers: {'contentType': "application/json"}}).then(res=>{

        })
    }


    return(
        <div>
                <div className='w3-row'>
                    <div className='w3-col s12 m6 l6'>
                        <h2 className='w3-center'>Register Your Course</h2>
                        <div className='w3-container'>
                            <form className='top' id='course' onSubmit={courseFrom}>
                                <select className='w3-input w3-border w3-round' name='class' id='class'>
                                    {state.class.map(arr=>{
                                        return <option value={arr} key={arr} id={arr}>{arr}</option>
                                    })}
                                </select>
                                <select className='w3-input w3-border w3-round w3-margin-top' id='term' name='term'>
                                    {state.term.map(arr=>{
                                        return <option value={arr} key={arr} id={arr}>{arr}</option>
                                    })}
                                </select>
                                <select className='w3-input w3-border w3-round w3-margin-top' id='dept' name='department'>
                                    {state.dapertment.map(arr=>{
                                        return <option value={arr} key={arr} id={arr}>{arr}</option>
                                    })}
                                </select>

                                <div className='w3-container'>
                                    {
                                        state.subject.map(arr=>{
                                            return(
                                                <div className='w3-row w3-padding w3-margin-top w3-card w3-round'>
                                                    <div className='w3-col s6 m6 l6'><label htmlFor={arr}>{arr}</label> </div>
                                                    <div className='w3-col s6 m6 l6'>
                                                        <input type='checkbox' className='w3-right' key={arr} name={arr} id={arr} />
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                <button className='w3-btn w3-margin-bottom w3-margin-top w3-round w3-block w3-deep-orange'>Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
    )
}



export default Register;