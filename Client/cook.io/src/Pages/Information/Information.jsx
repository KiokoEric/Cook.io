import React, { useEffect, useState } from 'react';
import "../Information/Information.css"
import { useCookies } from "react-cookie";
import { useParams } from 'react-router-dom';
import { Link  } from 'react-router-dom';
import Axios from "axios";

const Information = () => {

    const [Cookie, setCookie] = useCookies(["auth_token"]); 
    const [Recipes, setRecipes] = useState([])
    const { id } = useParams()

    Axios.defaults.withCredentials = true;
    useEffect(() => {
        Axios.get(`https://cook-io-h8ue.onrender.com/Recipe/${id}`, {
        headers: { authorization: Cookie.auth_token }
        }) 
        .then((Response) => {
            console.log(Response.data)
            setRecipes(Response.data)
        })
    },[])

    // Delete Recipe

    const handleDelete= (_id) => {
        Axios.delete(`https://cook-io-h8ue.onrender.com/Recipe/${_id}`, {
            headers: { authorization: Cookie.auth_token } 
        }) 
        .then(
            window.location.reload()
        )
    }

return (
    <div>
        <article >
            <div key={Recipes._id} className='MoreInformation' >
                <figure>
                    <img src={Recipes.Image} alt="" width="300px" height="300px" />
                    <div>
                        <Link to={`/Edit/${Recipes._id}`} key={Recipes._id} >
                            <i id='Edit' class="fa-solid fa-pen-to-square"></i>
                        </Link>
                        <i id='Delete' onClick={() => handleDelete(Recipes._id)} class="fa-solid fa-trash"></i>
                    </div>
                </figure>
                <figcaption>
                    <h2>{Recipes.Name}</h2>
                    <p>{Recipes.Description}</p> 
                    <h3>Ingredients</h3>
                    <pre>{Recipes.Ingredients}</pre>
                    <h3>Instructions</h3>
                    <pre>{Recipes.Instructions}</pre>
                </figcaption>
            </div>
        </article>
    </div>
)
}

export default Information