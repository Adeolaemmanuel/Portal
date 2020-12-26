import React from 'react';
import '../index.css';
import './dashboard.css';
import Nav from '../nav/nav';
//import { Link } from "react-router-dom";
import { db } from '../database'
import { Cookies } from 'react-cookie'

class Dashboard extends React.Component{
    constructor(props){
        super(props)
        const cookie = new Cookies()
        this.state = {
            id: cookie.get('id'),
            user: cookie.get('user'),
            password: cookie.get('password'),
            url: this.props['url']
        }
        console.log(this.state)
    }

    render(){
        return(
            <div>
                <Nav user={this.state.user} />
                <div className="w3-container w3-margin-top">
                    <div className="w3-row">
                        <User user={this.state} />
                    </div>
                </div>
            </div>
        )
    }
}

class User extends React.Component{

    constructor(props) {
        super(props);
        const cookie = new Cookies()
        this.state = {
            profile: '',
            id: cookie.get('id'),
        }
    }

    componentDidMount(){
        this.getProfile()
    }

    getProfile(){
        db.collection('Users').doc(this.state.id).get().then(user=>{
            this.setState({
                profile: user.data()
            })
        })
    }
    

    render() {
        return(
            <div>
                <div className="w3-container">
                    <div className="w3-row">
                        <div className='w3-col s6 m3 l3'>
                            <table className='w3-table-all'>
                                <tr>
                                    <td><b>Reg No</b></td>
                                    <td className='w3-right'>{this.props['user']['id']}</td>
                                </tr>
                                <tr>
                                    <td><b>User</b></td>
                                    <td className='w3-right'>{this.props['user']['user']}</td>
                                </tr>
                                <tr>
                                    <td><b>Name</b></td>
                                    <td className='w3-right'>{this.state.profile['First name']} {this.state.profile['Last name']}</td>
                                </tr>
                                <tr>
                                    <td><b>Email</b></td>
                                    <td className='w3-right'>{this.state.profile['Email']}</td>
                                </tr>
                                <tr>
                                    <td><b>Sponsor Name</b></td>
                                    <td className='w3-right'>{this.state.profile['Sponsor name']}</td>
                                </tr>
                                <tr>
                                    <td><b>DOB</b></td>
                                    <td className='w3-right'>{this.state.profile['DOB']}</td>
                                </tr>
                                <tr>
                                    <td><b>Gender</b></td>
                                    <td className='w3-right'>{this.state.profile['Gender']}</td>
                                </tr>
                                <tr>
                                    <td><b>Term</b></td>
                                    <td className='w3-right'>{this.state.profile['Term']}</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default Dashboard;