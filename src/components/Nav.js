import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';
import Auth from '../utils/Auth';
const auth = new Auth();


export default class Nav extends Component {

    constructor(props){
        super(props);
        this.state = { 
          user: {
            username: '',
            firstname: '',
            lastname: '',
            password: '',
            email: ''
            }
        }
    }

    componentDidMount(){
        this.setState({user: auth.getUser()})
    }

    render() {
        return (
            <div className="Nav">
                <Link className="Logo" to="/">EatIt</Link>
                 {
                    // this.state.user.errorMessage === "" || this.state.user ? 
                    this.state.user ?
                    <div className="LoggedIn">
                        <Link className="Profile" to="/profile" alt="">{this.state.user.username}</Link>
                        <Link to="/auth/logout" alt="">Logout</Link>
                    </div>
                    : 
                    <div className="LoggedOut">                    
                        <Link  className="Signup" to="/auth/signup" alt="">Signup</Link>
                        <Link to="/auth/login" alt="">Login</Link>
                    </div>
                 }
            </div>
        )
    }
}
