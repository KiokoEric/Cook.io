import React from 'react';
import Axios from "axios";
import "../Register/Register.css";
import { useSnackbar } from 'notistack';
import { useState } from 'react';

const Register = () => { 

    const [Name, setName] = useState("")
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const [Error, setError] = useState("")
    const [showPassword, setShowPassword] = useState(false);
    const [FieldError, setFieldError] = useState("")
    const { enqueueSnackbar } = useSnackbar();

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

    Axios.defaults.withCredentials = true;
    const onRegister = async (e) => {
        e.preventDefault()

        if (Name === "") {
            setFieldError("Name, Email and Password Fields are required")
        } else if (Email === "") {
            setFieldError("Name, Email and Password Fields are required")
        } else if (Password === "") {
            setFieldError("Name, Email and Password Fields are required")
        } else {
            const data = {
                Name, Email, Password
            }
            try {
                setError(false)
                await Axios.post("https://cook-io-h8ue.onrender.com/Users/Registration", data)
                .then(() => {
                    setFieldError("")
                    enqueueSnackbar("Registration Completed! Kindly Log in", {variant: "success"})
                }) 
            } catch (error) {
                enqueueSnackbar("Registration Failed!" , {variant: "error"})  
                console.error(error)
            }
        }

    }

return (
    <div className='Register' >
        <section>
            <h1>Sign Up</h1>
        </section>
        <section>
            <form onSubmit={onRegister} method="post" encType="multipart/form-data">
                <div>
                    <label for="">Name</label>
                    <input type="text" name="Name" id="Name" placeholder="Enter Name..." value={Name}  onChange={handleName} />
                </div>
                <div>
                    <label for="">Email</label>
                    <input type="email" name="Email" id="Email" placeholder="Enter Email..." value={Email} onChange={handleEmail} />
                </div>
                <div>
                    <label for="">Password</label>
                    <article>
                        <input  type={showPassword ? 'text' : 'password'} name="Password" id="myPassword" placeholder="Enter Password..." value={Password} onChange={handlePassword}/>
                        {showPassword ? <i onClick={handleTogglePassword} id='Eye' class="fa-solid fa-eye"></i> : <i id='Eye' onClick={handleTogglePassword} class="fa-solid fa-eye-slash"></i> }
                    </article>
                    <p className='Error'>{Error}</p>
                </div>
                <span className='Error'>{FieldError}</span>
                <button onClick={onRegister} type="submit">Sign Up</button>
            </form>
        </section> 
    </div>
)
}

export default Register