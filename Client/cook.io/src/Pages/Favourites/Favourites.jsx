import React, { useEffect, useState } from 'react';
import "../Favourites/Favourites.css";
import Axios from "axios";
import CookingGif from "../../Images/Cook.gif";
import { Link  } from 'react-router-dom';
import { useCookies } from "react-cookie";
import { useGetUserID } from "../../Hooks/UseGetUserID";

const Favourites = () => {

    const UserID = useGetUserID(); 

    const [Cookie, setCookie] = useCookies(["auth_token"]);
    const [isLoading, setIsLoading] = useState(true)
    const [RecipeID, setRecipeID] = useState("")
    const [RecipeID2, setRecipeID2] = useState("")
    const [RecipeID3, setRecipeID3] = useState("")
    const [RecipeID4, setRecipeID4] = useState("")
    const [RecipeID5, setRecipeID5] = useState("")
    const [RecipeID6, setRecipeID6] = useState("")
    const [Favourites, setFavourites] = useState([])
    const [Favourites2, setFavourites2] = useState([])
    const [Favourites3, setFavourites3] = useState([])
    const [Favourites4, setFavourites4] = useState([])
    const [Favourites5, setFavourites5] = useState([])
    const [Favourites6, setFavourites6] = useState([])
    const [FavouritesID, setFavouritesID] = useState("")
    const [FavouritesID2, setFavouritesID2] = useState("")
    const [FavouritesID3, setFavouritesID3] = useState("")
    const [FavouritesID4, setFavouritesID4] = useState("")
    const [FavouritesID5, setFavouritesID5] = useState("")
    const [FavouritesID6, setFavouritesID6] = useState("")

    useEffect(() => {

        const fetchRecipeID = async () => {
            try{
                await Axios.get(`http://localhost:4000/Favourites/${UserID}/Favourites`, {
                headers: { authorization: Cookie.auth_token },
                }) 
                .then((response) =>   {
                        setRecipeID(response.data[0].ID)
                        setFavouritesID(response.data[0]._id)
                })
            }
            catch (err) {
                console.log(err);
            }
        }

        const fetchRecipeID2 = async () => {
            try {
                await Axios.get(`http://localhost:4000/Favourites/${UserID}/Favourites`, {
                headers: { authorization: Cookie.auth_token },
                }) 
                .then((response) =>   {
                        setRecipeID2(response.data[1].ID)
                        setFavouritesID2(response.data[1]._id)
                })
            }
            catch (err) {
                console.log(err);
            }
        }

        const fetchRecipeID3 = async () => {
            try {
                await Axios.get(`http://localhost:4000/Favourites/${UserID}/Favourites`, {
                headers: { authorization: Cookie.auth_token },
                }) 
                .then((response) =>   {
                        setRecipeID3(response.data[2].ID)
                        setFavouritesID3(response.data[2]._id)
                })
            } catch (err) {
                console.log(err);
            }
        }

        const fetchRecipeID4 = async () => {
            try {
                await Axios.get(`http://localhost:4000/Favourites/${UserID}/Favourites`, {
                headers: { authorization: Cookie.auth_token },
                }) 
                .then((response) =>   {
                        setRecipeID4(response.data[3].ID)
                        setFavouritesID4(response.data[3]._id)
                })
            }
            catch (err) {
                console.log(err);
            }
        }

        const fetchRecipeID5 = async () => {
            try {
                await Axios.get(`http://localhost:4000/Favourites/${UserID}/Favourites`, {
                headers: { authorization: Cookie.auth_token },
                }) 
                .then((response) =>   {
                        setRecipeID5(response.data[4].ID)
                        setFavouritesID5(response.data[4]._id)
                })
            }
            catch (err) {
                console.log(err);
            }
        }

        const fetchRecipeID6 = async () => {
            try {
                await Axios.get(`http://localhost:4000/Favourites/${UserID}/Favourites`, {
                headers: { authorization: Cookie.auth_token },
                }) 
                .then((response) =>   {
                        setRecipeID6(response.data[5].ID)
                        setFavouritesID6(response.data[5]._id)
                })
            }
            catch (err) {
                console.log(err);
            }
        }

        if (UserID) {
            fetchRecipeID()
        } 

        if (UserID) {
            fetchRecipeID2()
        } 

        if (UserID) {
            fetchRecipeID3()
        } 

        if (UserID) {
            fetchRecipeID4()
        } 

        if (UserID) {
            fetchRecipeID5()
        } 

        if (UserID) {
            fetchRecipeID6()
        } 

    },[UserID])

    useEffect(()=> { 

        const fetchFavourites = () => {
            fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${RecipeID}`)
            .then(response => response.json())
            .then((data) => {
                setFavourites(data.meals)
                setTimeout(() => {
                    setIsLoading(false);
                }, 1000);
            })
            .catch(err => console.error(err));
        }

        if (RecipeID) {
            fetchFavourites()
        } else {
            console.log("No Favourites")
        }

    },[RecipeID]) 

    useEffect(()=> {  

        const fetchFavourites2 = () => {
            fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${RecipeID2}`)
            .then(response => response.json())
            .then((data) => {
                setFavourites2(data.meals)
            })
            .catch(err => console.error(err));
        }


        if (RecipeID2) {
            fetchFavourites2()
        } else {
            console.log("")
        }

    },[RecipeID2]) 

    useEffect(()=> {  

        const fetchFavourites3 = () => {
            fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${RecipeID3}`)
            .then(response => response.json())
            .then((data) => {
                setFavourites3(data.meals)
            })
            .catch(err => console.error(err));
        }


        if (RecipeID3) {
            fetchFavourites3()
        } else {
            console.log("")
        }

    },[RecipeID3]) 

    useEffect(()=> {  

        const fetchFavourites4 = () => {
            fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${RecipeID4}`)
            .then(response => response.json())
            .then((data) => {
                setFavourites4(data.meals)
            })
            .catch(err => console.error(err));
        }

        if (RecipeID4) {
            fetchFavourites4()
        } else {
            console.log("")
        }

    },[RecipeID4]) 


    useEffect(()=> {  

        const fetchFavourites5 = () => {
            fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${RecipeID5}`)
            .then(response => response.json())
            .then((data) => {
                setFavourites5(data.meals)
            })
            .catch(err => console.error(err));
        }


        if (RecipeID5) {
            fetchFavourites5()
        } else {
            console.log("")
        }

    },[RecipeID5])

    useEffect(()=> {  

        const fetchFavourites6 = () => {
            fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${RecipeID6}`)
            .then(response => response.json())
            .then((data) => {
                setFavourites6(data.meals)
            })
            .catch(err => console.error(err));
        }


        if (RecipeID6) {
            fetchFavourites6()
        } else {
            console.log("")
        }

    },[RecipeID6])
    
    const RemoveFromFavourites = (id) => {
        Axios.delete(`http://localhost:4000/Favourites/${id}`, {
            headers: { authorization: Cookie.auth_token }
        }) 
        .then(
            window.location.reload()
        )
    }

return(
    <article>
        <p className='Maximum'>Maximum number of favourites displayed is 6</p>
        <div className='Favourite' >
        {isLoading ? (
            <div className='Cooking' >
                <img src={CookingGif} alt="Loading..." className='Loading' />
            </div>
        ) : (
            (Favourites.length > 0) ?  
            Favourites.map((Item) => { 
                return (
                <div key={Item.idMeal} > 
                    <Link className='Link' to={`/${Item.idMeal}`} key={Item.idMeal} >
                        <figure>
                            <img src={Item.strMealThumb} alt="" />
                            <figcaption>
                                <h2>{Item.strMeal}</h2>
                            </figcaption>
                        </figure>
                    </Link>
                    <button onClick={() => RemoveFromFavourites(FavouritesID)} >Remove from Favourites</button>
                </div>
        )
        }) : <h2 className='Failure'>No Recipes Found.</h2> 
        )}
        {
        isLoading ? (
            <div className='Cooking' >
                <img src={CookingGif} alt="Loading..." className='Loading' />
            </div>
        ) : (
        (Favourites.length > 0) ?  
        Favourites2.map((Item) => { 
            return (
            <div key={Item.idMeal} > 
                <Link className='Link' to={`/${Item.idMeal}`} key={Item.idMeal} >
                    <figure>
                        <img src={Item.strMealThumb} alt="" />
                        <figcaption>
                            <h2>{Item.strMeal}</h2>
                        </figcaption>
                    </figure>
                </Link>
                <button onClick={() => RemoveFromFavourites(FavouritesID2)} >Remove from Favourites</button>
            </div>
            )
        
        })
        : ""
        )}
        {
        isLoading ? (
            <div className='Cooking' >
                <img src={CookingGif} alt="Loading..." className='Loading' />
            </div>
        ) : (
        (Favourites.length > 0) ?  
        Favourites3.map((Item) => { 
            return (
            <div key={Item.idMeal} > 
                <Link className='Link' to={`/${Item.idMeal}`} key={Item.idMeal} >
                    <figure>
                        <img src={Item.strMealThumb} alt="" />
                        <figcaption>
                            <h2>{Item.strMeal}</h2>
                        </figcaption>
                    </figure>
                </Link>
                <button onClick={() => RemoveFromFavourites(FavouritesID3)} >Remove from Favourites</button>
            </div>
            )
        }) : ""
        )}
        {
        isLoading ? (
            <div className='Cooking' >
                <img src={CookingGif} alt="Loading..." className='Loading' />
            </div>
        ) : (
        (Favourites.length > 0) ?  
        Favourites4.map((Item) => { 
            return (
            <div key={Item.idMeal} > 
                <Link className='Link' to={`/${Item.idMeal}`} key={Item.idMeal} >
                    <figure>
                        <img src={Item.strMealThumb} alt="" />
                        <figcaption>
                            <h2>{Item.strMeal}</h2>
                        </figcaption>
                    </figure>
                </Link>
                <button onClick={() => RemoveFromFavourites(FavouritesID4)} >Remove from Favourites</button>
            </div>
            )
        }) : ""
        )}
        {
        isLoading ? (
            <div className='Cooking' >
                <img src={CookingGif} alt="Loading..." className='Loading' />
            </div>
        ) : (
        (Favourites.length > 0) ?  
        Favourites5.map((Item) => { 
            return (
            <div key={Item.idMeal} > 
                <Link className='Link' to={`/${Item.idMeal}`} key={Item.idMeal} >
                    <figure>
                        <img src={Item.strMealThumb} alt="" />
                        <figcaption>
                            <h2>{Item.strMeal}</h2>
                        </figcaption>
                    </figure>
                </Link>
                <button onClick={() => RemoveFromFavourites(FavouritesID5)} >Remove from Favourites</button>
            </div>
            )
        }) : ""
        )}
        {
        isLoading ? (
            <div className='Cooking' >
                <img src={CookingGif} alt="Loading..." className='Loading' />
            </div>
        ) : (
        (Favourites.length > 0) ?   
        Favourites6.map((Item) => { 
            return (
            <div key={Item.idMeal} > 
                <Link className='Link' to={`/${Item.idMeal}`} key={Item.idMeal} >
                    <figure>
                        <img src={Item.strMealThumb} alt="" />
                        <figcaption>
                            <h2>{Item.strMeal}</h2>
                        </figcaption>
                    </figure>
                </Link>
                <button onClick={() => RemoveFromFavourites(FavouritesID6)} >Remove from Favourites</button>
            </div>
            )
        }) : ""
        )}
        </div>
    </article>
    
)
}

export default Favourites 