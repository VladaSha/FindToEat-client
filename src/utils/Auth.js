import axios from "axios";
import qs from "querystring";

export default class AuthService {
    constructor() {
        this.login = this.login.bind(this);
    }

    login(credentials) {
        return axios({
            method: "POST",
            url: `${process.env.REACT_APP_API}/auth/login`,
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: qs.stringify({username: credentials.username, password: credentials.password}),
            withCredentials: true
        })
        .then((response)=> {
            this.setUser(response.data)
        })
    }

    signup({username, firstname, lastname, password, email}) {
        debugger
        return axios({
            method: "POST",
            url: `${process.env.REACT_APP_API}/auth/signup`,
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            withCredentials: true, // sending cookies
            data: qs.stringify({username, firstname, lastname, password, email}),
        })
        .then((response)=> {
            this.setUser(response.data);
        })
    }

    loggedIn(){
        const user = this.getUser()
        return !!user; 
    }

    setUser(user){
        debugger
        localStorage.setItem('user', JSON.stringify(user));
    }

    getUser(){
        return JSON.parse(localStorage.getItem('user'));
    }

    logout(){
       return axios({
            url: `${process.env.REACT_APP_API}/auth/logout`
        })
        .then((res)=> {
            localStorage.removeItem('user');
        })
    }    
}