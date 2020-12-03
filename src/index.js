import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route } from "react-router-dom";
import User from "./user/user";
import Home from "./home/home";
import Dashboard from "./dashboard/dashboard";
//import Profile from "./profile/profile";
//import Result from "./result/result";

class Index extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      isLogged: false,
    }
  }
  render(){
    return(
        <Router>
          <div>
            <Route path="/" exact component={ Home }>
              <Home isLogged={this.state} />
            </Route>
            <Route path="/user" component={ User }>
              <User isLogged={this.state} />
            </Route>
            <Route path="/dashboard" component={ Dashboard }>
              <Dashboard  />
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
