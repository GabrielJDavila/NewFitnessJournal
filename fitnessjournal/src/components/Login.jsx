import { Link } from "react-router-dom";
import { useEffect, useState } from "react"
import { signIn, auth } from "../firebase"
import { onAuthStateChanged } from "firebase/auth"

export default function Login(props) {
    const [loginInfo, setLoginInfo] = useState({
        email: "",
        password: ""
    })

    console.log(loginInfo)

    function handleChange(e) {
        const {name, value} = e.target
        setLoginInfo(prev => ({
            ...prev,
            [name]: value
        }))
    }
    return (
        <form onSubmit={props.handleSignIn} className="login-page">
            <h1 className="login-form-title">The Fitbook</h1>
            <span className="login-form-span">Your personal fitness helper, right in your pocket.</span>
            <fieldset className="input-fieldset">
                <Link className="sign-up">Don't have an account? Sign-up here.</Link>
                <input
                    name="email"
                    type="email"
                    onChange={handleChange}
                    value={loginInfo.email}
                    placeholder="youremail@example.com"
                    className="login-cred"
                    required
                />
                <input
                    name="password"
                    type="password"
                    onChange={handleChange}
                    value={loginInfo.password}
                    placeholder="******"
                    className="login-cred"
                    required
                />
            </fieldset>
            <button className="login-button"></button>
        </form>
    )
}