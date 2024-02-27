import React, { useState, useEffect } from 'react';
import Axios from "axios";
import "../Categories/Categories.css";
import { useCookies } from "react-cookie";
import { useGetUserID } from "../../Hooks/UseGetUserID";
import { Link  } from 'react-router-dom';

const Categories = () => {

    const CategoryState = () => {
        let Category = localStorage.getItem("Results");

        if (Category) {
            return JSON.parse(localStorage.getItem("Results"))
        } else {
            return [];
        }
    }

    const UserID = useGetUserID();

    const [Cookie, setCookie] = useCookies(["auth_token"]);
    const [Favourites, setFavourites] = useState([]);
    const [Search, setSearch] = useState("")
    const [SearchError, setSearchError] = useState("")
    const[Categories, setCategories] = useState(CategoryState())
    const [userOwner, setuserOwner] = useState(UserID)

    const getCategory =(e)=> { 
        e.preventDefault()

        if(Search === ""){  
            setSearchError("Kindly enter a search category")
        } else {
            fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${Search}`)
            .then(response => response.json())
            .then((data) => {
                setSearchError("")
                setCategories(data.meals)
                setSearch("")
            })
            .catch(err => console.error(err)); 
        }
    }

    const AddToFavourites = async (ID) => {
        const data = {
            ID, userOwner
        }
        try {
        await Axios.post("https://cook-io-h8ue.onrender.com/Favourites/AddFavourite", data, {
            headers: { authorization: Cookie.auth_token },
        });
        setFavourites(data.Favourites);
    } catch (err) {
        console.log(err);
    }
    };

    const handleSearch = (e) => {
        setSearch(e.target.value)
    }

    useEffect(() => {
        localStorage.setItem("Results", JSON.stringify(Categories))
    },[Categories]);

return (
    <div className='Category' >
        <section>
        <h1>Enter a category?  </h1>
            <form onSubmit={getCategory} >
                <i id='World' class="fa-solid fa-earth-americas"></i>
                <select name="" id="Select" value={Search} onChange={handleSearch} >
                    <option value="">Search among the categories below</option>
                    <option value="Beef">Beef</option>
                    <option value="Breakfast">Breakfast</option>
                    <option value="Chicken">Chicken</option>
                    <option value="Dessert">Dessert</option>
                    <option value="Goat">Goat</option>
                    <option value="Lamb">Lamb</option>
                    <option value="Miscellaneous">Miscellaneous</option>
                    <option value="Pasta">Pasta</option>
                    <option value="Pork">Pork</option>
                    <option value="Seafood">SeaFood</option>
                    <option value="Side">Side</option>
                    <option value="Starter">Starter</option>
                    <option value="Vegan">Vegan</option>
                    <option value="Vegetarian">Vegetarian</option>
                </select>
                <i onClick={getCategory} id='Search' class="fa-solid fa-magnifying-glass"></i>
            </form>
            <span>{SearchError}</span>
        </section>
        <section>
            {
            (!Categories) ? <h2 className='Failure' >No Results Found</h2> :
            Categories.map((Category) => {
                return (
                    <div key={Category.idMeal} >
                        <Link className='Link' to={`/${Category.idMeal}`}  > 
                            <div >
                                <figure>
                                    <img src={Category.strMealThumb} alt="" />
                                    <figcaption>
                                        <h2>{Category.strMeal}</h2>
                                    </figcaption>
                                </figure>
                            </div>
                        </Link>
                        <button onClick={() => AddToFavourites(Category.idMeal)}>
                            <i class="fa-solid fa-bookmark"></i>
                        </button>
                    </div>
                )
            })
            }
        </section>
    </div>
)
}

export default Categories