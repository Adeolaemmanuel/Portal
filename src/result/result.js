import React from 'react';
import '../index.css';
import './result.css';
import Nav from '../nav/nav';
import { db} from '../database'
import { Cookies } from 'react-cookie'

class Result extends React.Component{
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
        //console.log(id)
        db.collection('Details').doc(this.state.id).collection('subjects').doc(id).get()
        .then(a=>{
            this.setState({subjects: a.data().subjects})
            console.log(a.data().subjects)
        })
    }

    render(){
        return(
            <div>
                <Nav user={this.state.user} />
                <div className='w3-container'>
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
                            <div className='w3-col s2 m2 l2'>
                                {
                                    this.state.subjectIds.map(arr=>{
                                        return(
                                            <div className='w3-btn w3-padding w3-card w3-margin-top w3-center' id={arr} onClick={this.subjectId} style={{width:'100%'}}>{arr}</div>
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

export default Result;