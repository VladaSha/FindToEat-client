import React, { Component } from 'react';
import SearchBar from './SearchBar';
import axios from 'axios';
import RecipeItem from './RecipeItem';
import Nav from './Nav';
import './Home.css'
import Auth from "../utils/Auth";
const auth = new Auth();


export default class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            recipes: null,
            listOfFavorites: null
        }
    }

    getRandomValue = () => {
        let recipesArray = ['cheese%20bruschetta']
        // let recipesArray = ['cherry%20pie', 'breakfast', 'frozen%20yoghurt', 'layers%20cake', 'quinoa%20strawberry', 'italian%20lasagna', 'cheese%20bruschetta']
        return recipesArray[Math.floor(Math.random() * recipesArray.length)]
    } 

    updateFavList = (user) => {
        debugger
        //there is an unstable bug here
        auth.setUser(user)
        .then(() => {
            this.setState({listOfFavorites: auth.getUser().favoriteRecipes})
        })
        .catch((err) => {debugger; console.log(err)})
    }

    getRecipes = (recipes) => {
        this.setState({recipes: recipes})
    }

    componentDidMount() {
        axios({
            url: `https://api.edamam.com/search?q=${this.getRandomValue()}&app_id=${process.env.YOUR_APP_ID}&app_key=${process.env.YOUR_APP_KEY}&from=0&to=16`,
            headers: { 'content-type': 'application/x-www-form-urlencoded' }
        })
        .then(response => {
            if(auth.getUser()) this.setState({listOfFavorites: auth.getUser().favoriteRecipes, recipes: response.data.hits})
            else this.setState({recipes: response.data.hits})
        })
        .catch((error)=> {
            console.log(error)
        })
    }

    render() {
        // loop over the array of recipes and create recipeItem
        let recipeItem = []
        let loggedIn = auth.loggedIn()
        if(this.state.recipes) {
            this.state.recipes.forEach((recipe) => {
                //if we have favourites
                if(this.state.listOfFavorites && this.state.listOfFavorites.length > 0) {
                    for(let i = 0; i < this.state.listOfFavorites.length; i++) {
                        if(this.state.listOfFavorites[i].apiId === recipe.recipe.uri) {
                            recipeItem.push(
                                <RecipeItem 
                                  image={recipe.recipe.image}
                                  label={recipe.recipe.label}
                                  id={recipe.recipe.uri}
                                  yield={recipe.recipe.yield}
                                  ingredients={recipe.recipe.ingredientLines}//Array
                                  calories={recipe.recipe.calories}
                                  totalWeight={recipe.recipe.totalWeight}
                                  totalNutrients={recipe.recipe.totalNutrients}
                                  healthLabels={recipe.recipe.healthLabels}//Array
                                  url={recipe.recipe.url}
                                  totalTime={recipe.recipe.totalTime}
                                  updateFavList={this.updateFavList}
                                  isItFav={true}
                                  loggedIn={loggedIn}
                                />
                            )
                            break
                        } else {
                            recipeItem.push(
                                <RecipeItem 
                                  image={recipe.recipe.image}
                                  label={recipe.recipe.label}
                                  id={recipe.recipe.uri}
                                  yield={recipe.recipe.yield}
                                  ingredients={recipe.recipe.ingredientLines}//Array
                                  calories={recipe.recipe.calories}
                                  totalWeight={recipe.recipe.totalWeight}
                                  totalNutrients={recipe.recipe.totalNutrients}
                                  healthLabels={recipe.recipe.healthLabels}//Array
                                  url={recipe.recipe.url}
                                  totalTime={recipe.recipe.totalTime}
                                  updateFavList={this.updateFavList}
                                  loggedIn={loggedIn}
                                />
                              )
                            break
                        }
                    }
                } else {
                //if we don't have favourites
                recipeItem.push(
                  <RecipeItem 
                    image={recipe.recipe.image}
                    label={recipe.recipe.label}
                    id={recipe.recipe.uri}
                    yield={recipe.recipe.yield}
                    ingredients={recipe.recipe.ingredientLines}//Array
                    calories={recipe.recipe.calories}
                    totalWeight={recipe.recipe.totalWeight}
                    totalNutrients={recipe.recipe.totalNutrients}
                    healthLabels={recipe.recipe.healthLabels}//Array
                    url={recipe.recipe.url}
                    totalTime={recipe.recipe.totalTime}
                    updateFavList={this.updateFavList}
                    loggedIn={loggedIn}
                  />
                )
                }
            })
        }  

        return (
            <div className="Home">
                <Nav />
                
                <div className="Searchbar">
                    <SearchBar getRecipes={this.getRecipes} />
                </div>

                <div className="BeSpontaneous">
                    <p>Be Spontaneous</p>
                </div>

                <div className="Recipes">
                    {recipeItem}
                </div>
            </div>
        )
    }
}
