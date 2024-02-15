import React, { useState, useEffect, } from 'react';
import Axios from "axios";
import "../RecipeIndex/RecipeIndex.css";
import { useGetUserID } from "../../Hooks/UseGetUserID";
import { useCookies } from "react-cookie";
import { Link  } from 'react-router-dom';

const RecipeIndex = () => {

    const RecipeState = () => {
        let Record = localStorage.getItem("Records");

        if (Record) {
            return JSON.parse(localStorage.getItem("Records"))
        } else {
            return [];
        }
    }

    const UserID = useGetUserID();

    const [Cookie, setCookie] = useCookies(["auth_token"]);
    const [Favourites, setFavourites] = useState([]);
    const [url, seturl] = useState("")
    const [Items, setItems] = useState(RecipeState()) 
    const [userOwner, setuserOwner] = useState(UserID)

    const Alphabets = [
        "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"
    ]

    var num = 0;

    const setIndex = (Alphabets)=> {
        seturl(`https://www.themealdb.com/api/json/v1/1/search.php?f=${Alphabets}`);
        getMeals()
    }

    const getMeals = () => {
        fetch(url)
        .then(response => response.json())
        .then((data) => {
            setItems(data.meals)
        })
        .catch(err => console.error(err));
    }

    const AddToFavourites = async (ID) => {
        const data = {
            ID, userOwner
        }
        try {
        await Axios.post("http://localhost:4000/Favourites/AddFavourite", data, {
            headers: { authorization: Cookie.auth_token },
        });
        setFavourites(data.Favourites);
    } catch (err) {
        console.log(err);
    }
    };

    useEffect(() => {
        localStorage.setItem("Records", JSON.stringify(Items))
    },[Items]);


return (
    <div className='RecipeIndex' >
        <section>
            <h1>
                Explore your creativity.
            </h1>
            <h3>
                If plan A doesn't work, the alphabet has 25 more letters.
            </h3>
            <h5>Double click on any of the letters below <i class="fa-solid fa-hand-point-down"></i> </h5>
        </section>
        <section>
            {
            Alphabets.map((Alphabet) => {
                return (
                    <div key={num++} onClick={()=>setIndex(Alphabet)} >
                        <h3>{Alphabet}</h3>
                    </div>
                    
                )
            })
            } 
        </section>
        <section> 
            {
            (!Items) ? <h2 className='Failure' >No Results Found</h2> :
            Items.map((Item) => {
                return (
                <div key={Item.idMeal}  >
                    <Link className='Link' to={`/${Item.idMeal}`} >
                        <figure>
                            <img src={Item.strMealThumb} alt="" />
                            <figcaption>
                                <h2>{Item.strMeal}</h2>
                            </figcaption>
                        </figure>
                    </Link>
                        <button onClick={() => AddToFavourites(Item.idMeal)}>
                            <i class="fa-solid fa-bookmark"></i>
                        </button>
                </div>
                )
            }
            )
            }
        </section>
    </div>
)
}

export default RecipeIndex