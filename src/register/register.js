import React from 'react';
import '../index.css';
import './register.css';
import Nav from '../nav/nav';
import { db, firebase } from '../database'
import { Cookies } from 'react-cookie'
import $ from 'jquery'
import folder from '../assets/img/folder.svg'

class Register extends React.Component{
    constructor(props){
        super(props)
        const cookies = new Cookies()
        this.state = {
            user: cookies.get('user'),
        }

    }


    render(){
        if(this.state.user === "Admin"){
            return (
                <div>
                    <Nav user={this.state.user} />
                    <Admin url={this.state.url} />
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

class Student extends React.Component{
    constructor(props) {
        super(props);
        const cookie =  new Cookies()
        this.state = {
            class: ['JS1','JS2','JS3','SS1','SS2','SS3'],
            term: ['1st Term','2nd Term'],
            department: ['Science','Art','Cormmercial'],
            subject: ['Mathematics','English','Physics','Chemistry','French','Youruba','Bussiness Studies','Computer Science','Basic Technology','Home Economics','CRS','PHE','Acgricultural Science','Applied Arts','Civic Education','Basic Science','Futher Mathematics','Biology','Commerce','History','Goverment','Geography','Literature','Humanities','History'],
            id: cookie.get('id'),
            regSub : ['No registered Subjects'],
            year: 0,
        }
        this.subjectFrom = this.subjectFrom.bind(this)
        this.getSubject = this.getSubject.bind(this)
    }
    
    day = new Date()
    month = new Date()
    year = new Date()

    componentDidMount(){
        
    }

    subjectFrom(e){
        e.preventDefault()
        let data = $('#subjects').serializeArray()
        let spliced = [...data]
        console.log(data)
        db.collection('Users').doc(this.state.id).get().then(user=>{
            let subjetId = user.data().subjectId
            if(subjetId){
                if(subjetId.indexOf(`${data[0].value}|${data[1].value.replace(/ /g, '')}|${this.year.getFullYear()}`) === -1){
                    db.collection('Details').doc(`${this.state.id}`).collection('subjects').doc(`${data[0].value}|${data[1].value.replace(/ /g, '')}|${this.month.getFullYear()}`).set({
                        class: data[0].value,
                        term: data[1].value.replace(/ /g, ''),
                        department: data[2].value,
                    })
                    .then(()=>{
                        spliced.splice(0,3)
                        for(let v = 0; v < spliced.length; v++){
                            if(spliced[v].value === 'on'){
                                spliced[v].value = 0
                                console.log(spliced[v])
                            }
                        }
                        if(spliced.length >= 7){
                            db.collection('Users').doc(`${this.state.id}`).update({
                                Term: data[1].value,
                                subjectId: firebase.firestore.FieldValue.arrayUnion(`${data[0].value}|${data[1].value.replace(/ /g, '')}|${this.month.getFullYear()}`),
                                Class: data[0].value,
                            })
                            
                            db.collection('Details').doc(`${this.state.id}`).collection('subjects').doc(`${data[0].value}|${data[1].value.replace(/ /g, '')}|${this.month.getFullYear()}`).update({
                                subjects: spliced
                            })
                            this.getSubject()
                        }
                    }).catch(e=>{ console.log(e)})
                }else{alert('Cannot change subject, contact your Webmaster')}
            }else{
                db.collection('Details').doc(`${this.state.id}`).collection('subjects').doc(`${data[0].value}|${data[1].value.replace(/ /g, '')}|${this.month.getFullYear()}`).set({
                    class: data[0].value,
                    term: data[1].value.replace(/ /g, ''),
                    department: data[2].value,
                })
                .then((a)=>{
                    spliced.splice(0,3)
                    for(let v = 0; v < spliced.length; v++){
                        if(spliced[v].value === 'on'){
                            spliced[v].value = 0
                        }
                    }
                    if(spliced.length >= 7){
                        db.collection('Users').doc(`${this.state.id}`).update({
                            Term: data[1].value,
                            subjectId: firebase.firestore.FieldValue.arrayUnion(`${data[0].value}|${data[1].value.replace(/ /g, '')}|${this.month.getFullYear()}`),
                            Class: data[0].value,
                        })
                        
                        db.collection('Details').doc(`${this.state.id}`).collection('subjects').doc(`${data[0].value}|${data[1].value.replace(/ /g, '')}|${this.month.getFullYear()}`).update({
                            subjects: spliced
                        })
                        this.getSubject()
                    }
                }).catch(e=>{ console.log(e)}) 
            }
        })
    }


    getSubject(e, all, pram){
        e.preventDefault()
        //console.log(pram)
        let id = all
        //console.log(id)
        let clas = document.getElementsByClassName('class')
        let terms = document.getElementsByClassName('terms')
        let subjects = document.getElementsByClassName('sub')
        if(id === 'class'){
            this.setState({classFolder: pram})
            for(let a=0; a<clas.length; a++){
                clas[a].style.display = "none";
            }
            for(let t=0; t<terms.length; t++){
                terms[t].style.display = "block";
            }
        }
        else if(id === 'term'){
            console.log(document.getElementById(id).value)
            this.setState({termFolder: document.getElementById(id).value})
            for(let n=0; n<terms.length; n++){
                terms[n].style.display = "none";
            }
            document.getElementById('year').style.display = 'block'
            console.log(this.state.termFolder) 
        }
        else if(id === 'sub'){
            console.log(`${this.state['classFolder']}|${this.state['termFolder']}`)
            db.collection('Details').doc(`${this.state.id}`).collection('subjects').doc(`${this.state['classFolder']}|${this.state['termFolder'].replace(/ /g, '')}|${document.getElementById('num').value}`).get()
            .then(sub=>{
                document.getElementById('year').style.display = 'none'
                if(sub.exists){
                    this.setState({
                        regSub: sub.data().subjects
                    })
                    console.log(sub.data().subjects)
                    for(let a=0; a<subjects.length; a++){
                        subjects[a].style.display = "block";
                    }
                }
            })
        }
    }


    render() {
        return(
            <div>
                <div className='w3-row'>
                    <div className='w3-col s12 m6 l6'>
                        <div className='w3-container'>
                            {
                                this.state.class.map(arr=>{
                                    return (
                                        <div className='w3-card w3-padding w3-round w3-margin-top w3-bold w3-border w3-center class' id={arr} key='' onClick={(e)=>{this.getSubject(e, 'class', arr)}}>
                                            <img src={folder} style={{width: '70px', height: '70px'}} alt='' key=''  id={arr} onClick={(e)=>{this.getSubject(e, 'class', arr)}} />
                                            <p  id={arr} key='' onClick={(e)=>{this.getSubject(e, 'class', arr)}}>{arr}</p>
                                        </div>
                                    )
                                })
                            }
                            <div className='w3-card w3-padding w3-round w3-margin-top w3-bold w3-border w3-center terms'id='terms' style={{display:'none'}}>
                                   <select id='term' className='w3-input w3-border'>
                                        {
                                            this.state.term.map(arr=>{
                                                return (
                                                    <option value={arr} key={arr}>{arr}</option>
                                                )
                                            })
                                        }
                                    </select>  
                                    <button className='w3-btn w3-margin-top w3-orange' onClick={(e)=>{this.getSubject(e, 'term')}}>Submit</button>       
                            </div>
                            <form id='year' style={{display:'none'}}>
                                <div className='w3-card w3-padding w3-round w3-margin-top w3-center'>
                                    <input type='number' className='w3-input w3-border' placeholder='Year' id='num' />
                                    <button className='w3-btn w3-margin-top w3-orange' onClick={(e)=>{this.getSubject(e, 'sub')}}>Submit</button>
                                </div>
                            </form>
                            {
                                this.state.regSub.map(arr=>{
                                    if(this.state.regSub.length === 0){
                                        return(
                                            <div className='w3-card w3-padding w3-round w3-margin-top w3-bold w3-border w3-center sub' style={{display:'none'}}>
                                                <img src={folder} style={{width: '70px', height: '70px'}} alt=''  id={arr} />
                                                <p key={arr}>{arr}</p>
                                            </div>
                                        )
                                    }else{
                                        return(
                                            <div className='w3-card w3-padding w3-round w3-margin-top w3-bold w3-border w3-center sub' style={{display:'none'}}>
                                                <p id={arr['name']}>{arr['name']}</p>
                                            </div>
                                        )
                                    }
                                })
                            }
                        </div>
                    </div>
                    <div className='w3-col s12 m6 l6'>
                        <h2 className='w3-center'>Register Your Course</h2>
                        <div className='w3-container'>
                            <form className='w3-margin-top' id='subjects' onSubmit={this.subjectFrom}>
                                <select className='w3-input w3-border w3-round' name='class' id='class'>

                                    {
                                            this.state.class.map(arr=>{
                                                return <option value={arr} key={arr} id={arr}>{arr}</option>
                                            })}
                                        </select>
                                        <select className='w3-input w3-border w3-round w3-margin-top' id='term' name='term'>
                                            {this.state.term.map(arr=>{
                                                return <option value={arr} key={arr} id={arr}>{arr}</option>
                                            })}
                                        </select>
                                        <select className='w3-input w3-border w3-round w3-margin-top' id='dept' name='department'>
                                            {this.state.department.map(arr=>{
                                                return <option value={arr} key={arr} id={arr}>{arr}</option>
                                            })
                                            }
                                        </select>
    
                                <div className='w3-container'>
                                    {
                                        this.state.subject.map(arr=>{
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
}

class Admin extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            search : '',
        }

        this.register = this.register.bind(this)
        this.search = this.search.bind(this)
    }

    componentDidMount(){
        this.getUsers()
    }

    getUsers(){
        db.collection('Admin').doc('user').get().then(admin=>{
            if(admin.exists){
                let id = admin.data().id
                let users = []
                id.forEach( i => {
                    db.collection('Users').doc( i ).get().then(user=>{
                        //console.log(user.data());
                        users.push({regNo: user.data().regNo, user: user.data().user, password: user.data().password})
                        this.setState({
                            users : users
                        })
                       console.log(users)
                    }).catch(e=>{console.log(e);})
                });
            }
        })
    }

    register(e){
        e.preventDefault();
        var data = {
            id:e.target.elements.idR.value,
            user:e.target.elements.userR.value,
            pass: e.target.elements.passR.value,
        }
        db.collection('Users').doc(data.id).set({
            regNo: data.id,
            user: data.user,
            password: data.pass
        }).then(()=>{
            db.collection('Admin').doc('user').update({
                id : firebase.firestore.FieldValue.arrayUnion(data.id)
            })
        }).catch(e=>{console.log(e)})        
    }

    search(e){
        e.preventDefault();
        this.state.users.filter((arr)=>{
            if(arr['regNo'] === e.target.value){
                this.setState(state=>({users: [arr]}))
            }else if(e.target.value === ''){
                this.getUsers()
            }
            return arr
        })
    }

    render(){
        return(
            <div>
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
                            </div>
                            <div className='w3-container' style={{marginTop: '50px'}} id='user'>
                                <ul className='w3-ul w3-margin-top w3-container' style={{overflow: 'scroll', height:'400px'}}>
                                <div className="w3-row">
                                    <div className="w3-col s4 m4 l4"><b>REG NO</b></div>
                                    <div className="w3-col s4 m4 l4"><b>USER</b></div>
                                    <div className="w3-col s4 m4 l4"><b>PASSWORD</b></div>
                                </div>
                                    {
                                        this.state.users.map( arr => {
                                                    
                                            return (
                                                <li className="w3-card w3-margin-top w3-padding" key={arr['regNo']}>
                                                    <div className="w3-row">
                                                        <div className="w3-col s4 m4 l4" key={arr['regNo']}>{arr['regNo']}</div>
                                                        <div className="w3-col s4 m4 l4" key={arr['user']}>{arr['user']}</div>
                                                        <div className="w3-col s4 m4 l4" key={arr['password']}>{arr['password']}</div>
                                                    </div>
                                                </li>
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