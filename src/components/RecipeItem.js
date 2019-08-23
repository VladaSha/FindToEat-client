import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './RecipeItem.css';
import axios from 'axios';

export default class RecipeItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // updateComponent: false
        }

        // This binding is necessary to make `this` work in the callback
        this.saveToFav = this.saveToFav.bind(this);
        this.delFromFav = this.delFromFav.bind(this);

      }
    
      saveToFav() {
          debugger
        axios.post(`${process.env.REACT_APP_API}/favorite`, {
            apiId: this.props.id,
            name: this.props.label,
            image: this.props.image,
            yield: this.props.yield,
            ingredients: this.props.ingredients,
            calories: this.props.calories,
            totalWeight: this.props.totalWeight,
            totalNutrients: this.props.totalNutrients
            // totalTime: this.props.totalTime
        },
        {withCredentials: true})
        .then((response)=>{
            debugger
            if(response.data.user) {
                this.props.updateFavList(response.data.user)
            }
        })
        // .catch(() => {
        //     debugger
        //     alert("You should be logged in")
        // })
      } 

      delFromFav() {
          debugger
      }



    render() {
        return (
            <div className="Container">
                <Link to={{
                    pathname: `/recipe/${this.props.id.slice(this.props.id.indexOf('_')+1)}`,
                    state: {
                        name: this.props.label,
                        image: this.props.image,
                        yield: this.props.yield,
                        ingredients: this.props.ingredients,
                        calories: this.props.calories,
                        totalWeight: this.props.totalWeight,
                        totalNutrients: this.props.totalNutrients,
                        healthLabels: this.props.healthLabels,
                        url: this.props.url,
                        // totalTime: this.props.totalTime,
                    }
                }} >
                    <div className='RecipeItem'>
                        <img src={this.props.image} alt=''></img>
                        <div className="container">
                            <p>{this.props.label}</p>
                        </div>
                    </div>
                </Link>

                {/* if recipe is already saved, show the delFromFav button */}
                {/* if recipe is not saved, show saveToFav button */}

                { this.props.loggedIn ?
                (this.props.isItFav ?
                <button className='faved' onClick={this.delFromFav}>EatIt</button>
                :
                <button onClick={this.saveToFav}>EatIt</button>)
                : <button className='disabledBtn' disabled="disabled" title="Please log in">EatIt</button>

                }

            </div>
        )
    }
}
