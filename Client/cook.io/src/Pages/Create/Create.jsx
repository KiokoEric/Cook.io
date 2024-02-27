import React, { useState, useEffect } from 'react';
import Axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useGetUserID } from "../../Hooks/UseGetUserID";
import "../Create/Create.css";

const Create = () => {

    const UserID = useGetUserID();
    const navigate = useNavigate()

    const NameState = () => {
        let Names = localStorage.getItem("Name");

        if (Names) {
            return JSON.parse(localStorage.getItem("Name"))
        } else {
            return [];
        }
    }

    const DescriptionState = () => {
        let Descriptions = localStorage.getItem("Description");

        if (Descriptions) {
            return JSON.parse(localStorage.getItem("Description"))
        } else {
            return [];
        }
    }

    const IngredientState = () => {
        let Ingredient = localStorage.getItem("Ingredients");

        if (Ingredient) {
            return JSON.parse(localStorage.getItem("Ingredients"))
        } else {
            return [];
        }
    }

    const InstructionState = () => {
        let Instruction = localStorage.getItem("Instructions");

        if (Instruction) {
            return JSON.parse(localStorage.getItem("Instructions"))
        } else {
            return [];
        }
    }

    const ImageState = () => {
        let Image = localStorage.getItem("Images");

        if (Image) {
            return JSON.parse(localStorage.getItem("Images"))
        } else {
            return [];
        }
    }

    const [Cookie, setCookie] = useCookies(["auth_token"]);
    const [Name, setName] = useState(NameState())
    const [Description, setDescription] = useState(DescriptionState())
    const [Ingredients, setIngredients] = useState(IngredientState())
    const [Instructions, setInstructions] = useState(InstructionState())
    const [Image, setImage] = useState(ImageState())
    const [Error, setError] = useState("")
    const [Success, setSuccess] = useState("")
    const [userOwner, setuserOwner] = useState(UserID)
    const [ErrorField, setErrorField] = useState("")

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

    Axios.defaults.withCredentials = true;

    const AddRecipe = async (e) => {
        e.preventDefault()

        if (!UserID) {
            setError('Kindly log in!') 
        }
        else if(Name === "") {
            setErrorField("Kindly fill in all the fields.")
        }
        else if(Description === "") {
            setErrorField("Kindly fill in all the fields.")
        }
        else if(Ingredients === "") {
            setErrorField("Kindly fill in all the fields.")
        }
        else if(Instructions === "") {
            setErrorField("Kindly fill in all the fields.")
        }
        else if(Image === "") {
            setErrorField("Kindly fill in all the fields.")
        }
        else {
            const data = {
                Name, Description, Ingredients, Instructions, Image, userOwner
            }
            try {
                Axios.post("https://cook-io-server.onrender.com/Recipe/AddRecipe", data , {
                    headers: { authorization: Cookie.auth_token },
                }) 
                .then(() => { 
                    setSuccess("Recipe successfully added.")
                    setName('')
                    setDescription('')
                    setIngredients('')
                    setInstructions('')
                    setImage('')
                    navigate("/MyRecipes")
                })
            } catch (error) {
                console.error(error) 
            }
        }
    }  

    useEffect(() => {
        localStorage.setItem("Name", JSON.stringify(Name))
    },[Name]);

    useEffect(() => {
        localStorage.setItem("Description", JSON.stringify(Description))
    },[Description]);

    useEffect(() => {
        localStorage.setItem("Ingredients", JSON.stringify(Ingredients))
    },[Ingredients]);

    useEffect(() => {
        localStorage.setItem("Instructions", JSON.stringify(Instructions))
    },[Instructions]);

    useEffect(() => {
        localStorage.setItem("Images", JSON.stringify(Image))
    },[Image]);

return (
    <div className='Create' >
        <section>
            <h1>Create Recipe</h1>
        </section>
        <section>
            <form onSubmit={AddRecipe} method="post" encType="multipart/form-data" >
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
                    <h3 className='ErrorField' >{ErrorField}</h3>
                    <h4 className='Error'>{Error}</h4>
                    <h4 className='Success' >{Success}</h4>
                    <button onClick={AddRecipe} type="submit">Add Recipe</button>
                </div>
            </form>
        </section>
    </div>
)
}

export default Create