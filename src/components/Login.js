import React, { Component } from 'react';
import './Login.css'

import Auth from "../utils/Auth";
const auth = new Auth();

export default class Login extends Component {
    constructor(props){
        super(props);
        this.state = { 
          user: {
              username: '',
              password: ''
            }
        }
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    handleFormSubmit = (e)=> {
        e.preventDefault(); // disable the default form behavious (redirecting to a new page)
        auth.login(this.state.user)
        .then(()=> {
            this.setState({error: ''})
            this.props.history.push('/')
        })
        .catch((error)=> {
            debugger
            console.log(error)
        })
    }

    handleFormChange = (e)=> {
        let user = {...this.state.user} //creating a copy of user object
        user[e.target.name] = e.target.value // within the square brackets "[]" you can use dynamic keys
        this.setState({ 
            user:user  //left user relates to this.state.user, right user is the copy created before
        })
    }

    render() {
        return (
            <div className="LoginContainer">
                <form className="FormContainer" onSubmit={this.handleFormSubmit} > 
                    <div className="Title">
                        <h2>Please login</h2>
                    </div>
                    <div className="InputContainer">  
                        <input placeholder="Username" type="text" name="username" value={this.state.username} onChange={this.handleFormChange}/>                    
                        <input placeholder="Password" type="text" name="password" value={this.state.password} onChange={this.handleFormChange}/>
                        <input className="SubmitBtn" type="submit" value="Login" />
                    </div>
                </form>
            </div>
        )
    }
}
