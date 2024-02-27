import React, { useEffect, useState } from 'react';
import "../Recipe/Recipe.css";
import { useParams } from 'react-router-dom';

const Recipe = () => {

const [VideoLink, setVideoLink] = useState('')
const [Items, setItems] = useState([])
const { MealId } = useParams() 

useEffect(()=> { 
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${MealId}`)
    .then(response => response.json())
    .then((data) => {
        const videoUrl = data.meals[0].strYoutube
        setItems(data.meals)
        setVideoLink(videoUrl)
    })
    .catch(err => console.error(err));
})

    const NewTab = () => {
        window.open(VideoLink)
    }

return (
    <div >
        <article>
            <ion-icon onClick={NewTab} id="Play" name="play-outline"></ion-icon>
        </article>
        {
        (!Items) ? <h2 className='Failure' >No Results Found</h2> :
        Items.map((Item)=> {
            return (
            <div className='RecipeInfo'>
                <figure>
                    <div>
                        <img src={Item.strMealThumb} alt="" />
                    </div>
                <figcaption>
                    <h2>{Item.strMeal}</h2>
                    <h3>Ingredients</h3>
                    <div>
                        <ul>
                            {Item.strIngredient1 ? (<li>{Item.strIngredient1} : {Item.strMeasure1}</li>) : null}
                            {Item.strIngredient2 ? (<li>{Item.strIngredient2} : {Item.strMeasure2}</li>) : null}
                            {Item.strIngredient3 ? (<li>{Item.strIngredient3} : {Item.strMeasure3}</li>) : null}
                            {Item.strIngredient4 ? (<li>{Item.strIngredient4} : {Item.strMeasure4}</li>) : null}
                            {Item.strIngredient5 ? (<li>{Item.strIngredient5} : {Item.strMeasure5}</li>) : null}
                            
                        </ul>
                        <ul>
                            {Item.strIngredient6 ? (<li>{Item.strIngredient6} : {Item.strMeasure6}</li>) : null}
                            {Item.strIngredient7 ? (<li>{Item.strIngredient7} : {Item.strMeasure7}</li>) : null}
                            {Item.strIngredient8 ? (<li>{Item.strIngredient8} : {Item.strMeasure8}</li>) : null}
                            {Item.strIngredient9 ? (<li>{Item.strIngredient9} : {Item.strMeasure9}</li>) : null}
                            {Item.strIngredient10 ? (<li>{Item.strIngredient10} : {Item.strMeasure10}</li>) : null}
                        </ul>
                        <ul> 
                            {Item.strIngredient11 ? (<li>{Item.strIngredient11} : {Item.strMeasure11}</li>) : null}
                            {Item.strIngredient12 ? (<li>{Item.strIngredient12} : {Item.strMeasure12}</li>) : null}
                            {Item.strIngredient13 ? (<li>{Item.strIngredient13} : {Item.strMeasure13}</li>) : null}
                            {Item.strIngredient14 ? (<li>{Item.strIngredient14} : {Item.strMeasure14}</li>) : null}
                            {Item.strIngredient15 ? (<li>{Item.strIngredient15} : {Item.strMeasure15}</li>) : null}
                            {Item.strIngredient16 ? (<li>{Item.strIngredient16} : {Item.strMeasure16}</li>) : null}
                        </ul>
                    </div>
                    <h3>Instructions</h3>
                    <pre >
                        {Item.strInstructions}
                    </pre>
                </figcaption>
                </figure>
            </div>
            )
        })}
    </div>
)
}

export default Recipe