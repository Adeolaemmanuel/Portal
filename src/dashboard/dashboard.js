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
        //console.log(this.state)
    }

    render(){
        return(
            <div>
                <Nav user={this.state.user} />
                <User user={this.state} />
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
            subjects: [],
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
            let subjectId = user.data().subjectId
            let len = subjectId.length
            db.collection('Details').doc(this.state.id).collection('subjects').doc(subjectId[len-1]).get()
            .then(sub=>{
                this.setState({subjects: sub.data().subjects})
                //console.log(sub.data().subjects)
            })
            //console.log(subjectId[len -1])
        })
    }
    

    render() {
        return(
            <div>
                <div className="w3-row">
                    <div className='w3-col m4 l4'>
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
                    <div className='w3-rest w3-padding'>
                        <div className='w3-row'>
                            {
                                this.state.subjects.map(arr=>{
                                    return(
                                        <div className='w3-half w3-padding'>
                                            <div className="w3-light-grey w3-round">
                                                <div className={"w3-container w3-padding w3-center w3-round w3-text-white "+arr['color']} style={{width: `${arr['value']}%`}}>{arr['name']}</div>
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


export default Dashboard;