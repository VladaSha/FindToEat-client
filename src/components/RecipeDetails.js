import React, { Component } from 'react';
import './RecipeDetails.css';
import Nav from './Nav';

export default class RecipeDetails extends Component {
    render() {
        let props = this.props.location.state
        let calPerPortion = Math.round(props.totalNutrients.ENERC_KCAL.quantity/props.yield)
        let fatPerPortion = Math.round(props.totalNutrients.FAT.quantity/props.yield)
        let carbsPerPortion = Math.round(props.totalNutrients.CHOCDF.quantity/props.yield)
        let sgrPerPortion = Math.round(props.totalNutrients.SUGAR.quantity/props.yield)
        let prtnPerPortion = Math.round(props.totalNutrients.PROCNT.quantity/props.yield)

        let ingredientItems = props.ingredients.map((ingredient) => {
            return <li>{ingredient}</li>
        })

        return (
            <div>
                <Nav />
                
                <div className="RecipeDetails">
                    <div className="OuterContainer">
                        <img src={props.image} alt=''></img>
                        <div className="RightContainer">
                            <h1>{props.name}</h1>
                            <div className="InnerContainer">
                                <div className="Wrapper">
                                    <p>Number of portions</p>
                                    <p className="BigNumbers">{props.yield}</p>
                                </div>
                                {/* <div>
                                    <p>Minutes</p>
                                    <p>{props.totalTime}</p>
                                </div> */}
                                <div className="Wrapper">
                                    <p>Calories per Portion</p>
                                    <p className="BigNumbers">{calPerPortion}</p>
                                </div>
                            </div>
                            <div className="ReadDirections">
                                <a href={props.url} >Read Directions</a>
                            </div>
                        </div>
                    </div>
                    
                    <div className="BottomContainer">
                        <div className="IngredientsContainer">
                            <h2>Ingredients</h2>
                            <ul className="IngredientsList">
                                {ingredientItems}
                            </ul>
                        </div>
                        <div className="Nutrition">  
                            <h2>Nutrition (per 1 portion)</h2>
                            <p>Fat: {fatPerPortion}g</p>
                            <p>Carbs: {carbsPerPortion}g</p>
                            <p>Sugar: {sgrPerPortion}g</p>
                            <p>Protein: {prtnPerPortion}g</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
