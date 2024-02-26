import React from 'react';
import Axios from "axios";
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import {useCookies} from "react-cookie";
import "../Login/Login.css";

const Login = () => {

    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const [ Cookie, setCookie ] = useCookies(["auth_token"]);
    const [Error, setError] = useState("")
    const [showPassword, setShowPassword] = useState(false);
    const { enqueueSnackbar } = useSnackbar();

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleEmail = (e) => {
        setEmail(e.target.value)
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    Axios.defaults.withCredentials = true;
    const onLogin = async (e) => {
        e.preventDefault()
        const data = {
            Email, Password
        }
        try {
            setError(false)
            const response = await Axios.post("https://cook-io-server.vercel.app/Users/Login", data)
                setCookie("auth_token", response.data.Token)
                window.localStorage.setItem("UserID", response.data.UserID)
                enqueueSnackbar("Logged in successfully!" , {variant: "success"}) 
        } catch (error) { 
            enqueueSnackbar("Login unsuccessful!" , {variant: "error"})
            console.log(error)
        }
    }

    Axios.defaults.withCredentials = true;
    const DemoLogin = async (e) => {
        e.preventDefault()
        const data = {
            Email : "marymasika@gmail.com" , Password : "Triumph2025"
        }
        try {
            setError(false)
            const response = await Axios.post("https://cook-io-server.vercel.app/Users/Login", data,)
                setCookie("auth_token", response.data.Token)
                window.localStorage.setItem("UserID", response.data.UserID)
                enqueueSnackbar("Logged in successfully!" , {variant: "success"}) 
        } catch (error) { 
            enqueueSnackbar("Login unsuccessful!" , {variant: "error"}) 
            console.log(error) 
        }
    }

return (
    <div className='Login'> 
    <section>
        <h1>Login</h1>
    </section>
    <section>
        <form onSubmit={onLogin} method="post" encType="multipart/form-data">
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
            <div>
                <button onClick={onLogin} type="submit">Login</button>
                <button onClick={DemoLogin}  >Demo Login</button>
            </div>
            
        </form>
    </section>
    </div>
)
}

export default Login