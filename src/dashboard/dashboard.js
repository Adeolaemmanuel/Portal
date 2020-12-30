import React from 'react';
import './dashboard.css';
import Nav from '../nav/nav';
//import { Link } from "react-router-dom";
import { db } from '../database'
import { Cookies } from 'react-cookie'
import { BsFillCaretLeftFill,BsFillCaretRightFill } from "react-icons/bs";

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

/**
 * Rules
 * statitics +arr['color'] is set atomatically while uploading data from Restul(Adimn, Teacher),
 * if you are going tamper with it find a better solution, always remeber to inculed
 * the space after  "
 */
class User extends React.Component{

    constructor(props) {
        super(props);
        const cookie = new Cookies()
        this.state = {
            profile: '',
            id: cookie.get('id'),
            subjects: [],
            notifications: [],
            details: {}
        }
        this.tab = this.tab.bind(this)
        this.accordion = this.accordion.bind(this)
        this.changeStats = this.changeStats.bind(this)
    }

    componentDidMount(){
        this.getProfile()
        this.getNotifications()
    }

    getProfile(){
        db.collection('Users').doc(this.state.id).get().then(user=>{
            this.setState({
                profile: user.data()
            })
            let subjectId = user.data().subjectId
            let len = subjectId.length
            this.present = subjectId.length-1
            db.collection('Details').doc(this.state.id).collection('subjects').doc(subjectId[len-1]).get()
            .then(sub=>{
                this.setState({subjects: sub.data().subjects})
                this.setState({details: {term: sub.data().term, class: sub.data().class}})
                let statsInfo = document.getElementById('statsInfo')
                statsInfo.style.display = 'block'
                console.log(sub.data().subjects)
            })
            //console.log(subjectId[len -1])
        })
    }

    total //original length
    present

    changeStats(pram){
        if(pram === 'forward'){
            this.present = this.present + 1
            if(this.present <= this.total){
                db.collection('Users').doc(this.state.id).get().then(user=>{
                    let subjectId = user.data().subjectId
                    this.total = subjectId.length
                    //if(t)
                    //this.present = subjectId.indexOf(subjectId[this.total-1]);
                    db.collection('Details').doc(this.state.id).collection('subjects').doc(subjectId[this.present]).get()
                    .then(sub=>{
                        this.setState({subjects: sub.data().subjects})
                        this.setState({details: {term: sub.data().term, class: sub.data().class}})
                        console.log(sub.data().subjects)
                    })
                    console.log(this.present)
                })
            }
        }
        
        if(pram === 'backward'){
            this.present = this.present - 1
            if(this.present <= 0){
                db.collection('Users').doc(this.state.id).get().then(user=>{
                    let subjectId = user.data().subjectId
                    this.total = subjectId.length
                    //if(t)
                    //this.present = subjectId.indexOf(subjectId[this.total-1]);
                    db.collection('Details').doc(this.state.id).collection('subjects').doc(subjectId[this.present]).get()
                    .then(sub=>{
                        this.setState({subjects: sub.data().subjects})
                        this.setState({details: {term: sub.data().term, class: sub.data().class}})
                        console.log(sub.data().subjects)
                    })
                    console.log(this.present)
                })
            }
        }
    }
    
    tab(show='profiles',hide='statistics'){
        if(show){
            //console.log(show)
            document.getElementById(show).style.display = 'block'
            document.getElementById(hide).style.display = 'none'
        }
    }

    getNotifications(){
        db.collection('Admin').doc('Notifications').get().then(not=>{
            if(not.exists){
                let notifications = not.data().not
                this.setState({notifications: notifications})
            }
        })
    }

    accordion(e, ind){
        var x = document.getElementById(ind);
        if (x.className.indexOf("w3-show") === -1) {
            x.className += " w3-show";
        } else {
            x.className = x.className.replace(" w3-show", "");
        }
    }

    render() {
        if(window.matchMedia("(max-width: 767px)").matches){
            return(
                <div>
                    <div className="w3-row">
                        <div className='w3-col s6 w3-btn w3-deep-orange' onClick={(e)=>this.tab('profiles','statistics')}>Profile</div>
                        <div className='w3-col s6 w3-btn w3-deep-orange' onClick={(e)=>this.tab('statistics','profiles')}>Statistics</div>
                        <div className='w3-col m4 l4' id='profiles'>
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

                            <div className='w3-center w3-margin-top'>
                                <span className='w3-padding w3-deep-orange'>Notifications</span>
                            </div>

                            <div id='created' className='w3-margin-top'>
                                {
                                    this.state.notifications.map((arr, ind)=>{
                                        return(
                                            <div className='w3-margin-top'>
                                                <button onClick={(e)=>{this.accordion(e,ind)}} className="w3-btn w3-block w3-deep-orange" style={{marginTop: '50px'}}>{arr['Title']}</button>
                                                <div id={ind} className="w3-hide w3-border w3-padding">
                                                    <p>{arr['Subject']}</p>
                                                    <div className='w3-padding'>{arr['Message']}</div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>

                        </div>
                        <div className='w3-rest w3-padding' id='statistics' style={{display: 'none'}}>
                            <div className='w3-row'>
                                {
                                    this.state.subjects.map(arr=>{
                                        return(
                                            <div className='w3-half w3-padding'>
                                                <div className="w3-light-grey w3-round">
                                                    <div className={"w3-container w3-padding w3-center w3-round w3-text-black "+arr['color']} style={{width: `${arr['value']}%`}}>{arr['name']}</div>
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
        }else{
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

                            <div className='w3-center w3-margin-top'>
                                <span className='w3-padding w3-deep-orange'>Notifications</span>
                            </div>

                            <div id='created' className='w3-margin-bottom'>
                                {
                                    this.state.notifications.map((arr, ind)=>{
                                        return(
                                            <div className='w3-margin-top'>
                                                <button onClick={(e)=>{this.accordion(e,ind)}} className="w3-btn w3-block w3-deep-orange" style={{marginTop: '50px'}}>{arr['Title']}</button>
                                                <div id={ind} className="w3-hide w3-border w3-padding">
                                                    <p>{arr['Subject']}</p>
                                                    <div className='w3-padding'>{arr['Message']}</div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>

                        </div>
                        <div className='w3-rest w3-padding'>
                            <div className='w3-row'>
                                {
                                    this.state.subjects.map(arr=>{
                                        return(
                                            <div className='w3-half w3-padding'>
                                                <div className="w3-light-grey w3-round">
                                                    <div className={"w3-container w3-padding w3-center w3-bold w3-card w3-round w3-text-black "+arr['color']} style={{width: `${arr['value']}%`}}>{arr['name']}</div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <div className='w3-container'>
                                <div className='w3-row' id='statsInfo' style={{display:'none'}}>
                                    <nav className='w3-bar'>
                                        <BsFillCaretLeftFill id='right' className='w3-bar-item w3-padding w3-deep-orange' onClick={(e)=>{this.changeStats('backward')}} style={{width:'50px', height: '50px'}} />
                                        <BsFillCaretRightFill id='left' className='w3-bar-item w3-right w3-padding w3-deep-orange' onClick={(e)=>{this.changeStats('forward')}} style={{width:'50px', height: '50px'}} />
                                    </nav>
                                    <div className='w3-col m4 l4 w3-center w3-margin-top'>
                                        <span className='w3-padding w3-deep-orange'>Details</span>
                                        <p className='w3-padding w3-card w3-round'>{this.state.details['class']}</p>
                                        <p className='w3-padding w3-card w3-round'>{this.state.details['term']}</p>
                                        <p className='w3-padding w3-card w3-round'>{this.state.details['year']}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
}


export default Dashboard;