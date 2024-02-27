import React, { useState, useEffect } from 'react';
import Axios from "axios";
import "../Home/Home.css";
import Popular from '../../Components/Popular/Popular';
import { Link  } from 'react-router-dom';
import { useCookies } from "react-cookie";
import { useGetUserID } from "../../Hooks/UseGetUserID"; 

const Home = () => {

    const SearchState = () => {
        let Value = localStorage.getItem("Values");

        if (Value) {
            return JSON.parse(localStorage.getItem("Values"))
        } else {
            return [];
        }
    }

    const UserID = useGetUserID();

    const [Cookie, setCookie] = useCookies(["auth_token"]);
    const [Recipes, setRecipes] = useState([])
    const [Search, setSearch] = useState()
    const [SearchError, setSearchError] = useState()
    const [userOwner, setuserOwner] = useState(UserID)

    const handleSearch = (e) => {
        setSearch(e.target.value)
    }

    const getRecipe = (e) => { 
        e.preventDefault()

        if(Search === "") {
            setSearchError("Kindly enter a search item")
        } else {
            fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${Search}`)
            .then(response => response.json())
            .then((data) => {
                setSearchError("")
                setRecipes(data.meals)
                setSearch("")
            })
            .catch(err => console.error(err));
        }
    }

    // Add to Favourites

    const AddToFavourites = async (ID) => {
        try {
            const data = {
                ID, userOwner
            }
            await Axios.post(`https://cook-io-server.onrender.com/Favourites/Favourite/${ID}`, data, {
                headers: { authorization: Cookie.auth_token },
            })
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        localStorage.setItem("Values", JSON.stringify(Recipes))
    },[Recipes]);

return (
    <div className='Home'> 
        <section className='SearchPage' > 
            <h1>Your desired dish ?</h1>
            <form onSubmit={getRecipe} >
                <i id='Utensils' class="fa-solid fa-utensils"></i>
                <input type="text" placeholder="Search Recipes..." value={Search} onChange={handleSearch} />
                <i onClick={getRecipe} id='Search' class="fa-solid fa-magnifying-glass"></i>
            </form> 
            <span>{SearchError}</span>
            <p>Search any recipe e.g burger, pizza, sandwich</p>
            <p>Results for your search will be displayed below the popular recipes section.</p>
        </section>
        <section>
            <Popular />  
        </section> 
        <section className='SearchResults' >
            {
            (!Recipes) ? <h2 className='Failure'>No Results Found</h2> :
            Recipes.map((Recipe) => {
            return (
                <div>
                    <section>
                        <Link className='Link' to={`/${Recipe.idMeal}`} >
                            <figure>
                                <img src={Recipe.strMealThumb} alt="" /> 
                                <figcaption>
                                    <h2>{Recipe.strMeal}</h2>
                                </figcaption>
                            </figure>
                        </Link>
                    </section>
                    <section>
                        <button onClick={() => AddToFavourites(Recipe.idMeal)}><i class="fa-solid fa-bookmark"></i></button>
                    </section>
                </div>
            )
            })
            } 
        </section>
    </div>
)
}

export default Home