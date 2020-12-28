import React from 'react';
import '../index.css';
import './profile.css';
import Nav from '../nav/nav';
import { db } from '../database'
import { Cookies } from 'react-cookie'

class Profile extends React.Component{
    constructor(props){
        super(props)
        const cookies = new Cookies()
        this.state = {
            user: cookies.get('user'),
            url: this.props['url'],
            id: cookies.get('id'),
        }
    }


    render(){
        if(this.state.user === 'Admin'){
            return(
                <div>
                    <Nav user={this.state.user} />
                    <Admin />
                </div>
            )
        }else if(this.state.user === 'Student'){
            return(
                <div>
                    <Nav user={this.state.user} />
                    <Student user={this.state} />
                </div>
            )
        }else if (this.state.user === 'Teacher'){
            return(
                <div>
                    <Nav user={this.state.user} />
                    <Teacher user={this.state} />
                </div>
            )
        }
    }
}

class Admin extends React.Component{
    constructor(props) {
        super(props);
        const cookies = new Cookies()
        this.state = {
            profile : [],
            id: cookies.get('id'),
            profileId: ''
        }
        this.getProfile = this.getProfile.bind(this)
        this.profile = this.profile.bind(this)
    }

    componentDidMount(){
        
    }
    
    getProfile(e){
        e.preventDefault()
        let id = e.target.elements.search.value
        db.collection('Users').doc(id).get().then(user=>{
            if(user.exists){
                console.log(user.data())
                this.setState({profile: user.data(), profileId: id})
            }
        })
        console.log(this.state.profile)
        return id
    }

    profile(e){
        e.preventDefault()
        var data = {
            firstname:e.target.elements.fn.value,
            lastname: e.target.elements.ln.value,
            sponsorname: e.target.elements.sn.value,
            gender: e.target.elements.gender.value,
            email: e.target.elements.email.value,
            dob:e.target.elements.dob.value,
        }
        console.log(data);
        if(this.state.profile >= 0){ alert('Search for user')}
        else{
            db.collection('Users').doc(this.state.profileId).update({
                'First name': data.firstname,
                'Last name': data.lastname,
                Email: data.email,
                Gender: data.gender,
                'Sponsor name': data.sponsorname,
                DOB: data.dob
            }).then(()=>{
                db.collection('Users').doc(this.state.profileId).get().then(user=>{
                    if(user.exists){
                        console.log(user.data())
                        this.setState({profile: user.data()})
                    }
                })
            }).catch(e=>{console.log(e)})
        }
    }

    render(){
        return (
            <div className='w3-row'>
                <div className='w3-center w3-margin-top'>
                    <span className='w3-padding w3-deep-orange'>SEARCH PROFILE</span>
                </div>
                <div className='w3-center'>
                <form onSubmit={this.getProfile}>
                    <div className='w3-container w3-margin-top w3-center'>
                        <input type='search' id='search' placeholder='Reg number' className='w3-input w3-border w3-round' />
                    </div>
                    <div className='container w3-center w3-margin-top'>
                        <button className='w3-btn w3-deep-orange w3-round'>Search</button>
                    </div>
                </form>
                </div>
                <div className='w3-container'>
                <div className='w3-row'>
                    <div className='w3-col m6 l6 w3-margin-top'>
                        <table className='w3-table-all'>
                            <tr>
                                <td><b>Reg No</b></td>
                                <td className='w3-right'>{this.state.profile['user']}</td>
                            </tr>
                            <tr> 
                                <td><b>User</b></td>
                                <td className='w3-right'>{this.state.profile['regNo']}</td>
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
                    <div className="w3-col l6 m6 w3-padding">
                        <div className='w3-container'>
                            <div className='w3-center w3-margin-top'>
                                <span className='w3-padding w3-deep-orange'>UPDATE PROFILE</span>
                            </div>
                            <form id='profile' className='w3-margin-top' onSubmit={this.profile}>
                                <div className='w3-row'>
                                    <div className='w3-half w3-padding'>
                                        <input type="text" className='w3-input w3-border w3-round' id='fn' />   
                                    </div>
                                    <div className='w3-half w3-padding'>
                                        <input type="text"  className='w3-input w3-border w3-round' id='ln' />   
                                    </div>
                                </div>
                                <div className='w3-row'>
                                    <div className='w3-half w3-padding'>
                                        <input type="text" className='w3-input w3-border w3-round' id='sn' />   
                                    </div>
                                    <div className='w3-half w3-padding'>
                                        <input type="email" className='w3-input w3-border w3-round' id='email' />   
                                    </div>
                                </div>
                                <div className='w3-row'>
                                    <div className='w3-half w3-padding'>
                                        <select className='w3-input w3-border' id='gender' >
                                            <option value='Male'>Male</option>
                                            <option value='FReemale'>Female</option>
                                        </select>   
                                    </div>
                                    <div className='w3-half w3-padding'>
                                        <input type="date"  className='w3-input w3-border w3-round' id='dob' />   
                                    </div>
                                </div>
                                <button className='w3-btn w3-margin-bottom w3-margin-top w3-round w3-block w3-deep-orange'>Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        )
    }
}

class Student extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            user: this.props['user']['user'],
            id: this.props['user']['id'],
            profile: ''
        }
        console.log(props);
        this.profile = this.profile.bind(this)
    }

    componentDidMount(){
        this.getProfile()
    }

    profile(e){
        e.preventDefault()
        var data = {
            firstname:e.target.elements.fn.value,
            lastname: e.target.elements.ln.value,
            sponsorname: e.target.elements.sn.value,
            gender: e.target.elements.gender.value,
            email: e.target.elements.email.value,
            dob:e.target.elements.dob.value,
        }
        console.log(data);
        db.collection('Users').doc(this.state.id).update({
            'First name': data.firstname,
            'Last name': data.lastname,
            Email: data.email,
            Gender: data.gender,
            'Sponsor name': data.sponsorname,
            DOB: data.dob
        }).catch(e=>{console.log(e)})
    }

    getProfile(){
        db.collection('Users').doc(this.state.id).get().then(user=>{
            //console.log(user.data())
            this.setState(state =>({
                profile: user.data()
            }))

        })
        
    }
    

    render(){
        return (
            <div className='w3-row'>
                <div className=''>
                    <div className='w3-col s12 m5 l5'>
                        <table className='w3-table-all'>
                            <tr>
                                <td><b>Reg No</b></td>
                                <td className='w3-right'>{this.state.user}</td>
                            </tr>
                            <tr> 
                                <td><b>User</b></td>
                                <td className='w3-right'>{this.state.id}</td>
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
                                <td><b>Class</b></td>
                                <td className='w3-right'>{this.state.profile['Class']}</td>
                            </tr>
                            <tr>
                                <td><b>Term</b></td>
                                <td className='w3-right'>{this.state.profile['Term']}</td>
                            </tr>
                        </table>
                    </div>
                    <div className='w3-rest w3-padding'>
                        <div className='w3-center w3-margin-top'>
                            <span className='w3-padding w3-deep-orange'>UPDATE PROFILE</span>
                        </div>
                        <form id='profile' className='w3-margin-top' onSubmit={this.profile}>
                            <div className='w3-row'>
                                <div className='w3-half w3-padding'>
                                    <input type="text" value={this.state.profile['First name']} className='w3-input w3-border w3-round' id='fn' />   
                                </div>
                                <div className='w3-half w3-padding'>
                                    <input type="text" value={this.state.profile['Last name']} className='w3-input w3-border w3-round' id='ln' />   
                                </div>
                            </div>
                            <div className='w3-row'>
                                <div className='w3-half w3-padding'>
                                    <input type="text" value={this.state.profile['Sponsor name']} className='w3-input w3-border w3-round' id='sn' />   
                                </div>
                                <div className='w3-half w3-padding'>
                                    <input type="email" value={this.state.profile['Email']} className='w3-input w3-border w3-round' id='email' />   
                                </div>
                            </div>
                            <div className='w3-row'>
                                <div className='w3-half w3-padding'>
                                    <select className='w3-input w3-border' id='gender' >
                                        <option value='Male'>Male</option>
                                        <option value='Female'>Female</option>
                                    </select>   
                                </div>
                                <div className='w3-half w3-padding'>
                                    <input type="date" value={this.state.profile['DOB']} className='w3-input w3-border w3-round' id='dob' />   
                                </div>
                            </div>
                            <button className='w3-btn w3-margin-bottom w3-margin-top w3-round w3-block w3-deep-orange'>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

class Teacher extends React.Component{
    constructor(props) {
        super(props);
        const cookies = new Cookies()
        this.state = {
            user: cookies.get('user'),
            id: cookies.get('id'),
            profile: ''
        }
        console.log(props);
        this.profile = this.profile.bind(this)
    }

    componentDidMount(){
        this.getProfile()
    }

    profile(e){
        e.preventDefault()
        var data = {
            firstname:e.target.elements.fn.value,
            lastname: e.target.elements.ln.value,
            sponsorname: e.target.elements.nk.value,
            gender: e.target.elements.gender.value,
            email: e.target.elements.email.value,
            dob:e.target.elements.dob.value,
        }
        console.log(data);
        db.collection('Users').doc(this.state.id).update({
            'First name': data.firstname,
            'Last name': data.lastname,
            Email: data.email,
            Gender: data.gender,
            'NextOfKin': data.sponsorname,
            DOB: data.dob
        }).catch(e=>{console.log(e)})
    }

    getProfile(){
        db.collection('Users').doc(this.state.id).get().then(user=>{
            //console.log(user.data())
            this.setState(state =>({
                profile: user.data()
            }))

        })
        
    }
    

    render(){
        return (
            <div className='w3-row'>
                <div className=''>
                    <div className='w3-col s12 m5 l5'>
                        <table className='w3-table-all'>
                            <tr>
                                <td><b>Reg No</b></td>
                                <td className='w3-right'>{this.state.id}</td>
                            </tr>
                            <tr> 
                                <td><b>User</b></td>
                                <td className='w3-right'>{this.state.user}</td>
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
                                <td><b>Next of kin</b></td>
                                <td className='w3-right'>{this.state.profile['NextOfKin']}</td>
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
                                <td><b>Class</b></td>
                                <td className='w3-right'>{this.state.profile['Class']}</td>
                            </tr>
                            <tr>
                                <td><b>Term</b></td>
                                <td className='w3-right'>{this.state.profile['Term']}</td>
                            </tr>
                        </table>
                    </div>
                    <div className='w3-rest w3-padding'>
                        <div className='w3-center w3-margin-top'>
                            <span className='w3-padding w3-deep-orange'>UPDATE PROFILE</span>
                        </div>
                        <form id='profile' onSubmit={this.profile}>
                            <div className='w3-row'>
                                <div className='w3-half w3-padding'>
                                    <input type="text" value={this.state.profile['First name']} placeholder='First Name'  className='w3-input w3-border w3-round' id='fn' />   
                                </div>
                                <div className='w3-half w3-padding'>
                                    <input type="text" value={this.state.profile['Last name']} placeholder='Last Name' className='w3-input w3-border w3-round' id='ln' />   
                                </div>
                            </div>
                            <div className='w3-row'>
                                <div className='w3-half w3-padding'>
                                    <input type="text" value={this.state.profile['NextOfKin']} placeholder='Next Of Kin' className='w3-input w3-border w3-round' id='nk' />   
                                </div>
                                <div className='w3-half w3-padding'>
                                    <input type="email" value={this.state.profile['Email']} placeholder='Email' className='w3-input w3-border w3-round' id='email' />   
                                </div>
                            </div>
                            <div className='w3-row'>
                                <div className='w3-half w3-padding'>
                                    <select className='w3-input w3-border' id='gender' >
                                        <option value='Male'>Male</option>
                                        <option value='Female'>Female</option>
                                    </select>   
                                </div>
                                <div className='w3-half w3-padding'>
                                    <input type="date" value={this.state.profile['DOB']} className='w3-input w3-border w3-round' id='dob' />   
                                </div>
                            </div>
                            <button className='w3-btn w3-margin-bottom w3-margin-top w3-round w3-block w3-deep-orange'>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Profile;