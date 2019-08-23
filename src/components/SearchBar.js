import React, { Component } from 'react';
import axios from 'axios';
import SearchField from 'react-search-field';
import './Searchbar.css'

export default class Home extends Component {

    constructor(props){
        super(props);
        this.state = { 
            search: ''
        }
    }

    onEnterFunction = (value) => {
        axios({
            method: "POST",
            url: `https://api.edamam.com/search?q=${value}&app_id=${process.env.YOUR_APP_ID}&app_key=${process.env.YOUR_APP_KEY}&from=0&to=16`,
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
        })
        .then((response)=> {
            this.props.getRecipes(response.data.hits)
        })
        .catch((error)=> {
            console.log(error)
        })
    }

    render() {
        return (
            <SearchField onEnter={this.onEnterFunction}/>
        )
    }
}
