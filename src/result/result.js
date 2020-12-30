import React from 'react';
import './result.css';
import Nav from '../nav/nav';
import { db} from '../database'
import { Cookies } from 'react-cookie'
import { IoArrowBackOutline } from "react-icons/io5";
import { MdFolder } from "react-icons/md";

class Result extends React.Component{
    constructor(props){
        super(props)
        const cookies = new Cookies()
        this.state = {
            user: cookies.get('user'),
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
        let searchD =  document.getElementById('searchD')
        let backD =  document.getElementById('backD')
        //console.log(id)
        resultId.style.display = 'none'
        result.style.display = 'block'
        backD.style.display = 'block'
        searchD.style.display = 'none'
        db.collection('Details').doc(this.state.userId).collection('subjects').doc(id).get()
        .then(a=>{
            this.setState({subjects: a.data().subjects})
            //console.log(a.data().subjects)
        })
    }

    backFolder(){
        let resultId = document.getElementById('resultId');
        let result =  document.getElementById('result')
        let searchD =  document.getElementById('searchD')
        let backD =  document.getElementById('backD')
        resultId.style.display = 'block'
        result.style.display = 'none'
        backD.style.display = 'none'
        searchD.style.display = 'block'
    }
    

    render(){
        return(
            <div>
                <div className='w3-container'>
                    <div className='w3-container'>
                        <div className="w3-padding">
                            <form onSubmit ={this.getSubject}>
                                <input className='w3-input w3-border w3-round' type='text' id='id' placeholder="Input Reg" />
                                <div className='w3-padding' id='backD' style={{display: 'none'}}>
                                    <MdFolder className='w3-margin-top' onClick={this.backFolder} style={{width:'100%', height: '40px'}} />
                                </div>
                                <div className='w3-center'id='searchD'>
                                    <button className='w3-btn w3-deep-orange w3-round w3-margin-top w3-margin-left' >Search</button>
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
                                                    <MdFolder id={arr} onClick={this.subjectId}  style={{width:'100%', height:'60px'}} />
                                                    <div className='w3-padding w3-center w3-bold w3-small resultId' id={arr} onClick={this.subjectId} style={{width:'100%'}}>{arr}</div>
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
                                                            <td><textarea value={arr['remarks']} style={{border: 0, backgroundColor: 'none'}} disabled></textarea></td>
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
        let back =  document.getElementById('backD')
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
        let back =  document.getElementById('backD')
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
                                <div className='w3-center w3-margin-top'>
                                    <span className='w3-padding w3-deep-orange'>Result | {this.state.id}</span>
                                </div>
                                <div className='w3-padding'  id="backD" style={{display: 'none'}}>
                                    <IoArrowBackOutline className='w3-margin-top' onClick={this.backFolder} style={{width:'100%', height: '40px'}} />
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
                                                    <MdFolder id={arr} onClick={this.subjectId}  style={{width:'100%', height:'60px'}} />
                                                    <div className='w3-padding w3-center w3-bold resultId w3-small' id={arr} onClick={this.subjectId} style={{width:'100%'}}>{arr}</div>
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
                                                            <td><textarea value={arr['remarks']} style={{border: 0, backgroundColor: 'none'}} disabled></textarea></td>
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
        let searchD =  document.getElementById('searchD')
        let backD =  document.getElementById('backD')
        //console.log(id)
        resultId.style.display = 'none'
        result.style.display = 'block'
        backD.style.display = 'block'
        searchD.style.display = 'none'
        db.collection('Details').doc(this.state.userId).collection('subjects').doc(id).get()
        .then(a=>{
            this.setState({subjects: a.data().subjects})
            //console.log(a.data().subjects)
        })
    }

    backFolder(){
        let resultId = document.getElementById('resultId');
        let result =  document.getElementById('result')
        let searchD =  document.getElementById('searchD')
        let backD =  document.getElementById('backD')
        resultId.style.display = 'block'
        result.style.display = 'none'
        backD.style.display = 'none'
        searchD.style.display = 'block'
    }
    

    render(){
        return(
            <div>
                <div className='w3-container'>
                    <div className='w3-container'>
                        <div className="w3-padding">
                            <form onSubmit ={this.getSubject}>
                                <input className='w3-input w3-border w3-round' type='text' id='id' placeholder="Input Reg" />
                                <div className='w3-padding' id='backD' style={{display: 'none'}}>
                                    <IoArrowBackOutline className='w3-margin-top' onClick={this.backFolder} style={{width:'100%', height: '40px'}} />
                                </div>
                                <div className='w3-center'id='searchD'>
                                    <button className='w3-btn w3-deep-orange w3-round w3-margin-top w3-margin-left' >Search</button>
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
                                                    <MdFolder id={arr} onClick={this.subjectId}  style={{width:'100%', height:'60px'}} />
                                                    <div className='w3-padding w3-center w3-bold w3-small resultId' id={arr} onClick={this.subjectId} style={{width:'100%'}}>{arr}</div>
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
                                                            <td><textarea value={arr['remarks']} style={{border: 0, backgroundColor: 'none'}} disabled></textarea></td>
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