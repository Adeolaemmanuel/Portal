import React from 'react';
import '../index.css';
import './upload.css';
import Nav from '../nav/nav';
import { Cookies } from 'react-cookie'
import { db } from '../database'
import $ from 'jquery'

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
            subjectIds: []
        }
        this.getSubject = this.getSubject.bind(this)
        this.subjectId = this.subjectId.bind(this)
        this.upload = this.upload.bind(this)
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

    upload(e){
        e.preventDefault()
        let data = $('#upload').serializeArray()
        let subjects = this.state.subjects
        console.log(data)
        for(let x=0; x<subjects; x++){
            for(let y=0; data<data.length; y++){
                if(subjects[x].name === data[x].name && data[y].value !== ''){
                    subjects[x].push(data[y])
                    console.log(subjects)
                }
            }
        }
    }

    render(){
        return(
            <div>
                <Nav user={this.state.user} />
                <div className='w3-container'>
                <h2 className='w3-center w3-padding'>Upload student Result</h2>
                    <div className='w3-container'>
                        <div className="w3-padding">
                            <form onSubmit ={this.getSubject}>
                                <input className='w3-input w3-border w3-round' type='text' id='id' placeholder="Input Reg" />
                                <div className="w3-center">
                                    <button className='w3-btn w3-deep-orange w3-round'>Search</button>
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
                            <form id='upload' onSubmit={this.upload}>
                                <table className='w3-table-all w3-padding w3-border'>
                                    <thead>
                                        <tr>
                                            <th>SUBJECT</th>
                                            <td>GRADE</td>
                                            <th>SCORE</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.subjects.map(arr=>{
                                                return(
                                                    <div>
                                                        <tr>
                                                            <td><input style={{border: 0, backgroundColor: 'none'}} disabled placeholder={arr['name']} name={arr['name']} /></td>
                                                            <td><input type='number' id={arr['value']} className='value' placeholder={arr['value']} name={arr['name']} /></td>
                                                            <td><input type='number' id={arr['grade']} className='score' placeholder={arr['score']} name={arr['name']} /></td>
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