import React from 'react';
import '../index.css';
import './profile.css';
import Nav from '../nav/nav';
import axios from 'axios'
import $ from 'jquery'

class Profile extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            class: ['JS1','JS2','JS3','SS1','SS2','SS3'],
            term: ['1st Term','2nd Term'],
            dapertment: ['Science','Art','Cormmercial'],
            subject: ['Mathematics','English','Physics','Chemistry','French','Youruba','Bussiness Studies','Computer Science','Basic Technology','Home Economics','CRS','PHE','Acgricultural Science','Applied Arts','Civic Education','Basic Science','Futher Mathematics','Biology','Commerce','History','Goverment','Geography','Literature','Humanities','History'],
            url: this.props
        }
        this.courseFrom = this.courseFrom.bind(this)
    }

    courseFrom(e){
        e.preventDefault()
        let data = $('#course').serializeArray()
        axios.post(`${this.state.url['url']}courseForm`, data, {headers: {'contentType': "application/json"}}).then(res=>{

        })
    }

    render(){
        return(
            <div>
                <Nav />
                <div className='w3-row'>
                    <div className='w3-col s12 m6 l6'>
                        <h2 className='w3-center'>Register Your Course</h2>
                        <div className='w3-container'>
                            <form className='top' id='course' onSubmit={this.courseFrom}>
                                <select className='w3-input w3-border w3-round' name='class' id='class'>
                                    {this.state.class.map(arr=>{
                                        return <option value={arr} key={arr} id={arr}>{arr}</option>
                                    })}
                                </select>
                                <select className='w3-input w3-border w3-round w3-margin-top' id='term' name='term'>
                                    {this.state.term.map(arr=>{
                                        return <option value={arr} key={arr} id={arr}>{arr}</option>
                                    })}
                                </select>
                                <select className='w3-input w3-border w3-round w3-margin-top' id='dept' name='department'>
                                    {this.state.dapertment.map(arr=>{
                                        return <option value={arr} key={arr} id={arr}>{arr}</option>
                                    })}
                                </select>

                                <div className='w3-container'>
                                    {
                                        this.state.subject.map(arr=>{
                                            return(
                                                <div className='w3-row w3-padding w3-margin-top w3-card w3-round'>
                                                    <div className='w3-col s6 m6 l6'>{arr}</div>
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

export default Profile;