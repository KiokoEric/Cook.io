import React, { useState, useEffect } from 'react';
import Axios from "axios";
import "../Nationality/Nationality.css";
import { useCookies } from "react-cookie";
import { useGetUserID } from "../../Hooks/UseGetUserID";
import { Link } from 'react-router-dom';
import { useAppContext } from '../../Components/Context/AppContext';

const Nationality = () => {

    const NationState = () => {
        let Nation = localStorage.getItem("Nations");

        if (Nation) {
            return JSON.parse(localStorage.getItem("Nations"))
        } else {
            return [];
        }
    }

    const UserID = useGetUserID();

    const [Cookie, setCookie] = useCookies(["auth_token"]);
    const [Favourites, setFavourites] = useState([]);
    const [userOwner, setuserOwner] = useState(UserID)
    const [Search, setSearch] = useState("")
    const [SearchError, setSearchError] = useState("")
    const[Nationalities, setNationalities] = useState(NationState())

    const getNationality =(e)=> { 
        e.preventDefault()

        if(Search === "") {
            setSearchError("Kindly select a country")
        } else {
            fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${Search}`)
        .then(response => response.json())
        .then((data) => {
            setSearchError("")
            setNationalities(data.meals)
            setSearch("")
        })
        .catch(err => console.error(err));
        }
    }

    const handleSearch = (e) => {
        setSearch(e.target.value)
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
        localStorage.setItem("Nations", JSON.stringify(Nationalities))
    },[Nationalities]);

return (
    <div className='Nationality' > 
        <section>
            <h1>Where To?  </h1>
            <form onSubmit={getNationality} >
                <i id='World' class="fa-solid fa-earth-americas"></i>
                <select name="" id="Select" value={Search} onChange={handleSearch}>
                    <option value="">Search among the countries below</option>
                    <option value="British">Britain</option>
                    <option value="Canadian">Canada</option>
                    <option value="Chinese">China</option>
                    <option value="Croatian">Croatia</option>
                    <option value="Dutch">Netherlands</option>
                    <option value="Egyptian">Egypt</option>
                    <option value="French">France</option>
                    <option value="Greek">Greece</option>
                    <option value="Indian">India</option>
                    <option value="Irish">Ireland</option>
                    <option value="Italian">Italy</option>
                    <option value="Jamaican">Jamaica</option>
                    <option value="Japanese">Japan</option>
                    <option value="Malaysian">Malaysia</option>
                    <option value="Mexican">Mexico</option>
                    <option value="Moroccan">Morocco</option>
                    <option value="Filipino">Philippines</option>
                    <option value="Polish">Poland</option>
                    <option value="Portugese">Portugal</option>
                    <option value="Russian">Russia</option>
                    <option value="Spanish">Spain</option>
                    <option value="Thai">Thailand</option>
                    <option value="Tunisian">Tunisia</option>
                    <option value="Turkish">Turkey</option>
                    <option value="American">United States of America</option>
                    <option value="Vietnamese">Vietnam</option>
                </select>
                <i onClick={getNationality} id='Search' class="fa-solid fa-magnifying-glass"></i>
            </form>
            <span>{SearchError}</span>
            <p>Search any nation e.g Britain, Canada, America, Kenya</p>
        </section>
        <section>
            {
            (!Nationalities) ? <h2 className='Failure' >No Results Found</h2> :
            Nationalities.map((Nationality) => {
                return (
                <div key={Nationality.idMeal} >
                    <Link className='Link' to={`/${Nationality.idMeal}`}  >
                        <div >
                            <figure>
                                <img src={Nationality.strMealThumb} alt="" />
                                <figcaption>
                                    <h2>{Nationality.strMeal}</h2>
                                </figcaption>
                            </figure>
                        </div> 
                    </Link>
                        <button onClick={() => AddToFavourites(Nationality.idMeal)}>
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

export default Nationality