import React, { useState, useEffect } from 'react';
import Axios from "axios";
import { useGetUserID } from "../../../Hooks/UseGetUserID";
import { useCookies } from "react-cookie";
import {useNavigate, useParams} from "react-router-dom";
import "../Profile/Profile.css";

const Profile = () => { 

    const [ Cookie, setCookie ] = useCookies(["auth_token"]); 

    const [Name, setName] = useState("")
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const [myID, setmyID] = useState("")
    const { userID } = useParams()
    const [Success, setSuccess] = useState("")
    const [showPassword, setShowPassword] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [showToast, setShowToast] = useState(false);

    const handleShowToast = () => {
        setShowToast(true);
    };

    const handleCloseToast = () => {
        setShowToast(false);
    };

    const navigate = useNavigate()
    const ID = useGetUserID();

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleName = (e) => {
        setName(e.target.value)
    }

    const handleEmail = (e) => {
        setEmail(e.target.value)
    } 

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    useEffect(() => {

        const FetchUser =() => {
        try{
            Axios.get(`https://cook-io-server.vercel.app/Users/${userID}`, {
            headers: { authorization: Cookie.auth_token },
            }) 
            .then((Data) => { 
                console.log(Data.data._id)
                setmyID(Data.data._id)
                setName(Data.data.Name)
                setEmail(Data.data.Email)
                setPassword(Data.data.Password)
            })
        }
        catch (Error){
            console.log(Error)
        }
        }  
        
        FetchUser()

    }, [])

    const EditUser = () => {
        navigate(`/MyProfile/${userID}`)
    } 

    const DeleteUser = (id) => {
        navigate(`/DeleteProfile`)
    }

return (
    <div className='Profile'>
        <section>
            <h1>Profile</h1>
        </section>
        <section>
            <form encType="multipart/form-data">
                <div>
                    <label for="">Name</label>
                    <input type="text" name="Name" id="Name" placeholder="Enter Name..." value={Name}  onChange={handleName} readOnly />
                </div>
                <div>
                    <label for="">Email</label>
                    <input type="email" name="Email" id="Email" placeholder="Enter Email..." value={Email} onChange={handleEmail} readOnly />
                </div>
                <div>
                    <label for="">Password</label>
                    <article>
                        <input  type={showPassword ? 'text' : 'password'} name="Password" id="myPassword" placeholder="Enter Password..." value={Password} onChange={handlePassword} readOnly />
                        {showPassword ? <i onClick={handleTogglePassword} id='Eye' class="fa-solid fa-eye"></i> : <i id='Eye' onClick={handleTogglePassword} class="fa-solid fa-eye-slash"></i> }
                    </article>
                </div>
                
                <h4 className='Success'>{Success}</h4>
                <div>
                    <button onClick={EditUser} type="submit"><i class="fa-solid fa-pen-to-square"></i>Edit Details</button>
                    <button onClick={DeleteUser}><i class="fa-solid fa-trash"></i>Delete My Profile</button>
                </div>
            </form> 
        </section> 
    </div>
)
}

export default Profile