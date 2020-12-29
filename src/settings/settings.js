import React, { Component } from 'react'
import Nav from '../nav/nav';
//import { db} from '../database'
//import { Cookies } from 'react-cookie'

export default class Settings extends Component {
    render() {
        if(window.matchMedia("(max-width: 767px)").matches){
            return (
                <>
                    <Nav />
                </>
            )
        }else{
            return (
                <>
                    <Nav />
                </>
            )
        }
    }
}
