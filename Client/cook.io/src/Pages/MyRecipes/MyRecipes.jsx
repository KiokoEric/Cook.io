import React, { useEffect, useState } from 'react';
import "../MyRecipes/MyRecipes.css";
import loadingGif from "../../Images/Cooking.gif";
import Axios from "axios";
import { useCookies } from "react-cookie";
import { useGetUserID } from "../../Hooks/UseGetUserID";
import { Link  } from 'react-router-dom';

const MyRecipes = () => {

    const [Cookie, setCookie] = useCookies(["auth_token"]);
    const [isLoading, setIsLoading] = useState(true);
    const [Recipes, setRecipes] = useState([]) 

    const userID = useGetUserID();

    Axios.defaults.withCredentials = true;
    useEffect(() => {

    const fetchRecipes = async () => {
        await Axios.get(`https://cook-io-server.onrender.com/Recipe/${userID}/Recipes`, {
        headers: { authorization: Cookie.auth_token },
        }) 
        .then((Response) => {
            setRecipes(Response.data)
        })
        setTimeout(() => {
            setIsLoading(false);
        }, 1500);
    }


    if (userID) {
        fetchRecipes() 
    }

    },[userID])

    // Delete Recipe

    const handleDelete= (_id) => {
        Axios.delete(`https://cook-io-server.onrender.com/Recipe/${_id}`, {
            headers: { authorization: Cookie.auth_token }
        }) 
        .then(
            window.location.reload()
        )
    }

return (
    <div className='MyRecipes' >
        <section className='SearchPage' >
            <h1>My Recipes</h1>
        </section>
        <section>
            {isLoading ? (
                <div className='Gif' >
                    <img src={loadingGif} alt="Loading..." className='Loading' />
                </div>
            ) : (
            (Recipes.length > 0) ?  
            Recipes.map((Recipe) => { 
            return (
            <div key={Recipe.index} >
                <Link to={`/Information/${Recipe._id}`}  className='Information'> 
                    <figure>
                        <img src={Recipe.Image} alt="" />
                        <div>
                            <Link to={`/Edit/${Recipe._id}`} key={Recipe._id} >
                                <i id='Edit' class="fa-solid fa-pen-to-square"></i>
                            </Link>
                            <i id='Delete' onClick={() => handleDelete(Recipe._id)} class="fa-solid fa-trash"></i>
                        </div>
                    </figure>
                    <figcaption  >
                        <h2>{Recipe.Name}</h2> 
                    </figcaption>
                </Link>
            </div>
            )
            }) : <h2 className='Failure'>No Recipes Found.</h2> 
            )
            }
        </section>
    </div>
)
}

export default MyRecipes