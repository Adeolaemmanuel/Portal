import React from 'react';
import '../index.css';
import './upload.css';
import Nav from '../nav/nav';
import { Cookies } from 'react-cookie'
import { db } from '../database'
import $ from 'jquery'
import folder from '../assets/img/folder.svg'
import back from '../assets/img/arrow.svg'

class Upload extends React.Component{
    constructor(props){
        super(props)
        const cookies = new Cookies()
        this.state = {
            user: cookies.get('user'),
            url: this.props['url'],
            id: '',
            userId: '',
            subjects: [],
            subjectIds: [],
            resultId: ''
        }
        this.getSubject = this.getSubject.bind(this)
        this.subjectId = this.subjectId.bind(this)
        this.upload = this.upload.bind(this)
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
                    //console.log(a.data().subjects)
                })
            }
        })
    }

    subjectId(e){
        //get subject id for onlcick for getting result or setting
        e.preventDefault()
        let id = e.target.id
        this.setState({resultId: id})
        let resultId = document.getElementById('resultId');
        let result =  document.getElementById('result')
        let back =  document.getElementById('back')
        //let search =  document.getElementById('search')
        //console.log(id)
        resultId.style.display = 'none'
        result.style.display = 'block'
        back.style.display = 'block'
        //search.style.display = 'none'

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

    upload(e){
        e.preventDefault()
        let data = $('#upload').serializeArray()
        let subjects = [...this.state.subjects]
        for(let x=0; x<subjects.length; x++){
            for(let y=0; y<data.length; y++){
                if(subjects[x].name === data[y].name && data[y].value !== ''){
                    subjects[x].value = data[y].value
                    subjects[x].remarks = data[x].remarks
                }
                if(subjects[x].value >= 80 && subjects[x].value <= 100){
                    subjects[x].grade = 'A'
                    subjects[x].color = 'w3-green'
                    subjects[x].remarks = 'Excellent'
                }
                if(subjects[x].value >= 60 && subjects[x].value <= 70){
                    subjects[x].grade = 'B'
                    subjects[x].color = 'w3-green'
                    subjects[x].remarks = 'Very good'
                }
                if(subjects[x].value >= 40 && subjects[x].value <= 50){
                    subjects[x].grade = 'C'
                    subjects[x].color = 'w3-lime'
                    subjects[x].remarks = 'You can do better'
                }
                if(subjects[x].value >= 0 && subjects[x].value <= 40){
                    subjects[x].grade = 'F'
                    subjects[x].color = 'w3-red'
                    subjects[x].remarks = 'Very poor'
                }

            }
        }
        console.log(subjects)
        db.collection('Details').doc(this.state.userId).collection('subjects').doc(this.state.resultId).update({subjects: subjects})
    }

    render(){
        return(
            <div>
                <Nav user={this.state.user} />
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
                                <form id='upload' onSubmit={this.upload}>
                                    <table className='w3-table-all w3-padding w3-border'>
                                        <tbody>
                                            {
                                                this.state.subjects.map(arr=>{
                                                    return(
                                                        <div>
                                                            <tr>
                                                                <td>{<input style={{border: 0, backgroundColor: 'none'}} disabled value={arr['name']} />}</td>
                                                                <td><input type='number' id={arr['name']} className='value' placeholder={arr['value']} name={arr['name']} /></td>
                                                                <td><input type='text' id={arr['name']+'G'} className={arr['name']+'G'} placeholder={arr['grade']} name={arr['name']+'G'} /></td>
                                                                <td><textarea value={arr['remarks']} name={arr['name']+'R'}></textarea></td>
                                                            </tr>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                    <div className='w3-center'>
                                        <button className='w3-btn w3-deep-orange w3-margin-top w3-round'>Upload</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Upload;