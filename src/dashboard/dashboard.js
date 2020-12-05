import React from 'react';
import '../index.css';
import './dashboard.css';
import Nav from '../nav/nav';
//import { Link } from "react-router-dom";
import { Cookies } from 'react-cookie'

class Dashboard extends React.Component{
    constructor(props){
        super(props)
        const cookie = new Cookies()
        this.state = {
            id: cookie.get('id'),
            user: cookie.get('user'),
            password: cookie.get('password'),
            url: this.props['url']
        }
    }

    render(){
        return(
            <div>
                <Nav user={this.state.user} />
                <div className="w3-container w3-margin-top">
                    <div className="w3-row">
                        <User user={this.state} />
                    </div>
                </div>
            </div>
        )
    }
}

const User = (props)=>{
    return(
        <div>
            <div className="w3-container">
                <div className="w3-row">
                    <div className='w3-col s6 m3 l3'>
                        <table className='w3-table-all'>
                            <tr>
                                <td><b>Reg No</b></td>
                                <td>{props['user']['id']}</td>
                            </tr>
                            <tr>
                                <td><b>User</b></td>
                                <td>{props['user']['user']}</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;