import React, { Component } from 'react'
import Nav from '../nav/nav'
import { IoArrowBackOutline, IoArrowForwardOutline } from "react-icons/io5";
import { FcFolder } from "react-icons/fc";
import { Cookies } from 'react-cookie'
import { db, firebase, } from '../database'
import $ from 'jquery'

export default  class CBT extends Component {
    constructor(props) {
        super(props);
        const cookies = new Cookies();
        this.state = {
            id: cookies.get('id'),
            user: cookies.get('user'),
            
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

class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subject: ['Mathematics','English','Physics','Chemistry','French','Youruba','Bussiness Studies','Computer Science','Basic Technology','Home Economics','CRS','PHE','Acgricultural Science','Applied Arts','Civic Education','Basic Science','Futher Mathematics','Biology','Commerce','History','Goverment','Geography','Literature','Humanities','History'],
            class: ['JS1','JS2','JS3','SS1','SS2','SS3'],
            term: ['1st Term','2nd Term'],
            department: ['Science','Art','Cormmercial'],
            back: '',
            forward: '',
            folder: {},
            cbt: [],
            year: 2020
        }

        this.folderClick = this.folderClick.bind(this);
        this.tab = this.tab.bind(this)
        this.submit = this.submit.bind(this)
        this.accordion = this.accordion.bind(this)
        this.tabM = this.tabM.bind(this)
    }


    folderClick(e,route,id, tab=false){
        e.preventDefault();
        let row = document.getElementsByClassName('w3-row');
        let date = new Date();
        if(route === 'home'){
            row[0].style.display = 'block'
            row[1].style.display = 'block'
            row[2].style.display = 'none'
            row[3].style.display = 'none'
            row[4].style.display = 'none'
            this.setState({back:'home', forward: 'class', arr: id})
        }else if(route === 'subjects'){
            row[0].style.display = 'block'// nav
            row[1].style.display = 'none'// subjects
            row[2].style.display = 'block'// class
            row[3].style.display = 'none'//  term
            row[4].style.display = 'none'//
            this.setState({back:'home', forward: 'class', arr: id, folder:{subject: id}})
            let tabs = document.getElementsByClassName('tabs')
            if(tab){
                tabs[0].style.display = 'none'
                tabs[1].style.display = 'none'
            }
        }else if(route === 'class'){
            row[0].style.display = 'block'
            row[1].style.display = 'none'
            row[2].style.display = 'none'
            row[3].style.display = 'block'
            row[4].style.display = 'none'
            this.setState({back:'home', forward: 'term', arr: id, folder:{subject: this.state.folder.subject, class: id}})
            let tabs = document.getElementsByClassName('tabs')
            if(tab){
                tabs[0].style.display = 'none'
                tabs[1].style.display = 'none'
            }
        }else if(route === 'term'){
            row[0].style.display = 'block'
            row[1].style.display = 'none'
            row[2].style.display = 'none'
            row[3].style.display = 'none'
            row[4].style.display = 'block'
            this.setState({back:'class', forward: 'cbt', arr: id, folder:{term: id, subject: this.state.folder.subject, class: this.state.folder.class, year: date.getFullYear()}})
            let tabs = document.getElementsByClassName('tabs')
            if(tab){
                tabs[0].style.display = 'none'
                tabs[1].style.display = 'none'
            }
            this.getCbt(id)
        }else if(route === 'cbt'){
            row[0].style.display = 'block'
            row[1].style.display = 'none'
            row[2].style.display = 'none'
            row[3].style.display = 'none'
            row[4].style.display = 'block'
            this.setState({back:'term', forward: 'cbt', arr: id})
            let tabs = document.getElementsByClassName('tabs')
            if(tab){
                tabs[0].style.display = 'none'
                tabs[1].style.display = 'none'
            }
        }
    }
    
    tab(route){
        var i;
        var x = document.getElementsByClassName("tab");
        for (i = 0; i < x.length; i++) {
            x[i].style.display = "none";
        }
        document.getElementById(route).style.display = "block";
    }

    submit(e, pram){
        e.preventDefault()
        let data= {
            question: e.target.elements.question.value,
            category: e.target.elements.category.value,
            O1: e.target.elements.O1.value, 
            O2: e.target.elements.O2.value,
            O3: e.target.elements.O3.value,
            O4: e.target.elements.O4.value,
            answer: e.target.elements.answer.value
        }
        
        db.collection('CBT').doc(`${pram.subject}|${pram.class}|${pram.term}|${pram.year}`)
        .get().then(ques=>{
            if(ques.exists){
                db.collection('CBT').doc(`${pram.subject}|${pram.class}|${pram.term}|${pram.year}`)
                .update({questions: firebase.firestore.FieldValue.arrayUnion(data)})
                .then(()=>{alert('Sent to database')})
            }else{
                db.collection('CBT').doc(`${pram.subject}|${pram.class}|${pram.term}|${pram.year}`)
                .set({questions: [data], closed: true})
                .then(()=>{alert('Sent to database')})
                data.question = ''
                data.category = ''
                data.O1 = ''
                data.O2 = ''
                data.O3 = ''
                data.O4 = ''
                data.answer = ''
            }
        })
    }

    getCbt(id){
        db.collection('CBT').doc(`${this.state.folder.subject}|${this.state.folder.class}|${id}|${this.state.year}`)
        .get().then(cbt=>{
            if(cbt.exists){
                this.setState({cbt: cbt.data().questions})
                console.log(cbt.data().questions)
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

    tabM(show='CBT',hide='questions'){
        if(show){
            //console.log(show)
            document.getElementById(show).style.display = 'block'
            document.getElementById(hide).style.display = 'none'
        }
    }

    render() {
        if(window.matchMedia("(max-width: 767px)").matches){
            return (
                <>
                    <div className='w3-row' style={{display: 'none'}}>
                        <div className='w3-col s6' onClick={(e)=>{this.folderClick(e, this.state.back, this.state.folder)}}>
                            <IoArrowBackOutline id="back" className='w3-margin-top'  style={{width:'100%', height: '40px'}} />
                        </div>
                        <div className='w3-col s6'>
                            <IoArrowForwardOutline id="forward" className='w3-margin-top' onClick={(e)=>{this.folderClick(e, this.state.forward, this.state.arr)}} style={{width:'100%', height: '40px'}} />
                        </div>
                    </div>
                    <div className='w3-col s6 w3-btn w3-deep-orange tabs' style={{display: 'none'}} onClick={(e)=>this.tabM('CBT','questions',true)}>Set CBT</div>
                    <div className='w3-col s6 w3-btn w3-deep-orange tabs' style={{display: 'none'}}  onClick={(e)=>this.tabM('questions','CBT',true)}>Questions</div>
                    <div className='w3-row' id='subjects'>
                        {
                            this.state.subject.map(arr=>{
                                return(
                                    <div className='w3-col s6 m4 l4 w3-padding w3-center w3-border' onClick={(e)=>{this.folderClick(e, 'subjects', arr)}}>
                                        <FcFolder style={{width: '70px', height: '70px'}}  key={arr}  id={arr} onClick={(e)=>{this.folderClick(e, 'subjects', arr)}}  />
                                        <p className='w3-bold' onClick={(e)=>{this.folderClick(e, 'subjects', arr)}}>{arr}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className='w3-row' id='class' style={{display: 'none'}}>
                        {
                            this.state.class.map(arr=>{
                                return(
                                    <div className='w3-col s6 m4 l4 w3-padding w3-center w3-border' onClick={(e)=>{this.folderClick(e, 'class', arr)}}>
                                        <FcFolder style={{width: '70px', height: '70px'}} key={arr} onClick={(e)=>{this.folderClick(e, 'class', arr)}}  id={arr}  />
                                        <p className='w3-bold' onClick={(e)=>{this.folderClick(e, 'class', arr)}}>{arr}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className='w3-row' id='term' style={{display: 'none'}}>
                        {
                            this.state.term.map(arr=>{
                                return(
                                    <div className='w3-col s6 m4 l4 w3-padding w3-center w3-border' onClick={(e)=>{this.folderClick(e, 'term', arr)}}>
                                        <FcFolder style={{width: '70px', height: '70px'}} key={arr} onClick={(e)=>{this.folderClick(e, 'class', arr)}}  id={arr}  />
                                        <p className='w3-bold' onClick={(e)=>{this.folderClick(e, 'term', arr)}}>{arr}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className='w3-row' style={{display: 'none'}}>
                        <div className='w3-half' id='CBT'>
                            <div class="w3-bar w3-black">
                                <button class="w3-bar-item w3-button" onClick={(e)=>this.tab('obj')}>Objective</button>
                                <button class="w3-bar-item w3-button w3-right" onClick={(e)=>this.tab('theory')}>Therory</button>
                            </div>
                            <div id="obj" class="tab w3-container">
                                <form onSubmit={(e)=>this.submit(e, this.state.folder)}>
                                    <input className='w3-input w3-border w3-round w3-margin-top' placeholder='Category' id='category' />
                                    <input className='w3-input w3-border w3-round w3-margin-top' placeholder='Question' id='question' />
                                    <div className='w3-row'>
                                        <div className='w3-half w3-padding'>
                                            <input className='w3-input w3-border w3-round w3-margin-top' placeholder='Option 1' id='O1' />
                                        </div>
                                        <div className='w3-half w3-padding'>
                                            <input className='w3-input w3-border w3-round w3-margin-top' placeholder='Option 2' id='O2' />
                                        </div>
                                        <div className='w3-half w3-padding'>
                                            <input className='w3-input w3-border w3-round w3-margin-top' placeholder='Option 3' id='O3' />
                                        </div>
                                        <div className='w3-half w3-padding'>
                                            <input className='w3-input w3-border w3-round w3-margin-top' placeholder='Option 4' id='O4' />
                                        </div>
                                    </div>
                                    <input className='w3-input w3-border w3-round w3-margin-top' placeholder='Answer' id='answer' />
                                    <div className='w3-center w3-margin-top'>
                                        <button className='w3-btn w3-deep-orange w3-round'>Submit</button>
                                    </div>
                                </form>
                            </div>
    
                            <div id="theory" class="tab" style={{display: 'none'}}>
                            <textarea className='w3-input w3-margin-top' placeholder='Question...'></textarea>
                        </div>
                        </div>
                        <div class='w3-half w3-padding' id='questions'>
                            {
                                this.state.cbt.map((arr,ind)=>{
                                    return(
                                        <div>
                                            <button onClick={(e)=>{this.accordion(e, ind)}} class="w3-button w3-center w3-block w3-margin-top">{arr['question']}</button>
                                            <div id={ind} class="w3-container w3-row w3-hide">
                                                <div className='w3-col s6 w3-padding w3-border'>{arr['O1']}</div>
                                                <div className='w3-col s6 w3-padding w3-border'>{arr['O2']}</div>
                                                <div className='w3-col s6 w3-padding w3-border'>{arr['O3']}</div>
                                                <div className='w3-col s6 w3-padding w3-border'>{arr['O4']} </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </>
            )
        }else{
            return (
                <>
                    <div className='w3-row' style={{display: 'none'}}>
                        <div className='w3-half' onClick={(e)=>{this.folderClick(e, this.state.back, this.state.folder)}}>
                            <IoArrowBackOutline id="back" className='w3-margin-top' onClick={(e)=>{this.folderClick(e, this.state.back, this.state.folder)}} style={{width:'100%', height: '40px'}} />
                        </div>
                        <div className='w3-half'>
                            <IoArrowForwardOutline id="forward" className='w3-margin-top' onClick={(e)=>{this.folderClick(e, this.state.forward, this.state.arr)}} style={{width:'100%', height: '40px'}} />
                        </div>
                    </div>
                    <div className='w3-row' id='subjects'>
                        {
                            this.state.subject.map(arr=>{
                                return(
                                    <div className='w3-col s6 m4 l4 w3-padding w3-center w3-border' onClick={(e)=>{this.folderClick(e, 'subjects', arr)}}>
                                        <FcFolder style={{width: '70px', height: '70px'}} key={arr} onClick={(e)=>{this.folderClick(e, 'class', arr)}}  id={arr}  />
                                        <p className='w3-bold' onClick={(e)=>{this.folderClick(e, 'subjects', arr)}}>{arr}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className='w3-row' id='class' style={{display: 'none'}}>
                        {
                            this.state.class.map(arr=>{
                                return(
                                    <div className='w3-col s6 m4 l4 w3-padding w3-center w3-border' onClick={(e)=>{this.folderClick(e, 'class', arr)}}>
                                        <FcFolder style={{width: '70px', height: '70px'}} key={arr} onClick={(e)=>{this.folderClick(e, 'class', arr)}}  id={arr}  />
                                        <p className='w3-bold' onClick={(e)=>{this.folderClick(e, 'class', arr)}}>{arr}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className='w3-row' id='term' style={{display: 'none'}}>
                        {
                            this.state.term.map(arr=>{
                                return(
                                    <div className='w3-col s6 m4 l4 w3-padding w3-center w3-border' onClick={(e)=>{this.folderClick(e, 'term', arr)}}>
                                        <FcFolder style={{width: '70px', height: '70px'}} key={arr} onClick={(e)=>{this.folderClick(e, 'class', arr)}}  id={arr}  />
                                        <p className='w3-bold' onClick={(e)=>{this.folderClick(e, 'term', arr)}}>{arr}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className='w3-row' style={{display: 'none'}}>
                        <div className='w3-half'>
                            <div class="w3-bar w3-black">
                                <button class="w3-bar-item w3-button" onClick={(e)=>this.tab('obj')}>Objective</button>
                                <button class="w3-bar-item w3-button" onClick={(e)=>this.tab('theory')}>Therory</button>
                            </div>
                            <div id="obj" class="tab w3-container" style={{display: 'none'}}>
                                <form onSubmit={(e)=>this.submit(e, this.state.folder)}>
                                    <input className='w3-input w3-border w3-round w3-margin-top' placeholder='Category' id='category' />
                                    <input className='w3-input w3-border w3-round w3-margin-top' placeholder='Question' id='question' />
                                    <div className='w3-row'>
                                        <div className='w3-half w3-padding'>
                                            <input className='w3-input w3-border w3-round w3-margin-top' placeholder='Option 1' id='O1' />
                                        </div>
                                        <div className='w3-half w3-padding'>
                                            <input className='w3-input w3-border w3-round w3-margin-top' placeholder='Option 2' id='O2' />
                                        </div>
                                        <div className='w3-half w3-padding'>
                                            <input className='w3-input w3-border w3-round w3-margin-top' placeholder='Option 3' id='O3' />
                                        </div>
                                        <div className='w3-half w3-padding'>
                                            <input className='w3-input w3-border w3-round w3-margin-top' placeholder='Option 4' id='O4' />
                                        </div>
                                    </div>
                                    <input className='w3-input w3-border w3-round w3-margin-top' placeholder='Answer' id='answer' />
                                    <div className='w3-center w3-margin-top'>
                                        <button className='w3-btn w3-deep-orange w3-round'>Submit</button>
                                    </div>
                                </form>
                            </div>
    
                            <div id="theory" class="tab" style={{display: 'none'}}>
                            <textarea className='w3-input w3-margin-top' placeholder='Question...'></textarea>
                        </div>
                        </div>
                        <div class='w3-half w3-padding'>
                            {
                                this.state.cbt.map((arr,ind)=>{
                                    return(
                                        <div>
                                            <button onClick={(e)=>{this.accordion(e, ind)}} class="w3-button w3-center w3-block w3-margin-top">{arr['question']}</button>
    
                                            <div id={ind} class="w3-container w3-row w3-hide">
                                                <div className='w3-half w3-padding w3-border'>{arr['O1']}</div>
                                                <div className='w3-half w3-padding w3-border'>{arr['O2']}</div>
                                                <div className='w3-half w3-padding w3-border'>{arr['O3']}</div>
                                                <div className='w3-half w3-padding w3-border'>{arr['O4']} </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </>
            )
        }
    }

}

class Teacher extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            subject: ['Mathematics','English','Physics','Chemistry','French','Youruba','Bussiness Studies','Computer Science','Basic Technology','Home Economics','CRS','PHE','Acgricultural Science','Applied Arts','Civic Education','Basic Science','Futher Mathematics','Biology','Commerce','History','Goverment','Geography','Literature','Humanities','History'],
            class: ['JS1','JS2','JS3','SS1','SS2','SS3'],
            term: ['1st Term','2nd Term'],
            department: ['Science','Art','Cormmercial'],
            back: '',
            forward: '',
            folder: {},
            cbt: [],
            year: 2020
        }

        this.folderClick = this.folderClick.bind(this);
        this.tab = this.tab.bind(this)
        this.submit = this.submit.bind(this)
        this.accordion = this.accordion.bind(this)
        this.tabM = this.tabM.bind(this)
    }


    folderClick(e,route,id,tab=false){
        e.preventDefault();
        let row = document.getElementsByClassName('w3-row');
        let date = new Date();
        if(route === 'home'){
            row[0].style.display = 'block'
            row[1].style.display = 'block'
            row[2].style.display = 'none'
            row[3].style.display = 'none'
            row[4].style.display = 'none'
            this.setState({back:'home', forward: 'class', arr: id})
        }else if(route === 'subjects'){
            row[0].style.display = 'block'// nav
            row[1].style.display = 'none'// subjects
            row[2].style.display = 'block'// class
            row[3].style.display = 'none'//  term
            row[4].style.display = 'none'//
            this.setState({back:'home', forward: 'class', arr: id, folder:{subject: id}})
            let tabs = document.getElementsByClassName('tabs')
            if(tab){
                tabs[0].style.display = 'none'
                tabs[1].style.display = 'none'
            }
        }else if(route === 'class'){
            row[0].style.display = 'block'
            row[1].style.display = 'none'
            row[2].style.display = 'none'
            row[3].style.display = 'block'
            row[4].style.display = 'none'
            this.setState({back:'home', forward: 'term', arr: id, folder:{subject: this.state.folder.subject, class: id}})
            let tabs = document.getElementsByClassName('tabs')
            if(tab){
                tabs[0].style.display = 'none'
                tabs[1].style.display = 'none'
            }
        }else if(route === 'term'){
            row[0].style.display = 'block'
            row[1].style.display = 'none'
            row[2].style.display = 'none'
            row[3].style.display = 'none'
            row[4].style.display = 'block'
            this.setState({back:'class', forward: 'cbt', arr: id, folder:{term: id, subject: this.state.folder.subject, class: this.state.folder.class, year: date.getFullYear()}})
            let tabs = document.getElementsByClassName('tabs')
            if(tab){
                tabs[0].style.display = 'none'
                tabs[1].style.display = 'none'
            }
            this.getCbt(id)
        }else if(route === 'cbt'){
            row[0].style.display = 'block'
            row[1].style.display = 'none'
            row[2].style.display = 'none'
            row[3].style.display = 'none'
            row[4].style.display = 'block'
            this.setState({back:'term', forward: 'cbt', arr: id})
            let tabs = document.getElementsByClassName('tabs')
            if(tab){
                tabs[0].style.display = 'none'
                tabs[1].style.display = 'none'
            }
        }
    }
    
    tab(route){
        var i;
        var x = document.getElementsByClassName("tab");
        for (i = 0; i < x.length; i++) {
            x[i].style.display = "none";
        }
        document.getElementById(route).style.display = "block";
    }

    submit(e, pram){
        e.preventDefault()
        let data= {
            question: e.target.elements.question.value,
            category: e.target.elements.category.value,
            O1: e.target.elements.O1.value, 
            O2: e.target.elements.O2.value,
            O3: e.target.elements.O3.value,
            O4: e.target.elements.O4.value,
            answer: e.target.elements.answer.value
        }
        
        db.collection('CBT').doc(`${pram.subject}|${pram.class}|${pram.term}|${pram.year}`)
        .get().then(ques=>{
            if(ques.exists){
                db.collection('CBT').doc(`${pram.subject}|${pram.class}|${pram.term}|${pram.year}`)
                .update({questions: firebase.firestore.FieldValue.arrayUnion(data)})
                .then(()=>{alert('Sent to database')})
            }else{
                db.collection('CBT').doc(`${pram.subject}|${pram.class}|${pram.term}|${pram.year}`)
                .set({questions: [data], closed: true})
                .then(()=>{alert('Sent to database')})
            }
        })
    }

    getCbt(id){
        db.collection('CBT').doc(`${this.state.folder.subject}|${this.state.folder.class}|${id}|${this.state.year}`)
        .get().then(cbt=>{
            if(cbt.exists){
                this.setState({cbt: cbt.data().questions})
                console.log(cbt.data().questions)
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

    tabM(show='CBT',hide='questions'){
        if(show){
            //console.log(show)
            document.getElementById(show).style.display = 'block'
            document.getElementById(hide).style.display = 'none'
        }
    }

    render() {
        if(window.matchMedia("(max-width: 767px)").matches){
            return (
                <>
                    <div className='w3-row' style={{display: 'none'}}>
                        <div className='w3-col s6' onClick={(e)=>{this.folderClick(e, this.state.back, this.state.folder)}}>
                            <IoArrowBackOutline id="back" className='w3-margin-top'  style={{width:'100%', height: '40px'}} />
                        </div>
                        <div className='w3-col s6'>
                            <IoArrowForwardOutline id="forward" className='w3-margin-top' onClick={(e)=>{this.folderClick(e, this.state.forward, this.state.arr)}} style={{width:'100%', height: '40px'}} />
                        </div>
                    </div>
                    <div className='w3-col s6 w3-btn w3-deep-orange tabs' style={{display: 'none'}} onClick={(e)=>this.tabM('CBT','questions',true)}>Set CBT</div>
                    <div className='w3-col s6 w3-btn w3-deep-orange tabs' style={{display: 'none'}}  onClick={(e)=>this.tabM('questions','CBT',true)}>Questions</div>
                    <div className='w3-row' id='subjects'>
                        {
                            this.state.subject.map(arr=>{
                                return(
                                    <div className='w3-col s6 m4 l4 w3-padding w3-center w3-border' onClick={(e)=>{this.folderClick(e, 'subjects', arr)}}>
                                        <FcFolder style={{width: '70px', height: '70px'}} key={arr} onClick={(e)=>{this.folderClick(e, 'class', arr)}}  id={arr}  />
                                        <p className='w3-bold' onClick={(e)=>{this.folderClick(e, 'subjects', arr)}}>{arr}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className='w3-row' id='class' style={{display: 'none'}}>
                        {
                            this.state.class.map(arr=>{
                                return(
                                    <div className='w3-col s6 m4 l4 w3-padding w3-center w3-border' onClick={(e)=>{this.folderClick(e, 'class', arr)}}>
                                        <FcFolder style={{width: '70px', height: '70px'}} key={arr} onClick={(e)=>{this.folderClick(e, 'class', arr)}}  id={arr}  />
                                        <p className='w3-bold' onClick={(e)=>{this.folderClick(e, 'class', arr)}}>{arr}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className='w3-row' id='term' style={{display: 'none'}}>
                        {
                            this.state.term.map(arr=>{
                                return(
                                    <div className='w3-col s6 m4 l4 w3-padding w3-center w3-border' onClick={(e)=>{this.folderClick(e, 'term', arr)}}>
                                        <FcFolder style={{width: '70px', height: '70px'}} key={arr} onClick={(e)=>{this.folderClick(e, 'class', arr)}}  id={arr}  />
                                        <p className='w3-bold' onClick={(e)=>{this.folderClick(e, 'term', arr)}}>{arr}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className='w3-row' style={{display: 'none'}}>
                        <div className='w3-half' id='CBT'>
                            <div class="w3-bar w3-black">
                                <button class="w3-bar-item w3-button" onClick={(e)=>this.tab('obj')}>Objective</button>
                                <button class="w3-bar-item w3-button w3-right" onClick={(e)=>this.tab('theory')}>Therory</button>
                            </div>
                            <div id="obj" class="tab w3-container" style={{display: 'none'}}>
                                <form onSubmit={(e)=>this.submit(e, this.state.folder)}>
                                    <input className='w3-input w3-border w3-round w3-margin-top' placeholder='Category' id='category' />
                                    <input className='w3-input w3-border w3-round w3-margin-top' placeholder='Question' id='question' />
                                    <div className='w3-row'>
                                        <div className='w3-half w3-padding'>
                                            <input className='w3-input w3-border w3-round w3-margin-top' placeholder='Option 1' id='O1' />
                                        </div>
                                        <div className='w3-half w3-padding'>
                                            <input className='w3-input w3-border w3-round w3-margin-top' placeholder='Option 2' id='O2' />
                                        </div>
                                        <div className='w3-half w3-padding'>
                                            <input className='w3-input w3-border w3-round w3-margin-top' placeholder='Option 3' id='O3' />
                                        </div>
                                        <div className='w3-half w3-padding'>
                                            <input className='w3-input w3-border w3-round w3-margin-top' placeholder='Option 4' id='O4' />
                                        </div>
                                    </div>
                                    <input className='w3-input w3-border w3-round w3-margin-top' placeholder='Answer' id='answer' />
                                    <div className='w3-center w3-margin-top'>
                                        <button className='w3-btn w3-deep-orange w3-round'>Submit</button>
                                    </div>
                                </form>
                            </div>
    
                            <div id="theory" class="tab" style={{display: 'none'}}>
                            <textarea className='w3-input w3-margin-top' placeholder='Question...'></textarea>
                        </div>
                        </div>
                        <div class='w3-half w3-padding' id='questions'>
                            {
                                this.state.cbt.map((arr,ind)=>{
                                    return(
                                        <div>
                                            <button onClick={(e)=>{this.accordion(e, ind)}} class="w3-button w3-center w3-block w3-margin-top">{arr['question']}</button>
    
                                            <div id={ind} class="w3-container w3-row w3-hide">
                                                <div className='w3-col s6 w3-padding w3-border'>{arr['O1']}</div>
                                                <div className='w3-col s6 w3-padding w3-border'>{arr['O2']}</div>
                                                <div className='w3-col s6 w3-padding w3-border'>{arr['O3']}</div>
                                                <div className='w3-col s6 w3-padding w3-border'>{arr['O4']} </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </>
            )
        }else{
            return (
                <>
                    <div className='w3-row' style={{display: 'none'}}>
                        <div className='w3-half' onClick={(e)=>{this.folderClick(e, this.state.back, this.state.folder)}}>
                            <IoArrowBackOutline id="back" className='w3-margin-top' onClick={(e)=>{this.folderClick(e, this.state.back, this.state.folder)}} style={{width:'100%', height: '40px'}} />
                        </div>
                        <div className='w3-half'>
                            <IoArrowForwardOutline id="forward" className='w3-margin-top' onClick={(e)=>{this.folderClick(e, this.state.forward, this.state.arr)}} style={{width:'100%', height: '40px'}} />
                        </div>
                    </div>
                    <div className='w3-row' id='subjects'>
                        {
                            this.state.subject.map(arr=>{
                                return(
                                    <div className='w3-col s6 m4 l4 w3-padding w3-center w3-border' onClick={(e)=>{this.folderClick(e, 'subjects', arr)}}>
                                        <FcFolder style={{width: '70px', height: '70px'}} key={arr} onClick={(e)=>{this.folderClick(e, 'class', arr)}}  id={arr}  />
                                        <p className='w3-bold' onClick={(e)=>{this.folderClick(e, 'subjects', arr)}}>{arr}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className='w3-row' id='class' style={{display: 'none'}}>
                        {
                            this.state.class.map(arr=>{
                                return(
                                    <div className='w3-col s6 m4 l4 w3-padding w3-center w3-border' onClick={(e)=>{this.folderClick(e, 'class', arr)}}>
                                        <FcFolder style={{width: '70px', height: '70px'}} key={arr} onClick={(e)=>{this.folderClick(e, 'class', arr)}}  id={arr}  />
                                        <p className='w3-bold' onClick={(e)=>{this.folderClick(e, 'class', arr)}}>{arr}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className='w3-row' id='term' style={{display: 'none'}}>
                        {
                            this.state.term.map(arr=>{
                                return(
                                    <div className='w3-col s6 m4 l4 w3-padding w3-center w3-border' onClick={(e)=>{this.folderClick(e, 'term', arr)}}>
                                        <FcFolder style={{width: '70px', height: '70px'}} key={arr} onClick={(e)=>{this.folderClick(e, 'class', arr)}}  id={arr}  />
                                        <p className='w3-bold' onClick={(e)=>{this.folderClick(e, 'term', arr)}}>{arr}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className='w3-row' style={{display: 'none'}}>
                        <div className='w3-half'>
                            <div class="w3-bar w3-black">
                                <button class="w3-bar-item w3-button" onClick={(e)=>this.tab('obj')}>Objective</button>
                                <button class="w3-bar-item w3-button" onClick={(e)=>this.tab('theory')}>Therory</button>
                            </div>
                            <div id="obj" class="tab w3-container">
                                <form onSubmit={(e)=>this.submit(e, this.state.folder)}>
                                    <input className='w3-input w3-border w3-round w3-margin-top' placeholder='Category' id='category' />
                                    <input className='w3-input w3-border w3-round w3-margin-top' placeholder='Question' id='question' />
                                    <div className='w3-row'>
                                        <div className='w3-half w3-padding'>
                                            <input className='w3-input w3-border w3-round w3-margin-top' placeholder='Option 1' id='O1' />
                                        </div>
                                        <div className='w3-half w3-padding'>
                                            <input className='w3-input w3-border w3-round w3-margin-top' placeholder='Option 2' id='O2' />
                                        </div>
                                        <div className='w3-half w3-padding'>
                                            <input className='w3-input w3-border w3-round w3-margin-top' placeholder='Option 3' id='O3' />
                                        </div>
                                        <div className='w3-half w3-padding'>
                                            <input className='w3-input w3-border w3-round w3-margin-top' placeholder='Option 4' id='O4' />
                                        </div>
                                    </div>
                                    <input className='w3-input w3-border w3-round w3-margin-top' placeholder='Answer' id='answer' />
                                    <div className='w3-center w3-margin-top'>
                                        <button className='w3-btn w3-deep-orange w3-round'>Submit</button>
                                    </div>
                                </form>
                            </div>
    
                            <div id="theory" class="tab" style={{display: 'none'}}>
                            <textarea className='w3-input w3-margin-top' placeholder='Question...'></textarea>
                        </div>
                        </div>
                        <div class='w3-half w3-padding'>
                            {
                                this.state.cbt.map((arr,ind)=>{
                                    return(
                                        <div>
                                            <button onClick={(e)=>{this.accordion(e, ind)}} class="w3-button w3-center w3-block w3-margin-top">{arr['question']}</button>
    
                                            <div id={ind} class="w3-container w3-row w3-hide">
                                                <div className='w3-half w3-padding w3-border'>{arr['O1']}</div>
                                                <div className='w3-half w3-padding w3-border'>{arr['O2']}</div>
                                                <div className='w3-half w3-padding w3-border'>{arr['O3']}</div>
                                                <div className='w3-half w3-padding w3-border'>{arr['O4']} </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </>
            )
        }
    }

}
class Student extends Component {
    constructor(props) {
        super(props);
        const cookies = new Cookies();
        this.state = {
            subject: ['Mathematics','English','Physics','Chemistry','French','Youruba','Bussiness Studies','Computer Science','Basic Technology','Home Economics','CRS','PHE','Acgricultural Science','Applied Arts','Civic Education','Basic Science','Futher Mathematics','Biology','Commerce','History','Goverment','Geography','Literature','Humanities','History'],
            class: ['JS1','JS2','JS3','SS1','SS2','SS3'],
            term: ['1st Term','2nd Term'],
            department: ['Science','Art','Cormmercial'],
            id: cookies.get('id'),
            back: '',
            forward: '',
            folder: {},
            cbt: [],
            score: 0,
            answered: [],
            profile: {},
            year: 2020,
        }

        this.folderClick = this.folderClick.bind(this);
        this.tab = this.tab.bind(this)
        this.answer = this.answer.bind(this)
    }

    //Note: work on getting score score from CBT test

    componentDidMount(){
        this.getProfile()
    }

    questionSwitch(show=0,hide=1){
        let cbt = document.getElementsByClassName('cbt')
        cbt[show].style.display = 'block'
        cbt[hide].style.display = 'none'
    }

    folderClick(e,route,id){
        e.preventDefault();
        let row = document.getElementsByClassName('w3-row');
        let date = new Date();
        //console.log(route);
        if(route === 'home'){
            row[0].style.display = 'block'
            row[1].style.display = 'block'
            row[2].style.display = 'none'
            row[3].style.display = 'none'
            row[4].style.display = 'none'
            this.setState({back:'home', forward: 'class', arr: id})
        }if(route === 'subjects'){
            row[0].style.display = 'block'// nav
            row[1].style.display = 'none'// subjects
            row[2].style.display = 'block'// class
            row[3].style.display = 'none'//  term
            row[4].style.display = 'none'//check
            row[5].style.display = 'none'//cbt
            this.setState({back:'home', forward: 'class', arr: id, folder:{subject: id, class: this.state.folder.class, term: this.state.folder.term}})
        }if(route === 'class'){
            row[0].style.display = 'block'
            row[1].style.display = 'none'
            row[2].style.display = 'none'
            row[3].style.display = 'block'
            row[4].style.display = 'none'
            document.getElementById('forward').style.display = 'block'
            this.setState({back:'home', forward: 'term', arr: id, folder:{subject: this.state.folder.subject, class: id, term: this.state.term}})
        }if(route === 'term'){
            row[0].style.display = 'block'
            row[1].style.display = 'none'
            row[2].style.display = 'none'
            row[3].style.display = 'none'
            row[4].style.display = 'block'
            this.setState({back:'class', forward: 'check', arr: id, folder:{term: id, subject: this.state.folder.subject, class: this.state.folder.class, year: date.getFullYear()}})
            this.getCbt(id)
            document.getElementById('forward').style.display = 'none'
        }if(route === 'check'){
            row[0].style.display = 'block'
            row[1].style.display = 'none'
            row[2].style.display = 'none'
            row[3].style.display = 'none'
            row[4].style.display = 'block'
            this.setState({back:'home', forward: 'cbt'})
        }if(route === 'cbt'){
            row[0].style.display = 'block'
            row[1].style.display = 'none'
            row[2].style.display = 'none'
            row[3].style.display = 'none'
            row[4].style.display = 'none'
            row[5].style.display = 'block'
            this.setState({back:'term', forward: 'cbt'})
            document.getElementById('forward').style.display = 'none'
            document.getElementById('back').style.display = 'none'
        }
    }
    
    tab(route){
        var i;
        var x = document.getElementsByClassName("tab");
        for (i = 0; i < x.length; i++) {
            x[i].style.display = "none";
        }
        document.getElementById(route).style.display = "block";
    }

    getCbt(id){
        db.collection('CBT').doc(`${this.state.folder.subject}|${this.state.folder.class}|${id}|${this.state.year}`)
        .get().then(cbt=>{
            if(cbt.exists){
                let question = [...cbt.data().questions]
                this.setState({cbt: question})
                console.log(cbt.data().questions)
            }
            let CBT = document.getElementsByClassName('cbt')
            for(let c=0; c<CBT.length; c++){
                CBT[c].style.display = 'none'
            }
            CBT[0].style.display = 'block'
        })
    }

    getProfile(){
        db.collection('Users').doc(this.state.id).get().then(user=>{
            this.setState({profile: user.data()})
            //console.log(user.data());
            let subjectId = user.data().subjectId
            let len = subjectId.length
            db.collection('Details').doc(this.state.id).collection('subjects').doc(subjectId[len-1]).get()
            .then(sub=>{
                //data.subjects = sub.data().subjects
                //console.log(sub.data().subjects)
            })
            //console.log(subjectId[len -1])
        })
    }

    index =  0;
    score =  0;
    answered = []
    answer(e){
        e.preventDefault()
        let data = $(`#${this.index}`).serializeArray() 
        if(data.length === 1){
            console.log(this.index)
            if((this.state.cbt.length - 1) === this.index){
                alert('Done')
                let row = document.getElementById('end')
                let end = document.getElementById('end')
                end.style.display = 'block'
                row[5].style.display = 'none'
            }else{
                if(data[0].value === this.state.cbt[this.index].answer){
                    this.index = this.index + 1
                    this.score+=1
                    data[0].score = this.score
                    this.answered.push(data)
                    this.questionSwitch(this.index, this.index-1)
                }
                else{
                    this.index = this.index + 1
                    data[0].score = 0;
                    this.answered.push(data)
                    this.questionSwitch(this.index, this.index-1)  
                }
            }
            
        }else{
            alert('Please Choose just one answer')
        }
        console.log(this.answered)
    }

    render() {
        return (
            <>
                <div className='w3-row' style={{display: 'none'}}>
                    <div className='w3-col s6' onClick={(e)=>{this.folderClick(e, this.state.back, this.state.folder)}}>
                        <IoArrowBackOutline id="back" className='w3-margin-top'  style={{width:'100%', height: '40px'}} />
                    </div>
                    <div className='w3-col s6'>
                        <IoArrowForwardOutline id="forward" className='w3-margin-top' onClick={(e)=>{this.folderClick(e, this.state.forward, this.state.arr)}} style={{width:'100%', height: '40px'}} />
                    </div>
                </div>
                <div className='w3-row' id='subjects'>
                    {
                        this.state.subject.map(arr=>{
                            return(
                                <div className='w3-col s6 m4 l4 w3-padding w3-center w3-border' onClick={(e)=>{this.folderClick(e, 'subjects', arr)}}>
                                    <FcFolder style={{width: '70px', height: '70px'}} key={arr} onClick={(e)=>{this.folderClick(e, 'class', arr)}}  id={arr}  />
                                    <p className='w3-bold' onClick={(e)=>{this.folderClick(e, 'subjects', arr)}}>{arr}</p>
                                </div>
                            )
                        })
                    }
                </div>
                <div className='w3-row' id='class' style={{display: 'none'}}>
                    {
                        this.state.class.map(arr=>{
                            return(
                                <div className='w3-col s6 m4 l4 w3-padding w3-center w3-border' onClick={(e)=>{this.folderClick(e, 'class', arr)}}>
                                    <FcFolder style={{width: '70px', height: '70px'}} key={arr} onClick={(e)=>{this.folderClick(e, 'class', arr)}}  id={arr}  />
                                    <p className='w3-bold' onClick={(e)=>{this.folderClick(e, 'class', arr)}}>{arr}</p>
                                </div>
                            )
                        })
                    }
                </div>
                <div className='w3-row' id='term' style={{display: 'none'}}>
                    {
                        this.state.term.map(arr=>{
                            return(
                                <div className='w3-col s6 m4 l4 w3-padding w3-center w3-border' onClick={(e)=>{this.folderClick(e, 'term', arr)}}>
                                    <FcFolder style={{width: '70px', height: '70px'}} key={arr} onClick={(e)=>{this.folderClick(e, 'class', arr)}}  id={arr}  />
                                    <p className='w3-bold' onClick={(e)=>{this.folderClick(e, 'term', arr)}}>{arr}</p>
                                </div>
                            )
                        })
                    }
                </div>
                <div className='w3-row' style={{display: 'none'}}>
                    <div className='w3-display-container' style={{height: '400px'}}>
                        <div className='w3-display-middle'>
                            <div className='w3-container w3-center'>
                                <p className='w3-padding'>Welcome {this.state.profile['First name']} {this.state.profile['Last name']}</p>
                                <p>Rules</p>
                                <ul className='w3-padding' style={{listStyleType: 'decimal'}}>
                                    <li>Immidiately you click on Start you can't go back</li>
                                    <li>Do not refresh page, automatic fail for offenders</li>
                                </ul>
                                <button className='w3-btn w3-green w3-margin-top' onClick={(e)=>{this.folderClick(e,'cbt',this.state.arr)}}>Start</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='w3-row' style={{display: 'none', marginTop: '150px'}}>
                    <div class='w3-padding'>
                        {
                            this.state.cbt.map((arr,ind)=>{
                                return(
                                    <form onSubmit={this.answer} id={ind} className='cbt'>
                                        <div class="w3-padding w3-center w3-block">{arr['question']}</div>

                                        <div id={ind} class="w3-container w3-row w3-margin-top">
                                            <div className='w3-col s6 m6 l6 w3-padding w3-border'>
                                                <div className='w3-col s6 m6 l6 w3-padding'>
                                                    <input type='checkbox' name='Option 1' id='O1' value={arr['O1']} />
                                                </div>
                                                <label className='w3-col s6 m6 l6 w3-padding' htmlFor={arr['O1']}>{arr['O1']}</label>
                                            </div>

                                            <div className='w3-col s6 m6 l6 w3-padding w3-border'>
                                                <div className='w3-col s6 m6 l6 w3-padding'>
                                                    <input type='checkbox' name='Option 2'  id='O2' value={arr['O2']} />
                                                </div>
                                                <label className='w3-col s6 m6 l6 w3-padding' htmlFor={arr['O2']}>{arr['O2']}</label>
                                            </div>

                                            <div className='w3-col s6 m6 l6 w3-padding w3-border'>
                                                <div className='w3-col s6 m6 l6 w3-padding'>
                                                    <input type='checkbox'  name='Option 3'  id='O3' value={arr['O3']} />
                                                </div>
                                                <label className='w3-col s6 m6 l6 w3-padding' htmlFor={arr['O3']}>{arr['O3']}</label>
                                            </div>

                                            <div className='w3-col s6 m6 l6 w3-padding w3-border'>
                                                <div className='w3-col s6 m6 l6 w3-padding'>
                                                    <input type='checkbox' name='Option 4'  id='O4' value={arr['O4']} />
                                                </div>
                                                <label className='w3-col s6 m6 l6 w3-padding' htmlFor={arr['O4']}>{arr['O4']}</label>
                                            </div>
                                        </div>
                                        <div className='w3-center'>
                                            <button className='w3-btn w3-deep-orange w3-round w3-margin-top'>Next</button>
                                        </div>
                                    </form>
                                )
                            })
                        }
                    </div>
                </div>
                <div className='w3-padding' id='end' style={{display: 'none'}}>
                    <p className='w3-center'>Done Will still work on this</p>
                    
                </div>
            </>
        )
    }
}