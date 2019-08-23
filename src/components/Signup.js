import React, { Component } from 'react';
import './Signup.css'

import Auth from "../utils/Auth";
const auth = new Auth();

export default class Signup extends Component {
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
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    handleFormSubmit = (e)=> {
        e.preventDefault(); // disable the default form behavious (redirecting to a new page)
        auth.signup(this.state.user)
        .then(()=> {
            this.setState({error: ''})
            this.props.history.push('/')
        })
        .catch((error)=> {
            console.log(error)
        })
    }

    handleFormChange = (e)=> {
        let user = {...this.state.user}
        user[e.target.name] = e.target.value // within the square brackets "[]" you can use dynamic keys
        this.setState({ 
            user:user 
        })
    }

    render() {
        return (
            <div className="SignupContainer">
                <form className="SignupFormContainer" onSubmit={this.handleFormSubmit} > 
                    <h2>Please Signup</h2>
                    <div className="SignupInputContainer">
                        <div className="Credentials">
                            <input placeholder="Username" type="text" name="username" value={this.state.username} onChange={this.handleFormChange}/>
                            <input placeholder="Firstname" type="text" name="firstname" value={this.state.firstname} onChange={this.handleFormChange}/>
                            <input placeholder="Lastname" type="text" name="lastname" checked={this.state.lastname} onChange={this.handleFormChange}/>
                            <input placeholder="Email" type="text" name="email" value={this.state.email} onChange={this.handleFormChange}/>
                            <input placeholder="Password" type="text" name="password" value={this.state.password} onChange={this.handleFormChange}/>
                        </div>
                        <input className="Btn" type="submit" value="Signup" />
                    </div>
                </form>
            </div>
        )
    }
}
