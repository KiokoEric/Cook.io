import React, { useEffect, useState  } from 'react';
import "../Header/Header.css";
import Axios from "axios";
import Logo from "../../Images/logo-light.svg";
import { useGetUserID } from "../../Hooks/UseGetUserID";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';


const Header = () => {

    const [Name, setName] = useState("")
    const [ExtendNavbar,setExtendNavbar ] = useState(true)
    const [ Cookie, setCookie ] = useCookies(["auth_token"]);

    const userID = useGetUserID();

    const navigate = useNavigate()

    useEffect(() => {
        
        const FetchName  = async() => {
            await Axios.get(`https://cook-io-h8ue.onrender.com/Users/${userID}/Name`, {
            headers: { authorization: Cookie.auth_token },
            }) 
            .then((Response) => {
                setName(Response.data.Name)
            })
        } 
    
        if (userID) {
            FetchName()
        } 

    },[userID])

    const Logout = () => {
        setCookie("auth_token", "");
        window.localStorage.clear();
        navigate("/");
    }

return (
    <div className='Header'>
        <article>
            <section>
                <Link Link to="/Home" className='Link'  >
                    <img src={Logo} alt="" />
                </Link>
            </section>
            <section>
                <nav className={ExtendNavbar ? "CloseNavigation" : "OpenNavigation" } onClick={() => setExtendNavbar(false)}>
                    <Link Link to="/Home" className='Link Navigate'  >
                        <p>Home</p> 
                    </Link>
                    <Link Link to="Explore" className='Link Navigate'  >
                        <p>Explore</p>
                    </Link>
                    <Link Link to="Categories" className='Link Navigate'  >
                        <p>Categories</p>
                    </Link>
                    <Link Link to="Nationality" className='Link Navigate'  >
                        <p>Nationality</p>
                    </Link>
                    <Link Link to="Favourites" className='Link Navigate' id='Display' >
                        <p>Favourites</p>
                    </Link>
                    <Link Link to="/Create" className='Link Navigate' >
                        <p>Create Recipe</p> 
                    </Link>
                    <Link Link to="/MyRecipes" className='Link Navigate' > 
                        <p>My Recipes</p>
                    </Link>
                    <Link Link to="/Favourites" className='Link Navigate Hidden' > 
                        <p>Favourites</p>
                    </Link>
                    {!userID ? <Link Link to="/Register" className='Link Navigate Hidden' > 
                        <p>Sign Up</p>
                    </Link> : null } 
                    {
                        !Cookie.auth_token ?
                        (
                            <Link to="/" className='Link Navigate Hidden' >
                                <p>Login</p>
                            </Link>
                        ) : 
                        (
                            <p onClick={Logout} type="submit" className='Link Navigate Hidden' >Logout</p>
                        )
                    }
                </nav>
            </section>
            <section> 
                <figure onClick={()=> {setExtendNavbar((curr) => !curr)}}>
                    {ExtendNavbar ? <i id="Bars" class="fa-solid fa-bars"></i> : <i id='Bars' class="fa-solid fa-xmark"></i> }
                </figure>
                <Link Link to="/Favourites" className='Bookmark' >
                    <button ><i class="fa-solid fa-bookmark"></i>Favourites Recipes</button>
                </Link>
                {
                    !userID ? <Link to="/Register" className='User' >
                        <button type="submit">Sign Up</button>
                    </Link> : null
                }
                {
                    !Cookie.auth_token ?
                    (
                        <Link to="/" className='User' >
                            <button type="submit">Login</button>
                        </Link>
                    ) : 
                    (
                        <button onClick={Logout} type="submit" className='Logout'>Logout</button>
                    )
                }
                <Link to={`/Profile/${userID}`} >
                    <i id='Profile' class="fa-solid fa-user"></i>
                </Link>
                {userID ? <h4> <span>Welcome</span>{Name}</h4> : null }
            </section>
        </article>
    </div>
)
}

export default Header