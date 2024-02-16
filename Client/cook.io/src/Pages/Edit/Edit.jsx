import React, { useEffect, useState } from 'react';
import Axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate, useParams } from "react-router-dom";
import { useGetUserID } from "../../Hooks/UseGetUserID";
import "../Edit/Edit.css";

const Edit = () => {

    const UserID = useGetUserID();
    const navigate = useNavigate()

    const [Cookie, setCookie] = useCookies(["auth_token"]);
    const [Name, setName] = useState("")
    const [Description, setDescription] = useState("")
    const [Ingredients, setIngredients] = useState([])
    const [Instructions, setInstructions] = useState([])
    const [Image, setImage] = useState("")
    const [Success, setSuccess] = useState("")
    const [userOwner, setuserOwner] = useState(UserID)
    const { _id } = useParams()

    useEffect(() => {
        Axios.get(`https://cook-io-server.vercel.app/Recipe/${_id}`, {
                headers: { authorization: Cookie.auth_token },
            }) 
        .then((Data) => { 
            setName(Data.data.Name)
            setDescription(Data.data.Description)
            setIngredients(Data.data.Ingredients)
            setInstructions(Data.data.Instructions)
            setImage(Data.data.Image) 
        })
    }, [])

    const EditRecipe = async (e) => {
        e.preventDefault()

        const data = {
            Name, Description, Ingredients, Instructions, Image, userOwner
        }
        try {
            Axios.put(`https://cook-io-server.vercel.app/Recipe/${_id}`, data , {
                headers: { authorization: Cookie.auth_token },
            }) 
            .then(() => { 
                setSuccess("Recipe successfully Edited.")
                navigate("/MyRecipes") 
            })
        } catch (error) {
            console.error(error) 
        }
        
    }  

    const handleName = (e) => {
        setName(e.target.value)
    }

    const handleDescription = (e) => {
        setDescription(e.target.value)
    }

    const handleIngredients = (e) => {
        setIngredients(e.target.value)
    }

    const handleInstructions = (e) => {
        setInstructions(e.target.value)
    }

    const handleImage = (e) => {
        setImage(e.target.value)
    }

return (
    <div className='Edit' >
        <section>
            <h1>Edit Recipe</h1>
        </section>
        <section>
            <form onSubmit={EditRecipe} method="post" encType="multipart/form-data" >
                <div>
                    <label for="">Name</label> 
                    <input type="text" name="Subject" id="Subject" placeholder="Enter Name..." value={Name} onChange={handleName} required />
                </div>
                <div>
                    <label for="">Description</label>
                    <textarea type="text" className="Description" name='Description' id="Description" cols="1" rows="10" placeholder="Enter Description..."  value={Description} onChange={handleDescription} required ></textarea>
                </div>
                <div>
                    <label for="">Ingredients</label>
                    <textarea type="text" name="" id="Ingredients" cols="30" rows="10" placeholder='Enter Ingredients'  value={Ingredients} onChange={handleIngredients} required ></textarea>
                </div>
                <div>
                    <label for="">Instructions</label>
                    <textarea type="text" name="" id="Instructions" cols="30" rows="10" placeholder='Enter Instructions'  value={Instructions} onChange={handleInstructions} required ></textarea>
                </div>
                <div>
                    <label for="">Image</label>
                    <input type="text" name="Image" id="Image" placeholder='Enter Image Url...' value={Image} onChange={handleImage} required />
                </div>
                <div>
                    <h4 className='Success' >{Success}</h4>
                    <button onClick={EditRecipe} type="submit">Edit Recipe</button>
                </div>
            </form>
        </section>
    </div>
)
}

export default Edit