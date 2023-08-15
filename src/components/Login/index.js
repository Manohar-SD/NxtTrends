
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Cookies from "js-cookie"

import './index.css'

export default function Login() {




    //     const [name, setName] = useState("")
    //     const [password, setPassword] = useState("")
    const navigate = useNavigate()

    let onSubmitSuccess=jwtToken=>{
        Cookies.set("jwtToken",jwtToken,{
            expires:30,
            path:"/"
        })
       navigate("/")
    }

    let onSubmitFailure=errorMsg=>{
        setLoginDetails(prevLoginDetails=>({...prevLoginDetails,showErrorMsg:true,errorMsg}))
    }

    let submitForm = async(event)=>{
        event.preventDefault()
        let {username,password} = loginDetails
        const userdata = {username,password}
        const url = 'https://apis.ccbp.in/login'
        const options = {
            method:"POST",
           body:JSON.stringify(userdata)
        }
        const response = await fetch(url,options)
        const data = await response.json()
        if(response.ok){
            onSubmitSuccess(data.jwt_token)
        }
        else{
            onSubmitFailure(data.error_msg)
        }

    }


    const [loginDetails, setLoginDetails] = useState(
        {
            username: "",
            password: "",
            showErrorMsg: false,
            errorMsg: ""
        }
    )



    let onChangePassword=event=>{
        let password = event.target.value
        setLoginDetails(prevLoginDetails=>({...prevLoginDetails,password}))
    }

    let onChangeUsername=event=>{
        let username = event.target.value 
        setLoginDetails(prevLoginDetails=>({...prevLoginDetails,username}))
    }

    let renderPasswordField = () => {
        const {password} = loginDetails
        return (
            <>
                <label className="input-label" htmlFor="password">
                    Password
                </label>
                <input
                    className="password-input-field"
                    type="password"
                    id="password"
                    placeholder="Password"
                    value={password}
                    onChange={onChangePassword}
                />
            </>
        )
    }

    let renderUserNameField = () => {
        const {username} = loginDetails
        return (
            <>
                <label className="input-label" htmlFor="username" >Username</label>
                <input
                    id="username"
                    className="username-input-field"
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={onChangeUsername}
                />
            </>
        )
    }

    let {showErrorMsg,errorMsg} = loginDetails

    return (<>

        <div className="login-form-container">
            <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
                className="login-website-logo-mobile-image"
                alt="website logo"
            />
            <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png"
                className="login-image"
                alt="website login"
            />
            <form className="form-container" onSubmit={submitForm}>
                <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
                    className="login-website-logo-desktop-image"
                    alt="website logo"
                />
                <div className="input-container">{renderUserNameField()}</div>
                <div className="input-container">{renderPasswordField()}</div>
                <button type="submit" className="login-button">
                    Login
                </button>
                {showErrorMsg && <p className="error-message">*{errorMsg}</p>}
            </form>
        </div>

    </>
    )
}