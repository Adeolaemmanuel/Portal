import React from 'react';
import '../index.css';
import './result.css';
import Nav from '../nav/nav';
import { db} from '../database'
import { Cookies } from 'react-cookie'
import folder from '../assets/img/folder.svg'
import back from '../assets/img/arrow.svg'

class Result extends React.Component{
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
        if(this.state.user === 'Student'){
            return(
                <div>
                    <Nav />
                    <Student />
                </div>
            )
        }else if(this.state.user === 'Admin'){
            return(
                <div>
                    <Nav />
                    <Admin />
                </div>
            )
        }else if(this.state.user === 'Teacher'){
            return(
                <div>
                    <Nav />
                    <Teacher />
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
            user: cookies.get('user'),
            url: this.props['url'],
            id: '',
            userId: '',
            subjects: [],
            subjectIds: []
        }
        this.getSubject = this.getSubject.bind(this)
        this.subjectId = this.subjectId.bind(this)
        this.backFolder = this.backFolder.bind(this)
    }


    getSubject(e){
        e.preventDefault();
        let userId = e.target.elements.id.value
        this.setState({userId: userId})
        console.log(userId)
        db.collection('Users').doc(userId).get().then(subId=>{
            let data = subId.data().subjectId;
            this.setState({subjectIds: data})
            for(let i = 0; i < data.length; i++){
                db.collection('Details').doc(userId).collection('subjects').doc(data[i]).get()
                .then(a=>{
                    this.setState({subjects: a.data().subjects})
                    console.log(a.data().subjects)
                })
            }
        })
    }

    subjectId(e){
        //get subject id for onlcick for getting result or setting
        e.preventDefault()
        let id = e.target.id
        let resultId = document.getElementById('resultId');
        let result =  document.getElementById('result')
        let search =  document.getElementById('search')
        let back =  document.getElementById('back')
        //console.log(id)
        resultId.style.display = 'none'
        result.style.display = 'block'
        back.style.display = 'block'
        search.style.display = 'none'
        db.collection('Details').doc(this.state.userId).collection('subjects').doc(id).get()
        .then(a=>{
            this.setState({subjects: a.data().subjects})
            //console.log(a.data().subjects)
        })
    }

    backFolder(){
        let resultId = document.getElementById('resultId');
        let result =  document.getElementById('result')
        let search =  document.getElementById('search')
        let back =  document.getElementById('back')
        resultId.style.display = 'block'
        result.style.display = 'none'
        back.style.display = 'none'
        search.style.display = 'block'
    }
    

    render(){
        return(
            <div>
                <div className='w3-container'>
                    <div className='w3-container'>
                        <div className="w3-padding">
                            <form onSubmit ={this.getSubject}>
                                <input className='w3-input w3-border w3-round' type='text' id='id' placeholder="Input Reg" />
                                <div className="w3-row">
                                    <div className='w3-col s1 m1 l1'>
                                        <img src={back} alt='' id="back" className='w3-margin-top' onClick={this.backFolder} style={{display: 'none', width:'100%', height: '40px'}} />
                                    </div>
                                    <div className='w3-rest'>
                                        <div className='w3-center'>
                                            <button className='w3-btn w3-deep-orange w3-round w3-margin-top w3-margin-left' id='search'>Search</button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="w3-container w3-margin-top">
                        <div className='w3-container'>
                            <div className='w3-row'>
                                <div className='w3-col s3 m4 l4'>
                                    {
                                        //space for user picture
                                    }
                                </div>
                                <div>
                                    {
                                        //space for name,Term,Class etc
                                    }
                                </div>
                            </div>
                        </div>
                        <div className='w3-row'>
                            <div className='w3-center' id='resultId'>
                                {
                                    this.state.subjectIds.map(arr=>{
                                        return(
                                            <div className='w3-col s6 m4 l4 w3-padding' id={arr} onClick={this.subjectId}>
                                                <div className='w3-padding w3-card w3-margin-top' id={arr} onClick={this.subjectId} >
                                                    <img src={folder} alt='' id={arr} onClick={this.subjectId}  style={{width:'100%', height:'60px'}} />
                                                    <div className='w3-padding w3-center w3-bold resultId' id={arr} onClick={this.subjectId} style={{width:'100%'}}>{arr}</div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <div className='w3-rest' id='result' style={{display: 'none'}}>
                                <table className='w3-table-all w3-padding w3-border w3-mobile'>
                                    
                                    <tbody>
                                        {
                                            this.state.subjects.map(arr=>{
                                                return(
                                                    <div>
                                                        <tr>
                                                            <td><input style={{border: 0, backgroundColor: 'none'}} disabled value={arr['name']} /></td>
                                                            <td><input type='number' id={arr['value']} style={{border: 0, backgroundColor: 'none'}} disabled className='value' value={arr['value']} /></td>
                                                            <td><input type='number' id={arr['grade']} style={{border: 0, backgroundColor: 'none'}} disabled className='score' value={arr['score']} /></td>
                                                        </tr>
                                                    </div>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


class Student extends React.Component{
    constructor(props){
        super(props)
        const cookies = new Cookies()
        this.state = {
            user: cookies.get('user'),
            url: this.props['url'],
            id: cookies.get('id'),
            subjects: [],
            subjectIds: []
        }
        this.subjectId = this.subjectId.bind(this)
        this.backFolder = this.backFolder.bind(this)
    }

    componentDidMount(){
        this.getSubject()
    }


    getSubject(){
        db.collection('Users').doc(this.state.id).get().then(subId=>{
            let data = subId.data().subjectId;
            this.setState({subjectIds: data})
        })
    }

    subjectId(e){
        //get subject id for onlcick for getting result or setting
        e.preventDefault()
        let id = e.target.id
        let resultId = document.getElementById('resultId');
        let result =  document.getElementById('result')
        let back =  document.getElementById('back')
        //console.log(id)
        resultId.style.display = 'none'
        result.style.display = 'block'
        back.style.display = 'block'
        db.collection('Details').doc(this.state.id).collection('subjects').doc(id).get()
        .then(a=>{
            this.setState({subjects: a.data().subjects})
            console.log(a.data().subjects)
        })
    }

    backFolder(){
        let resultId = document.getElementById('resultId');
        let result =  document.getElementById('result')
        let back =  document.getElementById('back')
        resultId.style.display = 'block'
        result.style.display = 'none'
        back.style.display = 'none'
    }

    render(){
        return(
            <div>
                <div className='w3-container'>
                    <div className="w3-container w3-margin-top">
                        <div className='w3-container'>
                            <div className='w3-row'>
                                <div className='w3-col s1 m1 l1'>
                                    <img src={back} alt='' id="back" className='w3-margin-top' onClick={this.backFolder} style={{display: 'none', width:'100%', height: '40px'}} />
                                </div>
                                <div className='w3-col s3 m4 l4'>
                                    {
                                        //space for user picture
                                    }
                                </div>
                                <div className='w3-rest'>
                                    {
                                        //space for name,Term,Class etc
                                    }
                                </div>
                            </div>
                        </div>
                        <div className='w3-row'>
                            <div className='w3-center' id='resultId'>
                                {
                                    this.state.subjectIds.map(arr=>{
                                        return(
                                            <div className='w3-col s6 m4 l4 w3-padding' id={arr} onClick={this.subjectId}>
                                                <div className='w3-padding w3-card w3-margin-top' id={arr} onClick={this.subjectId} >
                                                    <img src={folder} alt='' id={arr} onClick={this.subjectId}  style={{width:'100%', height:'60px'}} />
                                                    <div className='w3-padding w3-center w3-bold resultId' id={arr} onClick={this.subjectId} style={{width:'100%'}}>{arr}</div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <div className='w3-rest' id='result' style={{display: 'none'}}>
                                <table className='w3-table-all w3-padding w3-border w3-mobile'>
                                    
                                    <tbody>
                                        {
                                            this.state.subjects.map(arr=>{
                                                return(
                                                    <div>
                                                        <tr>
                                                            <td><input style={{border: 0, backgroundColor: 'none'}} disabled value={arr['name']} /></td>
                                                            <td><input type='number' id={arr['value']} style={{border: 0, backgroundColor: 'none'}} disabled className='value' value={arr['value']} /></td>
                                                            <td><input type='text' id={arr['grade']} style={{border: 0, backgroundColor: 'none'}} disabled className='grade' value={arr['grade']} /></td>
                                                        </tr>
                                                    </div>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
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
            url: this.props['url'],
            id: '',
            userId: '',
            subjects: [],
            subjectIds: []
        }
        this.getSubject = this.getSubject.bind(this)
        this.subjectId = this.subjectId.bind(this)
    }


    getSubject(e){
        e.preventDefault();
        let userId = e.target.elements.id.value
        this.setState({userId: userId})
        console.log(userId)
        db.collection('Users').doc(userId).get().then(subId=>{
            let data = subId.data().subjectId;
            this.setState({subjectIds: data})
            for(let i = 0; i < data.length; i++){
                db.collection('Details').doc(userId).collection('subjects').doc(data[i]).get()
                .then(a=>{
                    this.setState({subjects: a.data().subjects})
                    console.log(a.data().subjects)
                })
            }
        })
    }

    subjectId(e){
        //get subject id for onlcick for getting result or setting
        e.preventDefault()
        let id = e.target.id
        //console.log(id)
        db.collection('Details').doc(this.state.userId).collection('subjects').doc(id).get()
        .then(a=>{
            this.setState({subjects: a.data().subjects})
            //console.log(a.data().subjects)
        })
    }
    

    render(){
        return(
            <div>
                <div className='w3-container'>
                <h2 className='w3-center w3-padding'>student Result</h2>
                    <div className='w3-container'>
                        <div className="w3-padding">
                            <form onSubmit ={this.getSubject}>
                                <input className='w3-input w3-border w3-round' type='text' id='id' placeholder="Input Reg" />
                                <div className="w3-row">
                                    <div className='w3-col s1 m1 l1'>
                                        <img src={back} alt='' id="back" className='w3-margin-top' onClick={this.backFolder} style={{display: 'none', width:'100%', height: '40px'}} />
                                    </div>
                                    <div className='w3-rest'>
                                        <div className='w3-center'>
                                            <button className='w3-btn w3-deep-orange w3-round w3-margin-top w3-margin-left' id='search'>Search</button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="w3-container w3-margin-top">
                        <div className='w3-container'>
                            <div className='w3-row'>
                                <div className='w3-col s3 m4 l4'>
                                    {
                                        //space for user picture
                                    }
                                </div>
                                <div>
                                    {
                                        //space for name,Term,Class etc
                                    }
                                </div>
                            </div>
                        </div>
                        <div className='w3-row'>
                            <div className='w3-col s2 m2 l2 w3-center'>
                                {
                                    this.state.subjectIds.map(arr=>{
                                        return(
                                            <div className='w3-btn w3-padding w3-card w3-margin-top' id={arr} onClick={this.subjectId}>{arr}</div>
                                        )
                                    })
                                }
                            </div>
                            <div className='w3-rest'>
                                <table className='w3-table-all w3-padding w3-border'>
                                    
                                    <tbody>
                                        {
                                            this.state.subjects.map(arr=>{
                                                return(
                                                    <div>
                                                        <tr>
                                                            <td><input style={{border: 0, backgroundColor: 'none'}} disabled value={arr['name']} /></td>
                                                            <td><input type='number' id={arr['value']} style={{border: 0, backgroundColor: 'none'}} disabled className='value' value={arr['value']} /></td>
                                                            <td><input type='text' id={arr['grade']} style={{border: 0, backgroundColor: 'none'}} disabled className='grade' value={arr['grade']} /></td>
                                                        </tr>
                                                    </div>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default Result;