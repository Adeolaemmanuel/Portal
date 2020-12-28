import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route } from "react-router-dom";
import User from "./user/user";
import Home from "./home/home";
import Dashboard from "./dashboard/dashboard";
import Profile from "./profile/profile";
import Result from "./result/result";
import Register from "./register/register";
import Upload from "./upload/upload";
import CBT from './cbt/cbt';
import Notification from './notification/notification';
import Chat from './chat/chat';
import Settings from './settings/settings';

class Index extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      isLogged: false,
      Home:{},
      Profile: {
        passedData:{}
      }
    }
    this.stateTrigger = this.stateTrigger.bind(this);
  }


  stateTrigger(){}


  render(){
    return(
        <Router>
          <div>
            <Route path="/" exact component={ Home }>
              <Home settings={this.state} />
            </Route>
            <Route path="/User" component={ User }>
              <User />
            </Route>
            <Route path="/Dashboard" component={ Dashboard }>
              <Dashboard  />
            </Route>
            <Route path="/Register" component={ Register }>
              <Register url={this.state.url}  />
            </Route>
            <Route path="/Result" component={ Result }>
              <Result />
            </Route>
            <Route path="/Profile" component={ Profile }>
              <Profile url={this.state.url} />
            </Route>
            <Route path="/Upload" component={ Upload }>
              <Upload />
            </Route>
            <Route path="/CBT" component={ CBT }>
              <CBT />
            </Route>
            <Route path="/Notification" component={ Notification }>
              <Notification />
            </Route>
            <Route path="/Chat" component={ Chat }>
              <Chat />
            </Route>
            <Route path="/Settings" component={ Settings }>
              <Settings />
            </Route>
          </div>
        </Router>
    )
  }
}

ReactDOM.render(
  <React.StrictMode>
    <Index />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
